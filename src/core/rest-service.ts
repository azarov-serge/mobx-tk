import { observable, makeAutoObservable, action } from 'mobx';
import axios, { AxiosInstance, AxiosResponse, CanceledError } from 'axios';
import {
  CertError as AuthCertError,
  NetworkError as AuthNetworkError,
  AuthStrategyManagerInterface,
} from '@auth-strategy-manager/core';

import { delay } from '../shared/utils';
import { authStrategyManager, CERT_ERROR_CODE, networkErrors } from './constants';

import type { RequestArgs, Statuses } from './types';
import { CertError, NetworkError, QueryError, QueryStatus } from './queries';
import { appNavigator } from './helpers';

const DEFAULT_DELAY_MS = 300;

export const ABORT_REQUEST_MESSAGE = 'Abort request';
export type RestServiceArgs = {
  axiosInstance?: AxiosInstance;
  authStrategyManager?: AuthStrategyManagerInterface;
  getError?: (error: unknown) => QueryError;
};

export class RestService<T> {
  @observable.deep
  public statuses: Statuses<T> = {};
  public retries: Record<string, number> = {};
  public abortControllers: Record<string, AbortController> = {};
  public axiosInstance: AxiosInstance = axios.create();
  public authStrategyManager: AuthStrategyManagerInterface = authStrategyManager;
  public getError?: (error: unknown) => QueryError;

  constructor(args?: RestServiceArgs) {
    makeAutoObservable(this);

    this.getStatus = this.getStatus.bind(this);
    this.setStatus = this.setStatus.bind(this);
    this.request = this.request.bind(this);
    this.reset = this.reset.bind(this);
    this.resetAll = this.resetAll.bind(this);
    this.clearError = this.clearError.bind(this);

    this.axiosInstance = args?.axiosInstance ?? this.axiosInstance;
    this.authStrategyManager = args?.authStrategyManager ?? this.authStrategyManager;
    this.getError = args?.getError ?? this.getError;
  }

  public request = async <R>(args: RequestArgs<R>): Promise<QueryStatus<R>> => {
    const { query, data, fetch: fetchFn, adaptResponse, retry, retryDelay } = args;
    const { mock } = args;
    let status = this.getStatus<R>(query.key).cloneWith({ error: null });

    if (!retry && status.isFetching && query.method === 'GET') {
      return status as unknown as QueryStatus<R>;
    }

    status = status.cloneWith({ isFetching: true, error: null });

    this.setStatus(query.key, status as unknown as QueryStatus<T>);

    const headers = {
      ['Accept']: 'application/json',
      ['Content-Type']: 'application/json',
      ...(args?.headers ?? {}),
    };

    if (mock && mock.data) {
      await delay(mock?.delay || DEFAULT_DELAY_MS);
      status = status.cloneWith({
        data: adaptResponse ? adaptResponse(mock.data) : (mock.data as R),
        isFetched: true,
        isFetching: false,
      });

      this.setStatus(query.key, status as unknown as QueryStatus<T>);

      return status;
    }

    try {
      if (retry) {
        this.retries[query.key] = (this.retries[query.key] ?? 0) + 1;
      }

      const abortController = new AbortController();
      this.abortControllers[query.key] = abortController;

      const request: Promise<R | AxiosResponse<R>> = fetchFn
        ? fetchFn({ ...args, signal: abortController.signal })
        : this.axiosInstance({
            url: query.url,
            method: query.method,
            headers,
            data,
            signal: abortController.signal,
          });

      const response = await request;

      status = status.cloneWith({
        data: adaptResponse ? adaptResponse(response) : (response as R),
        isFetched: true,
        isFetching: false,
      });

      delete this.abortControllers[query.key];

      this.setStatus(query.key, status as unknown as QueryStatus<T>);

      if (retry) {
        delete this.retries[query.key];
      }

      return status;
    } catch (error) {
      delete this.abortControllers[query.key];

      if (error instanceof CanceledError) {
        delete this.statuses[query.key];

        return new QueryStatus();
      }

      const isAuthError =
        (error as { status: number } | undefined)?.status === 401 ||
        (error as { response: { status: number } } | undefined)?.response?.status === 401;

      const isLoginPath = window.location.pathname.includes(
        this.authStrategyManager.strategy.signInUrl ?? ''
      );

      if (isAuthError && !isLoginPath) {
        // To clear HTTP Only Cookies
        await this.authStrategyManager.strategy.signOut();

        // Update the start page for strategies to redirect to it after authorization
        this.authStrategyManager.startUrl = window.location.href;

        if (this.authStrategyManager.strategy.signInUrl) {
          if (appNavigator.navigate) {
            appNavigator.navigate(this.authStrategyManager.strategy.signInUrl);
          } else {
            window.location.replace(this.authStrategyManager.strategy.signInUrl);
          }
        }

        status = status.cloneWith({
          isFetched: true,
          isFetching: false,
        });

        this.setStatus(query.key, status as unknown as QueryStatus<T>);

        return status;
      }

      if (
        (error as { status: number } | undefined)?.status !== 403 &&
        !(error as { config?: { signal?: { aborted?: boolean } } } | undefined)?.config?.signal
          ?.aborted &&
        retry &&
        this.retries[query.key] < retry
      ) {
        await delay(retryDelay ?? 0);
        return await this.request(args);
      }

      if (error instanceof AuthCertError) {
        status = status.cloneWith({ error: new CertError() });
      } else if (error instanceof AuthNetworkError) {
        status = status.cloneWith({ error: new NetworkError(error.message) });
      } else if (
        axios.isAxiosError(error) &&
        networkErrors.includes(`${error?.code ?? error?.message}`)
      ) {
        status = status.cloneWith({
          error: new NetworkError(error.message),
        });
      } else if (axios.isAxiosError(error)) {
        status = status.cloneWith({
          error:
            error?.code === CERT_ERROR_CODE
              ? new CertError()
              : new QueryError({
                  status: error.status ?? 500,
                  message: error.message,
                }),
        });
      } else if (error instanceof Error) {
        status = status.cloneWith({
          error: new QueryError({
            status: 500,
            message: error.message,
          }),
        });
      } else if (error instanceof QueryError) {
        status = status.cloneWith({ error });
      } else if (this.getError) {
        status = status.cloneWith({ error: this.getError(error) });
      } else {
        status = status.cloneWith({
          error: new QueryError({
            status: 500,
            message: JSON.stringify(error),
          }),
        });
      }

      status = status.cloneWith({
        isFetched: true,
        isFetching: false,
      });

      this.setStatus(query.key, status as unknown as QueryStatus<T>);

      return status;
    }
  };

