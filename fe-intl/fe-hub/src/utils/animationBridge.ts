/**
 * src/utils/animationBridge.ts
 * ─────────────────────────────────────────────────────────────────
 * Bridges the React component tree with the original canvas animation
 * functions extracted verbatim from index.html.
 *
 * Strategy:
 *  1. Load legacyAnimations.js once as a side-effect module
 *  2. Expose typed wrappers around the global functions it defines
 *  3. Each CanvasPanel calls initAnimation(id) when it becomes visible
 *
 * This preserves 100% animation fidelity without rewriting 434KB of
 * carefully tuned canvas code.
 */

// Load the full animation script — it attaches functions to globalThis
import './animations/legacyAnimations.js';

// ── Type declarations for the global functions ────────────────────────────

declare global {
  function setupCvs(id: string): CanvasRenderingContext2D | null;
  function initReact(): void;
  function reactAnim(type: string): void;
  function initAngular(): void;
  function angularAnim(type: string): void;
  function initVue(): void;
  function vueAnim(type: string): void;
  function initBrowser(): void;
  function brToggle(): void;
  function brPrev(): void;
  function brNext(): void;
  function brReset(): void;
  function initEngine(): void;
  function engToggle(): void;
  function engCode(t: string): void;
  function initEventLoop(): void;
  function elRun(type: string): void;
  function initAsync(): void;
  function asyncRun(type: string): void;
  function initFiber(): void;
  function fiberAnim(type: string): void;
  function initHoc(): void;
  function hocAnim(type: string): void;
  function initContext(): void;
  function contextAnim(type: string): void;
  function initPortal(): void;
  function portalAnim(type: string): void;
  function initFragment(): void;
  function fragmentAnim(type: string): void;
  function initWebpack(): void;
  function webpackAnim(m: string): void;
  function initVite(): void;
  function viteAnim(m: string): void;
  function initBuildCmp(): void;
  function buildCmpAnim(m: string): void;
  function initMonorepo(): void;
  function monorepoAnim(m: string): void;
  function initCsr(): void;
  function csrAnim(m: string): void;
  function initSsr(): void;
  function ssrAnim(m: string): void;
  function initNextflow(): void;
  function nextflowAnim(m: string): void;
  function initPatModule(): void;
  function initPatSingleton(): void;
  function initPatFactory(): void;
  function initPatObserver(): void;
  function initPatStrategy(): void;
  function patAnim(key: string, action: string): void;
  function initWebpackAdv(): void;
  function webpackAdvAnim(m: string): void;
  function initVitals(): void;
  function vitalsAnim(m: string): void;
  function initVitalsTimeline(): void;
  function vitalsTimelineAnim(m: string): void;
  function initSecurity(): void;
  function secAnim(m: string): void;
  function initScanning(): void;
  function scanAnim(m: string): void;
  function initTesting(): void;
  function testingAnim(m: string): void;
  function initTestPattern(): void;
  function testPatAnim(m: string): void;
  function initGraphql(): void;
  function gqlAnim(m: string): void;
  function initNodeEventLoop(): void;
  function nodeAnim(m: string): void;
  function initNodeStreams(): void;
  function nodeStreamAnim(m: string): void;
  function initExpressMw(): void;
  function expressAnim(m: string): void;
  function initExpressArch(): void;
  function expressArchAnim(m: string): void;
  function initMongoArch(): void;
  function mongoAnim(m: string): void;
  function initPgArch(): void;
  function pgAnim(m: string): void;
  function initPgNode(): void;
  function pgNodeAnim(m: string): void;
  function initBeStack(): void;
  function beStackAnim(m: string): void;
  function initDockerAnim(): void;
  function dockerAnim(m: string): void;
  function initK8sAnim(): void;
  function k8sAnim(m: string): void;
  function initKafkaAnim(): void;
  function kafkaAnim(m: string): void;
  function initVercelAnim(): void;
  function vercelAnim(m: string): void;
  function initCicdPipeline(): void;
  function cicdPipelineAnim(m: string): void;
  function initReact19Anim(): void;
  function r19Anim(mode: string): void;
  function initR19Actions(): void;
  function r19ActAnim(mode: string): void;
  function initR19Compiler(): void;
  function r19CmpAnim(mode: string): void;
  function initWsw(): void;
  function wswMode(mode: string, btn: HTMLElement): void;
  function initBoxModel(): void;
  function initFlexbox(): void;
  function flexMode(mode: string, btn: HTMLElement): void;
  function initGrid(): void;
  function gridMode(mode: string, btn: HTMLElement): void;
  function initPreprocessors(): void;
  function initSdlcAnim(): void;
  function sdlcMode(m: string, btn: HTMLElement): void;
  function initArchitectAnim(): void;
  function archMode(m: string, btn: HTMLElement): void;
  function switchSubTab(name: string, btn: HTMLElement): void;
  function hcaCssTab(tab: string, btn: HTMLElement): void;
  function beSelect(tech: string, btn: HTMLElement): void;
  function cdSelect(tech: string, btn: HTMLElement): void;
  function selectPipeline(i: number): void;
  function renderQA(filter: string): void;
  function qaFilter(cat: string, btn: HTMLElement): void;
  function toggleQA(id: number): void;
  function buildWM(): string;
  function toggleTheme(): void;
  function clearSearch(): void;
  function toggleMobMenu(): void;
  function closeMobMenu(): void;
  function scrollToTop(): void;
}

