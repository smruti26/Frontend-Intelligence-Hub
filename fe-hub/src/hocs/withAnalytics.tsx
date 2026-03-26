/**
 * src/hocs/withAnalytics.tsx
 * ─────────────────────────────────────────────────────────────────
 * HOC: withAnalytics
 *
 * Injects a `trackEvent` function into any component so it can
 * fire analytics events without coupling to a specific provider.
 * Swap the implementation in one place (analyticsService) to
 * change the provider (GA4, Amplitude, Segment, etc.).
 *
 * Usage:
 *   const TrackedQACard = withAnalytics(QACard);
 *   // QACard receives: { ...props, trackEvent }
 *   // Inside QACard: trackEvent('qa_card_opened', { id: 42 });
 */

import React, { useCallback }  from 'react';
import type { WithAnalyticsProps } from '@appTypes';

// ── Analytics Service (swap implementation freely) ────────────────────────

interface AnalyticsEvent {
  name: string;
  data?: Record<string, unknown>;
}

/**
 * analyticsService
 * Replace this implementation to point at GA4, Amplitude, Segment, etc.
 * The HOC and all consumers remain unchanged.
 */
const analyticsService = {
  track({ name, data }: AnalyticsEvent): void {
    if (process.env.NODE_ENV === 'development') {
      console.debug('[Analytics]', name, data ?? {});
    }

    // Production: uncomment and configure your provider
    // gtag('event', name, data);
    // amplitude.track(name, data);
    // analytics.track(name, { properties: data });
  },
};

// ── HOC ──────────────────────────────────────────────────────────────────

function withAnalytics<P extends WithAnalyticsProps>(
  WrappedComponent: React.ComponentType<P>
): React.FC<Omit<P, keyof WithAnalyticsProps>> {
  const displayName =
    WrappedComponent.displayName ?? WrappedComponent.name ?? 'Component';

  const WithAnalytics: React.FC<Omit<P, keyof WithAnalyticsProps>> = (props) => {
    const trackEvent = useCallback(
      (name: string, data?: Record<string, unknown>) => {
        analyticsService.track({ name, data });
      },
      []
    );

    return (
      <WrappedComponent
        {...(props as P)}
        trackEvent={trackEvent}
      />
    );
  };

  WithAnalytics.displayName = `withAnalytics(${displayName})`;
  return WithAnalytics;
}

export default withAnalytics;
