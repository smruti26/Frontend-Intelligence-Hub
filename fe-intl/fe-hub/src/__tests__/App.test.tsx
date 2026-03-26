/**
 * App.test.tsx — Root application integration tests
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';

import App               from '../app/App';
import navigationReducer  from '../features/navigation/navigationSlice';
import themeReducer       from '../features/theme/themeSlice';
import qaReducer          from '../features/qa/qaSlice';
import searchReducer      from '../features/search/searchSlice';

// Mock bridge.js — no actual animations in tests
jest.mock('../utils/animations/bridge.js', () => ({}));
jest.mock('../assets/styles/original.css', () => ({}));

const makeStore = () =>
  configureStore({ reducer: { navigation: navigationReducer, theme: themeReducer, qa: qaReducer, search: searchReducer } });

describe('App', () => {
  it('renders without crashing', () => {
    // Mock localStorage so welcome screen is skipped
    localStorage.setItem('fe-hub-welcomed', 'true');
    const { container } = render(<Provider store={makeStore()}><App /></Provider>);
    expect(container).toBeTruthy();
  });

  it('renders the main layout', () => {
    localStorage.setItem('fe-hub-welcomed', 'true');
    render(<Provider store={makeStore()}><App /></Provider>);
    expect(document.getElementById('app')).toBeInTheDocument();
  });

  it('renders the sidebar', () => {
    localStorage.setItem('fe-hub-welcomed', 'true');
    render(<Provider store={makeStore()}><App /></Provider>);
    expect(document.getElementById('sidebar')).toBeInTheDocument();
  });

  it('renders reading progress bar', () => {
    localStorage.setItem('fe-hub-welcomed', 'true');
    render(<Provider store={makeStore()}><App /></Provider>);
    expect(document.getElementById('reading-progress')).toBeInTheDocument();
  });

  it('renders scroll-to-top button', () => {
    localStorage.setItem('fe-hub-welcomed', 'true');
    render(<Provider store={makeStore()}><App /></Provider>);
    expect(document.getElementById('scroll-top-btn')).toBeInTheDocument();
  });

  it('renders all 20 tab panels', () => {
    localStorage.setItem('fe-hub-welcomed', 'true');
    render(<Provider store={makeStore()}><App /></Provider>);
    const panels = ['react','graphql','angular','vue','browser','engine','es6','react-adv',
                    'react19','build','nextjs','patterns','vitals','security','testing',
                    'prepqa','backend','cicd','hca','sdlc'];
    panels.forEach(p => {
      expect(document.getElementById(`panel-${p}`)).toBeInTheDocument();
    });
  });

  it('shows welcome screen on first visit', () => {
    localStorage.removeItem('fe-hub-welcomed');
    render(<Provider store={makeStore()}><App /></Provider>);
    expect(document.getElementById('welcome-screen')).toBeInTheDocument();
  });

  it('hides welcome screen after seen', () => {
    localStorage.setItem('fe-hub-welcomed', 'true');
    render(<Provider store={makeStore()}><App /></Provider>);
    expect(document.getElementById('welcome-screen')).toBeNull();
  });
});
