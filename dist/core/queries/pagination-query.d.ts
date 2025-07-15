import { PageQueryParams, PaginationQueryInterface, QueryParams } from './types';
import { AbstractQuery } from './abstract-query';
export declare class PaginationQuery extends AbstractQuery {
    page: number;
    pageParams: PageQueryParams;
    pageLimit: PageQueryParams;
    constructor(data?: Partial<PaginationQueryInterface>);
    get url(): string;
    get urls(): string[];
    /** Unique resource keys */
    get key(): string;
    /** Unique resource keys */
    get keys(): string[];
    get limit(): QueryParams;
    cloneWith: (data?: Partial<PaginationQueryInterface>) => PaginationQuery;
    nextPage: (params: QueryParams) => boolean;
    getPaginationParamsValue: <T>(key: string, defaultValue?: T | undefined, page?: number) => T;
    setParams: (params: QueryParams) => void;
    private getLimit;
    static isInstance(value: unknown): value is PaginationQuery;
}
