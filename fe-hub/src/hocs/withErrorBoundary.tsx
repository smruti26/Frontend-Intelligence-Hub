/**
 * src/hocs/withErrorBoundary.tsx
 * ─────────────────────────────────────────────────────────────────
 * HOC: withErrorBoundary
 *
 * Wraps any component in a React Error Boundary so that runtime
 * errors in canvas animations or content panels never crash the
 * whole application — they show a graceful fallback UI instead.
 *
 * Usage:
 *   const SafeReactPanel = withErrorBoundary(ReactPanel, {
 *     fallback: <ErrorFallback />,
 *     onError:  (err) => logToSentry(err),
 *   });
 */

import React, { Component } from 'react';
import type { WithErrorBoundaryProps } from '@appTypes';

// ── Fallback UI ───────────────────────────────────────────────────────────

const DefaultFallback: React.FC<{ error: Error; onReset: () => void }> = ({
  error,
  onReset,
}) => (
  <div
    role="alert"
    style={{
      padding:      '2rem',
      background:   'var(--bg)',
      border:       '1px solid var(--border)',
      borderRadius: '12px',
      textAlign:    'center',
    }}
  >
    <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>⚠️</div>
    <h3 style={{ color: 'var(--t1)', marginBottom: '0.5rem', fontSize: '1rem' }}>
      Something went wrong
    </h3>
    <p style={{ color: 'var(--t2)', fontSize: '0.8rem', marginBottom: '1rem' }}>
      {error.message}
    </p>
    <button
      onClick={onReset}
      style={{
        padding:      '6px 16px',
        background:   'var(--p600)',
        color:        '#fff',
        border:       'none',
        borderRadius: '8px',
        cursor:       'pointer',
        fontSize:     '0.8rem',
      }}
    >
      Try Again
    </button>
  </div>
);

// ── Error Boundary Class ──────────────────────────────────────────────────

interface BoundaryState {
  hasError: boolean;
  error:    Error | null;
}

interface BoundaryProps extends WithErrorBoundaryProps {
  children:  React.ReactNode;
  fallback?: React.ReactNode;
}

class ErrorBoundary extends Component<BoundaryProps, BoundaryState> {
  state: BoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): BoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    console.error('[ErrorBoundary]', error, info.componentStack);
    this.props.onError?.(error);
  }

  reset = () => this.setState({ hasError: false, error: null });

  render() {
    if (this.state.hasError && this.state.error) {
      return this.props.fallback ?? (
        <DefaultFallback error={this.state.error} onReset={this.reset} />
      );
    }
    return this.props.children;
  }
}

// ── HOC Factory ──────────────────────────────────────────────────────────

interface WithErrorBoundaryOptions {
  fallback?: React.ReactNode;
  onError?:  (error: Error) => void;
}

function withErrorBoundary<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options: WithErrorBoundaryOptions = {}
): React.FC<P> {
  const displayName =
    WrappedComponent.displayName ?? WrappedComponent.name ?? 'Component';

  const WithErrorBoundary: React.FC<P> = (props) => (
    <ErrorBoundary
      fallback={options.fallback}
      onError={options.onError}
    >
      <WrappedComponent {...props} />
    </ErrorBoundary>
  );

  WithErrorBoundary.displayName = `withErrorBoundary(${displayName})`;
  return WithErrorBoundary;
}

export default withErrorBoundary;
export { ErrorBoundary };
