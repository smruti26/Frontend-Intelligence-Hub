/**
 * src/hooks/useScrollToSection.ts
 * ─────────────────────────────────────────────────────────────────
 * Custom hook: useScrollToSection
 *
 * Watches the Redux navigation.scrollTarget value.
 * When it changes to a non-null value, scrolls the matching DOM
 * element into view, then dispatches clearScrollTarget so the
 * action is only executed once.
 *
 * Used inside TabPanel so each panel can respond to scroll requests
 * dispatched from the sidebar or search results.
 *
 * Usage:
 *   // Inside a panel component:
 *   useScrollToSection();
 */

import { useEffect }          from 'react';
import { useAppSelector, useAppDispatch } from '@app/hooks';
import { clearScrollTarget }  from '@features/navigation/navigationSlice';

export function useScrollToSection(): void {
  const dispatch    = useAppDispatch();
  const scrollTarget = useAppSelector(s => s.navigation.scrollTarget);
  const activeTab    = useAppSelector(s => s.navigation.activeTab);

  useEffect(() => {
    if (!scrollTarget) return;

    // Small delay to allow the tab panel to finish rendering
    const timer = setTimeout(() => {
      const el = document.getElementById(scrollTarget);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      dispatch(clearScrollTarget());
    }, 80);

    return () => clearTimeout(timer);
  }, [scrollTarget, activeTab, dispatch]);
}
