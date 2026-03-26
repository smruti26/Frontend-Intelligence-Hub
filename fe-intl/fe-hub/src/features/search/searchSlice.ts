/**
 * src/features/search/searchSlice.ts
 * Search slice with lazy index built from SIDEBAR_DATA.
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { SearchState, SearchResult, TabKey } from '@appTypes';
import { SIDEBAR_DATA, TAB_NAMES }    from '@constants/tabs';

// ── Lazy search index ─────────────────────────────────────────────────────

let INDEX: SearchResult[] | null = null;

function buildIndex(): SearchResult[] {
  if (INDEX) return INDEX;
  INDEX = [];
  // Module-level entries
  (Object.entries(TAB_NAMES) as [TabKey, string][]).forEach(([tabKey, tabLabel]) => {
    INDEX!.push({ type: 'module', tabKey, sectionId: null, title: tabLabel, module: tabLabel });
  });
  // Section-level entries
  (Object.entries(SIDEBAR_DATA) as [TabKey, typeof SIDEBAR_DATA[TabKey]][])
    .forEach(([tabKey, sections]) => {
      const mod = TAB_NAMES[tabKey] ?? tabKey;
      sections.forEach(({ label, id, qaFilter }) => {
        INDEX!.push({ type: 'section', tabKey, sectionId: id, title: label, module: mod, qaFilter });
      });
    });
  return INDEX;
}

function scoreResult(item: SearchResult, q: string): number {
  const t  = item.title.toLowerCase();
  const full = `${item.title} ${item.module}`.toLowerCase();
  const ql = q.toLowerCase();
  if (t === ql)         return 100;
  if (t.startsWith(ql)) return 80;
  if (t.includes(ql))   return 60;
  if (full.includes(ql)) return 40;
  return 0;
}

function runSearch(query: string): SearchResult[] {
  if (!query.trim()) return [];
  return buildIndex()
    .map(item  => ({ item, score: scoreResult(item, query) }))
    .filter(r  => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 12)
    .map(r => r.item);
}

// ── Slice ─────────────────────────────────────────────────────────────────

const initialState: SearchState = {
  query: '', results: [], isOpen: false, activeIdx: -1,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query     = action.payload;
      state.results   = runSearch(action.payload) as any;
      state.isOpen    = action.payload.length > 0 && state.results.length > 0;
      state.activeIdx = -1;
    },
    openDropdown(state)  { if (state.results.length > 0) state.isOpen = true; },
    closeDropdown(state) { state.isOpen = false; state.activeIdx = -1; },
    clearSearch(state)   {
      state.query = ''; state.results = []; state.isOpen = false; state.activeIdx = -1;
    },
    moveActiveIdx(state, action: PayloadAction<'up' | 'down'>) {
      const len = state.results.length;
      if (!len) return;
      if (action.payload === 'down')
        state.activeIdx = (state.activeIdx + 1) % len;
      else
        state.activeIdx = state.activeIdx <= 0 ? len - 1 : state.activeIdx - 1;
    },
  },
});

export const { setQuery, openDropdown, closeDropdown, clearSearch, moveActiveIdx } = searchSlice.actions;
export default searchSlice.reducer;