// ── Canvas init map (mirrors canvasInits in original script) ──────────────

export const CANVAS_INITS: Record<string, () => void> = {
  react:       () => { try { initReact(); }       catch(e) { console.warn('initReact', e); } },
  graphql:     () => { try { initGraphql(); }      catch(e) { console.warn('initGraphql', e); } },
  angular:     () => { try { initAngular(); }      catch(e) { console.warn('initAngular', e); } },
  vue:         () => { try { initVue(); }           catch(e) { console.warn('initVue', e); } },
  browser:     () => { try { initBrowser(); }      catch(e) { console.warn('initBrowser', e); } },
  engine: () => {
    try { initEngine(); initEventLoop(); initAsync(); } catch(e) { console.warn('initEngine', e); }
  },
  es6: () => {
    try { initWsw(); } catch(e) { console.warn('initWsw', e); }
  },
  'react-adv': () => {
    try { initFiber(); initHoc(); initContext(); initPortal(); initFragment(); }
    catch(e) { console.warn('initReactAdv', e); }
  },
  react19: () => {
    try { initReact19Anim(); initR19Actions(); initR19Compiler(); }
    catch(e) { console.warn('initReact19', e); }
  },
  build: () => {
    try { initWebpack(); initVite(); initBuildCmp(); initMonorepo(); initWebpackAdv(); }
    catch(e) { console.warn('initBuild', e); }
  },
  nextjs: () => {
    try { initCsr(); initSsr(); initNextflow(); }
    catch(e) { console.warn('initNextjs', e); }
  },
  patterns: () => {
    try { initPatModule(); initPatSingleton(); initPatFactory(); initPatObserver(); initPatStrategy(); }
    catch(e) { console.warn('initPatterns', e); }
  },
  vitals: () => {
    try { initVitals(); initVitalsTimeline(); }
    catch(e) { console.warn('initVitals', e); }
  },
  security: () => {
    try { initSecurity(); initScanning(); }
    catch(e) { console.warn('initSecurity', e); }
  },
  testing: () => {
    try { initTesting(); initTestPattern(); }
    catch(e) { console.warn('initTesting', e); }
  },
  backend: () => {
    try { initNodeEventLoop(); initNodeStreams(); initExpressMw(); initExpressArch();
          initMongoArch(); initPgArch(); initPgNode(); initBeStack(); }
    catch(e) { console.warn('initBackend', e); }
  },
  cicd: () => {
    try { initDockerAnim(); initK8sAnim(); initKafkaAnim(); initVercelAnim(); initCicdPipeline(); }
    catch(e) { console.warn('initCicd', e); }
  },
  hca: () => {
    try { initBoxModel(); initFlexbox(); initGrid(); initPreprocessors(); }
    catch(e) { console.warn('initHca', e); }
  },
  sdlc: () => {
    try { initSdlcAnim(); initArchitectAnim(); }
    catch(e) { console.warn('initSdlc', e); }
  },
};

/** Safe caller — always wrapped in try/catch */
export function callAnim(fnName: string, ...args: unknown[]): void {
  try {
    const fn = (window as Record<string, unknown>)[fnName];
    if (typeof fn === 'function') {
      (fn as (...a: unknown[]) => void)(...args);
    }
  } catch (e) {
    console.warn(`[Animation] ${fnName} failed:`, e);
  }
}
