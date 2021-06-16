import { defaults } from 'jest-config';
import type { Config } from '@jest/types';
const basePathToIgnore = ['.github/', './node_modules/', './dist'];
const pathsToTest = ['./src/controllers/**.ts'];
const testLayer = process.argv[4];
const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: `./reports`,
        filename: `pet-store-${testLayer.toUpperCase()}-test-results.html`,
        expand: true,
      },
    ],
  ],
  setupFilesAfterEnv: ['./jest.setup.ts'],
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: pathsToTest,
  coverageReporters: ['json', 'json-summary', 'text', 'lcov'],
  coverageDirectory: './reports/coverage/',
  moduleFileExtensions: defaults.moduleFileExtensions,
  testPathIgnorePatterns: basePathToIgnore,
};
export default config;
