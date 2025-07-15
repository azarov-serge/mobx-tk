import { StringifyOptions } from 'query-string';
import { QueryInterface, QueryMethod, QueryParams } from './types';
export declare abstract class AbstractQuery implements QueryInterface {
    readonly id: string;
    readonly baseUrl: string;
    readonly method: QueryMethod;
    params: QueryParams;
    urlParam: string;
    private _key?;
    constructor(data?: Partial<QueryInterface>);
    /** Unique resource key */
    get key(): string;
    /** Can be used to clear state if there is a search like search=*/
    get keyShort(): string;
    /** URL for getting data */
    get url(): string;
    getParamsValue: <T>(key: string, defaultValue?: T | undefined) => T;
    cloneWith(data: unknown): unknown;
    protected createUrl: (params?: QueryParams) => string;
    protected createKey: (url?: string, params?: QueryParams) => string;
    static createUrlString(data: string): string;
    /** Uses qs.stringify. Sorts keys and converts to query string
     * @description
     * @param query
     * @param options
     * @returns
     */
    static createParams(params: Record<string, unknown>, options?: StringifyOptions): string;
}
