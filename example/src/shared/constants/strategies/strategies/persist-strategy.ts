import { AxiosRequestConfig } from 'axios';
import { QueryError } from 'mobx-tk';
import { Strategy } from 'auth-strategy-manager';

import { authApi } from '../../../api';

const TOKEN_KEY = 'token';
const EXPIRED_TOKEN = '-1';
export class PersistStrategy implements Strategy {
  name = 'persist';
  token = EXPIRED_TOKEN;
  isAuthenticated?: boolean;
  signInUrl: string;
  private readonly authApi = authApi;

  constructor({ signInUrl }: { signInUrl: string }) {
    this.signInUrl = signInUrl;
  }

  public checkAuth = async (): Promise<boolean> => {
    const isChecked = await this.authApi.checkAuth();

    this.isAuthenticated = isChecked;

    return isChecked;
  };

  public signIn = async <
    T = Omit<User, 'password'>,
    D = { data: { login: string; password: string } },
  >(
    config?: D
  ): Promise<T> => {
    if (!config) {
      throw new QueryError({ status: 422, message: 'Config is required' });
    }

    let axiosConfig: AxiosRequestConfig = {};
    if (config && typeof config === 'object') {
      axiosConfig = config as AxiosRequestConfig;
    }

    const { data } = axiosConfig;

    const user = await this.authApi.signIn(data as { login: string; password: string });

    this.setToken(String(user.id));

    return user as unknown as T;
  };

  public signUp = async <T = unknown, D = unknown>(config?: D): Promise<T> => {
    if (!config) {
      throw new QueryError({ status: 422, message: 'Config is required' });
    }

    let axiosConfig: AxiosRequestConfig = {};
    if (config && typeof config === 'object') {
      axiosConfig = config as AxiosRequestConfig;
    }

    const { data } = axiosConfig;

    const user = await this.authApi.signUp(data as { login: string; password: string });

    this.setToken(String(user.id));

    return user as unknown as T;
  };

  public signOut = async (): Promise<void> => {
    await this.authApi.signOut();
    this.setToken('');
  };

  public refreshToken = async (): Promise<void> => {
    await this.authApi.refreshToken();
  };

  public clear = (): void => {
    window.localStorage.removeItem(TOKEN_KEY);
    this.token = EXPIRED_TOKEN;
  };

  private setToken = (token: string): void => {
    window.localStorage.setItem(TOKEN_KEY, token);
  };
}
