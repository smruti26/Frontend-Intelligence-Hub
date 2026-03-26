/**
 * src/__tests__/setup.ts
 * Jest setup file — runs after jsdom is installed, before each test file.
 * Provides global mocks for browser APIs not in jsdom.
 */

// Import jest-dom matchers (toBeInTheDocument, toHaveClass, etc.)
import '@testing-library/jest-dom';

// ── Canvas API mock (jsdom doesn't implement canvas) ─────────────────────
const canvasContextMock = {
  clearRect:             jest.fn(),
  fillRect:              jest.fn(),
  strokeRect:            jest.fn(),
  beginPath:             jest.fn(),
  closePath:             jest.fn(),
  arc:                   jest.fn(),
  fill:                  jest.fn(),
  stroke:                jest.fn(),
  moveTo:                jest.fn(),
  lineTo:                jest.fn(),
  save:                  jest.fn(),
  restore:               jest.fn(),
  scale:                 jest.fn(),
  translate:             jest.fn(),
  rotate:                jest.fn(),
  setTransform:          jest.fn(),
  createLinearGradient:  jest.fn(() => ({ addColorStop: jest.fn() })),
  createRadialGradient:  jest.fn(() => ({ addColorStop: jest.fn() })),
  measureText:           jest.fn(() => ({ width: 0 })),
  fillText:              jest.fn(),
  strokeText:            jest.fn(),
  roundRect:             jest.fn(),
  setLineDash:           jest.fn(),
  getLineDash:           jest.fn(() => []),
  clip:                  jest.fn(),
  createPattern:         jest.fn(() => null),
  drawImage:             jest.fn(),
  putImageData:          jest.fn(),
  getImageData:          jest.fn(() => ({ data: new Uint8ClampedArray(4) })),
  canvas:                { width: 800, height: 600 },
};

Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
  value: jest.fn(() => canvasContextMock),
  writable: true,
});

Object.defineProperty(HTMLCanvasElement.prototype, 'width',  { value: 800, writable: true });
Object.defineProperty(HTMLCanvasElement.prototype, 'height', { value: 600, writable: true });

// ── requestAnimationFrame / cancelAnimationFrame ──────────────────────────
global.requestAnimationFrame = jest.fn((cb) => { cb(0); return 1; });
global.cancelAnimationFrame  = jest.fn();

// ── IntersectionObserver mock ─────────────────────────────────────────────
global.IntersectionObserver = class MockIntersectionObserver {
  observe    = jest.fn();
  unobserve  = jest.fn();
  disconnect = jest.fn();
  constructor(_cb: IntersectionObserverCallback) {}
} as unknown as typeof IntersectionObserver;

// ── ResizeObserver mock ───────────────────────────────────────────────────
global.ResizeObserver = class MockResizeObserver {
  observe    = jest.fn();
  unobserve  = jest.fn();
  disconnect = jest.fn();
  constructor(_cb: ResizeObserverCallback) {}
} as unknown as typeof ResizeObserver;

// ── matchMedia mock ───────────────────────────────────────────────────────
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches:              false,
    media:                query,
    onchange:             null,
    addListener:          jest.fn(),
    removeListener:       jest.fn(),
    addEventListener:     jest.fn(),
    removeEventListener:  jest.fn(),
    dispatchEvent:        jest.fn(),
  })),
});

// ── scrollTo mock ─────────────────────────────────────────────────────────
window.scrollTo = jest.fn();

// ── localStorage mock ─────────────────────────────────────────────────────
const store: Record<string, string> = {};
const localStorageMock = {
  getItem:    (key: string)                => store[key] ?? null,
  setItem:    (key: string, val: string)   => { store[key] = val; },
  removeItem: (key: string)               => { delete store[key]; },
  clear:      ()                          => { Object.keys(store).forEach(k => delete store[k]); },
  length:     0,
  key:        jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock, writable: true });

// ── Console suppression for known non-critical warnings ───────────────────
const originalError = console.error.bind(console);
console.error = (...args: unknown[]) => {
  const msg = String(args[0] ?? '');
  // Suppress React 19 act() warning and Error Boundary logs in tests
  if (msg.includes('Warning:') || msg.includes('Error Boundary') || msg.includes('The above error occurred')) return;
  originalError(...args);
};

// ── Clear mocks between tests ─────────────────────────────────────────────
beforeEach(() => {
  jest.clearAllMocks();
  localStorageMock.clear();
});
