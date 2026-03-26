/**
 * src/index.tsx
 * Application entry point — React 19 createRoot + Redux Provider.
 */
import React          from 'react';
import { createRoot } from 'react-dom/client';
import { Provider }   from 'react-redux';
import { store }      from '@app/store';
import App            from '@app/App';

// Original CSS extracted verbatim from source HTML (full visual parity)
import './assets/styles/original.css';

// Animation bridge — loads all 243 canvas functions into window scope
import './utils/animations/bridge.js';

const root = document.getElementById('root');
if (!root) throw new Error('[FE Hub] #root element not found in public/index.html');

createRoot(root).render(
  <Provider store={store}>
    <App />
  </Provider>
);
