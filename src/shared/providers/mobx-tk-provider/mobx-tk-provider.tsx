import React from 'react';
import { Strategy } from '@auth-strategy-manager/core';

import { appNavigator, authStrategyManager } from '../../../core';

type Props = {
  defaultStrategy?: string;
  strategies: Strategy[];
  navigate?: (path: string) => void;
};

export const MobxTkProvider: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  strategies,
  defaultStrategy,
  navigate,
}) => {
  authStrategyManager.setStrategies(strategies);

  if (navigate) {
    appNavigator.setNavigate(navigate);
  }

  if (defaultStrategy || strategies.length === 1) {
    authStrategyManager.use(defaultStrategy ?? strategies[0].name);
  }

  return children;
};
