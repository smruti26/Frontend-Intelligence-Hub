/**
 * TabPanel.test.tsx — Panel visibility and lazy loading tests
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';

import navigationReducer from '../features/navigation/navigationSlice';
import themeReducer      from '../features/theme/themeSlice';
import qaReducer         from '../features/qa/qaSlice';
import searchReducer     from '../features/search/searchSlice';
import TabPanel          from '../components/layout/TabPanel';

const makeStore = (activeTab = 'react') =>
  configureStore({
    reducer: { navigation: navigationReducer, theme: themeReducer, qa: qaReducer, search: searchReducer },
    preloadedState: { navigation: { activeTab: activeTab as any, scrollTarget: null, mobileMenuOpen: false } },
  });

const renderPanel = (tabKey: any, activeTab = tabKey) =>
  render(
    <Provider store={makeStore(activeTab)}>
      <TabPanel tabKey={tabKey} />
    </Provider>
  );

describe('TabPanel', () => {
  it('renders with panel id', () => {
    renderPanel('react');
    expect(document.getElementById('panel-react')).toBeInTheDocument();
  });

  it('active panel has class "active"', () => {
    renderPanel('react', 'react');
    expect(document.getElementById('panel-react')).toHaveClass('active');
  });

  it('inactive panel does NOT have class "active"', () => {
    renderPanel('graphql', 'react');
    expect(document.getElementById('panel-graphql')).not.toHaveClass('active');
  });

  it('inactive panel has no class "active"', () => {
    renderPanel('angular', 'react');
    const el = document.getElementById('panel-angular');
    expect(el?.className).not.toContain('active');
  });

  it('renders panel id for all 20 tabs', () => {
    const tabs = ['react','graphql','angular','vue','browser','engine','es6','react-adv',
                  'react19','build','nextjs','patterns','vitals','security','testing',
                  'prepqa','backend','cicd','hca','sdlc'];
    tabs.forEach(tab => {
      const { unmount } = renderPanel(tab as any, tab);
      expect(document.getElementById(`panel-${tab}`)).toBeInTheDocument();
      unmount();
    });
  });
});
