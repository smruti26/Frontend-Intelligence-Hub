/**
 * src/components/canvas/CanvasPanel.tsx
 * ─────────────────────────────────────────────────────────────────
 * Generic canvas panel used by every animated diagram.
 *
 * Combines:
 *   - withLazyCanvas HOC  → deferred init via IntersectionObserver
 *   - withErrorBoundary HOC → graceful error handling per panel
 *   - AnimationControls   → standardised button row
 *
 * Each specific panel (ReactPanel, GraphQLPanel, etc.) renders a
 * CanvasPanel and provides its own `onInit` and `controls`.
 *
 * Usage:
 *   <CanvasPanel
 *     id="cvs-react"
 *     height={320}
 *     tag="React Reconciler"
 *     controls={[
 *       { label: '⚛ Component Render', action: 'render' },
 *       { label: '🏪 Redux Flow',       action: 'redux' },
 *     ]}
 *     onInit={(canvas) => initReact(canvas)}
 *     onControl={(action, canvas) => reactAnim(action, canvas)}
 *   />
 */

import React, { useEffect, useCallback } from 'react';
import withLazyCanvas, { WithLazyCanvasProps } from '@hocs/withLazyCanvas';
import withErrorBoundary from '@hocs/withErrorBoundary';
import type { AnimButton } from '@appTypes';

// ── Props ─────────────────────────────────────────────────────────────────

interface CanvasPanelProps extends WithLazyCanvasProps {
  id:          string;
  height?:     number;
  tag?:        string;
  controls?:   AnimButton[];
  /** Called once when the canvas is ready to be painted */
  onInit?:     (canvas: HTMLCanvasElement) => void;
  /** Called when a control button is pressed */
  onControl?:  (action: string, canvas: HTMLCanvasElement) => void;
}

// ── Inner component (before HOC wrapping) ────────────────────────────────

function CanvasPanelInner({
  id,
  height   = 300,
  tag,
  controls = [],
  onInit,
  onControl,
  canvasRef,
  isInitialized,
}: CanvasPanelProps) {

  // Trigger init callback when IntersectionObserver fires
  useEffect(() => {
    if (isInitialized && canvasRef.current && onInit) {
      onInit(canvasRef.current);
    }
  }, [isInitialized, canvasRef, onInit]);

  const handleControl = useCallback(
    (action: string) => {
      if (canvasRef.current && onControl) {
        onControl(action, canvasRef.current);
      }
    },
    [canvasRef, onControl]
  );

  return (
    <div className="canvas-card">
      {/* The canvas element — ref attached by withLazyCanvas HOC */}
      <canvas
        ref={canvasRef}
        id={id}
        data-h={height}
        style={{ display: 'block', width: '100%', height: `${height}px` }}
        aria-label={tag ?? 'Animated diagram'}
        role="img"
      />

      {/* Control buttons + tag */}
      {(controls.length > 0 || tag) && (
        <div className="canvas-controls">
          {controls.map((btn) => (
            <button
              key={btn.action}
              className="cbtn"
              onClick={() => handleControl(btn.action)}
            >
              {btn.label}
            </button>
          ))}
          {tag && <div className="canvas-tag">{tag}</div>}
        </div>
      )}
    </div>
  );
}

// ── Apply HOCs ────────────────────────────────────────────────────────────

// 1. Wrap with lazy canvas init (IntersectionObserver)
const LazyCanvasPanel = withLazyCanvas(CanvasPanelInner, { threshold: 0.1, delay: 80 });

// 2. Wrap with error boundary so a broken animation never crashes the app
const CanvasPanel = withErrorBoundary(LazyCanvasPanel);

export default CanvasPanel;
export type { CanvasPanelProps };
