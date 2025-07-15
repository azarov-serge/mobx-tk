import { RestService, RestServiceArgs } from './rest-service';
import { PaginationQuery, Query, QueryStatus, PaginationResponse } from './queries';
export declare class FetchResource<Types, Key extends string> {
    rest: RestService<Types>;
    queries: Record<Key, Query | PaginationQuery>;
    private _queries;
    constructor(queries: Record<Key, Query | PaginationQuery>, args?: RestServiceArgs);
    get statuses(): import('./types').Statuses<Types>;
    getStatus: <T>(key: string) => QueryStatus<T>;
    getPaginationStatus<S>(keys: string[]): QueryStatus<PaginationResponse<S>>;
    setQuery: (key: string, query: Query | PaginationQuery) => void;
    resetQuery: (key: string) => void;
}
