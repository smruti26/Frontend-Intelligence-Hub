/**
 * src/hooks/useKeyboardShortcut.ts
 * ─────────────────────────────────────────────────────────────────
 * Custom hook: useKeyboardShortcut
 *
 * Registers a global keydown handler that fires a callback when
 * the specified key (and optional modifier) is pressed.
 * Auto-cleans up on unmount.
 *
 * Usage:
 *   // Focus search on '/'
 *   useKeyboardShortcut('/', () => focusSearch(), { preventDefault: true });
 *
 *   // Close on 'Escape'
 *   useKeyboardShortcut('Escape', () => dispatch(closeDropdown()));
 */

import { useEffect, useCallback } from 'react';

interface ShortcutOptions {
  /** Prevent the browser's default action for this key */
  preventDefault?: boolean;
  /** Only fire when not inside an input/textarea */
  ignoreInInputs?: boolean;
}

export function useKeyboardShortcut(
  key:      string,
  callback: (e: KeyboardEvent) => void,
  options:  ShortcutOptions = {}
): void {
  const { preventDefault = false, ignoreInInputs = true } = options;

  const handler = useCallback(
    (e: KeyboardEvent) => {
      // Optionally skip when the user is typing in an input
      if (ignoreInInputs) {
        const tag = (e.target as HTMLElement)?.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      }

      if (e.key === key) {
        if (preventDefault) e.preventDefault();
        callback(e);
      }
    },
    [key, callback, preventDefault, ignoreInInputs]
  );

  useEffect(() => {
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [handler]);
}
