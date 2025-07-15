import { default as React } from 'react';
import { ErrorBoundaryProps, ErrorBoundaryState } from './types';
export declare class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: any);
    static getDerivedStateFromError(): {
        hasError: boolean;
    };
    componentDidCatch(error: any): void;
    render(): JSX.Element;
}
