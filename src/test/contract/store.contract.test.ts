import { makeTest } from '../../../setup/setup';
import { StoreController } from '../../controllers/StoreController';
import { newOrder } from '../../data/StoreFactory';
import { Response } from '../../../client/CustomResponse';
import { Order } from '../../models/Order';
import { SwaggerCheck } from '../../../utils/SwaggerCheck';

makeTest('Contract test - Store Controller', () => {
  let storeController: StoreController;
  let order: Order;
  let swagger: SwaggerCheck;

  beforeAll(() => {
    storeController = new StoreController('http://localhost:8080/api/v3');
    swagger = new SwaggerCheck('./openapiswagger.yml');
  });

  // test('Get inventories by status - 200 OK - check swagger specification', async () => {
  //   const response: Response = await storeController.inventoriesByStatus();
  //   expect(response.statusCode).toEqual(200);
  //   const swaggerErrors = swagger.validateSchema('/store/inventory', 'get', response.statusCode, response.body);
  //   expect(swaggerErrors.length === 0).toBeTruthy();
  // });

  test('Add new Order - 200 OK - check swagger specification', async () => {
    order = newOrder();
    const response: Response = await storeController.placeAnOrder(order);
    const swaggerErrors = swagger.validateSchema('/store/order', 'post', response.statusCode, response.body);
    expect(response.statusCode).toEqual(200);
    expect(swaggerErrors.length === 0).toBeTruthy();
  });

  test('Find purcharse order by id - 200 OK - check swagger specification', async () => {
    const response: Response = await storeController.findPurcharseOrderById(order.id);
    const swaggerErrors = swagger.validateSchema('/store/order/{orderId}', 'get', response.statusCode, response.body);
    expect(response.statusCode).toEqual(200);
    expect(swaggerErrors.length === 0).toBeTruthy();
  });

  test('Find purcharse order by id - 404 not found - check swagger specification', async () => {
    const response: Response = await storeController.findPurcharseOrderById(99999999);
    expect(response.statusCode).toEqual(404);
    expect(response.message).toEqual('Response code 404 (Not Found)');
  });
});
