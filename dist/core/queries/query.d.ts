import { QueryInterface } from './types';
import { AbstractQuery } from './abstract-query';
export declare class Query extends AbstractQuery {
    cloneWith: (data?: Partial<QueryInterface>) => Query;
    static isInstance(value: unknown): value is Query;
}
