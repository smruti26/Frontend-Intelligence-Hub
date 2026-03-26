/**
 * searchSlice.test.ts — Redux search state tests
 */
import searchReducer, {
  setQuery, openDropdown, closeDropdown, clearSearch, moveActiveIdx,
} from '../features/search/searchSlice';

const initial = { query: '', results: [], isOpen: false, activeIdx: -1 };

describe('searchSlice', () => {
  it('returns initial state', () => {
    expect(searchReducer(undefined, { type: '' })).toEqual(initial);
  });

  it('setQuery updates query and runs search', () => {
    const state = searchReducer(initial, setQuery('react'));
    expect(state.query).toBe('react');
    // Should find results (React, React+, React 19 etc.)
    expect(state.results.length).toBeGreaterThan(0);
  });

  it('setQuery opens dropdown when results exist', () => {
    const state = searchReducer(initial, setQuery('react'));
    expect(state.isOpen).toBe(true);
  });

  it('setQuery with empty string produces no results', () => {
    const state = searchReducer(initial, setQuery(''));
    expect(state.results).toHaveLength(0);
    expect(state.isOpen).toBe(false);
  });

  it('clearSearch resets everything', () => {
    const searched = searchReducer(initial, setQuery('graphql'));
    const cleared  = searchReducer(searched, clearSearch());
    expect(cleared).toEqual(initial);
  });

  it('closeDropdown hides dropdown', () => {
    const open  = { ...initial, isOpen: true, results: [{ type: 'module', tabKey: 'react', sectionId: null, title: 'React', module: 'React' }] as any };
    const state = searchReducer(open, closeDropdown());
    expect(state.isOpen).toBe(false);
    expect(state.activeIdx).toBe(-1);
  });

  it('moveActiveIdx down increments index', () => {
    const withResults = searchReducer(initial, setQuery('react'));
    const moved = searchReducer(withResults, moveActiveIdx('down'));
    expect(moved.activeIdx).toBe(0);
  });

  it('moveActiveIdx up wraps to end', () => {
    const withResults = searchReducer(initial, setQuery('react'));
    const moved = searchReducer(withResults, moveActiveIdx('up'));
    expect(moved.activeIdx).toBe(withResults.results.length - 1);
  });

  it('search finds "GraphQL" section', () => {
    const state = searchReducer(initial, setQuery('GraphQL'));
    const titles = state.results.map(r => r.title);
    expect(titles.some(t => t.toLowerCase().includes('graphql'))).toBe(true);
  });

  it('search for "prepqa" finds Prep Q&A module', () => {
    const state = searchReducer(initial, setQuery('prep'));
    const titles = state.results.map(r => r.title);
    expect(titles.some(t => t.includes('Prep'))).toBe(true);
  });
});
