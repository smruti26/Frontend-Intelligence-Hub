/**
 * src/app/hooks.ts
 * ─────────────────────────────────────────────────────────────────
 * Pre-typed versions of useSelector and useDispatch.
 *
 * Always import these instead of the plain react-redux versions
 * so you get full TypeScript inference on state and dispatch.
 *
 * Usage:
 *   import { useAppSelector, useAppDispatch } from '@app/hooks';
 *   const tab   = useAppSelector(s => s.navigation.activeTab);
 *   const dispatch = useAppDispatch();
 */

import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

/** Typed useDispatch — knows all slice actions and thunks */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/** Typed useSelector — full RootState inference */
export const useAppSelector = <T>(selector: (state: RootState) => T): T =>
  useSelector(selector);
