import { ApiController } from '../../client/ApiController';
import { Response } from '../../client/CustomResponse';
import { User } from '../models/User';

class UserController extends ApiController {
  constructor(baseUrl: string) {
    super(baseUrl);
  }

  createUser(body: User): Promise<Response> {
    return super.post('/user', body);
  }

  createUsersWithList(body: User[]): Promise<Response> {
    return super.post('/user/createWithList', body);
  }

  logUser(userName: string, password: number): Promise<Response> {
    return super.get(`/user/login?userName=${userName}&password=${password}`);
  }

  logoutUser(): Promise<Response> {
    return super.get('/user/logout');
  }

  getUserByuserName(userName: string): Promise<Response> {
    return super.get(`/user/${userName}`);
  }

  updateUser(userName: string, body: User): Promise<Response> {
    return super.put(`/user/${userName}`, body);
  }

  deleteUserByuserName(userName: string): Promise<Response> {
    return super.delete(`/user/${userName}`);
  }
}

export { UserController };
