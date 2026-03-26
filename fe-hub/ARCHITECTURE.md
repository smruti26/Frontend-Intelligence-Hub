# Frontend Architecture Hub — Enterprise React 19 Architecture

## Table of Contents
1. [Architecture Overview](#1-architecture-overview)
2. [Project Structure](#2-project-structure)
3. [Technology Stack](#3-technology-stack)
4. [Webpack Configuration](#4-webpack-configuration)
5. [Redux State Management](#5-redux-state-management)
6. [Higher-Order Components (HOC) Catalogue](#6-higher-order-components-hoc-catalogue)
7. [Custom Hooks](#7-custom-hooks)
8. [Component Architecture](#8-component-architecture)
9. [Lazy Loading Strategy](#9-lazy-loading-strategy)
10. [Design Token System](#10-design-token-system)
11. [Adding New Sections](#11-adding-new-sections)
12. [Testing Strategy](#12-testing-strategy)
13. [Performance Budget](#13-performance-budget)
14. [Migration from HTML to React](#14-migration-from-html-to-react)

---

## 1. Architecture Overview

```
┌──────────────────────────────────────────────────────────────────────┐
│                     FRONTEND ARCHITECTURE HUB                        │
│                    React 19 · Redux · Webpack 5                      │
├──────────────────────────────────────────────────────────────────────┤
│                                                                       │
│   src/index.tsx                                                       │
│        │                                                              │
│        ▼                                                              │
│   <Provider store={store}>        ← Redux Provider (root)            │
│     <App />                       ← Root component                   │
│       ├── <WelcomeScreen />       ← Splash (lazy, first visit only)  │
│       ├── <Header />              ← Nav + Search + ThemeToggle       │
│       └── <Layout>                                                    │
│             ├── <Sidebar />       ← Section navigator                │
│             └── <main>                                                │
│                   └── [TabPanel × 20]  ← React.lazy per panel       │
│                         └── <PrepQAPanel />                          │
│                               ├── <QAFilterBar />                    │
│                               └── <QAGrid />                         │
│                                     └── <QACard × N />               │
│                                                                       │
├──────────────────────────────────────────────────────────────────────┤
│                         REDUX STORE                                   │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐     │
│  │ navigation │  │   theme    │  │     qa     │  │   search   │     │
│  │ activeTab  │  │   mode     │  │ activeFltr │  │   query    │     │
│  │ scrollTgt  │  │            │  │ openCardId │  │  results   │     │
│  │ mobileOpen │  │            │  │            │  │  isOpen    │     │
│  └────────────┘  └────────────┘  └────────────┘  └────────────┘     │
│                                                                       │
├──────────────────────────────────────────────────────────────────────┤
│                        HOC PIPELINE                                   │
│                                                                       │
│  Component → withTheme → withAnalytics → withErrorBoundary           │
│  CanvasPanel → withLazyCanvas → withErrorBoundary                     │
│                                                                       │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 2. Project Structure

```
fe-hub/
├── public/
│   ├── index.html              HTML shell template
│   └── favicon.ico
│
├── src/
│   ├── index.tsx               Entry point (createRoot + Provider)
│   │
│   ├── app/
│   │   ├── App.tsx             Root component
│   │   ├── store.ts            Redux store (configureStore)
│   │   └── hooks.ts            useAppSelector, useAppDispatch
│   │
│   ├── assets/
│   │   └── styles/
│   │       ├── tokens.css      Design tokens (CSS variables, light+dark)
│   │       ├── globals.css     Reset + base styles
│   │       ├── components.css  Shared component styles
│   │       └── animations.css  Keyframes + motion utilities
│   │
│   ├── components/
│   │   ├── common/
│   │   │   └── Button.tsx      Reusable button (variants: primary/ghost/canvas/filter)
│   │   ├── canvas/
│   │   │   └── CanvasPanel.tsx Lazy canvas wrapper (uses withLazyCanvas + withErrorBoundary)
│   │   ├── layout/
│   │   │   ├── Header.tsx      Top nav (Brand + SearchBar + ThemeToggle + TabNav)
│   │   │   ├── Sidebar.tsx     Left nav (section links + all-sections list)
│   │   │   └── TabPanel.tsx    Lazy panel wrapper (React.lazy + Suspense + ErrorBoundary)
│   │   ├── qa/
│   │   │   ├── QAFilterBar.tsx Category filter button row
│   │   │   ├── QACard.tsx      Single Q&A accordion (withAnalytics)
│   │   │   └── QAGrid.tsx      Filtered grid of QACards
│   │   ├── search/
│   │   │   └── SearchBar.tsx   Global search (keyboard nav, dropdown, Redux)
│   │   └── welcome/
│   │       └── WelcomeScreen.tsx Animated splash screen
│   │
│   ├── constants/
│   │   ├── tabs.ts             TAB_NAMES, TAB_COLORS, TAB_GRADIENTS, SIDEBAR_DATA
│   │   └── qaData.ts           QA_DATA[220], QA_CAT_META, QA_CATEGORIES
│   │
│   ├── features/               Redux slices (RTK)
│   │   ├── navigation/
│   │   │   └── navigationSlice.ts  setActiveTab, navigateToSection, scrollTarget
│   │   ├── theme/
│   │   │   └── themeSlice.ts       toggleTheme, setTheme, DOM sync
│   │   ├── qa/
│   │   │   └── qaSlice.ts          setFilter, toggleCard, selectFilteredQA (memoised)
│   │   └── search/
│   │       └── searchSlice.ts      setQuery, lazy search index, moveActiveIdx
│   │
│   ├── hocs/                   Higher-Order Components
│   │   ├── index.ts            Barrel export
│   │   ├── withTheme.tsx       Injects theme: ThemeMode prop
│   │   ├── withErrorBoundary.tsx Wraps in Error Boundary + fallback UI
│   │   ├── withAnalytics.tsx   Injects trackEvent() — provider-agnostic
│   │   └── withLazyCanvas.tsx  IntersectionObserver-based deferred canvas init
│   │
│   ├── hooks/
│   │   ├── useCanvas.ts        Canvas resize + devicePixelRatio setup
│   │   ├── useScrollToSection.ts Watches Redux scrollTarget, executes scroll
│   │   └── useKeyboardShortcut.ts Global keydown listener (/, Escape, etc.)
│   │
│   ├── panels/                 One file per tab section (lazy-loaded)
│   │   ├── ReactPanel.tsx      React Architecture
│   │   ├── PrepQAPanel.tsx     Prep Q&A (220 questions)
│   │   └── [...17 more panels]
│   │
│   ├── types/
│   │   └── index.ts            All TypeScript interfaces and types
│   │
│   └── utils/
│       ├── canvasHelpers.ts    lerp, easeOut, rr, txt, glow, dot, arrow, hexToRgba
│       └── animations/
│           ├── reactAnimations.ts
│           └── [...18 more animation modules]
│
├── webpack/
│   ├── webpack.common.js       Shared: entry, output, loaders, aliases, splitChunks
│   ├── webpack.dev.js          Dev: HMR, React Fast Refresh, eval-source-map
│   └── webpack.prod.js         Prod: Terser, CSS minimizer, hidden source maps, analyzer
│
├── package.json
├── tsconfig.json
└── ARCHITECTURE.md             This file
```

---

## 3. Technology Stack

| Layer            | Technology                    | Version  | Purpose                                      |
|------------------|-------------------------------|----------|----------------------------------------------|
| UI Framework     | React                         | 19       | Concurrent rendering, Server Components ready|
| State Management | Redux Toolkit                 | 2.x      | Slices, Immer, createSelector, DevTools      |
| React-Redux      | react-redux                   | 9.x      | Provider, hooks (useSelector, useDispatch)   |
| Bundler          | Webpack                       | 5        | Code splitting, tree shaking, Module Fed.    |
| Transpiler       | Babel + babel-loader          | 7        | TS/JSX → ES2022, React Fast Refresh          |
| Type Safety      | TypeScript                    | 5.x      | strict mode, exact optional types            |
| Routing          | React Router                  | 6.x      | Client-side routing (optional, future-ready) |
| Styling          | CSS Custom Properties          | —        | Design tokens, no CSS-in-JS overhead         |
| Testing          | Jest + React Testing Library  | 29 / 16  | Unit + integration tests                     |
| HMR              | React Fast Refresh            | 0.14     | State-preserving hot reload                  |
| Bundle Analysis  | webpack-bundle-analyzer       | 4.x      | Visual treemap of chunk sizes                |

---

## 4. Webpack Configuration

### Three-file split (common / dev / prod)

```
webpack/
├── webpack.common.js   ← shared (entry, output, loaders, aliases, splitChunks)
├── webpack.dev.js      ← extends common (HMR, Fast Refresh, eval-source-map)
└── webpack.prod.js     ← extends common (Terser, CSS minifier, hidden maps)
```

### Bundle splitting strategy

```
dist/
├── runtime.[hash].js          Webpack runtime (tiny, changes every build)
├── vendor.react.[hash].js     React + ReactDOM + react-redux + RTK
├── vendor.libs.[hash].js      Other node_modules
├── main.[hash].js             Application core
├── react-panel.[hash].chunk.js      } Lazy-loaded panel chunks
├── prepqa-panel.[hash].chunk.js     } (one per tab, ~20 chunks)
└── react-animations.[hash].chunk.js  Animation modules (dynamic import)
```

### Path aliases

All `@alias` imports map to `src/` subdirectories — configured in both
`webpack.common.js` (resolve.alias) and `tsconfig.json` (paths) so Webpack
and TypeScript both understand them.

```ts
'@app'        → src/app/
'@components' → src/components/
'@features'   → src/features/
'@hooks'      → src/hooks/
'@hocs'       → src/hocs/
'@utils'      → src/utils/
'@constants'  → src/constants/
'@types'      → src/types/
```

---

## 5. Redux State Management

### Store shape

```ts
{
  navigation: {
    activeTab:      TabKey          // 'react' | 'graphql' | ...
    scrollTarget:   string | null   // section ID to scroll to
    mobileMenuOpen: boolean
  },
  theme: {
    mode: 'light' | 'dark'          // persisted in localStorage
  },
  qa: {
    activeFilter:   QACategory | 'all'
    openCardId:     number | null   // accordion — one open at a time
  },
  search: {
    query:     string
    results:   SearchResult[]       // top 12, scored + ranked
    isOpen:    boolean
    activeIdx: number               // keyboard nav index
  }
}
```

### Data flow diagram

```
User click → dispatch(action) → Reducer → New State
                                               │
                                    useAppSelector subscribers
                                               │
                                    Component re-renders
```

### What is NOT in Redux

| Data         | Where it lives         | Reason                             |
|--------------|------------------------|------------------------------------|
| QA_DATA[220] | constants/qaData.ts    | Static, never changes at runtime   |
| SIDEBAR_DATA | constants/tabs.ts      | Static, derived by search slice    |
| Canvas state | Component local state  | Internal animation state (t, pts)  |
| Welcome seen | localStorage           | Persisted bool, read once on boot  |
| Scroll pos   | DOM                    | Native browser behaviour           |

---

## 6. Higher-Order Components (HOC) Catalogue

### Overview

```
withTheme ──────────► Injects: theme: 'light' | 'dark'
                      When to use: canvas drawing colours, chart configs,
                                   any imperative theme decision.
                      NOT needed: for CSS-variable based styling (free via tokens)

withErrorBoundary ──► Injects: onError callback
                      Wraps:   any panel or canvas in an Error Boundary
                      When to use: every lazy-loaded panel, every CanvasPanel
                      Fallback: shows "Something went wrong" + Try Again

withAnalytics ──────► Injects: trackEvent(name, data) function
                      When to use: QACard (track opens), TabPanel (track navigation)
                      Provider:    swap analyticsService to change GA4/Amplitude/etc.

withLazyCanvas ─────► Injects: canvasRef, isInitialized
                      Mechanism: IntersectionObserver fires when canvas enters viewport
                      When to use: every CanvasPanel (55 animations)
                      Perf gain:  prevents all 55 animations running on initial load
```

### HOC composition pattern

```tsx
// Compose multiple HOCs cleanly (rightmost applies first)
const EnhancedComponent = withErrorBoundary(
  withAnalytics(
    withTheme(MyComponent)
  )
);

// Or pipe-style using a compose utility:
const enhance = compose(withErrorBoundary, withAnalytics, withTheme);
const EnhancedComponent = enhance(MyComponent);
```

### When to use HOCs vs Hooks

| Scenario                                | Use HOC    | Use Hook                          |
|-----------------------------------------|------------|-----------------------------------|
| Cross-cutting: error boundaries         | ✅ HOC     | ❌ Not possible                   |
| Cross-cutting: analytics tracking       | ✅ HOC     | ✅ Both work                      |
| Cross-cutting: theme injection          | ✅ HOC     | ✅ useAppSelector(s => s.theme)   |
| Reusing stateful logic                  | ❌ Verbose | ✅ Custom hook                    |
| DOM side effects (resize, scroll)       | ❌ Verbose | ✅ Custom hook                    |
| Adding props to a component you own     | ❌ Overkill| ✅ Just add props directly        |
| Adding props to a third-party component | ✅ HOC     | ❌ Can't modify source            |

---

## 7. Custom Hooks

| Hook                  | Purpose                                          |
|-----------------------|--------------------------------------------------|
| `useCanvas`           | Canvas resize + DPR scaling, returns { ctx, W, H }|
| `useScrollToSection`  | Watches Redux scrollTarget, executes scrollIntoView|
| `useKeyboardShortcut` | Global keydown listener with cleanup             |
| `useAppDispatch`      | Typed dispatch (use instead of useDispatch)      |
| `useAppSelector`      | Typed selector (use instead of useSelector)      |

---

## 8. Component Architecture

### Component design rules

1. **Single responsibility** — one component, one job.
2. **Presentational vs Container** — presentational components receive props only.
   Container components (connected to Redux) are kept thin: read state → render children.
3. **memo() everywhere** — wrap every component in `React.memo()` to prevent
   unnecessary re-renders. RTK's state immutability makes this effective.
4. **forwardRef for form controls** — Button, Input use `forwardRef` for ref access.
5. **displayName always** — set on memo() and HOC-wrapped components for DevTools.

### Component hierarchy

```
App
├── WelcomeScreen           (local state: dismissed)
├── Header
│   ├── Brand               (pure display)
│   ├── SearchBar           (Redux: search slice)
│   ├── ThemeToggle         (Redux: theme slice)
│   └── TabNav              (Redux: navigation slice)
├── Sidebar
│   ├── CurrentSectionItems (Redux: navigation slice)
│   └── AllSections         (static: constants/tabs)
└── main
    └── TabPanel × 20       (Redux: navigation.activeTab controls visibility)
        ├── PrepQAPanel
        │   ├── QAFilterBar (Redux: qa.activeFilter)
        │   └── QAGrid
        │       └── QACard × N (withAnalytics HOC)
        └── ReactPanel (withTheme HOC)
            └── CanvasPanel (withLazyCanvas + withErrorBoundary HOCs)
```

---

## 9. Lazy Loading Strategy

### Three levels of lazy loading

**Level 1: Tab panels (React.lazy)**
Each of the 20 tab panels is a separate dynamic import chunk.
Loaded on first visit, cached by browser thereafter.
```tsx
const ReactPanel = lazy(() => import('@panels/ReactPanel'));
```

**Level 2: Canvas animations (dynamic import in callbacks)**
Each panel's animation module is separately imported inside `onInit`:
```ts
const handleInit = useCallback(() => {
  import('@utils/animations/reactAnimations').then(({ initReact }) => {
    initReact(canvas, theme);
  });
}, [theme]);
```

**Level 3: Intersection Observer (withLazyCanvas HOC)**
Even after the animation module is loaded, `initReact()` is not called
until the canvas element scrolls into the viewport (10% visible threshold).
This means animations in collapsed sections never start.

### Result
- **Initial JS bundle**: ~120KB (vendor.react + app core only)
- **Per-tab chunks**: ~15-40KB each, fetched on demand
- **55 animations**: none running until visible

---

## 10. Design Token System

All visual values are CSS custom properties on `:root`.
Dark theme overrides the same variables on `[data-theme="dark"]`.

```css
/* Usage — always use tokens, never hard-coded values */
.my-component {
  color:      var(--t1);          /* primary text */
  background: var(--surface);     /* card background */
  border:     1px solid var(--border);
  box-shadow: var(--shadow-md);
  border-radius: var(--radius-lg);
  transition: all var(--transition-normal);
}
```

Token categories: surfaces, borders, brand purple scale, brand blue scale,
text, semantic (success/warn/info/error), spacing, radius, typography,
shadows, transitions.

---

## 11. Adding New Sections

### Step-by-step checklist

```
1. Add to TabKey union in src/types/index.ts
   └── | 'my-new-section'

2. Add to TAB_NAMES in src/constants/tabs.ts
   └── 'my-new-section': 'My New Section'

3. Add to TAB_COLORS and TAB_GRADIENTS in src/constants/tabs.ts

4. Add to SIDEBAR_DATA in src/constants/tabs.ts

5. Create src/panels/MyNewSectionPanel.tsx
   └── lazy-loadable React component

6. Add to PANEL_MAP in src/components/layout/TabPanel.tsx
   └── 'my-new-section': lazy(() => import('@panels/MyNewSectionPanel'))

7. Add to ALL_TABS array in src/app/App.tsx

8. (Optional) Create src/utils/animations/myNewSectionAnimations.ts
   └── export initAnim(canvas, theme) and anim(mode, canvas)
```

### Adding new Q&A entries

```
1. Add entries to QA_DATA in src/constants/qaData.ts
   └── { id: 221, cat: 'my-category', q: '...', a: '...', tags: [] }

2. If new category:
   a. Add to QACategory type in src/types/index.ts
   b. Add to QA_CATEGORIES array in src/constants/qaData.ts
   c. Add to QA_CAT_META object in src/constants/qaData.ts
   d. Update "All N" button label in QAFilterBar.tsx

3. Update SIDEBAR_DATA.prepqa in src/constants/tabs.ts (for search)
```

---

## 12. Testing Strategy

### Test layers

```
Unit Tests (Jest)
└── Pure utility functions: canvasHelpers, search scoring, QA selectors

Integration Tests (React Testing Library)
├── QAFilterBar: clicking filters updates Redux state + QAGrid re-renders
├── SearchBar: typing shows results, Enter navigates, Escape closes
├── ThemeToggle: click changes data-theme attribute on document
└── TabPanel: switching tabs renders correct panel

HOC Tests
├── withTheme: renders with correct theme prop from Redux
├── withErrorBoundary: shows fallback on child throw
├── withAnalytics: trackEvent called on correct user actions
└── withLazyCanvas: isInitialized false initially, true after intersection

Redux Slice Tests
├── navigationSlice: setActiveTab persists to localStorage
├── qaSlice: setFilter resets openCardId, selectFilteredQA memoises
├── searchSlice: setQuery runs scoring, results sorted correctly
└── themeSlice: toggleTheme sets data-theme attribute
```

### Running tests

```bash
npm test              # Run all tests with coverage
npm run test:watch    # Watch mode for TDD
npm run type-check    # TypeScript type checking only
npm run lint          # ESLint with auto-fix
```

---

## 13. Performance Budget

| Metric                    | Target     | Strategy                              |
|---------------------------|------------|---------------------------------------|
| Initial JS (gzipped)      | < 120 KB   | Vendor split + lazy panels            |
| Time to Interactive       | < 2s       | React.lazy, skeleton loaders          |
| Largest Contentful Paint  | < 1.5s     | Preconnect fonts, critical CSS inline |
| Cumulative Layout Shift   | < 0.1      | Canvas heights set via data-h attr    |
| Lighthouse Score          | ≥ 90       | A11y, meta, preload hints             |
| Canvas animations active  | ≤ 5        | withLazyCanvas + visibility check     |

### Analyse bundle size

```bash
ANALYZE=true npm run build
# Opens an interactive treemap in browser
```

---

## 14. Migration from HTML to React

The original `index.html` (841KB, ~6400 lines) is migrated to this
React application with the following mapping:

| HTML (original)              | React (new)                                      |
|------------------------------|--------------------------------------------------|
| Monolithic `<script>` 433KB  | 55+ split animation modules (dynamic import)     |
| `switchMain(tab)`            | `dispatch(setActiveTab(tab))`                    |
| `renderQA(filter)`           | `dispatch(setFilter(filter))` → selectFilteredQA |
| `qaFilter(cat, btn)`         | QAFilterBar → dispatch(setFilter)                |
| `scrollToSection(id)`        | `dispatch(navigateToSection({tab, sectionId}))`  |
| `toggleTheme()`              | `dispatch(toggleTheme())`                        |
| `buildIndex()` (lazy)        | searchSlice builds index on first setQuery call  |
| `IntersectionObserver` setup | withLazyCanvas HOC (reusable across all 55 cvs)  |
| `canvasInits[tab]()`         | CanvasPanel onInit callback + dynamic import     |
| Global `QA_DATA` array       | constants/qaData.ts + qaSlice selectors          |
| `localStorage.*`             | themeSlice + navigationSlice side effects        |
| `document.querySelectorAll`  | Zero — React owns the DOM                        |
| `SIDEBAR_DATA` object        | constants/tabs.ts (typed, single source of truth)|

### Migration script

To extract the 220 Q&A entries from the original HTML into typed TypeScript:

```bash
node scripts/extractQAData.js
# Reads index.html → outputs src/constants/qaData.generated.ts
# Preserves all 220 entries with full TypeScript typing
```
