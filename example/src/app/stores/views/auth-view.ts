import { makeObservable } from 'mobx';
import { View, QueryData } from 'mobx-tk';

import { AuthKey, AuthService, authService } from '../services';

export type CheckAuthData = Awaited<ReturnType<typeof authService.checkAuth>>['data'];
export type SignInData = Awaited<ReturnType<typeof authService.signIn>>['data'];
export type SignUpData = Awaited<ReturnType<typeof authService.signUp>>['data'];
export type SignOutData = Awaited<ReturnType<typeof authService.signOut>>['data'];
export type FetchUserData = Awaited<
  ReturnType<typeof authService.signIn | typeof authService.signUp>
>['data'];

export class AuthView extends View<AuthService, AuthKey> {
  constructor() {
    super(authService);
    makeObservable(this);
  }

  public createCheckAuthData = (): QueryData<CheckAuthData, typeof authService.checkAuth> => {
    const query = this.service.queries.checkAuth;
    const status = this.service.getStatus<CheckAuthData>(query.key);
    const helpers = this.createHelpers('checkAuth');

    return { ...status, ...helpers, fetchData: this.service.checkAuth };
  };

  public createSignInData = (): QueryData<SignInData, typeof authService.signIn> => {
    const query = this.service.queries.signIn;
    const status = this.service.getStatus<SignInData>(query.key);
    const helpers = this.createHelpers('signIn');

    return {
      ...status,
      ...helpers,
      fetchData: this.service.signIn,
    };
  };

  public createSignUpData = (): QueryData<SignUpData, typeof authService.signUp> => {
    const query = this.service.queries.signUp;
    const status = this.service.getStatus<SignUpData>(query.key);
    const helpers = this.createHelpers('signUp');

    return { ...status, ...helpers, fetchData: this.service.signUp };
  };

  public createSignOutData = (): QueryData<SignOutData, typeof authService.signOut> => {
    const query = this.service.queries.signOut;
    const status = this.service.getStatus<SignOutData>(query.key);
    const helpers = this.createHelpers('signOut');

    return { ...status, ...helpers, fetchData: this.service.signOut };
  };

  // public createFetchUserData = (): QueryData<FetchUserData, () => Promise<void>> => {
  //   const key = this.service.queries.user.key;
  //   const signInQuery = this.service.queries.signIn;
  //   const signUpQuery = this.service.queries.signUp;
  //   const signInStatus = this.service.getStatus<FetchUserData>(signInQuery.key);
  //   const signUpStatus = this.service.getStatus<FetchUserData>(signUpQuery.key);

  //   const status = {
  //     isFetching: signInStatus.isFetching || signUpStatus.isFetching,
  //     isFetched: signInStatus.isFetched || signUpStatus.isFetched,
  //     data: signInStatus.data || signUpStatus.data,
  //     error: signInStatus.error || signUpStatus.error,
  //   };

  //   if (!this.helpers[key]) {
  //     const clearError = (args?: QueryInterface): void => {
  //       this.service.rest.clearError(signInQuery.cloneWith(args).key);
  //       this.service.rest.clearError(signUpQuery.cloneWith(args).key);
  //     };

  //     const reset = (args?: QueryInterface): void => {
  //       this.service.rest.reset(signInQuery.cloneWith(args).key);
  //       this.service.rest.reset(signUpQuery.cloneWith(args).key);
  //     };

  //     const resetQuery = (): void => {
  //       this.service.rest.reset(signInQuery.keyShort);
  //       this.service.rest.reset(signUpQuery.keyShort);
  //       this.service.rest.resetQuery(signInQuery.key);
  //       this.service.rest.resetQuery(signUpQuery.key);
  //       this.service.rest.resetQuery(signInQuery.keyShort);
  //       this.service.rest.resetQuery(signUpQuery.keyShort);
  //       this.service.resetQuery(key);
  //     };

  //     this.setHelpers('user', {
  //       clearError,
  //       reset,
  //       resetQuery,
  //     } as QueryHelpers);
  //   }

  //   return {
  //     ...status,
  //     ...this.helpers[key]!,
  //     fetchData: async () => {},
  //   };
  // };
}

export const authView = new AuthView();
