import { makeObservable } from 'mobx';
import { FetchResource, PaginationQuery, Query, QueryStatus } from 'mobx-tk';

import { UserModel } from '../../../../shared/models';
import { BASE_URL } from '../../api';

export type AuthData = {
  login: string;
  password: string;
};

export type AuthKey = 'checkAuth' | 'signIn' | 'signUp' | 'signOut' | 'user';

export type AuthServiceType = User | boolean;
export const queries: Record<AuthKey, Query | PaginationQuery> = {
  checkAuth: new Query({
    url: `${BASE_URL}/check`,
  }),

  signIn: new Query({
    url: `${BASE_URL}/signIn`,
    method: 'POST',
  }),

  signUp: new Query({
    url: `${BASE_URL}/signUp`,
    method: 'POST',
  }),

  signOut: new Query({
    url: `${BASE_URL}/signOut`,
    method: 'POST',
  }),

  user: new Query({
    url: `${BASE_URL}/user`,
    method: 'GET',
  }),
};

export class AuthService extends FetchResource<AuthServiceType, AuthKey> {
  constructor() {
    super(queries);
    makeObservable(this);
  }

  public checkAuth = (): Promise<QueryStatus<boolean>> => {
    return this.rest.request<boolean>({
      query: this.queries.checkAuth,
      fetch: this.rest.authorizer.check,
    });
  };

  public signIn = (data: AuthData): Promise<QueryStatus<UserModel>> => {
    // You can use other strategy
    // public signIn = (data: AuthData, strategyName: string): Promise<QueryStatus<UserModel>> => {
    // this.rest.authorizer.use(strategyName);

    return this.rest.request<UserModel>({
      query: this.queries.signIn,
      data,
      fetch: this.rest.authorizer.strategy.signIn,
      adaptResponse: (response) => {
        return UserModel.fromJson(response as UserModel);
      },
    });
  };

  public signUp = (data: AuthData): Promise<QueryStatus<UserModel>> => {
    // You can use other strategy
    // public signUp = (data: AuthData, strategyName: string): Promise<QueryStatus<UserModel>> => {
    // this.rest.authorizer.use(strategyName);

    return this.rest.request<UserModel>({
      query: this.queries.signUp,
      data,
      fetch: this.rest.authorizer.strategy.signUp,
      adaptResponse: (response) => UserModel.fromJson(response as UserModel),
    });
  };

  public signOut = (): Promise<QueryStatus<void>> => {
    return this.rest.request<void>({
      query: this.queries.signOut,
      fetch: this.rest.authorizer.strategy.signOut,
    });
  };
}

export const authService = new AuthService();
