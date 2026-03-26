/**
 * src/panels/PrepQAPanel.tsx
 * ─────────────────────────────────────────────────────────────────
 * Interview Q&A panel — fully Redux-driven.
 *
 * Redux connections:
 *  qa.activeFilter → which category is selected (persisted across tab switches)
 *  qa.openCardId   → accordion open/close state
 *
 * The actual Q&A cards are rendered by bridge.js renderQA() because
 * it handles the 220 entries with its own virtual DOM logic.
 * Redux tracks the FILTER STATE; bridge handles the DOM output.
 *
 * This is the correct separation: Redux = state, bridge = DOM side-effect.
 */
import React, { useEffect, useCallback, memo } from 'react';
import { useAppSelector, useAppDispatch } from '@app/hooks';
import { setFilter }                      from '@features/qa/qaSlice';
import type { QACategory }                from '@appTypes';

// ── Filter definitions ────────────────────────────────────────────────────

type FilterKey = 'all' | QACategory;

const FILTERS: { key: FilterKey; label: string; emoji: string }[] = [
  { key: 'all',          label: 'All 220',           emoji: ''   },
  { key: 'arch',         label: 'Architecture',       emoji: '🏗' },
  { key: 'perf',         label: 'Performance',        emoji: '⚡' },
  { key: 'design',       label: 'Design Systems',     emoji: '🎨' },
  { key: 'infra',        label: 'Tooling & Infra',    emoji: '🔧' },
  { key: 'collab',       label: 'Leadership',         emoji: '🤝' },
  { key: 'security',     label: 'Security',           emoji: '🔒' },
  { key: 'react-redux',  label: 'React & Redux',      emoji: '⚛' },
  { key: 'javascript',   label: 'JavaScript (ES6+)',  emoji: '🟨' },
  { key: 'sysdesign',    label: 'System Design',      emoji: '🏛' },
  { key: 'nextjs-qa',    label: 'Next.js',            emoji: '▲' },
  { key: 'angular-qa',   label: 'Angular',            emoji: '🅰' },
  { key: 'vue-qa',       label: 'Vue.js',             emoji: '💚' },
  { key: 'graphql-qa',   label: 'GraphQL',            emoji: '⬡' },
  { key: 'webpack-vite', label: 'Webpack & Vite',     emoji: '⚡' },
];

// ── Component ─────────────────────────────────────────────────────────────

const PrepQAPanel: React.FC = memo(() => {
  const dispatch     = useAppDispatch();
  // Read active filter from Redux — persists when switching tabs and back
  const activeFilter = useAppSelector(s => s.qa.activeFilter);

  // When filter changes in Redux, tell bridge to re-render the Q&A list
  useEffect(() => {
    const w = window as any;
    const timer = setTimeout(() => {
      if (typeof w.renderQA === 'function') {
        w.renderQA(activeFilter);
      }
    }, 80);
    return () => clearTimeout(timer);
  }, [activeFilter]);

  // Dispatch filter change to Redux — bridge re-renders via the effect above
  const handleFilter = useCallback((key: FilterKey) => {
    dispatch(setFilter(key === 'all' ? 'all' : key as QACategory));
  }, [dispatch]);

  return (
    <>
      {/* Hero */}
      <div className="hero" style={{ background: 'linear-gradient(135deg,#b45309,#d97706)' }}>
        <div className="hero-tag">🎯 Interview Prep</div>
        <h1>UI/Frontend Architect — Top 220 Q&amp;A</h1>
        <p>
          Senior &amp; Principal-level interview questions for 10+ years experience.
          Click any question to reveal a detailed answer.
        </p>
      </div>

      {/* Filter bar — driven by Redux state */}
      <div className="qa-filter" id="qa-filter-bar">
        {FILTERS.map(({ key, label, emoji }) => (
          <button
            key={key}
            className={activeFilter === key || (key === 'all' && activeFilter === 'all') ? 'active' : ''}
            onClick={() => handleFilter(key)}
            aria-pressed={activeFilter === key}
          >
            {emoji ? `${emoji} ${label}` : label}
          </button>
        ))}
      </div>

      {/* Q&A grid — populated by bridge.js renderQA() */}
      <div id="qa-grid" />
    </>
  );
});

PrepQAPanel.displayName = 'PrepQAPanel';
export default PrepQAPanel;
