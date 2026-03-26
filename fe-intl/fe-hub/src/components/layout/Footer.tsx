/**
 * src/components/layout/Footer.tsx  
 * Exact replica of original HTML footer — 1:1 match.
 */
import React, { memo } from 'react';
import { useAppDispatch } from '@app/hooks';
import { setActiveTab }   from '@features/navigation/navigationSlice';
import type { TabKey }    from '@appTypes';

const FOOTER_TABS: { key: TabKey; label: string; svg: string }[] = [
  { key:'react',    label:'React',    svg:'<svg viewBox="0 0 24 24" fill="none" width="12" height="12"><circle cx="12" cy="12" r="2" fill="#61DAFB"/><ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" stroke-width="1.4"/><ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" stroke-width="1.4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" stroke-width="1.4" transform="rotate(120 12 12)"/></svg>' },
  { key:'graphql',  label:'GraphQL',  svg:'<svg viewBox="0 0 24 24" fill="none" width="12" height="12"><path d="M12 3L3.5 8v8L12 21l8.5-5V8z" stroke="#E535AB" stroke-width="1.5"/><circle cx="12" cy="3" r="1.3" fill="#E535AB"/><circle cx="3.5" cy="8" r="1.3" fill="#E535AB"/><circle cx="3.5" cy="16" r="1.3" fill="#E535AB"/><circle cx="12" cy="21" r="1.3" fill="#E535AB"/><circle cx="20.5" cy="16" r="1.3" fill="#E535AB"/><circle cx="20.5" cy="8" r="1.3" fill="#E535AB"/></svg>' },
  { key:'angular',  label:'Angular',  svg:'<svg viewBox="0 0 24 24" width="12" height="12"><path d="M12 2.5L3 6l1.4 11.5L12 22l7.6-4.5L21 6z" fill="#DD0031"/><path d="M12 7L9 15h1.5l.7-2h2.6l.7 2H16l-3-8z" fill="white"/></svg>' },
  { key:'vue',      label:'Vue.js',   svg:'<svg viewBox="0 0 24 24" width="12" height="12"><path d="M2 3.5h4L12 16 18 3.5h4L12 21z" fill="#41B883"/><path d="M6.5 3.5H10l2 4 2-4h3.5L12 16z" fill="#35495E"/></svg>' },
  { key:'browser',  label:'Browser',  svg:'<svg viewBox="0 0 24 24" fill="none" width="12" height="12"><rect x="2" y="3" width="20" height="18" rx="3" stroke="#4285F4" stroke-width="1.4"/><line x1="2" y1="8.5" x2="22" y2="8.5" stroke="#4285F4" stroke-width="1.3"/><circle cx="5.5" cy="6" r="1" fill="#ef4444"/><circle cx="8.5" cy="6" r="1" fill="#f59e0b"/><circle cx="11.5" cy="6" r="1" fill="#34d399"/></svg>' },
  { key:'engine',   label:'JS Engine', svg:'<svg viewBox="0 0 24 24" width="12" height="12"><rect x="2" y="2" width="20" height="20" rx="3" fill="#F7DF1E"/><path d="M8 16.5c.4.65.95 1.1 1.9 1.1 1 0 1.7-.52 1.7-1.55V10h-1.5v5.9c0 .43-.17.67-.57.67-.36 0-.6-.24-.82-.52L8 16.5z" fill="#333"/></svg>' },
  { key:'es6',      label:'ES6+',     svg:'<svg viewBox="0 0 24 24" fill="none" width="12" height="12"><rect x="3" y="3" width="18" height="18" rx="3" stroke="#c084fc" stroke-width="1.4"/><path d="M7 9h4M7 12h6M7 15h5" stroke="#c084fc" stroke-width="1.4" stroke-linecap="round"/></svg>' },
  { key:'backend',  label:'Backend',  svg:'<svg viewBox="0 0 24 24" fill="none" width="12" height="12"><rect x="2" y="3" width="20" height="5" rx="2" stroke="#34d399" stroke-width="1.4"/><rect x="2" y="10" width="20" height="5" rx="2" stroke="#34d399" stroke-width="1.4"/><rect x="2" y="17" width="20" height="5" rx="2" stroke="#34d399" stroke-width="1.4"/></svg>' },
  { key:'cicd',     label:'CI/CD',    svg:'<svg viewBox="0 0 24 24" fill="none" width="12" height="12"><rect x="2" y="7" width="6" height="6" rx="1.5" stroke="#38bdf8" stroke-width="1.4"/><rect x="16" y="7" width="6" height="6" rx="1.5" stroke="#38bdf8" stroke-width="1.4"/><path d="M8 10h8" stroke="#38bdf8" stroke-width="1.3" stroke-linecap="round"/></svg>' },
];

const BtnStyle: React.CSSProperties = {
  display:'inline-flex', alignItems:'center', gap:'5px',
  background:'none', border:'1px solid var(--border)', borderRadius:'6px',
  padding:'5px 10px', fontSize:'11px', fontWeight:500, color:'var(--t2)',
  cursor:'pointer', transition:'all 0.15s', fontFamily:'inherit',
};

const IconLinkStyle: React.CSSProperties = {
  display:'flex', alignItems:'center', justifyContent:'center',
  width:'30px', height:'30px', borderRadius:'7px',
  border:'1px solid var(--border)', color:'var(--t2)',
  transition:'all 0.15s', textDecoration:'none',
};

