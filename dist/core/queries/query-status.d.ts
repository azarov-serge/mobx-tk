import { QueryError } from './errors';
export declare class QueryStatus<T> {
    readonly isFetching: boolean;
    readonly isFetched: boolean;
    readonly data: T | null;
    readonly error: QueryError | null;
    constructor(data?: Partial<QueryStatus<T> | undefined>);
    cloneWith: (data?: Partial<QueryStatus<T>> | undefined) => QueryStatus<T>;
}
