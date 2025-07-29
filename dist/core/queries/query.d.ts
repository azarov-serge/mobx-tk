import { QueryInterface } from './types';
import { AbstractQuery } from './abstract-query';
export declare class Query extends AbstractQuery implements QueryInterface {
    constructor(data?: Partial<QueryInterface>);
    cloneWith: (query?: Partial<QueryInterface>) => Query;
    build: () => Query;
    static isInstance(value: unknown): value is Query;
}
