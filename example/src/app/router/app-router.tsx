import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { InnerPage } from '../../shared/components';
import { HomePage, AuthPage, NotFoundPage } from '../../pages';
import { path, AUTH_PATH } from './constants';

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path={path.home} element={<InnerPage />}>
        <Route index element={<HomePage />} />
      </Route>
      <Route path={AUTH_PATH} element={<AuthPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
