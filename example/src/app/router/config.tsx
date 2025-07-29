import React from 'react';
import { RouteObject } from 'react-router-dom';

import { InnerPage } from '../../shared/components';
import { HomePage, AuthPage, NotFoundPage } from '../../pages';
import { path, AUTH_PATH } from './constants';

export const routerConfig: RouteObject[] = [
  {
    path: path.home,
    element: <InnerPage />,
    children: [
      {
        index: true,
        path: path.home,
        element: <HomePage />,
      },
    ],
  },
  {
    path: AUTH_PATH,
    element: <AuthPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
