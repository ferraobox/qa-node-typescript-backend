import { runTest } from '../../../setup/setup';
import { UserController } from '../../controllers/UserController';
import { newUser, newUsersList } from '../../data/UserFactory';
import { Response } from '../../../client/CustomResponse';
import { User } from '../../models/User';

runTest('INT - User Controller', () => {
  let userController: UserController;
  let user: User;
  let users: User[];

  beforeAll(() => {
    userController = new UserController('http://localhost:8080/api/v3');
    user = newUser();
  });

  test('Add new User - 200 OK', async () => {
    const response: Response = await userController.createUser(user);
    expect(response.statusCode).toEqual(200);
  });

  test('Login with new User - 200 OK', async () => {
    const response: Response = await userController.logUser(user.username, user.password);
    expect(response.statusCode).toEqual(200);
    expect(response.body.includes('Logged in')).toBeTruthy();
  });

  test('Logout with new User - 200 OK', async () => {
    const response: Response = await userController.logoutUser();
    expect(response.statusCode).toEqual(200);
    expect(response.body.includes('logged out')).toBeTruthy();
  });

  test('Get user by userName - 200 OK', async () => {
    const response: Response = await userController.getUserByuserName(user.username);
    expect(response.statusCode).toEqual(200);
    expect(response.body.username).toEqual(user.username);
    expect(response.body.id).toEqual(user.id);
    expect(response.body.firstName).toEqual(user.firstName);
    expect(response.body.lastName).toEqual(user.lastName);
    expect(response.body.phone.toString()).toEqual(user.phone.toString());
    expect(response.body.email).toEqual(user.email);
    expect(response.body.password.toString()).toEqual(user.password.toString());
    expect(response.body.userStatus).toEqual(user.userStatus);
  });

  test('Update user by userName - 200 OK', async () => {
    user.email = 'email@email.com';
    user.firstName = 'firstName';
    user.phone = 111111111;
    const response: Response = await userController.updateUser(user.username, user);
    expect(response.statusCode).toEqual(200);
    expect(response.body.username).toEqual(user.username);
    expect(response.body.id).toEqual(user.id);
    expect(response.body.firstName).toEqual(user.firstName);
    expect(response.body.lastName).toEqual(user.lastName);
    expect(response.body.phone.toString()).toEqual(user.phone.toString());
    expect(response.body.email).toEqual(user.email);
    expect(response.body.password.toString()).toEqual(user.password.toString());
    expect(response.body.userStatus).toEqual(user.userStatus);
  });

  test('Delete user by userName - 200 OK', async () => {
    user = newUser();
    await userController.createUser(user);
    const response: Response = await userController.deleteUserByuserName(user.username);
    expect(response.statusCode).toEqual(200);
  });

  test('Get user by userName - 404 Not Found', async () => {
    const response: Response = await userController.getUserByuserName('nonExisting');
    expect(response.statusCode).toEqual(404);
    expect(response.message).toEqual('Response code 404 (Not Found)');
  });

  test('Update user by non existing userName - 404 Not Found', async () => {
    const response: Response = await userController.updateUser('nonExisting', user);
    expect(response.statusCode).toEqual(404);
    expect(response.message).toEqual('Response code 404 (Not Found)');
  });

  test('Add new Users from list - 200 OK', async () => {
    users = newUsersList();
    const response: Response = await userController.createUsersWithList(users);
    expect(response.statusCode).toEqual(200);
  });
});
