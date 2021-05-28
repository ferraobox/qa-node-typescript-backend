import { runTest } from '../../../setup/setup';
import { StoreController } from '../../controllers/StoreController';
import { newOrder } from '../../data/StoreFactory';
import { Response } from '../../../client/CustomResponse';
import { Order } from '../../models/Order';

runTest('INT - Store Controller', () => {
  let storeController: StoreController;
  let order: Order;

  beforeAll(() => {
    storeController = new StoreController('http://localhost:8080/api/v3');
  });

  test('Add new Order - 200 OK', async () => {
    order = newOrder();
    const response: Response = await storeController.placeAnOrder(order);
    expect(response.statusCode).toEqual(200);
  });

  test('Find purcharse order by id - 200 OK', async () => {
    const response: Response = await storeController.findPurcharseOrderById(order.id);
    expect(response.statusCode).toEqual(200);
  });

  test('Delete purcharse order by id - 200 OK', async () => {
    const response: Response = await storeController.deletePurcharseOrderById(order.id);
    expect(response.statusCode).toEqual(200);
  });
});
