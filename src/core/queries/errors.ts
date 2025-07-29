import { QueryErrorData } from './types';

export class QueryError implements QueryErrorData {
  public readonly status: number;
  public readonly message: string;

  constructor(data: QueryErrorData) {
    this.status = data.status;
    this.message = data.message;
  }

  toString = () => {
    return `${this.status ? `Status ${this.status}: ` : ''}${this.message}`;
  };
}

export class CertError extends QueryError {
  constructor() {
    super({
      status: 0,
      message: 'ERR_CERT_AUTHORITY_INVALID',
    });
  }
}

export class NetworkError extends QueryError {
  constructor(message?: string) {
    super({
      status: 0,
      message: message ?? 'NETWORK ERROR',
    });
  }
}
