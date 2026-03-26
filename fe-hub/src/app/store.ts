/**
 * src/app/store.ts
 * ─────────────────────────────────────────────────────────────────
 * Redux store — single source of truth for all application state.
 *
 * Slice responsibilities:
 *  navigation  — active tab, scroll target, mobile menu open/closed
 *  theme       — light | dark mode (persisted to localStorage)
 *  qa          — Q&A active filter, open card ID (accordion)
 *  search      — query string, results array, dropdown state
 *  canvas      — tracks which panel animations have been initialized
 *
 * The bridge.js animation engine is NOT in Redux — it manages its own
 * internal canvas state imperatively. Redux only tracks WHETHER init
 * has been called, not the animation internals.
 */
import { configureStore }  from '@reduxjs/toolkit';
import navigationReducer   from '@features/navigation/navigationSlice';
import themeReducer        from '@features/theme/themeSlice';
import qaReducer           from '@features/qa/qaSlice';
import searchReducer       from '@features/search/searchSlice';
import canvasReducer       from '@features/canvas/canvasSlice';

export const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    theme:      themeReducer,
    qa:         qaReducer,
    search:     searchReducer,
    canvas:     canvasReducer,
  },
  middleware: (getDefault) =>
    getDefault({ serializableCheck: false }),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState   = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
