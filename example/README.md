# Example MobX-TK

This project is created as an example of using the MobX-TK library. Working with a ''backend'' developed using API helpers and IndexedDB. Below is a full step-by-step description of how to use the MobX-TK library.

## Table  of content
- [Example MobX-TK](#example-mobx-tk)
  - [Table  of content](#table--of-content)
  - [Own libraries](#own-libraries)
  - [Debug](#debug)
  - [Authorization](#authorization)
    - [Auth api](#auth-api)
    - [Persist strategy](#persist-strategy)
    - [Create instances strategies](#create-instances-strategies)
    - [Configure authorizer for Mobx-TK](#configure-authorizer-for-mobx-tk)


## Own libraries
- Authorizer lib - [https://github.com/azarov-serge/authorizer](https://github.com/azarov-serge/authorizer)
- indexedDB Client - [https://github.com/azarov-serge/@azarov-serge/indexed-db-client](https://github.com/azarov-serge/@azarov-serge/indexed-db-client) 

[to table of contents](#example-mobx-tk)


## Debug
- Install packages - `npm i`
- Run project for debug - `npm run dev`

[to table of contents](#example-mobx-tk)


## Authorization
### Auth api

Crate api for Auth strategy - `src/app/stores/api/auth-api.ts`

```typescript
import { QueryError } from 'mobx-tk';
import { UserModel } from '../../../shared/models';
import { Api } from './api';

import { userApi } from './user-api';

const DEFAULT_REFRESH_MS = 1_000 * 60 * 5; // 5 minutes
const DEFAULT_ACCESS_MS = 1_000 * 60 * 1; // 1 minute

export class AuthApi extends Api {
  private readonly userApi = userApi;
  private readonly salt = '1234567890';

  public checkAuth = async (): Promise<boolean> => {
    const db = await this.getDb();
    await this.delay(500);
    const [authItem] = await db
      .from('auth')
      .select<AuthItem>({ key: 'authUserId', value: this.userId });

    if (!authItem) {
      throw new QueryError({
        status: 401,
        message: 'Token is expired',
      });
    }

    const isExpired = Number(authItem.createdAt) + Number(authItem.accessMs) < Number(new Date());

    if (isExpired) {
      throw new QueryError({
        status: 401,
        message: 'Token is expired',
      });
    }

    await this.refreshToken();

    return true;
  };

  public signIn = async (data: {
    login: string;
    password: string;
  }): Promise<Omit<User, 'password'>> => {
    const db = await this.getDb();
    await this.delay(500);
    const { login, password } = data;
    const [user] = await db.from('users').select<User>({ key: 'usersLogin', value: login });

    if (!user) {
      throw new QueryError({
        status: 401,
        message: 'User not found',
      });
    }

    if (user.password !== this.createPasswordHash(password)) {
      throw new QueryError({
        status: 401,
        message: 'Invalid password',
      });
    }

    await db.from('auth').insert({
      createdAt: new Date(),
      userId: user.id,
      refreshMs: DEFAULT_REFRESH_MS,
      accessMs: DEFAULT_ACCESS_MS,
    });

    const result = { ...user };

    delete (result as Record<string, unknown>).password;

    return result;
  };

  public signUp = async (data: {
    login: string;
    password: string;
  }): Promise<Omit<User, 'password'>> => {
    const db = await this.getDb();
    await this.delay(500);
    const { login, password } = data;

    let user = new UserModel({ login, password });

    user.validate();

    const users = await db.from('users').select<User>({ key: 'usersLogin', value: login });

    if (users.length > 0) {
      throw new Error('User already exists');
    }

    const newUser = await this.userApi.create(user.toJson());

    if (!newUser) {
      throw new QueryError({ status: 500, message: 'Failed to create user' });
    }

    user = user.cloneWith(newUser);

    await db.from('users').insert({
      createdAt: new Date(),
      login: login,
      password: this.createPasswordHash(password),
    });

    await db.from('auth').insert({
      createdAt: new Date(),
      userId: user.id,
      refreshMs: DEFAULT_REFRESH_MS,
      accessMs: DEFAULT_ACCESS_MS,
    });

    const result = user.toJson();

    delete (result as Record<string, unknown>).password;

    return result;
  };

  public signOut = async (): Promise<boolean> => {
    const db = await this.getDb();
    await this.delay(500);
    await db.from('auth').delete({ key: 'authUserId', value: this.userId });

    return true;
  };

  public refreshToken = async (): Promise<void> => {
    const db = await this.getDb();
    await this.delay(100);
    const [authItem] = await db
      .from('auth')
      .select<AuthItem>({ key: 'authUserId', value: this.userId });

    if (!authItem) {
      throw new QueryError({
        status: 401,
        message: 'Token is expired',
      });
    }

    await db.from('auth').update({ ...authItem, createdAt: new Date() });
  };

  private createPasswordHash = (password: string): string => {
    return password.split('').reverse().join('') + this.salt;
  };
}

export const authApi = new AuthApi();
```

[to table of contents](#example-mobx-tk)

### Persist strategy

Persist strategy - `src/app/stores/api/strategies/persist-strategy.ts`

```typescript

import { AxiosRequestConfig } from 'axios';
import { Strategy } from 'authorizer';

import { authApi } from '../auth-api';
import { QueryError } from 'mobx-tk';

export class PersistStrategy implements Strategy {
  name = 'persist';
  token = '';
  isAuthenticated?: boolean;
  signInUrl: string;
  private readonly authApi = authApi;

  constructor({ signInUrl }: { signInUrl: string }) {
    this.signInUrl = signInUrl;
  }

  public check = async (): Promise<boolean> => {
    const isChecked = await this.authApi.checkAuth();

    this.isAuthenticated = isChecked;

    return isChecked;
  };

  public signIn = async <D, T>(config?: AxiosRequestConfig<D>): Promise<T> => {
    if (!config) {
      throw new QueryError({ status: 422, message: 'Config is required' });
    }

    const { data } = config;

    const user = await this.authApi.signIn(data as { login: string; password: string });

    return user as unknown as T;
  };

  public signUp = async <D, T>(config?: AxiosRequestConfig<D>): Promise<T> => {
    if (!config) {
      throw new QueryError({ status: 422, message: 'Config is required' });
    }

    const { data } = config;

    const user = await this.authApi.signUp(data as { login: string; password: string });

    return user as unknown as T;
  };

  public signOut = async (): Promise<void> => {
    await this.authApi.signOut();
  };

  public refreshToken = async (): Promise<void> => {
    await this.authApi.refreshToken();
  };
}

```

[to table of contents](#example-mobx-tk)


### Create instances strategies

Strategies - `src/app/stores/api/strategies.ts`

```typescript
import { RestStrategy, KeycloakStrategy } from 'authorizer';
import { PersistStrategy } from './strategies/persist-strategy';
import { AUTH_PATH } from '../../router/constants';

export const persistStrategy = new PersistStrategy({ signInUrl: `/${AUTH_PATH}` });

export const restStrategy = new RestStrategy({
  check: { url: '' },
  signIn: { url: '', method: 'POST' },
  signUp: { url: '', method: 'POST' },
  signOut: { url: '', method: 'POST' },
  refresh: { url: '' },
});

export const keycloakStrategy = new KeycloakStrategy({
  keycloak: {
    realm: '',
    url: '',
    clientId: '',
  },
});

```

[to table of contents](#example-mobx-tk)

### Configure authorizer for Mobx-TK

Configuring a component when starting an application - `src/app/app.tsx`

```typescript

import React from 'react';
import { authorizer } from 'mobx-tk';

import { AppRouter } from './router/app-router';
import {
  persistStrategy,
  // keycloakStrategy,
  //  restStrategy
} from './stores/api';

export const App: React.FC = () => {
  // TODO: fix any
  authorizer.setStrategies([
    persistStrategy,
    // keycloakStrategy,
    // restStrategy,
  ]);
  authorizer.use(persistStrategy.name);

  return <AppRouter />;
};
```

[to table of contents](#example-mobx-tk)

