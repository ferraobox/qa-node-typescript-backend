import 'reflect-metadata';

export function makeTest(desc: string, cb: () => void): void {
  describe(desc, () => {
    beforeAll(() => {
      console.log('Before All');
    });
    afterAll(() => {
      console.log('After All');
    });

    cb();
  });
}
