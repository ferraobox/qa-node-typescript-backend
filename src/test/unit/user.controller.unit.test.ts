import { runTest } from '../../../setup/setup';
import { UserController } from '../../controllers/UserController';
import { Response } from '../../../client/CustomResponse';
import { ApiController } from '../../../client/ApiController';
import { newUser, newUsersList } from '../../data/UserFactory';
import { User } from '../../models/User';

runTest('Unit test - User Controller', () => {
  const mockedBadResponse = {
    url: 'mock',
    name: 'mock',
    message: 'mock',
    stack: 'mock',
    statusCode: 400,
  };
  const mockedGoodResponse = { url: 'mock', statusMessage: 'mock', statusCode: 200, headers: { mock: 'mock' }, body: { mock: 'mock' }, ip: 'mock' };

  //Mocked dependences
  let userController: UserController;
  let getMocked: jest.SpyInstance;
  let postMocked: jest.SpyInstance;
  let putMocked: jest.SpyInstance;
  let deleteMocked: jest.SpyInstance;

  let user: User;
  let users: User[];

  beforeAll(() => {
    userController = new UserController('http://localhost:8080/api/v3');
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getUserByuserName - 200 OK', async () => {
    getMocked = jest.spyOn(ApiController.prototype, 'get').mockResolvedValue(mockedGoodResponse);
    const response: Response = await userController.getUserByuserName('userName');
    expect(getMocked).toBeCalledTimes(1);
    expect(response).toEqual(mockedGoodResponse);
  });

  test('getUserByuserName - 400 Bad Response', async () => {
    getMocked = jest.spyOn(ApiController.prototype, 'get').mockResolvedValue(mockedBadResponse);
    const response: Response = await userController.getUserByuserName('userName');
    expect(getMocked).toBeCalledTimes(1);
    expect(response).toEqual(mockedBadResponse);
  });

  test('logoutUser - 200 OK', async () => {
    getMocked = jest.spyOn(ApiController.prototype, 'get').mockResolvedValue(mockedGoodResponse);
    const response: Response = await userController.logoutUser();
    expect(getMocked).toBeCalledTimes(1);
    expect(response).toEqual(mockedGoodResponse);
  });

  test('logoutUser - 400 Bad Response', async () => {
    getMocked = jest.spyOn(ApiController.prototype, 'get').mockResolvedValue(mockedBadResponse);
    const response: Response = await userController.logoutUser();
    expect(getMocked).toBeCalledTimes(1);
    expect(response).toEqual(mockedBadResponse);
  });

  test('logUser - 200 OK', async () => {
    getMocked = jest.spyOn(ApiController.prototype, 'get').mockResolvedValue(mockedGoodResponse);
    const response: Response = await userController.logUser('userName', 1111);
    expect(getMocked).toBeCalledTimes(1);
    expect(response).toEqual(mockedGoodResponse);
  });

  test('logUser - 400 Bad Response', async () => {
    getMocked = jest.spyOn(ApiController.prototype, 'get').mockResolvedValue(mockedBadResponse);
    const response: Response = await userController.logUser('userName', 1111);
    expect(getMocked).toBeCalledTimes(1);
    expect(response).toEqual(mockedBadResponse);
  });

  test('createUser - 200 OK', async () => {
    user = newUser();
    postMocked = jest.spyOn(ApiController.prototype, 'post').mockResolvedValue(mockedGoodResponse);
    const response: Response = await userController.createUser(user);
    expect(postMocked).toBeCalledTimes(1);
    expect(postMocked.mock.calls[0][1]).toBe(user);
    expect(response).toEqual(mockedGoodResponse);
  });

  test('createUser - 400 Bad Response', async () => {
    user = newUser();
    postMocked = jest.spyOn(ApiController.prototype, 'post').mockResolvedValue(mockedBadResponse);
    const response: Response = await userController.createUser(user);
    expect(postMocked).toBeCalledTimes(1);
    expect(postMocked.mock.calls[0][1]).toBe(user);
    expect(response).toEqual(mockedBadResponse);
  });

  test('createUsersWithList - 200 OK', async () => {
    users = newUsersList();
    postMocked = jest.spyOn(ApiController.prototype, 'post').mockResolvedValue(mockedGoodResponse);
    const response: Response = await userController.createUsersWithList(users);
    expect(postMocked).toBeCalledTimes(1);
    expect(postMocked.mock.calls[0][1]).toBe(users);
    expect(response).toEqual(mockedGoodResponse);
  });

  test('createUsersWithList - 400 Bad Response', async () => {
    users = newUsersList();
    postMocked = jest.spyOn(ApiController.prototype, 'post').mockResolvedValue(mockedBadResponse);
    const response: Response = await userController.createUsersWithList(users);
    expect(postMocked).toBeCalledTimes(1);
    expect(postMocked.mock.calls[0][1]).toBe(users);
    expect(response).toEqual(mockedBadResponse);
  });

  test('updateUser - 200 OK', async () => {
    user = newUser();
    putMocked = jest.spyOn(ApiController.prototype, 'put').mockResolvedValue(mockedGoodResponse);
    const response: Response = await userController.updateUser('userName', user);
    expect(putMocked).toBeCalledTimes(1);
    expect(putMocked.mock.calls[0][1]).toBe(user);
    expect(response).toEqual(mockedGoodResponse);
  });

  test('updateUser - 400 Bad Response', async () => {
    user = newUser();
    putMocked = jest.spyOn(ApiController.prototype, 'put').mockResolvedValue(mockedBadResponse);
    const response: Response = await userController.updateUser('userName', user);
    expect(putMocked).toBeCalledTimes(1);
    expect(putMocked.mock.calls[0][1]).toBe(user);
    expect(response).toEqual(mockedBadResponse);
  });

  test('deleteUserByuserName - 200 OK', async () => {
    deleteMocked = jest.spyOn(ApiController.prototype, 'delete').mockResolvedValue(mockedGoodResponse);
    const response: Response = await userController.deleteUserByuserName('userName');
    expect(deleteMocked).toBeCalledTimes(1);
    expect(response).toEqual(mockedGoodResponse);
  });

  test('deleteUserByuserName - 400 Bad Response', async () => {
    deleteMocked = jest.spyOn(ApiController.prototype, 'delete').mockResolvedValue(mockedBadResponse);
    const response: Response = await userController.deleteUserByuserName('userName');
    expect(deleteMocked).toBeCalledTimes(1);
    expect(response).toEqual(mockedBadResponse);
  });
});
