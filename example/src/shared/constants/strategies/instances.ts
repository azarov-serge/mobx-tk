import { AuthStrategyManager } from 'auth-strategy-manager';
import { RestStrategy } from '@auth-strategy-manager/rest';
import { KeycloakStrategy } from '@auth-strategy-manager/keycloak';

import { AUTH_PATH } from '../../../app/router/constants';
import { PersistStrategy } from './strategies/persist-strategy';

export const persistStrategy = new PersistStrategy({ signInUrl: `/${AUTH_PATH}` });

export const restStrategy = new RestStrategy({
  checkAuth: { url: '/api/auth/check' },
  signIn: { url: '/api/auth/sign-in', method: 'POST' },
  signUp: { url: '/api/auth/sign-up', method: 'POST' },
  signOut: { url: '/api/auth/sign-out', method: 'POST' },
  refresh: { url: '/api/auth/refresh' },
});

export const keycloakStrategy = new KeycloakStrategy({
  keycloak: {
    realm: 'admin-realm',
    url: 'http://localhost:8080',
    clientId: 'admin-client',
  },
});

export const authStrategyManager = new AuthStrategyManager([
  persistStrategy,
  // restStrategy,
  // keycloakStrategy,
]);
