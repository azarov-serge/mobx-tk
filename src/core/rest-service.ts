import { observable, makeAutoObservable, action } from 'mobx';
import axios, { AxiosInstance, AxiosResponse, CanceledError } from 'axios';

import { delay } from '../shared/utils';

import type { RequestArgs, Statuses } from './types';
import { QueryError, QueryStatus } from './queries';

export const ABORT_REQUEST_MESSAGE = 'Abort request';
export type RestServiceArgs = {
  axiosInstance?: AxiosInstance;
  getError?: (error: unknown) => QueryError;
};

export class RestService<T> {
  @observable.deep
  public statuses: Statuses<T> = {};
  public retries: Record<string, number> = {};
  public abortControllers: Record<string, AbortController> = {};
  public axiosInstance: AxiosInstance = axios.create();
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
    this.getError = args?.getError ?? this.getError;
  }

  public request = async <R>(args: RequestArgs): Promise<QueryStatus<R>> => {
    const query = args.query.build();

    let status = this.getStatus<R>(query.key).cloneWith({ error: null });

    if (!query.retry && status.isFetching && query.method === 'GET') {
      return status as unknown as QueryStatus<R>;
    }

    status = status.cloneWith({ isFetching: true, error: null });

    this.setStatus(query.key, status as unknown as QueryStatus<R>);

    const headers = {
      ['Accept']: 'application/json',
      ['Content-Type']: 'application/json',
      ...(query.headers ?? {}),
    };

    if (query.mock && query.mockDelay) {
      await delay(query.mockDelay);
      status = status.cloneWith({
        data: query.transformResponse
          ? (query.transformResponse(query.mock) as R)
          : (query.data as R),
        isFetched: true,
        isFetching: false,
      });

      this.setStatus(query.key, status as unknown as QueryStatus<R>);

      return status;
    }

    try {
      if (query.retry) {
        this.retries[query.key] = (this.retries[query.key] ?? 0) + 1;
      }

      const abortController = new AbortController();
      this.abortControllers[query.key] = abortController;

      const request: Promise<R | AxiosResponse<R>> = query.fetch
        ? (query.fetch(query, abortController.signal) as Promise<R | AxiosResponse<R>>)
        : this.axiosInstance({
            url: query.url,
            method: query.method,
            headers,
            data: query.data,
            signal: abortController.signal,
          });

      const response = await request;

      status = status.cloneWith({
        data: query.transformResponse ? (query.transformResponse(response) as R) : (response as R),
        isFetched: true,
        isFetching: false,
      });

      delete this.abortControllers[query.key];

      this.setStatus(query.key, status as unknown as QueryStatus<T>);

      if (query.retry) {
        delete this.retries[query.key];
      }

      return status;
    } catch (error) {
      delete this.abortControllers[query.key];

      if (error instanceof CanceledError) {
        delete this.statuses[query.key];

        return new QueryStatus();
      }

      if (this.getError) {
        status = status.cloneWith({ error: this.getError(error) });

        this.setStatus(query.key, status as unknown as QueryStatus<T>);

        return status;
      }

      if (
        (error as { status: number } | undefined)?.status !== 403 &&
        !(error as { config?: { signal?: { aborted?: boolean } } } | undefined)?.config?.signal
          ?.aborted &&
        query.retry &&
        this.retries[query.key] < query.retry
      ) {
        await delay(query.retryDelay ?? 0);
        return await this.request(args);
      }

      if (axios.isAxiosError(error)) {
        status = status.cloneWith({
          error: new QueryError({
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
