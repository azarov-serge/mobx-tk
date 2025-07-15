import { QueryErrorData } from './types';
export declare class QueryError implements QueryErrorData {
    readonly status: number;
    readonly message: string;
    constructor(data: QueryErrorData);
    toString: () => string;
}
export declare class CertError extends QueryError {
    constructor();
}
export declare class NetworkError extends QueryError {
    constructor(message?: string);
}
