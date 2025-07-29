import { action, computed, makeObservable } from 'mobx';
import { QueryHelpers, PaginationQueryHelpers, QueryData, PaginationQueryData } from './types';
import {
  PaginationQuery,
  PaginationQueryInterface,
  Query,
  QueryInterface,
  QueryParams,
} from './queries';
import { FetchResource } from './fetch-resource';
import { RestServiceArgs } from './rest-service';

// TODO: Сырая идея, не проверялась
export class TKStore<Service, Key extends string> {
  private readonly _service: FetchResource<unknown, Key>;
  protected helpers: Record<Key, QueryHelpers>;
  protected paginationHelpers: Record<Key, PaginationQueryHelpers>;

  constructor(queries: Record<Key, Query | PaginationQuery>, args?: RestServiceArgs) {
    makeObservable(this);

    this._service = new FetchResource<unknown, Key>(queries, args);
    this.helpers = {} as Record<Key, QueryHelpers>;
    this.paginationHelpers = {} as Record<Key, PaginationQueryHelpers>;
  }

  get service(): Service {
    return this._service as unknown as Service;
  }

  @computed
  get statuses() {
    return this._service.rest.statuses;
  }

  @computed
  get queries() {
    return this._service.queries;
  }

  public resetAll = (): void => {
    this._service.rest.resetAll();
  };

  public createData = <D>(query: Query): QueryData<D, typeof query.fetch> => {
    const status = this._service.getStatus<D>(query.key);
    let helperKey: Key | undefined;

    const helperKeys = Object.keys(this._service.queries);

    for (const key of helperKeys) {
      if (this._service.queries[key].key === query.key) {
        helperKey = key as Key;
        break;
      }
    }

    if (!helperKey) {
      throw new Error('Helper key not found');
    }
    const helpers = this.createHelpers(helperKey);

    // TODO: Добавить fetchData, должен быть через this._service.rest.request
    return { ...status, ...helpers, fetchData: query.fetch };
  };

  public createPaginationData = <D>(
    query: PaginationQuery
  ): PaginationQueryData<D, typeof query.fetch> => {
    const status = this._service.getPaginationStatus<D>(query.keys);
    let helperKey: Key | undefined;
    const helperKeys = Object.keys(this._service.queries);
    for (const key of helperKeys) {
      if (this._service.queries[key].key === query.key) {
        helperKey = key as Key;
        break;
      }
    }

    if (!helperKey) {
      throw new Error('Helper key not found');
    }
    const helpers = this.createPaginationHelpers(helperKey);

    return { ...status, ...helpers, fetchData: query.fetch };
  };

  protected createHelpers(key: Key): QueryHelpers {
    if (!this.helpers[key]) {
      const clearError = (args?: QueryInterface): void => {
        const query = this.queries[key];
        this._service.rest.clearError(query.cloneWith(args).key);
      };

      const reset = (args?: QueryInterface): void => {
        const query = this.queries[key];
        if (!query) {
          return;
        }
        this._service.rest.reset(query.cloneWith(args).key);
      };

      const resetQuery = (): void => {
        const query = this.queries[key];
        if (!query) {
          return;
        }
        this._service.rest.reset(query.keyShort);
        this._service.resetQuery(key);
      };

      this.setHelpers(key, {
        clearError,
        reset,
        resetQuery,
      } as QueryHelpers);
    }

    return this.helpers[key] as QueryHelpers;
  }

  // TODO: Подумать на будущее
  // public createPaginationData

  protected createPaginationHelpers(key: Key): PaginationQueryHelpers {
    if (!this.paginationHelpers[key]) {
      const nextPage = (params: QueryParams) => {
        const query = this._service.queries[key] as PaginationQuery;
        const result = query.nextPage(params);

        this._service.setQuery(key, query.cloneWith());

        return result;
      };

      const clearError = (args?: PaginationQueryInterface): void => {
        const query = this._service.queries[key] as PaginationQuery;
        this._service.rest.clearError(query.cloneWith(args).key);
      };

      const reset = (args?: PaginationQueryInterface): void => {
        const query = this._service.queries[key] as PaginationQuery;
        if (!query) {
          return;
        }
        this._service.rest.reset(query.cloneWith(args).key);
      };

      const resetQuery = (): void => {
        const query = this._service.queries[key] as PaginationQuery;
        if (!query) {
          return;
        }
        this._service.rest.resetQuery(query.keyShort);
        this._service.resetQuery(key);
      };

      this.setPaginationHelpers(key, {
        nextPage,
        clearError,
        reset,
        resetQuery,
      } as PaginationQueryHelpers);
    }

    return this.paginationHelpers[key] as PaginationQueryHelpers;
  }

  protected createQueryPaginationHelpers(query: PaginationQuery): PaginationQueryHelpers {
    const clearError = (args?: PaginationQueryInterface): void => {
      this._service.rest.clearError(query.cloneWith(args).key);
    };

    const reset = (args?: PaginationQueryInterface): void => {
      this._service.rest.reset(query.cloneWith(args).key);
    };

    const resetQuery = (): void => {
      this._service.rest.resetQuery(query.keyShort);
    };

    return {
      clearError,
      reset,
      resetQuery,
    } as PaginationQueryHelpers;
  }

  protected setHelpers = action((key: Key, helpers: QueryHelpers): void => {
    this.helpers[key] = helpers;
  });

  protected setPaginationHelpers = action((key: Key, helpers: PaginationQueryHelpers): void => {
    this.paginationHelpers[key] = helpers;
  });
}
