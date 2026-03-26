/**
 * HOC.test.tsx — Higher-Order Component tests
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';

import withTheme         from '../hocs/withTheme';
import withErrorBoundary from '../hocs/withErrorBoundary';
import withAnalytics     from '../hocs/withAnalytics';
import navigationReducer  from '../features/navigation/navigationSlice';
import themeReducer       from '../features/theme/themeSlice';
import qaReducer          from '../features/qa/qaSlice';
import searchReducer      from '../features/search/searchSlice';
import type { WithThemeProps, WithAnalyticsProps } from '../types';

const makeStore = (theme = 'light') =>
  configureStore({
    reducer: { navigation: navigationReducer, theme: themeReducer, qa: qaReducer, search: searchReducer },
    preloadedState: { theme: { mode: theme as any } },
  });

// ── withTheme ──────────────────────────────────────────────────────────────

const ThemeDisplay: React.FC<WithThemeProps> = ({ theme }) => (
  <div data-testid="theme-display">Current theme: {theme}</div>
);
const ThemedDisplay = withTheme(ThemeDisplay);

describe('withTheme HOC', () => {
  it('injects light theme prop', () => {
    render(<Provider store={makeStore('light')}><ThemedDisplay /></Provider>);
    expect(screen.getByTestId('theme-display')).toHaveTextContent('Current theme: light');
  });

  it('injects dark theme prop', () => {
    render(<Provider store={makeStore('dark')}><ThemedDisplay /></Provider>);
    expect(screen.getByTestId('theme-display')).toHaveTextContent('Current theme: dark');
  });

  it('sets correct displayName', () => {
    expect(ThemedDisplay.displayName).toBe('withTheme(ThemeDisplay)');
  });
});

// ── withErrorBoundary ──────────────────────────────────────────────────────

const BrokenComponent: React.FC = () => {
  throw new Error('Test crash');
};
const SafeComponent = withErrorBoundary(BrokenComponent);

describe('withErrorBoundary HOC', () => {
  // Suppress error boundary console output
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  afterEach(() => {
    (console.error as jest.Mock).mockRestore();
  });

  it('shows fallback UI when child throws', () => {
    render(<Provider store={makeStore()}><SafeComponent /></Provider>);
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  });

  it('shows Try Again button in fallback', () => {
    render(<Provider store={makeStore()}><SafeComponent /></Provider>);
    expect(screen.getByText(/Try Again/i)).toBeInTheDocument();
  });

  it('renders children when no error', () => {
    const GoodComponent = withErrorBoundary(
      () => <div data-testid="ok">Working</div>
    );
    render(<Provider store={makeStore()}><GoodComponent /></Provider>);
    expect(screen.getByTestId('ok')).toBeInTheDocument();
  });

  it('accepts custom fallback', () => {
    const WithCustomFallback = withErrorBoundary(BrokenComponent, {
      fallback: <div>Custom error UI</div>,
    });
    render(<Provider store={makeStore()}><WithCustomFallback /></Provider>);
    expect(screen.getByText('Custom error UI')).toBeInTheDocument();
  });
});

// ── withAnalytics ──────────────────────────────────────────────────────────

const TrackButton: React.FC<WithAnalyticsProps> = ({ trackEvent }) => (
  <button onClick={() => trackEvent('btn_click', { id: 1 })}>
    Track me
  </button>
);
const TrackedButton = withAnalytics(TrackButton);

describe('withAnalytics HOC', () => {
  it('injects trackEvent function', () => {
    render(<Provider store={makeStore()}><TrackedButton /></Provider>);
    expect(screen.getByText('Track me')).toBeInTheDocument();
  });

  it('trackEvent does not throw', () => {
    render(<Provider store={makeStore()}><TrackedButton /></Provider>);
    expect(() => fireEvent.click(screen.getByText('Track me'))).not.toThrow();
  });

  it('sets correct displayName', () => {
    expect(TrackedButton.displayName).toBe('withAnalytics(TrackButton)');
  });
});
