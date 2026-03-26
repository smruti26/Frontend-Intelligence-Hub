/**
 * src/hocs/withLazyCanvas.tsx
 * ─────────────────────────────────────────────────────────────────
 * HOC: withLazyCanvas
 *
 * Defers expensive canvas animation initialization until the
 * canvas element scrolls into the viewport (IntersectionObserver).
 * This is the highest-impact performance HOC — the app has 55
 * canvas animations that should NOT all run on load.
 *
 * Injects props:
 *   - canvasRef:       attach to your <canvas> element
 *   - isInitialized:   true once IntersectionObserver fires
 *
 * Usage:
 *   const LazyReactCanvas = withLazyCanvas(ReactCanvasPanel);
 *
 *   // Inside ReactCanvasPanel:
 *   function ReactCanvasPanel({ canvasRef, isInitialized }) {
 *     useEffect(() => {
 *       if (isInitialized) initReactAnimation(canvasRef.current);
 *     }, [isInitialized]);
 *     return <canvas ref={canvasRef} />;
 *   }
 */

import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
}                from 'react';

// ── Injected props interface ──────────────────────────────────────────────

export interface WithLazyCanvasProps {
  canvasRef:     React.RefObject<HTMLCanvasElement>;
  isInitialized: boolean;
}

// ── Config options ────────────────────────────────────────────────────────

interface LazyCanvasOptions {
  /** Intersection threshold 0-1 (default 0.1 = 10% visible) */
  threshold?: number;
  /** Delay in ms after intersection before initializing (default 80ms) */
  delay?: number;
}

// ── HOC ──────────────────────────────────────────────────────────────────

function withLazyCanvas<P extends WithLazyCanvasProps>(
  WrappedComponent: React.ComponentType<P>,
  options: LazyCanvasOptions = {}
): React.FC<Omit<P, keyof WithLazyCanvasProps>> {
  const { threshold = 0.1, delay = 80 } = options;

  const displayName =
    WrappedComponent.displayName ?? WrappedComponent.name ?? 'Component';

  const WithLazyCanvas: React.FC<Omit<P, keyof WithLazyCanvasProps>> = (props) => {
    const canvasRef       = useRef<HTMLCanvasElement>(null);
    const [isInit, setInit] = useState(false);
    const timerRef        = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleIntersect = useCallback(
      (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          timerRef.current = setTimeout(() => setInit(true), delay);
          // Stop observing once initialized — no need to watch anymore
          observer.disconnect();
        }
      },
      [delay]
    );

    useEffect(() => {
      const el = canvasRef.current;
      if (!el) return;

      const observer = new IntersectionObserver(handleIntersect, { threshold });
      observer.observe(el);

      return () => {
        observer.disconnect();
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }, [handleIntersect, threshold]);

    return (
      <WrappedComponent
        {...(props as P)}
        canvasRef={canvasRef}
        isInitialized={isInit}
      />
    );
  };

  WithLazyCanvas.displayName = `withLazyCanvas(${displayName})`;
  return WithLazyCanvas;
}

export default withLazyCanvas;
