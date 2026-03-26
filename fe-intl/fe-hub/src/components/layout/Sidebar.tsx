/**
 * src/components/layout/Sidebar.tsx
 * ─────────────────────────────────────────────────────────────────
 * Left sidebar showing:
 *   1. Current section's items (scrollable anchor links)
 *   2. "All Sections" list for cross-tab navigation
 *
 * Dispatches navigateToSection for section scrolling,
 * setActiveTab for cross-section switching.
 */

import React, { memo, useState }     from 'react';
import { useAppSelector, useAppDispatch } from '@app/hooks';
import { setActiveTab, navigateToSection } from '@features/navigation/navigationSlice';
import { setFilter }                  from '@features/qa/qaSlice';
import { SIDEBAR_DATA, TAB_NAMES }   from '@constants/tabs';
import type { TabKey }                from '@appTypes';

// ── Section items for current tab ────────────────────────────────────────

const CurrentSectionItems: React.FC = () => {
  const dispatch  = useAppDispatch();
  const activeTab = useAppSelector(s => s.navigation.activeTab);
  const items     = SIDEBAR_DATA[activeTab] ?? [];
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? '');

  const handleClick = (id: string, qaFilter?: string) => {
    setActiveId(id);

    if (qaFilter) {
      // Navigate to prepqa tab and apply QA filter
      dispatch(setActiveTab('prepqa'));
      // Small delay to ensure tab renders first
      setTimeout(() => dispatch(setFilter(qaFilter as never)), 50);
      return;
    }

    dispatch(navigateToSection({ tab: activeTab, sectionId: id }));
  };

  if (items.length === 0) return null;

  return (
    <div className="sidebar-section">
      <div className="sidebar-label">{TAB_NAMES[activeTab]}</div>
      {items.map((item) => (
        <button
          key={item.id}
          className={`sidebar-item${activeId === item.id ? ' active' : ''}`}
          onClick={() => handleClick(item.id, item.qaFilter)}
          aria-current={activeId === item.id ? 'location' : undefined}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

// ── All sections cross-nav ────────────────────────────────────────────────

const AllSections: React.FC = () => {
  const dispatch  = useAppDispatch();
  const activeTab = useAppSelector(s => s.navigation.activeTab);

  const otherTabs = (Object.keys(TAB_NAMES) as TabKey[]).filter(
    (k) => k !== activeTab
  );

  return (
    <div className="sidebar-section" style={{ marginTop: '1rem' }}>
      <div className="sidebar-label">All Sections</div>
      {otherTabs.map((key) => (
        <button
          key={key}
          className="sidebar-item"
          onClick={() => dispatch(setActiveTab(key))}
        >
          {TAB_NAMES[key]}
        </button>
      ))}
    </div>
  );
};

// ── Sidebar ───────────────────────────────────────────────────────────────

const Sidebar: React.FC = () => (
  <aside className="sidebar" id="sidebar" aria-label="Section navigation">
    <CurrentSectionItems />
    <AllSections />
  </aside>
);

export default memo(Sidebar);
