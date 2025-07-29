import { AxiosInstance } from 'axios';
import { RequestArgs, Statuses } from './types';
import { QueryError, QueryStatus } from './queries';
export declare const ABORT_REQUEST_MESSAGE = "Abort request";
export type RestServiceArgs = {
    axiosInstance?: AxiosInstance;
    getError?: (error: unknown) => QueryError;
};
export declare class RestService<T> {
    statuses: Statuses<T>;
    retries: Record<string, number>;
    abortControllers: Record<string, AbortController>;
    axiosInstance: AxiosInstance;
    getError?: (error: unknown) => QueryError;
    constructor(args?: RestServiceArgs);
    request: <R>(args: RequestArgs) => Promise<QueryStatus<R>>;
    getStatus: <T_1>(key: string) => QueryStatus<T_1>;
    setStatus: <R>(key: string, status: QueryStatus<R>) => void;
    reset: (keys: string | string[]) => void;
    resetQuery: (key: string) => void;
    resetAll: () => void;
    clearError: (keys: string[] | string) => void;
}
