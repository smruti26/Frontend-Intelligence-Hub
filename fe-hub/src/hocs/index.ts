/**
 * src/hocs/index.ts
 * ─────────────────────────────────────────────────────────────────
 * Barrel export for all Higher-Order Components.
 *
 * Import HOCs from '@hocs' rather than deep paths:
 *   import { withTheme, withErrorBoundary } from '@hocs';
 *
 * HOC Catalogue:
 * ┌─────────────────────┬──────────────────────────────────────────────┐
 * │ HOC                 │ Purpose                                       │
 * ├─────────────────────┼──────────────────────────────────────────────┤
 * │ withTheme           │ Injects theme: 'light'|'dark' prop            │
 * │ withErrorBoundary   │ Wraps in Error Boundary with fallback UI      │
 * │ withAnalytics       │ Injects trackEvent() for analytics events     │
 * │ withLazyCanvas      │ Defers canvas init via IntersectionObserver   │
 * └─────────────────────┴──────────────────────────────────────────────┘
 */

export { default as withTheme }         from './withTheme';
export { default as withErrorBoundary } from './withErrorBoundary';
export { default as withAnalytics }     from './withAnalytics';
export { default as withLazyCanvas }    from './withLazyCanvas';
export type { WithLazyCanvasProps }     from './withLazyCanvas';
