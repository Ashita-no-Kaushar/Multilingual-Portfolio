import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<React.PropsWithChildren, State> {
  constructor(props: React.PropsWithChildren) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[ErrorBoundary] Uncaught error:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-6">
            Something went wrong
          </p>
          <h1 className="text-5xl md:text-7xl font-bold font-headline text-foreground mb-4">
            Error
          </h1>
          <p className="text-base text-muted-foreground max-w-md mb-10 leading-relaxed">
            An unexpected error occurred. Refreshing the page usually resolves it.
          </p>
          <Button onClick={() => window.location.reload()} size="lg">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh Page
          </Button>
          {this.state.error && (
            <p className="mt-6 text-xs text-muted-foreground/40 font-mono max-w-md break-all">
              {this.state.error.message}
            </p>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}
