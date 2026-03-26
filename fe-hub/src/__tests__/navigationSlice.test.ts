/**
 * navigationSlice.test.ts — Redux navigation state tests
 */
import navigationReducer, {
  setActiveTab, navigateToSection, clearScrollTarget,
  toggleMobileMenu, closeMobileMenu,
} from '../features/navigation/navigationSlice';

const initial = { activeTab: 'react' as const, scrollTarget: null, mobileMenuOpen: false };

describe('navigationSlice', () => {
  it('returns initial state', () => {
    expect(navigationReducer(undefined, { type: '' })).toMatchObject({
      activeTab: 'react', scrollTarget: null, mobileMenuOpen: false,
    });
  });

  it('setActiveTab updates the active tab', () => {
    const state = navigationReducer(initial, setActiveTab('graphql'));
    expect(state.activeTab).toBe('graphql');
  });

  it('setActiveTab clears scrollTarget', () => {
    const withScroll = { ...initial, scrollTarget: 'react-arch' };
    const state = navigationReducer(withScroll, setActiveTab('angular'));
    expect(state.scrollTarget).toBeNull();
  });

  it('navigateToSection sets tab and scrollTarget', () => {
    const state = navigationReducer(initial, navigateToSection({ tab: 'react', sectionId: 'react-arch' }));
    expect(state.activeTab).toBe('react');
    expect(state.scrollTarget).toBe('react-arch');
  });

  it('clearScrollTarget nullifies scrollTarget', () => {
    const withScroll = { ...initial, scrollTarget: 'some-section' };
    const state = navigationReducer(withScroll, clearScrollTarget());
    expect(state.scrollTarget).toBeNull();
  });

  it('toggleMobileMenu flips mobileMenuOpen', () => {
    const s1 = navigationReducer(initial, toggleMobileMenu());
    expect(s1.mobileMenuOpen).toBe(true);
    const s2 = navigationReducer(s1, toggleMobileMenu());
    expect(s2.mobileMenuOpen).toBe(false);
  });

  it('closeMobileMenu sets mobileMenuOpen to false', () => {
    const open = { ...initial, mobileMenuOpen: true };
    const state = navigationReducer(open, closeMobileMenu());
    expect(state.mobileMenuOpen).toBe(false);
  });

  it('supports all 20 valid tab keys', () => {
    const tabs = ['react','graphql','angular','vue','browser','engine','es6','react-adv',
                  'react19','build','nextjs','patterns','vitals','security','testing',
                  'prepqa','backend','cicd','hca','sdlc'] as const;
    tabs.forEach(tab => {
      const state = navigationReducer(initial, setActiveTab(tab as any));
      expect(state.activeTab).toBe(tab);
    });
  });
});
