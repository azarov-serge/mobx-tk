import React, { FC, PropsWithChildren } from 'react';
import { observer } from 'mobx-react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { authStrategyManager } from 'mobx-tk';

import { AUTH_PATH } from '../../../../app/router/constants';
import { useCheckAuth } from '../../../../shared/hooks/auth';

export const Error = styled.div`
  margin-top: 32px;
  display: flex;
  width: 100%;
  justify-content: center;

  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  color: #ea3c3c;
  text-align: center;
`;

export const Verifier: FC<PropsWithChildren<React.PropsWithChildren>> = observer((props) => {
  const { children } = props;
  const navigate = useNavigate();
  const { isFetched, isFetching, data: verified, fetchData: checkAuth, error } = useCheckAuth();

  React.useEffect(() => {
    checkAuth();
  }, []);

  if ((!verified && isFetched) || (error && isFetched)) {
    authStrategyManager.startUrl = window.location.href;

    navigate(authStrategyManager.strategy?.signInUrl ?? `/${AUTH_PATH}`);

    return null;
  }

  if (!verified || isFetching) {
    return <p>Verifying ...</p>;
  }

  if (error) {
    return (
      <>
        <Error>{error.message}</Error>
        <Link to={`/${AUTH_PATH}`}>Go to authorization</Link>
      </>
    );
  }

  return children;
});
