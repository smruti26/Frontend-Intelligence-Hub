/**
 * src/hooks/useCanvas.ts
 * ─────────────────────────────────────────────────────────────────
 * Custom hook: useCanvas
 *
 * Handles the boilerplate every canvas animation needs:
 *   1. Get 2D context from a canvas ref
 *   2. Resize canvas to its container with devicePixelRatio scaling
 *   3. Re-resize on window resize (debounced)
 *   4. Cancel animation frame on unmount
 *
 * Returns { ctx, W, H, dpr } — all needed to draw.
 *
 * Usage:
 *   const { ctx, W, H } = useCanvas(canvasRef);
 *   useEffect(() => {
 *     if (!ctx) return;
 *     ctx.fillRect(0, 0, W, H);
 *   }, [ctx, W, H]);
 */

import { useState, useEffect, useCallback } from 'react';

interface CanvasSize {
  ctx: CanvasRenderingContext2D | null;
  W:   number;
  H:   number;
  dpr: number;
}

export function useCanvas(
  ref: React.RefObject<HTMLCanvasElement>,
  height?: number
): CanvasSize {
  const [size, setSize] = useState<CanvasSize>({
    ctx: null,
    W:   0,
    H:   height ?? 300,
    dpr: window.devicePixelRatio ?? 1,
  });

  const setup = useCallback(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr      = window.devicePixelRatio || 1;
    const rect     = canvas.parentElement?.getBoundingClientRect();
    const cssW     = rect?.width  ?? canvas.offsetWidth  ?? 600;
    const cssH     = height ?? Number(canvas.dataset['h'] ?? 300);

    // Set actual pixel dimensions (accounts for Retina)
    canvas.width   = cssW * dpr;
    canvas.height  = cssH * dpr;

    // Scale CSS display size
    canvas.style.width  = `${cssW}px`;
    canvas.style.height = `${cssH}px`;

    // Scale context so we draw in CSS pixels
    ctx.scale(dpr, dpr);

    setSize({ ctx, W: cssW, H: cssH, dpr });
  }, [ref, height]);

  useEffect(() => {
    setup();

    let debounce: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(debounce);
      debounce = setTimeout(setup, 100);
    };

    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      clearTimeout(debounce);
    };
  }, [setup]);

  return size;
}
