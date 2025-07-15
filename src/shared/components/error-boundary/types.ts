import React from 'react';

export type ErrorBoundaryProps = {
  children: JSX.Element;
  errorPage: React.FC<{ error: string }>;
};

export type ErrorBoundaryState = { hasError: boolean; error: string };
