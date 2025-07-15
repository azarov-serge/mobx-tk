import React from 'react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { MobxTkProvider } from 'mobx-tk';

import { AppRouter } from './router/app-router';
import {
  persistStrategy,
  // keycloakStrategy,
  //  restStrategy
} from './stores/api';

// Компонент-обертка для получения navigate
const Content: React.FC = () => {
  const navigate = useNavigate();

  return (
    <MobxTkProvider
      strategies={[persistStrategy]}
      defaultStrategy={persistStrategy.name}
      navigate={navigate}
    >
      <AppRouter />
    </MobxTkProvider>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Content />
    </BrowserRouter>
  );
};
