const { defaults } = require('jest-config');
const basePathToIgnore = ['.github/', './node_modules/'];
const pathsToTest = ['./src/controllers/**.ts'];
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: './reports',
        filename: 'the-pet-store-test-results.html',
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
