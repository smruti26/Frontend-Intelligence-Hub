/**
 * src/utils/canvasHelpers.ts
 * ─────────────────────────────────────────────────────────────────
 * Shared canvas drawing primitives used across all 55+ animations.
 *
 * Extracted from the original monolithic script into pure,
 * tree-shakeable utility functions. Each animation module imports
 * only what it needs.
 *
 * All functions take `ctx` as first argument (no global state).
 */

// ── Math Utilities ────────────────────────────────────────────────────────

/** Linear interpolation */
export const lerp = (a: number, b: number, t: number): number =>
  a + (b - a) * t;

/** Ease-out cubic */
export const easeOut = (t: number): number =>
  1 - Math.pow(1 - t, 3);

/** Clamp a value between min and max */
export const clamp = (v: number, min: number, max: number): number =>
  Math.min(Math.max(v, min), max);

/** Convert hex color (#rrggbb) to rgba(r,g,b,a) string */
export function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

// ── Drawing Primitives ────────────────────────────────────────────────────

/**
 * rr — Rounded Rectangle
 * Draws a filled + optionally stroked rounded rect.
 */
export function rr(
  ctx:    CanvasRenderingContext2D,
  x:      number,
  y:      number,
  w:      number,
  h:      number,
  radius: number,
  fill?:  string,
  stroke?: string,
  strokeW?: number
): void {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, radius);
  if (fill)   { ctx.fillStyle = fill;     ctx.fill(); }
  if (stroke) {
    ctx.strokeStyle  = stroke;
    ctx.lineWidth    = strokeW ?? 1;
    ctx.stroke();
  }
}

/**
 * txt — Text with alignment and weight
 */
export function txt(
  ctx:    CanvasRenderingContext2D,
  text:   string,
  x:      number,
  y:      number,
  size:   number,
  color:  string,
  align:  CanvasTextAlign = 'left',
  weight: number | string = 400
): void {
  ctx.font         = `${weight} ${size}px 'DM Mono', 'Fira Mono', monospace`;
  ctx.fillStyle    = color;
  ctx.textAlign    = align;
  ctx.textBaseline = 'middle';
  ctx.fillText(text, x, y);
}

/**
 * glow — Radial glow effect around a point
 */
export function glow(
  ctx:   CanvasRenderingContext2D,
  x:     number,
  y:     number,
  r:     number,
  color: string
): void {
  const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
  // Derive rgba from the color string
  const base  = color.length > 7 ? color.slice(0, 7) : color;
  grad.addColorStop(0, hexToRgba(base, 0.35));
  grad.addColorStop(1, hexToRgba(base, 0));
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();
}

/**
 * dot — Filled circle
 */
export function dot(
  ctx:   CanvasRenderingContext2D,
  x:     number,
  y:     number,
  color: string,
  r:     number = 4,
  alpha: number = 1
): void {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = alpha < 1
    ? hexToRgba(color.length > 7 ? color.slice(0, 7) : color, alpha)
    : color;
  ctx.fill();
}

/**
 * arrow — Directional arrow between two points
 */
export function arrow(
  ctx:    CanvasRenderingContext2D,
  x1:     number,
  y1:     number,
  x2:     number,
  y2:     number,
  color:  string,
  dashed: boolean = false
): void {
  const headLen = 8;
  const angle   = Math.atan2(y2 - y1, x2 - x1);

  ctx.beginPath();
  if (dashed) ctx.setLineDash([4, 3]);
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth   = 1.5;
  ctx.stroke();
  ctx.setLineDash([]);

  // Arrowhead
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(
    x2 - headLen * Math.cos(angle - Math.PI / 6),
    y2 - headLen * Math.sin(angle - Math.PI / 6)
  );
  ctx.moveTo(x2, y2);
  ctx.lineTo(
    x2 - headLen * Math.cos(angle + Math.PI / 6),
    y2 - headLen * Math.sin(angle + Math.PI / 6)
  );
  ctx.strokeStyle = color;
  ctx.lineWidth   = 1.5;
  ctx.stroke();
}

// ── Animation Frame Manager ───────────────────────────────────────────────

/**
 * createAnimationLoop
 * Returns start/stop functions for a named animation loop.
 * Prevents multiple concurrent loops for the same canvas.
 */
export function createAnimationLoop(
  drawFn: (timestamp: number) => void
): { start: () => void; stop: () => void } {
  let rafId: number | null = null;

  const loop = (ts: number) => {
    drawFn(ts);
    rafId = requestAnimationFrame(loop);
  };

  return {
    start: () => {
      if (rafId !== null) return; // Already running
      rafId = requestAnimationFrame(loop);
    },
    stop: () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    },
  };
}
