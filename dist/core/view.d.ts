import { QueryHelpers, PaginationQueryHelpers } from './types';
import { PaginationQuery } from './queries';
export declare class View<Service, Key extends string> {
    private readonly _service;
    protected helpers: Record<Key, QueryHelpers>;
    protected paginationHelpers: Record<Key, PaginationQueryHelpers>;
    constructor(service: Service);
    get service(): Service;
    get statuses(): import('./types').Statuses<unknown>;
    get queries(): Record<Key, PaginationQuery | import('./queries').Query>;
    resetAll: () => void;
    protected createHelpers(key: Key): QueryHelpers;
    protected createPaginationHelpers(key: Key): PaginationQueryHelpers;
    protected createQueryPaginationHelpers(query: PaginationQuery): PaginationQueryHelpers;
    protected setHelpers: (key: Key, helpers: QueryHelpers) => void;
    protected setPaginationHelpers: (key: Key, helpers: PaginationQueryHelpers) => void;
}
