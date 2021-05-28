/* eslint-disable no-empty-function */
import 'reflect-metadata';

export function runTest(desc: string, cb: () => void): void {
  describe(desc, () => {
    //Pre-Hooks to apply all test files
    beforeAll(() => {});
    afterAll(() => {});

    cb();
  });
}
