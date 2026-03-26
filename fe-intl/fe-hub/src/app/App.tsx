/**
 * src/app/App.tsx — Root component, Redux-driven, matches original HTML shell.
 */
import React, { useState, useEffect, useCallback, useRef, memo } from 'react';
import { useAppSelector, useAppDispatch } from '@app/hooks';
import { markInitialized }    from '@features/canvas/canvasSlice';
import { setActiveTab }       from '@features/navigation/navigationSlice';
import Header                 from '@components/layout/Header';
import Footer                 from '@components/layout/Footer';
import TabPanel               from '@components/layout/TabPanel';
import WelcomeScreen          from '@components/welcome/WelcomeScreen';
import type { TabKey }        from '@appTypes';

const ALL_TABS: TabKey[] = [
  'react','graphql','angular','vue','browser','engine','es6',
  'react-adv','react19','build','nextjs','patterns','vitals',
  'security','testing','prepqa','backend','cicd','hca','sdlc',
];

const CANVAS_INITS: Partial<Record<TabKey, string[]>> = {
  react:       ['initReact'],
  graphql:     ['initGraphql'],
  angular:     ['initAngular'],
  vue:         ['initVue'],
  browser:     ['initBrowser'],
  engine:      ['initEngine'],
  es6:         ['initEventLoop','initAsync'],
  'react-adv': ['initFiber','initHoc','initContext','initPortal','initFragment'],
  react19:     ['initReact19Anim','initR19Actions','initR19Compiler'],
  build:       ['initWebpack','initWebpackAdv','initVite','initBuildCmp','initMonorepo'],
  nextjs:      ['initCsr','initSsr','initNextflow'],
  patterns:    ['initPatModule','initPatSingleton','initPatFactory','initPatObserver','initPatStrategy'],
  vitals:      ['initVitals','initVitalsTimeline'],
  security:    ['initSecurity','initScanning'],
  testing:     ['initTesting','initTestPattern'],
  backend:     ['initNodeEventLoop','initNodeStreams','initExpressMw','initExpressArch',
                 'initMongoArch','initPgArch','initPgNode','initBeStack'],
  cicd:        ['initDockerAnim','initK8sAnim','initKafkaAnim','initVercelAnim','initCicdPipeline'],
  hca:         ['initBoxModel','initFlexbox','initGrid','initPreprocessors'],
  sdlc:        ['initSdlcAnim','initArchitectAnim'],
};

function callBridge(fn: string, ...args: unknown[]): void {
  const w = window as Record<string, unknown>;
  try { if (typeof w[fn] === 'function') (w[fn] as (...a: unknown[]) => void)(...args); }
  catch (e) { console.warn(`[Bridge] ${fn}:`, (e as Error).message); }
}

function hasSeenWelcome(): boolean { return false; }
function markWelcomeSeen(): void { /* no-op */ }

