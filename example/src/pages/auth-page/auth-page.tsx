import React from 'react';
import styled from 'styled-components';
import { Button, NotificationItem, TextInput } from '@admiral-ds/react-ui';

import { UserModel } from '../../shared/models';
import { useCheckAuth, useSignIn, useSignUp } from '../../shared/hooks/auth';
import { observer } from 'mobx-react';
import { appNavigator } from 'mobx-tk';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  height: 100vh;
  width: 300px;
  margin: 0 auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 300px;
  margin-bottom: 20px;
`;
const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Input = styled(TextInput)`
  width: 100%;
`;

const DEFAULT_START_URL = '/';

export const AuthPage: React.FC = observer(() => {
  const [mode, setMode] = React.useState<'signIn' | 'signUp'>('signIn');
  const [user, setUser] = React.useState<UserModel>(new UserModel());

  const {
    isFetching: isCheckingAuth,
    data: checkedAuth,
    error: checkAuthError,
    fetchData: checkAuth,
  } = useCheckAuth();

  const {
    isFetching: isSignInFetching,
    fetchData: signIn,
    error: signInError,
    reset: resetSignIn,
  } = useSignIn();

  const {
    isFetching: isSignUpFetching,
    fetchData: signUp,
    error: signUpError,
    reset: resetSignUp,
  } = useSignUp();

  const isFetching = mode === 'signIn' ? isSignInFetching : isSignUpFetching;
  const fetchData = mode === 'signIn' ? signIn : signUp;
  const error = mode === 'signIn' ? signInError : signUpError;
  const reset = mode === 'signIn' ? resetSignIn : resetSignUp;

  React.useEffect(() => {
    checkAuth();
  }, []);

  React.useEffect(() => {
    setUser(new UserModel());

    return () => {
      reset();
    };
  }, [mode]);

  React.useEffect(() => {
    if (checkedAuth) {
      if (appNavigator.navigate) {
        appNavigator.navigate(DEFAULT_START_URL);
      } else {
        window.location.replace(DEFAULT_START_URL);
      }
    }
  }, [checkedAuth]);

  if (isCheckingAuth || (checkedAuth !== false && !checkAuthError?.message)) {
    return (
      <Wrapper>
        <Form>Checking auth...</Form>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div>
        <h1>{mode === 'signIn' ? 'Sign In' : 'Sign Up'}</h1>
        <Form>
          <Input
            dimension="s"
            type="text"
            placeholder="Login"
            value={user.login}
            onChange={(evt) => setUser(user.cloneWith({ login: evt.target.value }))}
          />
          <Input
            dimension="s"
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={(evt) => setUser(user.cloneWith({ password: evt.target.value }))}
          />

          <Buttons>
            <Button
              dimension="s"
              disabled={isFetching || !user.login || !user.password}
              onClick={() => fetchData({ login: user.login, password: user.password })}
            >
              {isFetching ? 'Submitting...' : 'Submit'}
            </Button>

            <Button
              appearance="ghost"
              dimension="s"
              onClick={() => setMode(mode === 'signIn' ? 'signUp' : 'signIn')}
              disabled={isFetching}
            >
              To {mode === 'signIn' ? 'Sign Up' : 'Sign In'}
            </Button>
          </Buttons>
        </Form>
        {error && (
          <NotificationItem displayStatusIcon status="error">
            {error.toString()}
          </NotificationItem>
        )}
      </div>
    </Wrapper>
  );
});
