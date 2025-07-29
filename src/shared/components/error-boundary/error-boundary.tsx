import React from 'react';
import { ErrorBoundaryProps, ErrorBoundaryState } from './types';

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: '' };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error) {
    // You can also log the error to an error reporting service

    this.setState((prev) => ({
      ...prev,
      error: error?.stack ?? error?.message ?? JSON.stringify(error),
    }));
  }

  render() {
    if (this.state.hasError) {
      const ErrorPage = this.props.errorPage;
      // You can render any custom fallback UI
      return <ErrorPage error={this.state.error} />;
    }

    return this.props.children;
  }
}
