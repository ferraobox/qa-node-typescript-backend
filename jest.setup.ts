import { SwaggerCheck } from './utils/SwaggerCheck';

declare global {
  var swagger: SwaggerCheck;
}

beforeAll(() => {
  //Start my environment or seed data to DB or whatever
  globalThis.swagger = new SwaggerCheck(`${process.env.PWD}/openapiswagger.yml`);
});

afterAll(() => {
  //teardown or clean things started in setup my environment
});