  public getStatus = <T>(key: string): QueryStatus<T> => {
    const status = this.statuses[key];

    if (!status) {
      return new QueryStatus();
    }

    return status as unknown as QueryStatus<T>;
  };

  public setStatus = action(<R>(key: string, status: QueryStatus<R>): void => {
    this.statuses[key] = status as unknown as QueryStatus<T>;
  });

  public reset = (keys: string | string[]): void => {
    if (Array.isArray(keys)) {
      keys.forEach((key) => {
        const abortController = this.abortControllers[key];

        abortController?.abort(ABORT_REQUEST_MESSAGE);

        delete this.abortControllers[key];
        delete this.statuses[key];
      });

      return;
    }

    const abortController = this.abortControllers[keys];
    abortController?.abort(ABORT_REQUEST_MESSAGE);

    delete this.abortControllers[keys];
    delete this.statuses[keys];
  };

  public resetQuery = (key: string): void => {
    Object.keys(this.statuses).forEach((statusKey) => {
      if (!statusKey.includes(key)) {
        return;
      }

      const abortController = this.abortControllers[statusKey];
      abortController?.abort(ABORT_REQUEST_MESSAGE);
      delete this.abortControllers[statusKey];
      delete this.statuses[statusKey];
    });
  };

  public resetAll = (): void => {
    this.statuses = {};
    Object.keys(this.statuses).forEach((statusKey) => {
      const abortController = this.abortControllers[statusKey];
      abortController?.abort(ABORT_REQUEST_MESSAGE);
      delete this.abortControllers[statusKey];
    });
  };

  public clearError = (keys: string[] | string): void => {
    if (Array.isArray(keys)) {
      keys.forEach((key) => {
        const status = this.statuses[key] ?? new QueryStatus();

        this.statuses[key] = status.cloneWith({ error: null });
      });

      return;
    }

    const status = this.statuses[keys] ?? new QueryStatus();

    this.statuses[keys] = status.cloneWith({ error: null });
  };
}
