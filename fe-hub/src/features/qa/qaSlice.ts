/**
 * src/features/qa/qaSlice.ts
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { QAState, QACategory }   from '@appTypes';

const initialState: QAState = {
  activeFilter: 'all',
  openCardId:   null,
};

const qaSlice = createSlice({
  name: 'qa',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<QACategory | 'all'>) {
      state.activeFilter = action.payload;
      state.openCardId   = null;
    },
    toggleCard(state, action: PayloadAction<number>) {
      state.openCardId =
        state.openCardId === action.payload ? null : action.payload;
    },
    closeAllCards(state) {
      state.openCardId = null;
    },
  },
});

export const { setFilter, toggleCard, closeAllCards } = qaSlice.actions;
export default qaSlice.reducer;