const App: React.FC = () => {
  const dispatch  = useAppDispatch();
  const activeTab = useAppSelector(s => s.navigation.activeTab);
  const theme     = useAppSelector(s => s.theme.mode);
  const [welcomed, setWelcomed] = useState(hasSeenWelcome);
  const prevTabRef = useRef<TabKey | null>(null);

  // ── Theme sync ──────────────────────────────────────────────────────────
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // ── Register bridge.js → Redux hook for switchMain() ───────────────────
  useEffect(() => {
    (window as Record<string,unknown>).__reactSetTab = (tab: string) => {
      dispatch(setActiveTab(tab as TabKey));
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };
    return () => { delete (window as Record<string,unknown>).__reactSetTab; };
  }, [dispatch]);

  // ── Canvas init + sidebar + hero watermarks on tab change ───────────────
  useEffect(() => {
    const fns     = CANVAS_INITS[activeTab] ?? [];
    const isFirst = prevTabRef.current === null;
    prevTabRef.current = activeTab;

    // Sidebar: use rAF to avoid flash (paint after class change)
    const rafId = requestAnimationFrame(() => {
      callBridge('renderSidebar', activeTab);
      if (activeTab === 'prepqa') callBridge('renderQA', 'all');
    });

    // Canvas inits: 150ms first pass (panel is now display:block)
    const t1 = setTimeout(() => {
      fns.forEach(fn => callBridge(fn));
      callBridge('injectHeroWatermarks');
    }, 150);

    // Backup pass at 600ms (handles any slow rendering)
    const t2 = setTimeout(() => {
      fns.forEach(fn => callBridge(fn));
      callBridge('injectHeroWatermarks');
      if (fns.length > 0) dispatch(markInitialized(activeTab));
    }, 600);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, dispatch]);

  // ── Resize re-init ───────────────────────────────────────────────────────
  useEffect(() => {
    let deb: ReturnType<typeof setTimeout>;
    const fn = () => {
      clearTimeout(deb);
      deb = setTimeout(() => {
        (CANVAS_INITS[activeTab] ?? []).forEach(f => callBridge(f));
      }, 250);
    };
    window.addEventListener('resize', fn);
    return () => { window.removeEventListener('resize', fn); clearTimeout(deb); };
  }, [activeTab]);

  // ── Reading progress bar ─────────────────────────────────────────────────
  useEffect(() => {
    const fn = () => {
      const el = document.getElementById('reading-progress');
      if (!el) return;
      const tot = document.documentElement.scrollHeight - window.innerHeight;
      el.style.width = tot > 0 ? `${(window.scrollY / tot) * 100}%` : '0%';
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // ── Scroll-to-top button ─────────────────────────────────────────────────
  useEffect(() => {
    const btn = document.getElementById('scroll-top-btn');
    if (!btn) return;
    let visible = false;
    const fn = () => {
      const shouldShow = window.scrollY > 320;
      if (shouldShow !== visible) {
        visible = shouldShow;
        btn.style.opacity       = visible ? '1' : '0';
        btn.style.transform     = visible ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.9)';
        btn.style.pointerEvents = visible ? 'auto' : 'none';
      }
    };
    // Hover effects
    btn.addEventListener('mouseenter', () => {
      btn.style.background  = 'var(--p600)';
      btn.style.color       = '#fff';
      btn.style.borderColor = 'var(--p600)';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.background  = 'var(--white)';
      btn.style.color       = 'var(--p600)';
      btn.style.borderColor = 'var(--border2)';
    });
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const dismissWelcome = useCallback(() => { markWelcomeSeen(); setWelcomed(true); }, []);

  return (
    <>
      <div id="reading-progress" />

      {!welcomed && <WelcomeScreen onDismiss={dismissWelcome} />}

      <div id="app">
        {/* search-dropdown placed at body level (matches original HTML — bridge.js positions it) */}
        <div className="search-dropdown" id="search-dropdown" role="listbox" aria-label="Search results" style={{position:"fixed",zIndex:999999,display:"none"}} />
        <Header />
        <div className="layout">
          <aside className="sidebar" id="sidebar" />
          <main className="content">
            {ALL_TABS.map(key => <TabPanel key={key} tabKey={key} />)}
          </main>
        </div>
        <Footer />
      </div>

      {/* Scroll-to-top: square with rounded corners (per design spec) */}
      <button
        id="scroll-top-btn"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
        title="Back to top"
        style={{
          position:'fixed', bottom:'28px', right:'28px', zIndex:999,
          display:'flex', width:'44px', height:'44px',
          borderRadius:'10px',
          border:'1.5px solid var(--border2)',
          background:'var(--white)', color:'var(--p600)',
          cursor:'pointer', alignItems:'center', justifyContent:'center',
          boxShadow:'0 4px 16px rgba(108,93,211,0.18)',
          opacity:0, transform:'translateY(12px) scale(0.9)',
          pointerEvents:'none',
          transition:'opacity 0.25s, transform 0.25s, background 0.2s, border-color 0.2s',
        } as React.CSSProperties}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15"/>
        </svg>
      </button>
    </>
  );
};

export default memo(App);
