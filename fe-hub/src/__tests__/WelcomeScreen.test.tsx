/**
 * WelcomeScreen.test.tsx — Welcome screen rendering and interaction tests
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';

import WelcomeScreen    from '../components/welcome/WelcomeScreen';
import navigationReducer from '../features/navigation/navigationSlice';
import themeReducer      from '../features/theme/themeSlice';
import qaReducer         from '../features/qa/qaSlice';
import searchReducer     from '../features/search/searchSlice';

const makeStore = () =>
  configureStore({ reducer: { navigation: navigationReducer, theme: themeReducer, qa: qaReducer, search: searchReducer } });

describe('WelcomeScreen', () => {
  const onDismiss = jest.fn();

  const renderWelcome = () =>
    render(
      <Provider store={makeStore()}>
        <WelcomeScreen onDismiss={onDismiss} />
      </Provider>
    );

  beforeEach(() => onDismiss.mockClear());

  it('renders welcome heading', () => {
    renderWelcome();
    expect(screen.getByText(/Welcome to/i)).toBeInTheDocument();
  });

  it('renders the FE logo', () => {
    renderWelcome();
    expect(screen.getByText('FE')).toBeInTheDocument();
  });

  it('renders the platform tagline', () => {
    renderWelcome();
    expect(screen.getByText(/Visual Learning Platform/i)).toBeInTheDocument();
  });

  it('renders navigation pills', () => {
    renderWelcome();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('GraphQL')).toBeInTheDocument();
    expect(screen.getByText('Vue.js')).toBeInTheDocument();
  });

  it('clicking a pill calls onDismiss', () => {
    renderWelcome();
    fireEvent.click(screen.getByText('React'));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('clicking any pill calls onDismiss', () => {
    renderWelcome();
    fireEvent.click(screen.getByText('GraphQL'));
    expect(onDismiss).toHaveBeenCalled();
  });

  it('renders the canvas element', () => {
    renderWelcome();
    expect(document.getElementById('welcome-canvas')).toBeInTheDocument();
  });

  it('renders progress bar', () => {
    renderWelcome();
    expect(document.getElementById('welcome-progress-bar')).toBeInTheDocument();
  });

  it('has role="dialog" for accessibility', () => {
    renderWelcome();
    expect(document.getElementById('welcome-screen')).toHaveAttribute('role','dialog');
  });
});
