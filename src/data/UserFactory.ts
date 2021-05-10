import { User } from '../models/User';
import faker, { fake } from 'faker';

export function newUser(): User {
  return new User({
    id: faker.random.number(),
    username: faker.name.firstName().toLowerCase(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    phone: faker.phone.phoneNumber(),
    userStatus: 1,
  });
}

export function newUsersList(): User[] {
  return [
    new User({
      id: faker.random.number(),
      username: faker.name.firstName().toLowerCase(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      phone: faker.phone.phoneNumber(),
    }),
    new User({
      id: faker.random.number(),
      username: faker.name.firstName().toLowerCase(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      phone: faker.phone.phoneNumber(),
    }),
  ];
}
