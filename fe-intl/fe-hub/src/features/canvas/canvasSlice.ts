/**
 * src/features/canvas/canvasSlice.ts
 * ─────────────────────────────────────────────────────────────────
 * Tracks which panels have had their canvas animations initialized.
 *
 * Why Redux for this:
 *  - Prevents double-init when tab switches back
 *  - DevTools visibility into animation state
 *  - Decouples init logic from panel components
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { TabKey }                from '@appTypes';

interface CanvasState {
  initialized:     Partial<Record<TabKey, boolean>>;
  activeCanvasTab: TabKey | null;
}

const initialState: CanvasState = {
  initialized:    {},
  activeCanvasTab: null,
};

const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    markInitialized(state, action: PayloadAction<TabKey>) {
      state.initialized[action.payload] = true;
      state.activeCanvasTab = action.payload;
    },
    resetInitialized(state, action: PayloadAction<TabKey>) {
      delete state.initialized[action.payload];
    },
    resetAll(state) {
      state.initialized    = {};
      state.activeCanvasTab = null;
    },
  },
});

export const { markInitialized, resetInitialized, resetAll } = canvasSlice.actions;
export default canvasSlice.reducer;
