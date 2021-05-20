import { SwaggerCheck } from './utils/SwaggerCheck';

declare global {
  var swagger: SwaggerCheck;
}

beforeAll(async () => {
  //Start my environment or seed data to DB or whatever
  globalThis.swagger = new SwaggerCheck(`${process.env.PWD}/openapiswagger.yml`);
  await globalThis.swagger.setUpSwaggerApi();
});

afterAll(() => {
  //teardown or clean things started in setup my environment
});
