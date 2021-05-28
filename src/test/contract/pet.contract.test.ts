import { runTest } from '../../../setup/setup';
import { PetController } from '../../controllers/PetController';
import { newPet } from '../../data/PetFactory';
import { Response } from '../../../client/CustomResponse';
import { Pet } from '../../models/Pet';

runTest('Contract test - Pet Controller', () => {
  let petController: PetController;
  let pet: Pet;

  beforeAll(() => {
    petController = new PetController('http://localhost:8080/api/v3');
  });

  test('Add new Pet - 200 OK - check swagger specification', async () => {
    pet = newPet();
    const response: Response = await petController.addANew(pet);
    expect(response.statusCode).toEqual(200);
    const swaggerErrors = globalThis.swagger.validateSchema('/pet', 'post', response.statusCode, response.body);
    expect(swaggerErrors.length === 0).toBeTruthy();
  });

  test('Find Existing pet by id - 200 OK - check swagger specification', async () => {
    const response: Response = await petController.findById(pet.id);
    const swaggerErrors = globalThis.swagger.validateSchema('/pet/{petId}', 'get', response.statusCode, response.body);
    expect(response.statusCode).toEqual(200);
    expect(swaggerErrors.length === 0).toBeTruthy();
  });

  test('Find a non-existing pet - 404 not found - check swagger specification', async () => {
    const response: Response = await petController.findById(9999999);
    expect(response.statusCode).toEqual(404);
    expect(response.message).toEqual('Response code 404 (Not Found)');
  });

  test('Update Existing pet by id - 200 OK - check swagger specification', async () => {
    pet.status = 'sold';
    const response: Response = await petController.updateAnExisting(pet);
    const swaggerErrors = globalThis.swagger.validateSchema('/pet', 'put', response.statusCode, response.body);
    expect(response.statusCode).toEqual(200);
    expect(swaggerErrors.length === 0).toBeTruthy();
  });

  test('Find Updated pet by Status - 200 OK - check swagger specification', async () => {
    const response: Response = await petController.findByStatus('sold');
    expect(response.statusCode).toEqual(200);
    const swaggerErrors = globalThis.swagger.validateSchema('/pet/findByStatus', 'get', response.statusCode, response.body);
    expect(swaggerErrors.length === 0).toBeTruthy();
  });

  test('Find Pets by a non-existing Status - should return 400 - invalid status - check swagger specification', async () => {
    const response: Response = await petController.findByStatus('nostatus');
    expect(response.statusCode).toEqual(400);
    expect(response.message).toEqual('Input error: query parameter `status value `nostatus` is not in the allowable values `[available, pending, sold]`');
  });

  test('Delete Existing pet by id - 200 OK - check swagger specification', async () => {
    const response: Response = await petController.deleteById(pet.id);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual('Pet deleted');
  });

  test('Update non-existing pet by id - 404 not found - check swagger specification', async () => {
    pet.id = 999999;
    const response: Response = await petController.updateAnExisting(pet);
    expect(response.statusCode).toEqual(404);
    expect(response.message).toEqual('Response code 404 (Not Found)');
  });
});
