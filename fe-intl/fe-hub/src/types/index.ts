/**
 * src/types/index.ts — Central TypeScript type definitions
 */

// ── Navigation ────────────────────────────────────────────────────────────

export type TabKey =
  | 'react' | 'graphql' | 'angular' | 'vue' | 'browser'
  | 'engine' | 'es6' | 'react-adv' | 'react19' | 'build'
  | 'nextjs' | 'patterns' | 'vitals' | 'security' | 'testing'
  | 'prepqa' | 'backend' | 'cicd' | 'hca' | 'sdlc';

export interface SidebarItem {
  readonly label:    string;
  readonly id:       string;
  readonly qaFilter?: string;
}

export type SidebarData = Record<TabKey, SidebarItem[]>;

// ── Theme ─────────────────────────────────────────────────────────────────

export type ThemeMode = 'light' | 'dark';

export interface ThemeState {
  readonly mode: ThemeMode;
}

// ── Q&A ───────────────────────────────────────────────────────────────────

export type QACategory =
  | 'arch' | 'perf' | 'design' | 'infra' | 'collab' | 'security'
  | 'react-redux' | 'javascript' | 'sysdesign' | 'nextjs-qa'
  | 'angular-qa' | 'vue-qa' | 'graphql-qa' | 'webpack-vite';

export interface QATag {
  readonly t: string;
  readonly c: string;
  readonly b: string;
}

export interface QAEntry {
  readonly id:   number;
  readonly cat:  string;
  readonly q:    string;
  readonly a:    string;
  readonly tags: QATag[];
}

export interface QACategoryMeta {
  readonly label: string;
  readonly color: string;
  readonly bg:    string;
}

export interface QAState {
  activeFilter: QACategory | 'all';
  openCardId:   number | null;
}

// ── Search ────────────────────────────────────────────────────────────────

export type SearchResultType = 'module' | 'section';

export interface SearchResult {
  readonly type:      SearchResultType;
  readonly tabKey:    TabKey;
  readonly sectionId: string | null;
  readonly title:     string;
  readonly module:    string;
  readonly qaFilter?: string;
}

export interface SearchState {
  query:     string;
  results:   SearchResult[];
  isOpen:    boolean;
  activeIdx: number;
}

// ── HOC Props ─────────────────────────────────────────────────────────────

export interface WithThemeProps {
  theme: ThemeMode;
}

export interface WithAnalyticsProps {
  trackEvent: (name: string, data?: Record<string, unknown>) => void;
}

export interface WithErrorBoundaryProps {
  onError?: (error: Error) => void;
}
