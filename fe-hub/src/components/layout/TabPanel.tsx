/**
 * src/components/layout/TabPanel.tsx
 * Renders each tab panel with eager loading (no Suspense/lazy).
 * Eager loading ensures canvas elements exist in DOM when App.tsx
 * fires canvas init functions after tab activation.
 *
 * Panels are CSS-hidden (display:none) when inactive — NOT unmounted —
 * so canvas animation state is preserved across tab switches.
 */
import React, { memo }       from 'react';
import { useAppSelector }     from '@app/hooks';
import type { TabKey }        from '@appTypes';

// ── Eager imports (all panels loaded upfront for reliable canvas timing) ──
import ReactPanel     from '@panels/ReactPanel';
import GraphQLPanel   from '@panels/GraphQLPanel';
import AngularPanel   from '@panels/AngularPanel';
import VuePanel       from '@panels/VuePanel';
import BrowserPanel   from '@panels/BrowserPanel';
import EnginePanel    from '@panels/EnginePanel';
import ES6Panel       from '@panels/ES6Panel';
import ReactAdvPanel  from '@panels/ReactAdvPanel';
import React19Panel   from '@panels/React19Panel';
import BuildPanel     from '@panels/BuildPanel';
import NextJSPanel    from '@panels/NextJSPanel';
import PatternsPanel  from '@panels/PatternsPanel';
import VitalsPanel    from '@panels/VitalsPanel';
import SecurityPanel  from '@panels/SecurityPanel';
import TestingPanel   from '@panels/TestingPanel';
import PrepQAPanel    from '@panels/PrepQAPanel';
import BackendPanel   from '@panels/BackendPanel';
import CICDPanel      from '@panels/CICDPanel';
import HCAPanel       from '@panels/HCAPanel';
import SDLCPanel      from '@panels/SDLCPanel';

const PANEL_MAP: Record<TabKey, React.FC> = {
  react:        ReactPanel,
  graphql:      GraphQLPanel,
  angular:      AngularPanel,
  vue:          VuePanel,
  browser:      BrowserPanel,
  engine:       EnginePanel,
  es6:          ES6Panel,
  'react-adv':  ReactAdvPanel,
  react19:      React19Panel,
  build:        BuildPanel,
  nextjs:       NextJSPanel,
  patterns:     PatternsPanel,
  vitals:       VitalsPanel,
  security:     SecurityPanel,
  testing:      TestingPanel,
  prepqa:       PrepQAPanel,
  backend:      BackendPanel,
  cicd:         CICDPanel,
  hca:          HCAPanel,
  sdlc:         SDLCPanel,
};

interface TabPanelProps { tabKey: TabKey; }

const TabPanel: React.FC<TabPanelProps> = memo(({ tabKey }) => {
  const activeTab = useAppSelector(s => s.navigation.activeTab);
  const isActive  = activeTab === tabKey;
  const Panel     = PANEL_MAP[tabKey];

  return (
    <div
      id={`panel-${tabKey}`}
      className={`tab-panel${isActive ? ' active' : ''}`}
      role="tabpanel"
      aria-label={tabKey}
      aria-hidden={!isActive}
    >
      <Panel />
    </div>
  );
});

TabPanel.displayName = 'TabPanel';
export default TabPanel;
