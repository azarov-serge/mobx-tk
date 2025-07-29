import { QueryHelpers, PaginationQueryHelpers, QueryData, PaginationQueryData } from './types';
import { PaginationQuery, PaginationQueryInterface, Query, QueryInterface } from './queries';
import { RestServiceArgs } from './rest-service';
export declare class TKStore<Service, Key extends string> {
    private readonly _service;
    protected helpers: Record<Key, QueryHelpers>;
    protected paginationHelpers: Record<Key, PaginationQueryHelpers>;
    constructor(queries: Record<Key, Query | PaginationQuery>, args?: RestServiceArgs);
    get service(): Service;
    get statuses(): import('./types').Statuses<unknown>;
    get queries(): Record<Key, PaginationQuery | Query>;
    resetAll: () => void;
    createData: <D>(query: Query) => QueryData<D, ((query: QueryInterface | PaginationQueryInterface, signal: AbortSignal) => Promise<unknown>) | undefined>;
    createPaginationData: <D>(query: PaginationQuery) => PaginationQueryData<D, ((query: QueryInterface | PaginationQueryInterface, signal: AbortSignal) => Promise<unknown>) | undefined>;
    protected createHelpers(key: Key): QueryHelpers;
    protected createPaginationHelpers(key: Key): PaginationQueryHelpers;
    protected createQueryPaginationHelpers(query: PaginationQuery): PaginationQueryHelpers;
    protected setHelpers: (key: Key, helpers: QueryHelpers) => void;
    protected setPaginationHelpers: (key: Key, helpers: PaginationQueryHelpers) => void;
}
