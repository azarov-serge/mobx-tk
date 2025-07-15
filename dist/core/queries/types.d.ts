export type QueryMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
export type QueryErrorData = {
    status: number;
    message: string;
};
export type QueryParams = Record<string, unknown>;
export type QueryInterface = {
    /** Unique id for POST, PATCH, PUT, DELETE requests */
    id?: string;
    /** Unique request key */
    key: string;
    /** URL - for requests with search parameters */
    url: string;
    /**
     * Needed as a parameter for GET / DELETE requests (get / delete element).
     * Can be used as a unique key
     * */
    urlParam: string;
    baseUrl: string;
    method: QueryMethod;
    params: QueryParams;
};
export type PaginationResponse<T> = {
    count: number;
    lastId: number | string;
    lastValue: number | string;
    page: number;
    limit: number;
    data: T[];
};
export type PageQueryParams = Record<number, QueryParams>;
export type PaginationQueryInterface = QueryInterface & {
    id: number | string;
    page?: number;
    limit?: QueryParams;
    pageLimit: PageQueryParams;
    pageParams: PageQueryParams;
};
