/**
 * themeSlice.test.ts — Redux theme state tests
 */
import themeReducer, { toggleTheme, setTheme } from '../features/theme/themeSlice';

describe('themeSlice', () => {
  const lightState = { mode: 'light' as const };
  const darkState  = { mode: 'dark'  as const };

  it('returns initial state (light)', () => {
    const state = themeReducer(lightState, { type: '' });
    expect(state.mode).toBe('light');
  });

  it('toggleTheme switches light → dark', () => {
    const state = themeReducer(lightState, toggleTheme());
    expect(state.mode).toBe('dark');
  });

  it('toggleTheme switches dark → light', () => {
    const state = themeReducer(darkState, toggleTheme());
    expect(state.mode).toBe('light');
  });

  it('setTheme sets to dark explicitly', () => {
    const state = themeReducer(lightState, setTheme('dark'));
    expect(state.mode).toBe('dark');
  });

  it('setTheme sets to light explicitly', () => {
    const state = themeReducer(darkState, setTheme('light'));
    expect(state.mode).toBe('light');
  });

  it('multiple toggles return to original', () => {
    let state = lightState;
    state = themeReducer(state, toggleTheme());
    state = themeReducer(state, toggleTheme());
    expect(state.mode).toBe('light');
  });
});
