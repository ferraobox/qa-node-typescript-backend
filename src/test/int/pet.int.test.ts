import { makeTest } from '../../../setup/setup';
import { PetController } from '../../controllers/PetController';
import { newPet } from '../../data/PetFactory';
import { Response } from '../../../client/CustomResponse';
import { Pet } from '../../models/Pet';

makeTest('INT - Pet Controller', () => {
  let petController: PetController;
  let pet: Pet;

  beforeAll(() => {
    petController = new PetController('http://localhost:8080/api/v3');
  });

  test('Add new Pet - 200 OK', async () => {
    pet = newPet();
    const response: Response = await petController.addANew(pet);
    expect(response.statusCode).toEqual(200);
  });

  test('Find Existing pet by id - 200 OK', async () => {
    const response: Response = await petController.findById(pet.id);
    expect(response.statusCode).toEqual(200);
  });

  test('Update Existing pet by id - 200 OK', async () => {
    pet.status = 'sold';
    const response: Response = await petController.updateAnExisting(pet);
    expect(response.statusCode).toEqual(200);
  });

  test('Find Updated pet by id - 200 OK', async () => {
    const response: Response = await petController.findById(pet.id);
    expect(response.body.status).toEqual('sold');
    expect(response.statusCode).toEqual(200);
  });

  test('Find Updated pet by Status - 200 OK', async () => {
    const response: Response = await petController.findByStatus('sold');
    expect(response.body.every((p: Pet) => p.status === 'sold')).toBeTruthy();
    expect(response.statusCode).toEqual(200);
  });

  test('Find Updated pet by Tags - 200 OK', async () => {
    const response: Response = await petController.findByTags(['tag2']);

    expect(
      response.body.every((p: Pet) => {
        return p.tags.filter((tag) => tag.name === 'tag2').length > 0;
      })
    ).toBeTruthy();
    expect(response.statusCode).toEqual(200);
  });

  test('Delete Existing pet by id - 200 OK', async () => {
    const response: Response = await petController.deleteById(pet.id);
    expect(response.statusCode).toEqual(200);
  });
});
