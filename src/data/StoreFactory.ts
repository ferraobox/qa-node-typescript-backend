import { Order } from '../models/Order';
import faker from 'faker';

export function newOrder(): Order {
  return new Order({
    id: faker.datatype.number(),
    petId: 198772,
    quantity: 7,
    shipDate: '2021-02-10T03:54:58.376Z',
    status: 'approved',
    complete: true,
  });
}
