import { makeTest } from '../../../setup/setup';
import { StoreController } from '../../controllers/StoreController';
import { Response } from '../../../client/CustomResponse';
import { ApiController } from '../../../client/ApiController';
import { newOrder } from '../../data/StoreFactory';
import { Order } from '../../models/Order';

makeTest('Unit test - Store Controller', () => {
  const mockedBadResponse = {
    url: 'mock',
    name: 'mock',
    message: 'mock',
    stack: 'mock',
    statusCode: 400,
  };
  const mockedGoodResponse = { url: 'mock', statusMessage: 'mock', statusCode: 200, headers: { mock: 'mock' }, body: { mock: 'mock' }, ip: 'mock' };

  //Mocked dependences
  let storeController: StoreController;
  let getMocked: jest.SpyInstance;
  let postMocked: jest.SpyInstance;
  let deleteMocked: jest.SpyInstance;

  let order: Order;

  beforeAll(() => {
    storeController = new StoreController('http://localhost:8080/api/v3');
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('inventoriesByStatus - 200 OK', async () => {
    getMocked = jest.spyOn(ApiController.prototype, 'get').mockResolvedValue(mockedGoodResponse);
    const response: Response = await storeController.inventoriesByStatus();
    expect(getMocked).toBeCalledTimes(1);
    expect(response).toEqual(mockedGoodResponse);
  });

  test('inventoriesByStatus - 400 Bad Response', async () => {
    getMocked = jest.spyOn(ApiController.prototype, 'get').mockResolvedValue(mockedBadResponse);
    const response: Response = await storeController.inventoriesByStatus();
    expect(getMocked).toBeCalledTimes(1);
    expect(response).toEqual(mockedBadResponse);
  });

  test('findPurcharseOrderById - 200 OK', async () => {
    getMocked = jest.spyOn(ApiController.prototype, 'get').mockResolvedValue(mockedGoodResponse);
    const response: Response = await storeController.findPurcharseOrderById(1111);
    expect(getMocked).toBeCalledTimes(1);
    expect(response).toEqual(mockedGoodResponse);
  });

  test('findPurcharseOrderById - 400 Bad Response', async () => {
    getMocked = jest.spyOn(ApiController.prototype, 'get').mockResolvedValue(mockedBadResponse);
    const response: Response = await storeController.findPurcharseOrderById(1111);
    expect(getMocked).toBeCalledTimes(1);
    expect(response).toEqual(mockedBadResponse);
  });

  test('placeAnOrder - 200 OK', async () => {
    order = newOrder();
    postMocked = jest.spyOn(ApiController.prototype, 'post').mockResolvedValue(mockedGoodResponse);
    const response: Response = await storeController.placeAnOrder(order);
    expect(postMocked).toBeCalledTimes(1);
    expect(postMocked.mock.calls[0][1]).toBe(order);
    expect(response).toEqual(mockedGoodResponse);
  });

  test('placeAnOrder - 400 Bad Response', async () => {
    order = newOrder();
    postMocked = jest.spyOn(ApiController.prototype, 'post').mockResolvedValue(mockedBadResponse);
    const response: Response = await storeController.placeAnOrder(order);
    expect(postMocked).toBeCalledTimes(1);
    expect(postMocked.mock.calls[0][1]).toBe(order);
    expect(response).toEqual(mockedBadResponse);
  });

  test('deletePurcharseOrderById - 200 OK', async () => {
    deleteMocked = jest.spyOn(ApiController.prototype, 'delete').mockResolvedValue(mockedGoodResponse);
    const response: Response = await storeController.deletePurcharseOrderById(1111);
    expect(deleteMocked).toBeCalledTimes(1);
    expect(response).toEqual(mockedGoodResponse);
  });

  test('deletePurcharseOrderById - 400 Bad Response', async () => {
    deleteMocked = jest.spyOn(ApiController.prototype, 'delete').mockResolvedValue(mockedBadResponse);
    const response: Response = await storeController.deletePurcharseOrderById(1111);
    expect(deleteMocked).toBeCalledTimes(1);
    expect(response).toEqual(mockedBadResponse);
  });
});
