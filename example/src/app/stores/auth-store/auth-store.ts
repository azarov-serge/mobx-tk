import { makeObservable } from 'mobx';
import {
  Query,
  // QueryStatus,
  TKStore,
} from 'mobx-tk';

import { UserModel } from '../../../shared/models';
import {
  authStrategyManager,
  //  PersistStrategy
} from '../../../shared/constants';
import { BASE_URL } from '../../../shared/api';

export type AuthData = {
  login: string;
  password: string;
};

export type AuthServiceType = User | boolean;

export const queries = {
  checkAuth: new Query({
    url: `${BASE_URL}/check`,
    fetch: authStrategyManager.checkAuth,
  }),
  signIn: new Query({
    url: `${BASE_URL}/signIn`,
    method: 'POST',
    fetch: async (query) => await authStrategyManager.strategy.signIn({ data: query.data }),
    transformResponse: (response) => UserModel.fromJson(response as UserModel),
  }),

  signUp: new Query({
    url: `${BASE_URL}/signUp`,
    method: 'POST',
    fetch: authStrategyManager.strategy.signUp,
  }),

  signOut: new Query({
    url: `${BASE_URL}/signOut`,
    method: 'POST',
    fetch: authStrategyManager.strategy.signOut,
  }),
};

export type AuthKey = keyof typeof queries;

// TODO: Сырая идея, не проверялась
export class AuthStore extends TKStore<AuthServiceType, AuthKey> {
  constructor() {
    super(queries);
    makeObservable(this);
  }

  public createCheckAuthData = () => {
    return this.createData<boolean | null>(this.queries.checkAuth);
  };

  // public signIn = (data: AuthData): Promise<QueryStatus<UserModel>> => {
  //   // You can use other strategy
  //   authStrategyManager.use('persist');
  //   const strategy = authStrategyManager.strategy as PersistStrategy;

  //   return this.rest.request<UserModel>({
  //     query: this.queries.signIn.cloneWith({
  //       data,
  //       fetch: async (query) => {
  //         const response = await strategy.signIn({ data: query.data });

  //         this.rest.setStatus(
  //           this.queries.checkAuth.key,
  //           new QueryStatus({ isFetched: true, data: true })
  //         );

  //         return response;
  //       },
  //     }),
  //   });
  // };

  // public signUp = (data: AuthData): Promise<QueryStatus<UserModel>> => {
  //   // You can use other strategy
  //   authStrategyManager.use('persist');
  //   const strategy = authStrategyManager.strategy as PersistStrategy;

  //   return this.rest.request<UserModel>({
  //     query: this.queries.signIn.cloneWith({
  //       data,
  //       fetch: async (query) => {
  //         const response = await strategy.signUp({ data: query.data });

  //         this.rest.setStatus(
  //           this.queries.checkAuth.key,
  //           new QueryStatus({ isFetched: true, data: true })
  //         );

  //         return response;
  //       },
  //     }),
  //   });
  // };

  // public signOut = (): Promise<QueryStatus<void>> => {
  //   return this.rest.request<void>({
  //     query: this.queries.signOut,
  //   });
  // };
}

export const authService = new AuthStore();
