/**
 * src/__tests__/Header.test.tsx
 * Tests for the Header component — tab navigation, theme toggle, search.
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';

import Header from '../components/layout/Header';
import navigationReducer from '../features/navigation/navigationSlice';
import themeReducer      from '../features/theme/themeSlice';
import qaReducer         from '../features/qa/qaSlice';
import searchReducer     from '../features/search/searchSlice';

// Helper: create a fresh store for each test
const makeStore = (preloadedState?: object) =>
  configureStore({
    reducer: {
      navigation: navigationReducer,
      theme:      themeReducer,
      qa:         qaReducer,
      search:     searchReducer,
    },
    preloadedState,
  });

const renderWithStore = (ui: React.ReactElement, store = makeStore()) =>
  render(<Provider store={store}>{ui}</Provider>);

// ── Tests ─────────────────────────────────────────────────────────────────

describe('Header', () => {
  it('renders the brand name', () => {
    renderWithStore(<Header />);
    expect(screen.getByText('Frontend Architecture Hub')).toBeInTheDocument();
    expect(screen.getByText('Visual Learning Platform')).toBeInTheDocument();
  });

  it('renders all 20 navigation tabs', () => {
    renderWithStore(<Header />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('GraphQL')).toBeInTheDocument();
    expect(screen.getByText('Angular')).toBeInTheDocument();
    expect(screen.getByText('Vue.js')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
    expect(screen.getByText('Prep Q&A')).toBeInTheDocument();
    expect(screen.getByText('SDLC')).toBeInTheDocument();
  });

  it('marks the active tab with className "active"', () => {
    const store = makeStore({ navigation: { activeTab: 'react', scrollTarget: null, mobileMenuOpen: false } });
    renderWithStore(<Header />, store);
    const reactBtn = document.getElementById('main-react');
    expect(reactBtn).toHaveClass('active');
  });

  it('dispatches setActiveTab when a tab is clicked', () => {
    const store = makeStore();
    renderWithStore(<Header />, store);
    fireEvent.click(screen.getByText('GraphQL'));
    expect(store.getState().navigation.activeTab).toBe('graphql');
  });

  it('switches active tab to "angular" when Angular is clicked', () => {
    const store = makeStore();
    renderWithStore(<Header />, store);
    fireEvent.click(screen.getByText('Angular'));
    expect(store.getState().navigation.activeTab).toBe('angular');
  });

  it('renders the search input', () => {
    renderWithStore(<Header />);
    expect(screen.getByPlaceholderText('Search topics…')).toBeInTheDocument();
  });

  it('renders the theme toggle button', () => {
    renderWithStore(<Header />);
    expect(screen.getByTitle('Toggle theme')).toBeInTheDocument();
  });

  it('dispatches toggleTheme when theme button is clicked', () => {
    const store = makeStore();
    renderWithStore(<Header />, store);
    const before = store.getState().theme.mode;
    fireEvent.click(screen.getByTitle('Toggle theme'));
    const after = store.getState().theme.mode;
    expect(after).not.toBe(before);
  });

  it('shows "Light" label in light mode', () => {
    const store = makeStore({ theme: { mode: 'light' } });
    renderWithStore(<Header />, store);
    expect(screen.getByText('Light')).toBeInTheDocument();
  });

  it('shows "Dark" label in dark mode', () => {
    const store = makeStore({ theme: { mode: 'dark' } });
    renderWithStore(<Header />, store);
    expect(screen.getByText('Dark')).toBeInTheDocument();
  });
});
