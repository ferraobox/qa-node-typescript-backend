import 'reflect-metadata';

export function makeTest(desc: string, cb: () => void): void {
  describe(desc, () => {
    beforeAll(async () => {
      // console.log('Before');
    });
    afterAll(() => {
      // console.log('After All');
    });

    cb();
  });
}
