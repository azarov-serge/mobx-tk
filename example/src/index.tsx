import React from 'react';
import ReactDOM from 'react-dom/client';

import { ThemeProvider } from 'styled-components';
import { LIGHT_THEME, FontsVTBGroup, DropdownProvider } from '@admiral-ds/react-ui';

import { App } from './app';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <ThemeProvider theme={LIGHT_THEME}>
    <DropdownProvider>
      <FontsVTBGroup />
      <App />
    </DropdownProvider>
  </ThemeProvider>
);
