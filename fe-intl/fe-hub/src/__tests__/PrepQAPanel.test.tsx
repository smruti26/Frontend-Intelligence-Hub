/**
 * PrepQAPanel.test.tsx — Q&A panel tests
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';

import PrepQAPanel      from '../panels/PrepQAPanel';
import navigationReducer from '../features/navigation/navigationSlice';
import themeReducer      from '../features/theme/themeSlice';
import qaReducer         from '../features/qa/qaSlice';
import searchReducer     from '../features/search/searchSlice';

// Mock window functions used by PrepQAPanel
const mockRenderQA = jest.fn();
beforeAll(() => {
  (window as any).renderQA = mockRenderQA;
});

const makeStore = () =>
  configureStore({ reducer: { navigation: navigationReducer, theme: themeReducer, qa: qaReducer, search: searchReducer } });

const renderPanel = () =>
  render(<Provider store={makeStore()}><PrepQAPanel /></Provider>);

describe('PrepQAPanel', () => {
  beforeEach(() => mockRenderQA.mockClear());

  it('renders the hero section', () => {
    renderPanel();
    expect(screen.getByText(/UI\/Frontend Architect/i)).toBeInTheDocument();
  });

  it('renders the Interview Prep tag', () => {
    renderPanel();
    expect(screen.getByText(/Interview Prep/i)).toBeInTheDocument();
  });

  it('renders All 220 filter button', () => {
    renderPanel();
    expect(screen.getByText(/All 220/i)).toBeInTheDocument();
  });

  it('renders Architecture filter button', () => {
    renderPanel();
    expect(screen.getByText(/Architecture/i)).toBeInTheDocument();
  });

  it('renders all 15 filter buttons', () => {
    renderPanel();
    const filterBar = document.getElementById('qa-filter-bar');
    const buttons = filterBar?.querySelectorAll('button');
    expect(buttons?.length).toBe(15);
  });

  it('renders the qa-grid container', () => {
    renderPanel();
    expect(document.getElementById('qa-grid')).toBeInTheDocument();
  });

  it('calls renderQA("all") on mount', () => {
    renderPanel();
    expect(mockRenderQA).toHaveBeenCalledWith('all');
  });

  it('calls renderQA when a filter button is clicked', () => {
    renderPanel();
    const btn = screen.getByText(/🏗 Architecture/);
    fireEvent.click(btn);
    expect(mockRenderQA).toHaveBeenCalledWith('arch');
  });

  it('"All 220" button has active class by default', () => {
    renderPanel();
    const allBtn = screen.getByText(/All 220/);
    expect(allBtn).toHaveClass('active');
  });

  it('clicking a filter removes active from other buttons', () => {
    renderPanel();
    const archBtn = screen.getByText(/🏗 Architecture/);
    fireEvent.click(archBtn);
    expect(archBtn).toHaveClass('active');
  });

  it('renders Vue.js filter button', () => {
    renderPanel();
    expect(screen.getByText(/Vue\.js/)).toBeInTheDocument();
  });

  it('renders Webpack & Vite filter button', () => {
    renderPanel();
    expect(screen.getByText(/Webpack/)).toBeInTheDocument();
  });
});
