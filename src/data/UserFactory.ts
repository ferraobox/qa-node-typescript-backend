import { User } from '../models/User';
import faker from 'faker';

export function newUser(): User {
  return generateUser();
}

export function newUsersList(): User[] {
  return [generateUser(), generateUser()];
}

function generateUser() {
  return new User({
    id: faker.datatype.number(),
    username: faker.name.firstName().toLowerCase(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    phone: faker.phone.phoneNumber(),
    userStatus: 1,
  });
}
