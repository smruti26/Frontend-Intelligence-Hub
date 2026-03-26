/**
 * src/components/qa/QAFilterBar.tsx
 * ─────────────────────────────────────────────────────────────────
 * The row of category filter buttons in the Prep Q&A section.
 * Reads activeFilter from Redux and dispatches setFilter on click.
 */

import React, { memo }               from 'react';
import { useAppSelector, useAppDispatch } from '@app/hooks';
import { setFilter }                  from '@features/qa/qaSlice';
import { QA_CATEGORIES }              from '@constants/qaData';
import type { QACategory }            from '@appTypes';

const QAFilterBar: React.FC = () => {
  const dispatch     = useAppDispatch();
  const activeFilter = useAppSelector(s => s.qa.activeFilter);

  return (
    <div className="qa-filter" id="qa-filter-bar" role="toolbar" aria-label="Filter Q&A by category">
      {/* All button */}
      <button
        className={activeFilter === 'all' ? 'active' : ''}
        onClick={() => dispatch(setFilter('all'))}
        aria-pressed={activeFilter === 'all'}
      >
        All 220
      </button>

      {/* Category buttons */}
      {QA_CATEGORIES.map(({ key, label, emoji }) => (
        <button
          key={key}
          className={activeFilter === key ? 'active' : ''}
          onClick={() => dispatch(setFilter(key as QACategory))}
          aria-pressed={activeFilter === key}
        >
          {emoji} {label}
        </button>
      ))}
    </div>
  );
};

export default memo(QAFilterBar);
