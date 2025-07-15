import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import { ErrorBoundary } from 'mobx-tk';
import { Verifier } from './verifier';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  color: red;
  font-size: 24px;
`;

const ErrorPage: React.FC<{ error: string }> = ({ error }) => {
  return <Wrapper>{error}</Wrapper>;
};

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100px;
  background-color: red;
`;

export const InnerPage: React.FC = () => {
  return (
    <ErrorBoundary errorPage={ErrorPage}>
      <Verifier>
        <Header>MobX-TK</Header>
        <main>
          <Outlet />
        </main>
      </Verifier>
    </ErrorBoundary>
  );
};
