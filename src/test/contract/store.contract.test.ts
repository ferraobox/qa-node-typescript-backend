import { runTest } from '../../../setup/setup';
import { StoreController } from '../../controllers/StoreController';
import { newOrder } from '../../data/StoreFactory';
import { Response } from '../../../client/CustomResponse';
import { Order } from '../../models/Order';
//Contract Utils
import { Provider } from './utils/provider';
import * as storeIteraction from './utils/iteractionGenerator';

runTest('Contract - Store Controller', () => {
  let provider: Provider;
  let storeController: StoreController;
  let order: Order;

  afterAll(() => provider.finalize());

  beforeAll(async () => {
    storeController = new StoreController('http://localhost:8080/api/v3');
    order = await newOrder();
    provider = await new Provider('consumer', 'StoreApi');
    await provider.setup();
    provider.addInteraction(await storeIteraction.getOrderIteraction());
    provider.addInteraction(await storeIteraction.postOrderIteraction(order));
    provider.addInteraction(await storeIteraction.deleteOrderIteraction());
  });

  test('Add new Order - 200 OK', async () => {
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
