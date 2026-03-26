/**
 * src/utils/animations/reactAnimations.ts
 * ─────────────────────────────────────────────────────────────────
 * Canvas animations for the React Architecture panel.
 * Dynamically imported by ReactPanel (code-split per animation).
 *
 * Functions exported:
 *   initReact(canvas, theme) — starts the animation loop
 *   reactAnim(mode, canvas)  — switches animation mode
 *
 * Ported from the original monolithic script in index.html.
 * All drawing logic is unchanged — only the module structure
 * and theme-awareness are new.
 */

import {
  lerp,
  easeOut,
  rr,
  txt,
  glow,
  dot,
  arrow,
  hexToRgba,
  createAnimationLoop,
} from '@utils/canvasHelpers';
import type { ThemeMode } from '@appTypes';

// ── Animation state ───────────────────────────────────────────────────────

interface ReactAnimState {
  ctx:   CanvasRenderingContext2D | null;
  W:     number;
  H:     number;
  t:     number;
  mode:  'render' | 'redux' | 'zustand';
  pts:   Array<{ x: number; y: number; progress: number; color: string }>;
  theme: ThemeMode;
}

const STATE: ReactAnimState = {
  ctx:   null,
  W:     0,
  H:     0,
  t:     0,
  mode:  'render',
  pts:   [],
  theme: 'light',
};

const loop = createAnimationLoop(animFrame);

// ── Public API ────────────────────────────────────────────────────────────

/**
 * initReact
 * Initialise the canvas, set up sizing, and start the animation.
 * Safe to call multiple times — stops the previous loop first.
 */
export function initReact(canvas: HTMLCanvasElement, theme: ThemeMode = 'light'): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  loop.stop();

  const dpr  = window.devicePixelRatio || 1;
  const W    = canvas.offsetWidth;
  const H    = Number(canvas.dataset['h'] ?? 320);

  canvas.width  = W * dpr;
  canvas.height = H * dpr;
  canvas.style.width  = `${W}px`;
  canvas.style.height = `${H}px`;
  ctx.scale(dpr, dpr);

  STATE.ctx   = ctx;
  STATE.W     = W;
  STATE.H     = H;
  STATE.t     = 0;
  STATE.pts   = [];
  STATE.theme = theme;

  loop.start();
}

/**
 * reactAnim
 * Switch the animation mode (triggered by control buttons).
 */
export function reactAnim(mode: string, _canvas?: HTMLCanvasElement): void {
  if (mode === 'render' || mode === 'redux' || mode === 'zustand') {
    STATE.mode = mode;
    STATE.pts  = [];
    STATE.t    = 0;
  }
}

// ── Drawing ───────────────────────────────────────────────────────────────

function animFrame(): void {
  const { ctx, W, H, theme } = STATE;
  if (!ctx) return;

  STATE.t++;

  const dark   = theme === 'dark';
  const bg     = dark ? '#0d0b1e' : '#0d0b1e'; // canvas always dark
  const purple = '#8b7ae8';
  const blue   = '#60a5fa';
  const green  = '#34d399';
  const orange = '#f59e0b';

  ctx.clearRect(0, 0, W, H);
  rr(ctx, 0, 0, W, H, 0, bg);

  if (STATE.mode === 'render') {
    drawRenderMode(ctx, W, H, purple, blue, green, orange);
  } else if (STATE.mode === 'redux') {
    drawReduxMode(ctx, W, H, purple, blue, green, orange);
  } else {
    drawZustandMode(ctx, W, H, purple, blue, green, orange);
  }
}

function drawRenderMode(
  ctx: CanvasRenderingContext2D,
  W: number, H: number,
  purple: string, blue: string, green: string, orange: string
): void {
  const t = STATE.t;

  // Component tree nodes
  const nodes = [
    { x: W * 0.5,  y: H * 0.15, label: 'App',       color: purple, r: 28 },
    { x: W * 0.28, y: H * 0.38, label: 'Nav',        color: blue,   r: 22 },
    { x: W * 0.72, y: H * 0.38, label: 'Router',     color: green,  r: 22 },
    { x: W * 0.18, y: H * 0.62, label: 'Header',     color: orange, r: 18 },
    { x: W * 0.38, y: H * 0.62, label: 'Sidebar',    color: purple, r: 18 },
    { x: W * 0.62, y: H * 0.62, label: 'Page',       color: blue,   r: 18 },
    { x: W * 0.82, y: H * 0.62, label: 'Footer',     color: green,  r: 18 },
  ];

  const edges = [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]];

  // Draw edges
  edges.forEach(([a, b]) => {
    const na = nodes[a], nb = nodes[b];
    ctx.beginPath();
    ctx.moveTo(na.x, na.y);
    ctx.lineTo(nb.x, nb.y);
    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    ctx.lineWidth   = 1.2;
    ctx.stroke();

    // Animated pulse along edge
    const prog = ((t * 0.012) + a * 0.25) % 1;
    dot(ctx, lerp(na.x, nb.x, prog), lerp(na.y, nb.y, prog), na.color, 3, 0.7);
  });

  // Draw nodes
  nodes.forEach(n => {
    glow(ctx, n.x, n.y, n.r * 2, n.color);
    rr(ctx, n.x - n.r, n.y - n.r, n.r * 2, n.r * 2, n.r,
       hexToRgba(n.color, 0.25), n.color, 1.5);
    txt(ctx, n.label, n.x, n.y, 10, '#fff', 'center', 600);
  });
}

