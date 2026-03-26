/**
 * src/components/layout/Header.tsx
 * Matches original HTML header exactly.
 * Search is handled by bridge.js (handleSearchInput, handleSearchKeydown etc.)
 * which populates #search-dropdown (placed at body level in App.tsx).
 */
import React, { useEffect, useRef, memo } from 'react';
import { useAppSelector, useAppDispatch }  from '@app/hooks';
import { setActiveTab }    from '@features/navigation/navigationSlice';
import { toggleTheme }     from '@features/theme/themeSlice';
import type { TabKey }     from '@appTypes';

// ── Nav tab definitions (exact SVGs from original HTML) ─────────────────────
const NAV_TABS: { key: TabKey; label: string; svg: string }[] = [
  { key:'react',    label:'React',    svg:'<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="2.2" fill="#61DAFB"/><ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" stroke-width="1.3" fill="none"/><ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" stroke-width="1.3" fill="none" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" stroke-width="1.3" fill="none" transform="rotate(120 12 12)"/></svg>' },
  { key:'graphql',  label:'GraphQL',  svg:'<svg viewBox="0 0 24 24" fill="none"><path d="M12 3L3.5 8v8L12 21l8.5-5V8z" stroke="#E535AB" stroke-width="1.4" fill="none"/><circle cx="12" cy="3" r="1.5" fill="#E535AB"/><circle cx="3.5" cy="8" r="1.5" fill="#E535AB"/><circle cx="3.5" cy="16" r="1.5" fill="#E535AB"/><circle cx="12" cy="21" r="1.5" fill="#E535AB"/><circle cx="20.5" cy="16" r="1.5" fill="#E535AB"/><circle cx="20.5" cy="8" r="1.5" fill="#E535AB"/></svg>' },
  { key:'angular',  label:'Angular',  svg:'<svg viewBox="0 0 24 24"><path d="M12 2.5L3 6l1.4 11.5L12 22l7.6-4.5L21 6z" fill="#DD0031"/><path d="M12 2.5v19.5l7.6-4.5L21 6z" fill="#C3002F"/><path d="M12 7L9 15h1.5l.7-2h1.6l.7-2h-1.6L12 9.5 13.8 14H15l-3-7z" fill="white"/></svg>' },
  { key:'vue',      label:'Vue.js',   svg:'<svg viewBox="0 0 24 24"><path d="M2 3.5h4L12 16 18 3.5h4L12 21z" fill="#41B883"/><path d="M6.5 3.5H10l2 4 2-4h3.5L12 16z" fill="#35495E"/></svg>' },
  { key:'browser',  label:'Browser',  svg:'<svg viewBox="0 0 24 24" fill="none"><rect x="2" y="3" width="12" height="12" rx="3" stroke="#4285F4" stroke-width="1.4"/><line x1="2" y1="8.5" x2="22" y2="8.5" stroke="#4285F4" stroke-width="1.3"/><circle cx="5.5" cy="6" r="1" fill="#ef4444"/><circle cx="8.5" cy="6" r="1" fill="#f59e0b"/><circle cx="11.5" cy="6" r="1" fill="#34d399"/><path d="M5 13h5M5 16.5h9M5 19h7" stroke="#4285F4" stroke-width="1.2" stroke-linecap="round"/></svg>' },
  { key:'engine',   label:'Engine',   svg:'<svg viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="12" height="12" rx="3" fill="#F7DF1E"/><path d="M8 16.5c.4.65.95 1.1 1.9 1.1 1 0 1.7-.52 1.7-1.55V10h-1.5v5.9c0 .43-.17.67-.57.67-.36 0-.6-.24-.82-.52L8 16.5zM13.8 16.35c.47.8 1.22 1.27 2.35 1.27 1.25 0 2.1-.62 2.1-1.75 0-1.05-.62-1.52-1.68-1.95l-.43-.19c-.52-.23-.74-.38-.74-.76 0-.32.24-.56.62-.56.37 0 .62.16.85.56l1.25-.8c-.52-.9-1.24-1.25-2.1-1.25-1.28 0-2.1.82-2.1 1.9 0 1.02.6 1.52 1.48 1.9l.43.19c.62.27.94.43.94.86 0 .37-.33.62-.86.62-.62 0-1-.32-1.28-.81l-1.33.77z" fill="#333"/></svg>' },
  { key:'es6',      label:'ES6+',     svg:'<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="12" height="12" rx="3" stroke="#c084fc" stroke-width="1.4"/><path d="M7 9h4M7 12h6M7 15h5" stroke="#c084fc" stroke-width="1.5" stroke-linecap="round"/><path d="M15 9l2 3-2 3" stroke="#60a5fa" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
  { key:'react-adv',label:'React+',   svg:'<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="#61DAFB" stroke-width="1.4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="#61DAFB" stroke-width="1.4" stroke-linecap="round"/><path d="M5.64 5.64l2.12 2.12M16.24 16.24l2.12 2.12M5.64 18.36l2.12-2.12M16.24 7.76l2.12-2.12" stroke="#61DAFB" stroke-width="1.3" stroke-linecap="round"/></svg>' },
  { key:'react19',  label:'React 19', svg:'<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="2.2" fill="#61DAFB"/><ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" stroke-width="1.3" fill="none"/><ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" stroke-width="1.3" fill="none" transform="rotate(60 12 12)"/><path d="M8 6l8 12" stroke="#f59e0b" stroke-width="1.8" stroke-linecap="round"/></svg>' },
  { key:'build',    label:'Build',    svg:'<svg viewBox="0 0 24 24" fill="none"><rect x="2" y="14" width="12" height="12" rx="2" stroke="#f97316" stroke-width="1.4"/><rect x="9" y="2" width="13" height="10" rx="2" stroke="#f97316" stroke-width="1.4"/><path d="M6 14V10M10 6H6" stroke="#f97316" stroke-width="1.3" stroke-linecap="round"/></svg>' },
  { key:'nextjs',   label:'Next.js',  svg:'<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9.5" stroke="#fff" stroke-width="1.4" fill="#000"/><path d="M8 15.5V8.5l8 9V8.5" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
  { key:'patterns', label:'Patterns', svg:'<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="12" height="12" rx="1.5" stroke="#a78bfa" stroke-width="1.4"/><rect x="14" y="3" width="7" height="7" rx="1.5" stroke="#a78bfa" stroke-width="1.4"/><rect x="3" y="14" width="7" height="7" rx="1.5" stroke="#a78bfa" stroke-width="1.4"/><rect x="14" y="14" width="7" height="7" rx="1.5" stroke="#34d399" stroke-width="1.4"/></svg>' },
  { key:'vitals',   label:'Vitals',   svg:'<svg viewBox="0 0 24 24" fill="none"><polyline points="2,14 6,8 10,12 14,4 18,10 22,6" stroke="#10b981" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="6" cy="8" r="1.5" fill="#10b981"/><circle cx="14" cy="4" r="1.5" fill="#10b981"/><circle cx="22" cy="6" r="1.5" fill="#f59e0b"/></svg>' },
  { key:'security', label:'Security', svg:'<svg viewBox="0 0 24 24" fill="none"><path d="M12 3L4 7v6c0 4.4 3.4 8.5 8 9.5 4.6-1 8-5.1 8-9.5V7l-8-4z" stroke="#ef4444" stroke-width="1.4" stroke-linejoin="round"/><path d="M9 12l2 2 4-4" stroke="#ef4444" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
  { key:'testing',  label:'Testing',  svg:'<svg viewBox="0 0 24 24" fill="none"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18" stroke="#06b6d4" stroke-width="1.4" stroke-linecap="round"/></svg>' },
  { key:'prepqa',   label:'Prep Q&A', svg:'<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9.5" stroke="#8b5cf6" stroke-width="1.4"/><path d="M12 8v4l3 3" stroke="#8b5cf6" stroke-width="1.5" stroke-linecap="round"/></svg>' },
  { key:'backend',  label:'Backend',  svg:'<svg viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="6" rx="9" ry="3.2" stroke="#22c55e" stroke-width="1.4"/><path d="M3 6v5c0 1.77 4.03 3.2 9 3.2S21 12.77 21 11V6" stroke="#22c55e" stroke-width="1.4"/><path d="M3 11v5c0 1.77 4.03 3.2 9 3.2S21 17.77 21 16v-5" stroke="#22c55e" stroke-width="1.4"/></svg>' },
  { key:'cicd',     label:'CI/CD',    svg:'<svg viewBox="0 0 24 24" fill="none" width="12" height="12"><rect x="2" y="7" width="6" height="6" rx="1.5" stroke="#38bdf8" stroke-width="1.4"/><rect x="16" y="7" width="6" height="6" rx="1.5" stroke="#38bdf8" stroke-width="1.4"/><path d="M8 10h8" stroke="#38bdf8" stroke-width="1.4" stroke-linecap="round"/><path d="M12 4v3M12 17v3" stroke="#38bdf8" stroke-width="1.3" stroke-linecap="round" stroke-dasharray="2 2"/><circle cx="12" cy="10" r="1.5" fill="#38bdf8"/></svg>' },
  { key:'hca',      label:'HTML/CSS', svg:'<svg viewBox="0 0 24 24" width="13" height="13" fill="none"><rect x="3" y="3" width="7" height="7" rx="1.5" fill="#e44d26"/><rect x="14" y="3" width="7" height="7" rx="1.5" fill="#264de4"/><rect x="3" y="14" width="7" height="7" rx="1.5" fill="#10b981"/><rect x="14" y="14" width="7" height="7" rx="1.5" fill="#cc6699"/></svg>' },
  { key:'sdlc',     label:'SDLC',     svg:'<svg viewBox="0 0 24 24" fill="none" width="13" height="13"><circle cx="12" cy="12" r="9.5" stroke="#f59e0b" stroke-width="1.4"/><path d="M12 7v5l3.5 3.5" stroke="#f59e0b" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="12" r="1.5" fill="#f59e0b"/></svg>' },
];

// ── Bridge.js search helpers (called via window) ─────────────────────────────
function bridgeCall(fn: string, ...args: unknown[]) {
  const w = window as Record<string, unknown>;
  try { if (typeof w[fn] === 'function') (w[fn] as (...a: unknown[]) => void)(...args); }
  catch (e) { /* ignore */ }
}

const Header: React.FC = () => {
  const dispatch   = useAppDispatch();
  const activeTab  = useAppSelector(s => s.navigation.activeTab);
  const theme      = useAppSelector(s => s.theme.mode);
  const inputRef   = useRef<HTMLInputElement>(null);

  // Keyboard shortcut: '/' focuses search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  // Sync theme toggle button state
  const isDark = theme === 'dark';

  return (
    <div className="header">
      {/* Grid dot pattern */}
      <svg className="hdr-pattern" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
        style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none'}}>
        <defs>
          <pattern id="hgrid" width="18" height="18" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.2" fill="rgba(108,93,211,0.11)"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hgrid)"/>
        <linearGradient id="hfade-l" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="var(--white)" stopOpacity="0.9"/>
          <stop offset="18%" stopColor="var(--white)" stopOpacity="0"/>
          <stop offset="82%" stopColor="var(--white)" stopOpacity="0"/>
          <stop offset="100%" stopColor="var(--white)" stopOpacity="0.9"/>
        </linearGradient>
        <rect width="100%" height="100%" fill="url(#hfade-l)"/>
      </svg>

      <div className="header-inner">
        {/* ── Row 1: Logo + Search + Theme ── */}
        <div className="hdr-row1">
          {/* Brand */}
          <div className="logo">
            <div className="logo-icon">FE</div>
            <div style={{display:'flex',flexDirection:'column',gap:'1px'}}>
              <span style={{fontSize:'14.5px',fontWeight:700,color:'var(--t1)',lineHeight:1.1,letterSpacing:'-.01em'}}>
                Frontend Architecture Hub
              </span>
              <span style={{fontSize:'10px',fontWeight:400,color:'var(--t3)',letterSpacing:'0.03em',lineHeight:1}}>
                Visual Learning Platform
              </span>
            </div>
          </div>

          {/* Search — bridge.js handles input/dropdown via window.handleSearchInput etc. */}
          <div className="search-wrap" id="search-wrap" style={{position:'relative', zIndex:10000}}>
            <div className="search-input-row" onClick={() => inputRef.current?.focus()}>
              <span className="search-icon">
                <svg viewBox="0 0 20 20" width="14" height="14" fill="none">
                  <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.8"/>
                  <path d="M13 13l3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </span>
              <input
                ref={inputRef}
                className="search-input"
                id="global-search"
                type="search"
                placeholder="Search topics…"
                autoComplete="off"
                spellCheck={false}
                aria-label="Search topics"
                aria-autocomplete="list"
                aria-controls="search-dropdown"
                onInput={e => bridgeCall('handleSearchInput', e.currentTarget)}
                onKeyDown={e => bridgeCall('handleSearchKeydown', e.nativeEvent)}
                onFocus={() => bridgeCall('handleSearchFocus')}
                onBlur={() => bridgeCall('handleSearchBlur')}
              />
              <kbd className="search-kbd">/</kbd>
              <button
                className="search-clear"
                id="search-clear"
                onClick={() => bridgeCall('clearSearch')}
                aria-label="Clear search"
                tabIndex={-1}
              >
                <svg viewBox="0 0 16 16" width="12" height="12" fill="none">
                  <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Right controls: theme + mobile menu */}
          <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
            <div style={{display:'flex',alignItems:'center',gap:'7px'}}>
              <span id="theme-label" style={{fontSize:'12px',fontWeight:500,color:'var(--t2)',whiteSpace:'nowrap'}}>
                {isDark ? 'Dark' : 'Light'}
              </span>
              <button
                className="theme-toggle"
                onClick={() => dispatch(toggleTheme())}
                title="Toggle theme"
                style={{width:'42px',height:'24px',borderRadius:'12px',border:'none',cursor:'pointer',
                  position:'relative',background:'var(--p100)',outline:'none',flexShrink:0}}
              >
                <div className="tt-track" style={{position:'absolute',inset:0,borderRadius:'12px',
                  border:'1.5px solid var(--p200)',transition:'all .3s'}} />
                <div id="tt-thumb" className="tt-thumb" style={{position:'absolute',top:'3px',
                  left: isDark ? '21px' : '3px',width:'18px',height:'18px',borderRadius:'50%',
                  background:'var(--p600)',transition:'left .3s',display:'flex',
                  alignItems:'center',justifyContent:'center',fontSize:'10px',lineHeight:1}}>
                  {isDark ? '🌙' : '☀️'}
                </div>
              </button>
            </div>
            <button
              id="mob-menu-btn"
              onClick={() => bridgeCall('toggleMobMenu')}
              aria-label="Menu"
              style={{background:'none',border:'1px solid var(--border2)',borderRadius:'8px',
                padding:'6px 8px',cursor:'pointer',color:'var(--t2)',alignItems:'center',
                justifyContent:'center',flexShrink:0,display:'none'}}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
                <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* ── Row 2: Navigation tabs ── */}
        <div className="hdr-row2" style={{position:'relative',zIndex:1}}>
          <div className="hdr-row2-inner">
            <nav className="header-nav">
              {NAV_TABS.map(({ key, label, svg }) => (
                <button
                  key={key}
                  id={`main-${key}`}
                  className={activeTab === key ? 'active' : ''}
                  onClick={() => dispatch(setActiveTab(key))}
                  dangerouslySetInnerHTML={{
                    __html: `<span class="nav-icon">${svg}</span>${label}`
                  }}
                />
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Header);
