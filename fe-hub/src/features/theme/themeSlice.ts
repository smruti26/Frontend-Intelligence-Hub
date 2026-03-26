/**
 * src/features/theme/themeSlice.ts
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ThemeMode, ThemeState } from '@appTypes';

const STORAGE_KEY = 'fe-hub-theme';

function getInitialTheme(): ThemeMode {
  try {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
      if (saved === 'dark' || saved === 'light') return saved;
    }
  } catch { /* ignore */ }
  try {
    return (typeof window !== 'undefined' &&
            window.matchMedia?.('(prefers-color-scheme: dark)').matches)
      ? 'dark' : 'light';
  } catch { return 'light'; }
}

export function applyThemeToDom(mode: ThemeMode): void {
  try {
    if (typeof document !== 'undefined')
      document.documentElement.setAttribute('data-theme', mode);
  } catch { /* ignore */ }
}

const initialMode = getInitialTheme();
applyThemeToDom(initialMode);

const themeSlice = createSlice({
  name: 'theme',
  initialState: { mode: initialMode } as ThemeState,
  reducers: {
    toggleTheme(state) {
      const next: ThemeMode = state.mode === 'light' ? 'dark' : 'light';
      state.mode = next;
      applyThemeToDom(next);
      try {
        if (typeof localStorage !== 'undefined')
          localStorage.setItem(STORAGE_KEY, next);
      } catch { /* ignore */ }
    },
    setTheme(state, action: PayloadAction<ThemeMode>) {
      state.mode = action.payload;
      applyThemeToDom(action.payload);
      try {
        if (typeof localStorage !== 'undefined')
          localStorage.setItem(STORAGE_KEY, action.payload);
      } catch { /* ignore */ }
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
