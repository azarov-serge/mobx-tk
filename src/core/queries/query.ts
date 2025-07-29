import { QueryInterface } from './types';
import { AbstractQuery } from './abstract-query';

export class Query extends AbstractQuery implements QueryInterface {
  constructor(data?: Partial<QueryInterface>) {
    super(data);
  }

  public cloneWith = (query?: Partial<QueryInterface>): Query => {
    return new Query({ ...this, ...query });
  };

  public build = (): Query => {
    if (this.getQueryArgs) {
      return new Query({ ...this, ...this.getQueryArgs(this) });
    }

    return new Query({ ...(this as QueryInterface) });
  };

  static isInstance(value: unknown): value is Query {
    return value instanceof Query;
  }
}
