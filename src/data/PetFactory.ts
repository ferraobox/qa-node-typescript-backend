import { Pet } from '../models/Pet';
import faker from 'faker';

export function newPet(): Pet {
  return new Pet({
    id: Math.floor(Math.random() * 100) + 1,
    category: {
      id: 1,
      name: 'Killer',
    },
    name: faker.name.firstName(),
    photoUrls: ['url1', 'url2'],
    tags: [
      {
        id: 1,
        name: 'tag1',
      },
      {
        id: 2,
        name: 'tag2',
      },
    ],
    status: 'available',
  });
}