function drawReduxMode(
  ctx: CanvasRenderingContext2D,
  W: number, H: number,
  purple: string, blue: string, green: string, orange: string
): void {
  const t = STATE.t;

  const steps = [
    { x: W * 0.1,  y: H * 0.5, label: 'Component', sub: 'dispatch()',  color: purple },
    { x: W * 0.3,  y: H * 0.5, label: 'Action',    sub: '{ type }',    color: blue   },
    { x: W * 0.5,  y: H * 0.5, label: 'Middleware', sub: 'thunk/saga', color: orange },
    { x: W * 0.7,  y: H * 0.5, label: 'Reducer',   sub: 'pure fn',     color: green  },
    { x: W * 0.9,  y: H * 0.5, label: 'Store',     sub: 'new state',   color: purple },
  ];

  const BOX_W = 68, BOX_H = 44;

  steps.forEach((s, i) => {
    rr(ctx, s.x - BOX_W/2, s.y - BOX_H/2, BOX_W, BOX_H, 10,
       hexToRgba(s.color, 0.15), s.color, 1.5);
    txt(ctx, s.label, s.x, s.y - 6, 10, '#fff', 'center', 700);
    txt(ctx, s.sub, s.x, s.y + 9, 9, s.color, 'center', 400);

    if (i < steps.length - 1) {
      const nx = steps[i + 1];
      arrow(ctx, s.x + BOX_W/2 + 4, s.y, nx.x - BOX_W/2 - 4, s.y, s.color);
      // Animated packet
      const prog = ((t * 0.01) + i * 0.2) % 1;
      dot(ctx,
        lerp(s.x + BOX_W/2, nx.x - BOX_W/2, easeOut(prog)),
        s.y, s.color, 4, 0.9);
    }
  });

  // Label
  txt(ctx, 'Redux Unidirectional Data Flow', W/2, H * 0.2, 11, 'rgba(255,255,255,0.5)', 'center', 600);
}

function drawZustandMode(
  ctx: CanvasRenderingContext2D,
  W: number, H: number,
  purple: string, _blue: string, green: string, orange: string
): void {
  const t = STATE.t;
  const pulse = 0.85 + 0.15 * Math.sin(t * 0.05);

  // Store in center
  const cx = W / 2, cy = H / 2;
  glow(ctx, cx, cy, 60, green);
  rr(ctx, cx - 55, cy - 35, 110, 70, 14,
     hexToRgba(green, 0.2), green, 2);
  txt(ctx, '🐻 Zustand Store', cx, cy - 8, 11, '#fff', 'center', 700);
  txt(ctx, 'state + actions', cx, cy + 10, 9.5, green, 'center', 400);

  // Components orbiting
  const comps = ['Component A', 'Component B', 'Component C'];
  comps.forEach((label, i) => {
    const angle = (i / comps.length) * Math.PI * 2 + t * 0.015;
    const rx = 160, ry = 80;
    const x = cx + Math.cos(angle) * rx;
    const y = cy + Math.sin(angle) * ry;

    // Connection line
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(x, y);
    ctx.strokeStyle = `rgba(108,93,211,0.25)`;
    ctx.lineWidth   = 1;
    ctx.stroke();

    // Packet
    const prog = ((t * 0.012) + i * 0.33) % 1;
    dot(ctx, lerp(cx, x, prog), lerp(cy, y, prog), purple, 3.5, 0.8);

    rr(ctx, x - 50, y - 22, 100, 44, 10,
       hexToRgba(purple, 0.2), purple, 1.5);
    txt(ctx, label, x, y - 4, 10, '#fff', 'center', 600);
    txt(ctx, 'useStore()', x, y + 9, 9, purple, 'center', 400);
  });
}
