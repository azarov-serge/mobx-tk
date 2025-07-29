import { PaginationQuery, PaginationQueryInterface, PaginationResponse, Query, QueryInterface, QueryParams, QueryStatus } from './queries';
export type Statuses<T> = {
    [key: string]: QueryStatus<T>;
};
export type RequestArgs = {
    query: Query | PaginationQuery;
};
export type QueryHelpers = {
    clearError: (args?: Partial<QueryInterface>) => void;
    reset: (args?: Partial<QueryInterface>) => void;
    resetQuery: () => void;
};
export type PaginationQueryHelpers = {
    prevPage: (params: QueryParams) => boolean;
    nextPage: (params: QueryParams) => boolean;
    clearError: (args?: Partial<PaginationQueryInterface>) => void;
    reset: (args?: Partial<PaginationQueryInterface>) => void;
    resetQuery: () => void;
};
export type QueryData<T, Fn> = QueryHelpers & QueryStatus<T> & {
    fetchData: Fn;
};
export type PaginationQueryData<T, Fn> = PaginationQueryHelpers & QueryStatus<PaginationResponse<T>> & {
    fetchData: Fn;
};
export type QueryConfig = QueryInterface & Omit<RequestArgs, 'query'>;
export type PaginationQueryConfig = PaginationQueryInterface & Omit<RequestArgs, 'query'>;
export type StoreConfig = Record<string, QueryConfig | PaginationQueryConfig>;
