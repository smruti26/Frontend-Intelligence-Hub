/**
 * src/components/search/SearchBar.tsx
 * ─────────────────────────────────────────────────────────────────
 * Global search bar with keyboard navigation and live dropdown.
 *
 * - '/' shortcut focuses the input from anywhere in the app
 * - ArrowUp/ArrowDown navigate results
 * - Enter selects the highlighted result
 * - Escape closes the dropdown
 *
 * Reads:   search.{query, results, isOpen, activeIdx}
 * Dispatches: setQuery, closeDropdown, moveActiveIdx, clearSearch
 * Dispatches: navigateToSection or setActiveTab on result select
 */

import React, { useRef, useCallback, memo } from 'react';
import { useAppSelector, useAppDispatch }   from '@app/hooks';
import {
  setQuery, closeDropdown, moveActiveIdx, clearSearch,
} from '@features/search/searchSlice';
import {
  navigateToSection, setActiveTab,
} from '@features/navigation/navigationSlice';
import { setFilter }     from '@features/qa/qaSlice';
import { useKeyboardShortcut } from '@hooks/useKeyboardShortcut';
import type { SearchResult } from '@appTypes';

// ── Single search result row ──────────────────────────────────────────────

const ResultRow: React.FC<{
  result:    SearchResult;
  isActive:  boolean;
  onSelect:  () => void;
}> = memo(({ result, isActive, onSelect }) => (
  <div
    className={`search-result-row${isActive ? ' active' : ''}`}
    role="option"
    aria-selected={isActive}
    onMouseDown={onSelect}   // mousedown not click — fires before blur
  >
    <div className="srr-left">
      <span className="srr-title">{result.title}</span>
      <span className="srr-module">{result.module}</span>
    </div>
    <span className={`srr-badge srr-${result.type}`}>
      {result.type.toUpperCase()}
    </span>
  </div>
));
ResultRow.displayName = 'ResultRow';

// ── SearchBar ─────────────────────────────────────────────────────────────

const SearchBar: React.FC = () => {
  const dispatch  = useAppDispatch();
  const inputRef  = useRef<HTMLInputElement>(null);

  const query     = useAppSelector(s => s.search.query);
  const results   = useAppSelector(s => s.search.results);
  const isOpen    = useAppSelector(s => s.search.isOpen);
  const activeIdx = useAppSelector(s => s.search.activeIdx);

  // '/' global shortcut to focus search
  useKeyboardShortcut('/', () => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, { preventDefault: true });

  // Escape to close
  useKeyboardShortcut('Escape', () => {
    dispatch(closeDropdown());
    inputRef.current?.blur();
  }, { ignoreInInputs: false });

  const selectResult = useCallback(
    (result: SearchResult) => {
      dispatch(clearSearch());
      inputRef.current?.blur();

      if (result.qaFilter) {
        dispatch(setActiveTab('prepqa'));
        setTimeout(() => dispatch(setFilter(result.qaFilter as never)), 50);
        return;
      }

      if (result.sectionId) {
        dispatch(navigateToSection({ tab: result.tabKey, sectionId: result.sectionId }));
      } else {
        dispatch(setActiveTab(result.tabKey));
      }
    },
    [dispatch]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      dispatch(moveActiveIdx('down'));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      dispatch(moveActiveIdx('up'));
    } else if (e.key === 'Enter' && activeIdx >= 0 && results[activeIdx]) {
      e.preventDefault();
      selectResult(results[activeIdx]);
    }
  };

  return (
    <div className="search-wrap" role="search">
      {/* Input */}
      <div className="search-input-wrap">
        <svg className="search-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.6" />
          <path d="M13 13l3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>

        <input
          ref={inputRef}
          id="global-search"
          type="search"
          className="search-input"
          placeholder="Search topics..."
          autoComplete="off"
          aria-label="Search topics"
          aria-autocomplete="list"
          aria-controls="search-dropdown"
          aria-expanded={isOpen}
          value={query}
          onChange={e => dispatch(setQuery(e.target.value))}
          onKeyDown={handleKeyDown}
          onBlur={() => setTimeout(() => dispatch(closeDropdown()), 150)}
        />

        <kbd className="search-kbd" aria-hidden="true">/</kbd>

        {query && (
          <button
            className="search-clear"
            onClick={() => dispatch(clearSearch())}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && results.length > 0 && (
        <div
          id="search-dropdown"
          className="search-dropdown open"
          role="listbox"
          aria-label="Search results"
        >
          {/* Group by type */}
          {['module', 'section'].map((type) => {
            const group = results.filter(r => r.type === type);
            if (group.length === 0) return null;
            return (
              <div key={type} className="search-group">
                <div className="search-group-label">
                  {type === 'module' ? 'MODULES' : results[0]?.module?.toUpperCase()}
                </div>
                {group.map((r, i) => {
                  const globalIdx = results.indexOf(r);
                  return (
                    <ResultRow
                      key={`${r.tabKey}-${r.sectionId ?? 'mod'}`}
                      result={r}
                      isActive={globalIdx === activeIdx}
                      onSelect={() => selectResult(r)}
                    />
                  );
                })}
              </div>
            );
          })}

          {/* Keyboard hints */}
          <div className="search-hints" aria-hidden="true">
            <span><kbd>↑↓</kbd> navigate</span>
            <span><kbd>↵</kbd> open</span>
            <span><kbd>Esc</kbd> close</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(SearchBar);
