/**
 * src/hocs/withTheme.tsx
 * ─────────────────────────────────────────────────────────────────
 * HOC: withTheme
 *
 * Injects the current theme ('light' | 'dark') as a prop into
 * any wrapped component. Use this when a component needs to make
 * imperative decisions based on the theme (e.g. canvas drawing
 * colors, third-party chart configs).
 *
 * Components that only need CSS-variable-based styling do NOT need
 * this HOC — they get theme for free via data-theme CSS variables.
 *
 * Usage:
 *   const ThemedCanvas = withTheme(MyCanvasComponent);
 *   // MyCanvasComponent receives: { ...ownProps, theme: 'dark' }
 *
 * Pattern: HOC wraps the component, subscribes to Redux, passes
 * theme down as a prop. The wrapped component stays pure and
 * testable without the HOC.
 */

import React         from 'react';
import { useAppSelector } from '@app/hooks';
import type { WithThemeProps } from '@appTypes';

/**
 * withTheme<P>
 * @param WrappedComponent — any component that accepts WithThemeProps
 * @returns A new component with the same props minus `theme` (injected)
 */
function withTheme<P extends WithThemeProps>(
  WrappedComponent: React.ComponentType<P>
): React.FC<Omit<P, keyof WithThemeProps>> {
  const displayName =
    WrappedComponent.displayName ?? WrappedComponent.name ?? 'Component';

  const WithTheme: React.FC<Omit<P, keyof WithThemeProps>> = (props) => {
    const theme = useAppSelector(s => s.theme.mode);

    return (
      <WrappedComponent
        {...(props as P)}
        theme={theme}
      />
    );
  };

  // Preserve display name for React DevTools
  WithTheme.displayName = `withTheme(${displayName})`;

  return WithTheme;
}

export default withTheme;
