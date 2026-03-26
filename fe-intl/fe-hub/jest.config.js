/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',

  // Run @testing-library/jest-dom matchers after test framework installs.
  // Jest 24-27: setupFilesAfterFramework (renamed from setupTestFrameworkScriptFile)
  // Jest 28-29: same key — setupFilesAfterFramework
  setupFilesAfterFramework: ['<rootDir>/src/__tests__/setup.ts'],

  moduleNameMapper: {
    // Static assets — not needed in unit tests
    '\\.(css|less|scss|sass|png|jpg|gif|svg|ttf|woff|woff2)$':
      '<rootDir>/src/__mocks__/fileMock.js',
    // Animation bridge — 434KB, mock it in tests
    '^.+/animations/bridge\\.js$':              '<rootDir>/src/__mocks__/fileMock.js',
    '^.+/animations/original-animations\\.js$': '<rootDir>/src/__mocks__/fileMock.js',
    '^.+/animations/legacyAnimations\\.js$':    '<rootDir>/src/__mocks__/fileMock.js',
    // Path aliases (must match tsconfig.json + webpack.common.js)
    '^@app/(.*)$':        '<rootDir>/src/app/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@features/(.*)$':   '<rootDir>/src/features/$1',
    '^@hooks/(.*)$':      '<rootDir>/src/hooks/$1',
    '^@hocs/(.*)$':       '<rootDir>/src/hocs/$1',
    '^@utils/(.*)$':      '<rootDir>/src/utils/$1',
    '^@constants/(.*)$':  '<rootDir>/src/constants/$1',
    '^@appTypes$':        '<rootDir>/src/types/index.ts',
    '^@appTypes/(.*)$':   '<rootDir>/src/types/$1',
    '^@panels/(.*)$':     '<rootDir>/src/panels/$1',
    '^@assets/(.*)$':     '<rootDir>/src/assets/$1',
  },

  // babel.config.js is auto-detected — transform is TS/TSX only
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },

  transformIgnorePatterns: ['/node_modules/'],

  testMatch: [
    '<rootDir>/src/__tests__/**/*.test.(ts|tsx)',
    '<rootDir>/src/**/*.spec.(ts|tsx)',
  ],

  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/utils/animations/**',
    '!src/__mocks__/**',
    '!src/__tests__/setup.ts',
    '!src/index.tsx',
  ],

  coverageReporters: ['text', 'lcov', 'html'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  verbose: true,
};
