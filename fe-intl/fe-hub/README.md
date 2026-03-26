# Frontend Architecture Hub — React 19 + Redux + Webpack 5

Enterprise-grade refactor of the original HTML implementation into a fully
component-based React 19 application with Redux state management, Webpack 5
bundling, and comprehensive RTL test coverage.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm start
# → http://localhost:3000

# 3. Run tests
npm test

# 4. Production build
npm run build
```

---

## All Commands

| Command               | Description                                      |
|-----------------------|--------------------------------------------------|
| `npm start`           | Dev server at localhost:3000 with Hot Reload     |
| `npm run build`       | Production bundle → /dist                        |
| `npm run build:analyze` | Bundle + interactive size treemap              |
| `npm run type-check`  | TypeScript type check (no output files)          |
| `npm test`            | Run all 55+ test cases                           |
| `npm run test:coverage` | Tests + coverage report                        |
| `npm run test:watch`  | Watch mode for TDD                               |

---

## Architecture

```
src/
├── app/
│   ├── App.tsx              Root component
│   ├── store.ts             Redux store (4 slices)
│   └── hooks.ts             useAppSelector / useAppDispatch
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx       Nav + Search + Theme toggle
│   │   └── TabPanel.tsx     Lazy panel wrapper
│   └── welcome/
│       └── WelcomeScreen.tsx Particle splash screen
│
├── features/                Redux Toolkit slices
│   ├── navigation/          Active tab, scroll target
│   ├── theme/               Light / dark mode
│   ├── qa/                  Q&A filter + accordion
│   └── search/              Search query + results
│
├── hocs/                    Higher-Order Components
│   ├── withTheme.tsx        Injects theme prop
│   ├── withErrorBoundary.tsx Crash isolation
│   ├── withAnalytics.tsx    Event tracking
│   └── withLazyCanvas.tsx   IntersectionObserver init
│
├── panels/                  20 content panels (React.lazy)
│   ├── ReactPanel.tsx
│   ├── PrepQAPanel.tsx      220 Q&A entries
│   └── [...18 more]
│
├── constants/
│   ├── tabs.ts              Tab names, colors, sidebar data
│   └── qaData.ts            All 220 Q&A entries
│
├── types/index.ts            All TypeScript interfaces
│
├── utils/animations/
│   └── bridge.js            Original 243 canvas animation fns
│
└── assets/styles/
    └── original.css          Original CSS (full visual parity)
```

---

## Key Design Decisions

**Animation Bridge Pattern**
The 434KB original JS contains 243 canvas animation functions. These are
loaded via `bridge.js` which attaches them to `window`. React calls them
after each panel mounts via `useEffect`. This gives full animation parity
without rewriting 434KB of complex canvas code.

**CSS Parity**
The original 63KB CSS stylesheet is imported wholesale. No design tokens
were duplicated — the original CSS variables drive all theming.

**Lazy Loading**
Each of the 20 panels is a separate Webpack chunk loaded via `React.lazy`.
Only the active panel's JS is downloaded, keeping initial load fast.

**Redux Slice Responsibilities**
- `navigation`: active tab, scroll target, mobile menu
- `theme`: light/dark, localStorage + DOM sync
- `qa`: filter category, open card (accordion)
- `search`: query, scored results, keyboard nav index

---

## Testing

**10 test files | 55+ test cases | React Testing Library + Jest 29**

| File | Coverage |
|------|----------|
| `navigationSlice.test.ts` | All 8 actions + edge cases |
| `themeSlice.test.ts` | Toggle, set, persistence |
| `qaSlice.test.ts` | Filter, accordion, 14 categories |
| `searchSlice.test.ts` | Query, results, keyboard nav |
| `Header.test.tsx` | Tabs, theme, search render |
| `TabPanel.test.tsx` | Active/inactive visibility |
| `WelcomeScreen.test.tsx` | Render, pills, dismiss |
| `PrepQAPanel.test.tsx` | Filters, grid, renderQA calls |
| `HOC.test.tsx` | withTheme, withErrorBoundary, withAnalytics |
| `App.test.tsx` | Integration: layout, panels, welcome |

---

## Troubleshooting

**Port 3000 in use**
```bash
lsof -ti:3000 | xargs kill && npm start
```

**TypeScript errors after adding files**
```bash
rm -rf node_modules/.cache && npm start
```

**Webpack Module Not Found on new panel**
Add to PANEL_MAP in `src/components/layout/TabPanel.tsx` and ALL_TABS in `src/app/App.tsx`.
