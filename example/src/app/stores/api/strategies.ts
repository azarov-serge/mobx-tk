import { RestStrategy } from '@auth-strategy-manager/rest';
import { KeycloakStrategy } from '@auth-strategy-manager/keycloak';
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
