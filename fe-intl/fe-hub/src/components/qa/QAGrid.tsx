/**
 * src/components/qa/QAGrid.tsx
 * ─────────────────────────────────────────────────────────────────
 * Renders the filtered list of Q&A cards in a responsive grid.
 * Reads filtered entries from the memoised Redux selector.
 * Dispatches toggleCard on accordion open/close.
 */

import React, { memo }               from 'react';
import { useAppSelector, useAppDispatch } from '@app/hooks';
import { toggleCard, selectFilteredQA, selectOpenCardId } from '@features/qa/qaSlice';
import QACard                         from './QACard';

const QAGrid: React.FC = () => {
  const dispatch  = useAppDispatch();
  const entries   = useAppSelector(selectFilteredQA);
  const openId    = useAppSelector(selectOpenCardId);

  if (entries.length === 0) {
    return (
      <div className="qa-empty" role="status">
        No questions found in this category.
      </div>
    );
  }

  return (
    <div
      className="qa-grid"
      id="qa-grid"
      role="list"
      aria-label={`${entries.length} Q&A entries`}
    >
      {entries.map((entry) => (
        <QACard
          key={entry.id}
          entry={entry}
          isOpen={openId === entry.id}
          onToggle={(id) => dispatch(toggleCard(id))}
        />
      ))}
    </div>
  );
};

export default memo(QAGrid);
