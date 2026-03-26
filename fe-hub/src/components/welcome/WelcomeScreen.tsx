/**
 * src/components/welcome/WelcomeScreen.tsx
 * Exact 1:1 replica of the original HTML welcome screen.
 * Canvas animation ported directly from original inline script.
 */
import React, { useEffect, useRef, memo } from 'react';
import { useAppDispatch } from '@app/hooks';
import { setActiveTab }   from '@features/navigation/navigationSlice';
import type { TabKey }    from '@appTypes';

interface Props { onDismiss: () => void; }

const WelcomeScreen: React.FC<Props> = ({ onDismiss }) => {
  const dispatch    = useAppDispatch();
  const screenRef   = useRef<HTMLDivElement>(null);
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const rafRef      = useRef<number | null>(null);
  const dismissedRef = useRef(false);

  /* ── Canvas animation (exact port of original IIFE) ─────────── */
  useEffect(() => {
    const screen = screenRef.current;
    const canvas = canvasRef.current;
    if (!screen || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0, H = 0;
    type P = { x:number; y:number; vx:number; vy:number; r:number; alpha:number; color:string; pulse:number; pspeed:number };
    const COLORS = ['#8b7ae8','#6c5dd3','#60a5fa','#3b82f6','#a89af0','#c4b5fd'];
    const particles: P[] = [];

    function mkParticle(): P {
      const angle  = Math.random() * Math.PI * 2;
      const speed  = 0.18 + Math.random() * 0.42;
      const radius = 8 + Math.random() * (Math.min(W, H) * 0.38);
      const cx = W / 2, cy = H / 2;
      return {
        x: cx + Math.cos(angle) * radius, y: cy + Math.sin(angle) * radius,
        vx: (Math.random() - 0.5) * speed, vy: (Math.random() - 0.5) * speed,
        r: 1 + Math.random() * 2.2, alpha: 0.15 + Math.random() * 0.55,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        pulse: Math.random() * Math.PI * 2, pspeed: 0.02 + Math.random() * 0.03,
      };
    }

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    for (let i = 0; i < 110; i++) particles.push(mkParticle());

    const rings = [
      { r:90,  speed:0.004,   angle:0,   color:'rgba(108,93,211,0.12)', lw:1   },
      { r:150, speed:-0.0025, angle:1.2, color:'rgba(59,130,246,0.10)',  lw:1   },
      { r:210, speed:0.0015,  angle:2.4, color:'rgba(139,122,232,0.08)', lw:0.8 },
      { r:270, speed:-0.001,  angle:0.8, color:'rgba(96,165,250,0.06)',  lw:0.8 },
    ];
    const MAX_DIST = 90;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      const cx = W / 2, cy = H / 2;
      rings.forEach(ring => {
        ring.angle += ring.speed;
        ctx.beginPath(); ctx.arc(cx, cy, ring.r, 0, Math.PI * 2);
        ctx.strokeStyle = ring.color; ctx.lineWidth = ring.lw; ctx.stroke();
        const dx = cx + Math.cos(ring.angle) * ring.r;
        const dy = cy + Math.sin(ring.angle) * ring.r;
        ctx.beginPath(); ctx.arc(dx, dy, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = ring.color.replace(/[\d.]+\)$/, '0.7)'); ctx.fill();
      });
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.pulse += p.pspeed;
        const alpha = p.alpha * (0.7 + 0.3 * Math.sin(p.pulse));
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color; ctx.globalAlpha = alpha; ctx.fill(); ctx.globalAlpha = 1;
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < MAX_DIST) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(139,122,232,${0.12 * (1 - d / MAX_DIST)})`;
            ctx.lineWidth = 0.7; ctx.stroke();
          }
        }
      }
      rafRef.current = requestAnimationFrame(draw);
    }
    rafRef.current = requestAnimationFrame(draw);

    /* Auto-dismiss after 2.8s (matches original) */
    const autoDismiss = setTimeout(() => dismiss(), 2800);

    /* Click anywhere (not on pill) dismisses */
    const handleClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.wlc-pill')) dismiss();
    };
    screen.addEventListener('click', handleClick);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('resize', resize);
      screen.removeEventListener('click', handleClick);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      clearTimeout(autoDismiss);
      document.body.style.overflow = '';
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Dismiss with exit animation ─────────────────────────────── */
  function dismiss(cb?: () => void) {
    if (dismissedRef.current) return;
    dismissedRef.current = true;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    screenRef.current?.classList.add('wlc-exit');
    document.body.style.overflow = '';
    setTimeout(() => { onDismiss(); if (cb) cb(); }, 680);
  }

  /* ── Pill click → navigate then dismiss ─────────────────────── */
  function handlePill(tab: TabKey) {
    dispatch(setActiveTab(tab));
    dismiss();
  }

  const PILLS: { key: TabKey; svg: string; label: string }[] = [
    { key:'react',    label:'React',    svg:'<svg viewBox="0 0 24 24" width="12" height="12" fill="none"><circle cx="12" cy="12" r="2" fill="#61DAFB"/><ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" stroke-width="1.4"/><ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" stroke-width="1.4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" stroke-width="1.4" transform="rotate(120 12 12)"/></svg>' },
    { key:'graphql',  label:'GraphQL',  svg:'<svg viewBox="0 0 24 24" width="12" height="12" fill="none"><path d="M12 3L3.5 8v8L12 21l8.5-5V8z" stroke="#E535AB" stroke-width="1.4"/><circle cx="12" cy="3" r="1.5" fill="#E535AB"/><circle cx="3.5" cy="8" r="1.5" fill="#E535AB"/><circle cx="3.5" cy="16" r="1.5" fill="#E535AB"/><circle cx="12" cy="21" r="1.5" fill="#E535AB"/><circle cx="20.5" cy="16" r="1.5" fill="#E535AB"/><circle cx="20.5" cy="8" r="1.5" fill="#E535AB"/></svg>' },
    { key:'angular',  label:'Angular',  svg:'<svg viewBox="0 0 24 24" width="12" height="12"><path d="M12 2.5L3 6l1.4 11.5L12 22l7.6-4.5L21 6z" fill="#DD0031"/><path d="M12 2.5v19.5l7.6-4.5L21 6z" fill="#C3002F"/><path d="M12 7L9 15h1.5l.7-2h1.6l.7-2h-1.6L12 9.5 13.8 14H15l-3-7z" fill="white"/></svg>' },
    { key:'vue',      label:'Vue.js',   svg:'<svg viewBox="0 0 24 24" width="12" height="12"><path d="M2 3.5h4L12 16 18 3.5h4L12 21z" fill="#41B883"/><path d="M6.5 3.5H10l2 4 2-4h3.5L12 16z" fill="#35495E"/></svg>' },
    { key:'browser',  label:'Browser',  svg:'<svg viewBox="0 0 24 24" width="12" height="12" fill="none"><rect x="2" y="3" width="20" height="18" rx="3" stroke="#4285F4" stroke-width="1.4"/><line x1="2" y1="8.5" x2="22" y2="8.5" stroke="#4285F4" stroke-width="1.3"/><circle cx="5.5" cy="6" r="1" fill="#ef4444"/><circle cx="8.5" cy="6" r="1" fill="#f59e0b"/><circle cx="11.5" cy="6" r="1" fill="#34d399"/></svg>' },
    { key:'engine',   label:'Engine',   svg:'<svg viewBox="0 0 24 24" width="12" height="12" fill="none"><rect x="2" y="2" width="20" height="20" rx="3" fill="#F7DF1E"/><path d="M8 16.5c.4.65.95 1.1 1.9 1.1 1 0 1.7-.52 1.7-1.55V10h-1.5v5.9c0 .43-.17.67-.57.67-.36 0-.6-.24-.82-.52L8 16.5z" fill="#333"/></svg>' },
    { key:'es6',      label:'ES6+',     svg:'<svg viewBox="0 0 24 24" width="12" height="12" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" stroke="#c084fc" stroke-width="1.4"/><path d="M7 9h4M7 12h6M7 15h5" stroke="#c084fc" stroke-width="1.5" stroke-linecap="round"/></svg>' },
    { key:'react-adv',label:'React+',   svg:'<svg viewBox="0 0 24 24" width="12" height="12" fill="none"><circle cx="12" cy="12" r="3" stroke="#61DAFB" stroke-width="1.4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="#61DAFB" stroke-width="1.4" stroke-linecap="round"/></svg>' },
    { key:'react19',  label:'React 19', svg:'<svg viewBox="0 0 24 24" width="12" height="12" fill="none"><circle cx="12" cy="12" r="2.2" fill="#61DAFB"/><ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" stroke-width="1.3"/><ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" stroke-width="1.3" transform="rotate(60 12 12)"/><path d="M8 6l8 12" stroke="#f59e0b" stroke-width="1.8" stroke-linecap="round"/></svg>' },
    { key:'build',    label:'Build',    svg:'<svg viewBox="0 0 24 24" width="12" height="12" fill="none"><rect x="2" y="14" width="8" height="8" rx="2" stroke="#f97316" stroke-width="1.4"/><rect x="9" y="2" width="13" height="10" rx="2" stroke="#f97316" stroke-width="1.4"/></svg>' },
    { key:'nextjs',   label:'Next.js',  svg:'<svg viewBox="0 0 24 24" width="12" height="12" fill="none"><circle cx="12" cy="12" r="9.5" fill="#000"/><path d="M8 15.5V8.5l8 9V8.5" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
    { key:'patterns', label:'Patterns', svg:'<svg viewBox="0 0 24 24" width="12" height="12" fill="none"><rect x="3" y="3" width="7" height="7" rx="1.5" stroke="#a78bfa" stroke-width="1.4"/><rect x="14" y="3" width="7" height="7" rx="1.5" stroke="#a78bfa" stroke-width="1.4"/><rect x="3" y="14" width="7" height="7" rx="1.5" stroke="#a78bfa" stroke-width="1.4"/><rect x="14" y="14" width="7" height="7" rx="1.5" stroke="#34d399" stroke-width="1.4"/></svg>' },
    { key:'vitals',   label:'Vitals',   svg:'<svg viewBox="0 0 24 24" width="12" height="12" fill="none"><polyline points="2,14 6,8 10,12 14,4 18,10 22,6" stroke="#10b981" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
    { key:'security', label:'Security', svg:'<svg viewBox="0 0 24 24" width="12" height="12" fill="none"><path d="M12 3L4 7v6c0 4.4 3.4 8.5 8 9.5 4.6-1 8-5.1 8-9.5V7l-8-4z" stroke="#ef4444" stroke-width="1.4" stroke-linejoin="round"/><path d="M9 12l2 2 4-4" stroke="#ef4444" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
    { key:'testing',  label:'Testing',  svg:'<svg viewBox="0 0 24 24" width="12" height="12" fill="none"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18" stroke="#06b6d4" stroke-width="1.4" stroke-linecap="round"/></svg>' },
    { key:'backend',  label:'Backend',  svg:'<svg viewBox="0 0 24 24" width="12" height="12" fill="none"><ellipse cx="12" cy="6" rx="9" ry="3.2" stroke="#22c55e" stroke-width="1.4"/><path d="M3 6v5c0 1.77 4.03 3.2 9 3.2S21 12.77 21 11V6" stroke="#22c55e" stroke-width="1.4"/><path d="M3 11v5c0 1.77 4.03 3.2 9 3.2S21 17.77 21 16v-5" stroke="#22c55e" stroke-width="1.4"/></svg>' },
    { key:'cicd',     label:'CI/CD',    svg:'<svg viewBox="0 0 24 24" width="12" height="12" fill="none"><rect x="2" y="7" width="6" height="6" rx="1.5" stroke="#38bdf8" stroke-width="1.4"/><rect x="16" y="7" width="6" height="6" rx="1.5" stroke="#38bdf8" stroke-width="1.4"/><path d="M8 10h8" stroke="#38bdf8" stroke-width="1.4" stroke-linecap="round"/><circle cx="12" cy="10" r="1.5" fill="#38bdf8"/></svg>' },
    { key:'hca',      label:'HTML/CSS', svg:'<svg viewBox="0 0 24 24" width="12" height="12" fill="none"><rect x="3" y="3" width="7" height="7" rx="1.5" fill="#e44d26"/><rect x="14" y="3" width="7" height="7" rx="1.5" fill="#264de4"/><rect x="3" y="14" width="7" height="7" rx="1.5" fill="#10b981"/><rect x="14" y="14" width="7" height="7" rx="1.5" fill="#cc6699"/></svg>' },
    { key:'sdlc',     label:'SDLC',     svg:'<svg viewBox="0 0 24 24" width="12" height="12" fill="none"><circle cx="12" cy="12" r="9.5" stroke="#f59e0b" stroke-width="1.4"/><path d="M12 7v5l3.5 3.5" stroke="#f59e0b" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="12" r="1.5" fill="#f59e0b"/></svg>' },
  ];

  return (
    <div id="welcome-screen" role="dialog" aria-label="Welcome" aria-modal="true" ref={screenRef}>
      <canvas id="welcome-canvas" ref={canvasRef} />
      <div id="welcome-content">
        <div id="welcome-logo">FE</div>
        <div id="welcome-tag">✦ Visual Learning Platform</div>
        <h1 id="welcome-heading">
          Welcome to <span>Frontend<br />Architecture Hub</span>
        </h1>
        <p id="welcome-sub">
          Interactive diagrams, animated flows, and deep-dives into React,
          Angular, Vue, Next.js, CI/CD and more.
        </p>
        <div id="welcome-pills">
          {PILLS.map(({ key, label, svg }) => (
            <button
              key={key}
              className="wlc-pill"
              onClick={() => handlePill(key)}
              dangerouslySetInnerHTML={{ __html: `${svg}${label}` }}
            />
          ))}
        </div>
        <div id="welcome-progress-wrap">
          <div id="welcome-progress-bar" />
        </div>
      </div>
    </div>
  );
};

export default memo(WelcomeScreen);
