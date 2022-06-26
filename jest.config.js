module.exports = {
  testEnvironment: 'jsdom',
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.yarn/**',
    '!**/dist/**',
    '!**/es/**',
    '!**/lib/**',
    '!**/types/**',
  ],
  testMatch: [
    '**/?(*.)+(spec|test).ts?(x)',
  ],
  setupFilesAfterEnv: [
    'jest-plugin-context/setup',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/es/',
    '<rootDir>/lib/',
    '<rootDir>/types/',
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': [
      'babel-jest',
      {
        presets: [
          '@babel/preset-env',
          '@babel/preset-typescript',
        ],
      },
    ],
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/es/',
    '/lib/',
    '.storybook',

    '/__snapshots__/',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/es/',
    '/lib/',
    '.storybook',

    '.js',
    '.interfaces.',
    '.types.',
    '.stories.',
    '/__snapshots__/',

    'src/index.ts',
    'src/stereoscopic/',
  ],
  // coverageThreshold: {
  //   global: {
  //     branches: 100,
  //     functions: 100,
  //     lines: 100,
  //     statements: 100,
  //   },
  // },
  moduleNameMapper: {
    '^__tests__/(.*)$': '<rootDir>/__tests__/$1',
    '^bbframe/(.*)$': '<rootDir>/src/$1',
  },
};