const Footer: React.FC = () => {
  const dispatch = useAppDispatch();
  const go = (tab: TabKey) => () => dispatch(setActiveTab(tab));

  return (
    <footer style={{
      background:'var(--white)', borderTop:'1px solid var(--border)',
      marginTop:'3rem', transition:'background 0.3s,border-color 0.3s',
      position:'relative', overflow:'hidden',
    }}>
      {/* Dot-pattern SVG background */}
      <svg aria-hidden="true" style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none',opacity:1}}>
        <defs>
          <pattern id="footer-dots" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.2" fill="rgba(108,93,211,0.09)"/>
          </pattern>
          <radialGradient id="footer-fade" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="var(--white)" stopOpacity="0.55"/>
            <stop offset="100%" stopColor="var(--white)" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#footer-dots)"/>
        <rect width="100%" height="100%" fill="url(#footer-fade)"/>
      </svg>

      <div style={{maxWidth:'1400px',margin:'0 auto',padding:'1.5rem 2rem',position:'relative',zIndex:1}}>

        {/* Row 1 — Brand + nav links */}
        <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',flexWrap:'wrap',gap:'1.5rem',marginBottom:'1.2rem'}}>

          {/* Brand */}
          <div style={{display:'flex',alignItems:'center',gap:'10px',flexShrink:0}}>
            <div style={{width:'32px',height:'32px',background:'linear-gradient(135deg,var(--p600),var(--b600))',borderRadius:'8px',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'13px',fontWeight:700,boxShadow:'0 2px 8px rgba(108,93,211,0.25)'}}>
              FE
            </div>
            <div>
              <div style={{fontSize:'13px',fontWeight:600,color:'var(--t1)',lineHeight:1.2}}>
                Frontend Architecture Hub
              </div>
              <div style={{fontSize:'10px',color:'var(--t3)',marginTop:'2px'}}>
                Visual Learning Platform &middot; 20 sections
              </div>
            </div>
          </div>

          {/* Tab nav pills */}
          <div style={{display:'flex',gap:'6px',flexWrap:'wrap',alignItems:'center'}}>
            {FOOTER_TABS.map(({ key, label, svg }) => (
              <button key={key} style={BtnStyle} onClick={go(key)}
                onMouseOver={e => { const el = e.currentTarget; el.style.borderColor='var(--p400)'; el.style.color='var(--p600)'; }}
                onMouseOut={e  => { const el = e.currentTarget; el.style.borderColor='var(--border)'; el.style.color='var(--t2)'; }}
                dangerouslySetInnerHTML={{ __html: `${svg}${label}` }}
              />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{height:'1px',background:'linear-gradient(90deg,transparent,var(--border2),transparent)',marginBottom:'1rem'}} />

        {/* Copyright row */}
        <div style={{background:'none',border:'none',padding:'0.6rem 0',marginBottom:'0.8rem',display:'flex',alignItems:'center',gap:'10px',flexWrap:'wrap'}}>
          <span style={{display:'inline-flex',alignItems:'center',justifyContent:'center',width:'28px',height:'28px',background:'linear-gradient(135deg,var(--p600),var(--b600))',borderRadius:'7px',flexShrink:0,boxShadow:'0 2px 8px rgba(108,93,211,0.3)'}}>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
              <path d="M12 3L4 7v5c0 4.5 3.3 8.7 8 9.9C16.7 20.7 20 16.5 20 12V7L12 3z" fill="white" opacity="0.9"/>
            </svg>
          </span>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:'11.5px',fontWeight:600,color:'var(--t1)',lineHeight:1.4}}>
              &copy; All copyright reserved by <span style={{color:'var(--p600)'}}>Smruti Ranjan Behera</span>
            </div>
            <div style={{fontSize:'10px',color:'var(--t2)',marginTop:'1px',letterSpacing:'0.01em'}}>
              Principal Enterprise Architect &ndash; UI/UX &nbsp;&middot;&nbsp; Enterprise Frontend Platforms &nbsp;&middot;&nbsp; React Ecosystem
            </div>
          </div>
        </div>

        {/* Bottom row — built for + social links */}
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'1rem'}}>
          <div style={{fontSize:'10px',color:'var(--t3)'}}>
            Built for developers &middot; Interactive diagrams &amp; animations &middot; Open source
          </div>
          <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
            {[
              { href:'https://github.com',   title:'GitHub',   svg:'<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>' },
              { href:'https://twitter.com',  title:'Twitter/X', svg:'<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>' },
              { href:'https://linkedin.com', title:'LinkedIn',  svg:'<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>' },
              { href:'https://youtube.com',  title:'YouTube',  svg:'<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>' },
              { href:'https://dev.to',       title:'Dev.to',   svg:'DEV', isText: true },
            ].map(({ href, title, svg, isText }: any) => (
              <a key={href} href={href} target="_blank" rel="noopener" title={title}
                style={{...IconLinkStyle, ...(isText ? {fontSize:'9px',fontWeight:700,letterSpacing:'-0.5px'} : {})}}
                onMouseOver={e => { const el = e.currentTarget; el.style.borderColor='var(--p400)'; el.style.color='var(--p600)'; el.style.background='var(--p50)'; }}
                onMouseOut={e  => { const el = e.currentTarget; el.style.borderColor='var(--border)'; el.style.color='var(--t2)'; el.style.background='transparent'; }}
                dangerouslySetInnerHTML={{ __html: svg }}
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
