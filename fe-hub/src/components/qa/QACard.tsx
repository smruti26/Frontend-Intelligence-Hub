/**
 * src/components/qa/QACard.tsx
 * ─────────────────────────────────────────────────────────────────
 * Single Q&A accordion card.
 *
 * - Clicking the question header toggles the answer open/closed
 * - Only one card is open at a time (accordion, managed in Redux)
 * - Enhanced with withAnalytics HOC to track which cards are opened
 *
 * Props:
 *   entry    — the Q&A data (id, cat, q, a, tags)
 *   isOpen   — controlled open state from Redux
 *   onToggle — dispatches toggleCard action
 */

import React, { memo }     from 'react';
import withAnalytics        from '@hocs/withAnalytics';
import { QA_CAT_META }      from '@constants/qaData';
import type { QAEntry, WithAnalyticsProps } from '@appTypes';

// ── Tag Badge ─────────────────────────────────────────────────────────────

const TagBadge: React.FC<{ t: string; c: string; b: string }> = ({ t, c, b }) => (
  <span
    className="qa-tag"
    style={{
      background:  c,
      color:       b,
      border:      `1px solid ${b}40`,
    }}
  >
    {t}
  </span>
);

// ── QACard (inner, before HOC) ────────────────────────────────────────────

interface QACardProps extends WithAnalyticsProps {
  entry:    QAEntry;
  isOpen:   boolean;
  onToggle: (id: number) => void;
}

const QACardInner: React.FC<QACardProps> = ({
  entry,
  isOpen,
  onToggle,
  trackEvent,
}) => {
  const meta = QA_CAT_META[entry.cat] ?? {
    label: entry.cat,
    color: '#6b7280',
    bg:    '#f9fafb',
  };

  const handleToggle = () => {
    onToggle(entry.id);
    if (!isOpen) {
      trackEvent('qa_card_opened', { id: entry.id, category: entry.cat });
    }
  };

  return (
    <article
      id={`qa-card-${entry.id}`}
      className={`qa-card${isOpen ? ' open' : ''}`}
    >
      {/* Question header (clickable) */}
      <div
        className="qa-q"
        onClick={handleToggle}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        aria-controls={`qa-answer-${entry.id}`}
        onKeyDown={e => e.key === 'Enter' && handleToggle()}
      >
        {/* ID badge */}
        <div
          className="qa-num"
          style={{ background: meta.color }}
          aria-hidden="true"
        >
          {entry.id}
        </div>

        {/* Question text */}
        <div className="qa-qtxt">{entry.q}</div>

        {/* Chevron */}
        <svg
          className="qa-chevron"
          width="16" height="16"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* Answer panel */}
      <div
        id={`qa-answer-${entry.id}`}
        className="qa-a"
        role="region"
        aria-labelledby={`qa-card-${entry.id}`}
      >
        <div className="qa-a-inner">
          {/* Category label */}
          <span
            className="qa-tag"
            style={{
              background:   meta.bg,
              color:        meta.color,
              border:       `1px solid ${meta.color}30`,
              marginBottom: '0.75rem',
              display:      'inline-block',
            }}
          >
            {meta.label}
          </span>

          <p>{entry.a}</p>

          {/* Tags */}
          {entry.tags.length > 0 && (
            <div className="qa-box">
              {entry.tags.map((tag, i) => (
                <TagBadge key={i} {...tag} />
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

// ── Apply withAnalytics HOC ───────────────────────────────────────────────

const QACard = withAnalytics(QACardInner);
export default memo(QACard);
