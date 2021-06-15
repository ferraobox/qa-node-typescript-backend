import { runTest } from '../../../setup/setup';
import { StoreController } from '../../controllers/StoreController';
import { newOrder } from '../../data/StoreFactory';
import { Response } from '../../../client/CustomResponse';
import { Order } from '../../models/Order';

runTest('specification test - Store Controller', () => {
  let storeController: StoreController;
  let order: Order;

  beforeAll(() => {
    storeController = new StoreController('http://localhost:8080/api/v3');
  });

  test('Add new Order - 200 OK - check swagger specification', async () => {
    order = newOrder();
    const response: Response = await storeController.placeAnOrder(order);
    const swaggerErrors = globalThis.swagger.validateSchema('/store/order', 'post', response.statusCode, response.body);
    expect(response.statusCode).toEqual(200);
    expect(swaggerErrors.length === 0).toBeTruthy();
  });

  test('Find purcharse order by id - 200 OK - check swagger specification', async () => {
    const response: Response = await storeController.findPurcharseOrderById(order.id);
    const swaggerErrors = globalThis.swagger.validateSchema('/store/order/{orderId}', 'get', response.statusCode, response.body);
    expect(response.statusCode).toEqual(200);
    expect(swaggerErrors.length === 0).toBeTruthy();
  });

  test('Find purcharse order by id - 404 not found - check swagger specification', async () => {
    const response: Response = await storeController.findPurcharseOrderById(99999999);
    expect(response.statusCode).toEqual(404);
    expect(response.message).toEqual('Response code 404 (Not Found)');
  });
});
