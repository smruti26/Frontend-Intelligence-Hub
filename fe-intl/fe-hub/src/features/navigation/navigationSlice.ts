/**
 * src/features/navigation/navigationSlice.ts
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { TabKey }                from '@appTypes';

const STORAGE_KEY = 'fe-hub-active-tab';

function getInitialTab(): TabKey {
  // Always start on 'react' tab (per requirements)
  // localStorage persistence is handled by setActiveTab action
  return 'react';
}

interface NavigationState {
  activeTab:      TabKey;
  scrollTarget:   string | null;
  mobileMenuOpen: boolean;
}

const initialState: NavigationState = {
  activeTab:      getInitialTab(),
  scrollTarget:   null,
  mobileMenuOpen: false,
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setActiveTab(state, action: PayloadAction<TabKey>) {
      state.activeTab    = action.payload;
      state.scrollTarget = null;
      try {
        if (typeof localStorage !== 'undefined')
          localStorage.setItem(STORAGE_KEY, action.payload);
      } catch { /* ignore */ }
    },
    navigateToSection(state, action: PayloadAction<{ tab: TabKey; sectionId: string }>) {
      state.activeTab    = action.payload.tab;
      state.scrollTarget = action.payload.sectionId;
    },
    clearScrollTarget(state) {
      state.scrollTarget = null;
    },
    toggleMobileMenu(state) {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    closeMobileMenu(state) {
      state.mobileMenuOpen = false;
    },
  },
});

export const {
  setActiveTab,
  navigateToSection,
  clearScrollTarget,
  toggleMobileMenu,
  closeMobileMenu,
} = navigationSlice.actions;

export default navigationSlice.reducer;
