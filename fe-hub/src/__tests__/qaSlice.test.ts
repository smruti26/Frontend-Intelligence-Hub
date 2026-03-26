/**
 * qaSlice.test.ts — Redux Q&A state tests
 */
import qaReducer, { setFilter, toggleCard, closeAllCards } from '../features/qa/qaSlice';

const initial = { activeFilter: 'all' as const, openCardId: null };

describe('qaSlice', () => {
  it('returns initial state', () => {
    expect(qaReducer(undefined, { type: '' })).toEqual(initial);
  });

  it('setFilter updates activeFilter', () => {
    const state = qaReducer(initial, setFilter('arch'));
    expect(state.activeFilter).toBe('arch');
  });

  it('setFilter to "all" resets filter', () => {
    const withFilter = { ...initial, activeFilter: 'perf' as const };
    const state = qaReducer(withFilter, setFilter('all'));
    expect(state.activeFilter).toBe('all');
  });

  it('setFilter clears openCardId', () => {
    const withOpen = { activeFilter: 'arch' as const, openCardId: 5 };
    const state = qaReducer(withOpen, setFilter('perf'));
    expect(state.openCardId).toBeNull();
  });

  it('toggleCard opens a card', () => {
    const state = qaReducer(initial, toggleCard(42));
    expect(state.openCardId).toBe(42);
  });

  it('toggleCard closes an already-open card', () => {
    const withOpen = { ...initial, openCardId: 42 };
    const state = qaReducer(withOpen, toggleCard(42));
    expect(state.openCardId).toBeNull();
  });

  it('toggleCard switches to a different card', () => {
    const withOpen = { ...initial, openCardId: 10 };
    const state = qaReducer(withOpen, toggleCard(20));
    expect(state.openCardId).toBe(20);
  });

  it('closeAllCards sets openCardId to null', () => {
    const withOpen = { ...initial, openCardId: 7 };
    const state = qaReducer(withOpen, closeAllCards());
    expect(state.openCardId).toBeNull();
  });

  it('supports all QA category filters', () => {
    const cats = ['arch','perf','design','infra','collab','security',
                  'react-redux','javascript','sysdesign','nextjs-qa',
                  'angular-qa','vue-qa','graphql-qa','webpack-vite'] as const;
    cats.forEach(cat => {
      const state = qaReducer(initial, setFilter(cat));
      expect(state.activeFilter).toBe(cat);
    });
  });
});
