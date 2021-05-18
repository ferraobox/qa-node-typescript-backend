import { makeTest } from '../../../setup/setup';
import { PetController } from '../../controllers/PetController';
import { Response } from '../../../client/CustomResponse';
import { ApiController } from '../../../client/ApiController';
import { newPet } from '../../data/PetFactory';
import { Pet } from '../../models/Pet';

makeTest('Unit test - Pet Controller', () => {
  const mockedBadResponse = {
    url: 'mock',
    name: 'mock',
    message: 'mock',
    stack: 'mock',
    statusCode: 400,
  };
  const mockedGoodResponse = { url: 'mock', statusMessage: 'mock', statusCode: 200, headers: { mock: 'mock' }, body: { mock: 'mock' }, ip: 'mock' };

  //Mocked dependences
  let petController: PetController;
  let getMocked: jest.SpyInstance;
  let postMocked: jest.SpyInstance;
  let putMocked: jest.SpyInstance;
  let deleteMocked: jest.SpyInstance;

  let pet: Pet;

  beforeAll(() => {
    petController = new PetController('http://localhost:8080/api/v3');
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('findByStatus - 200 OK', async () => {
    getMocked = jest.spyOn(ApiController.prototype, 'get').mockResolvedValue(mockedGoodResponse);
    const response: Response = await petController.findByStatus('sold');
    expect(getMocked).toBeCalledTimes(1);
    expect(response).toEqual(mockedGoodResponse);
  });

  test('findByStatus - 400 Bad Response', async () => {
    getMocked = jest.spyOn(ApiController.prototype, 'get').mockResolvedValue(mockedBadResponse);
    const response: Response = await petController.findByStatus('sold');
    expect(getMocked).toBeCalledTimes(1);
    expect(response).toEqual(mockedBadResponse);
  });

  test('findByTags - 200 OK', async () => {
    getMocked = jest.spyOn(ApiController.prototype, 'get').mockResolvedValue(mockedGoodResponse);
    const response: Response = await petController.findByTags(['tag2']);
    expect(getMocked).toBeCalledTimes(1);
    expect(response).toEqual(mockedGoodResponse);
  });

  test('findByTags - 400 Bad Response', async () => {
    getMocked = jest.spyOn(ApiController.prototype, 'get').mockResolvedValue(mockedBadResponse);
    const response: Response = await petController.findByTags(['tag2']);
    expect(getMocked).toBeCalledTimes(1);
    expect(response).toEqual(mockedBadResponse);
  });

  test('findById - 200 OK', async () => {
    getMocked = jest.spyOn(ApiController.prototype, 'get').mockResolvedValue(mockedGoodResponse);
    const response: Response = await petController.findById(1111);
    expect(getMocked).toBeCalledTimes(1);
    expect(response).toEqual(mockedGoodResponse);
  });

  test('findById - 400 Bad Response', async () => {
    getMocked = jest.spyOn(ApiController.prototype, 'get').mockResolvedValue(mockedBadResponse);
    const response: Response = await petController.findById(1111);
    expect(getMocked).toBeCalledTimes(1);
    expect(response).toEqual(mockedBadResponse);
  });

  test('addANew - 200 OK', async () => {
    pet = newPet();
    postMocked = jest.spyOn(ApiController.prototype, 'post').mockResolvedValue(mockedGoodResponse);
    const response: Response = await petController.addANew(pet);
    expect(postMocked).toBeCalledTimes(1);
    expect(response).toEqual(mockedGoodResponse);
  });

  test('addANew - 400 Bad Response', async () => {
    pet = newPet();
    postMocked = jest.spyOn(ApiController.prototype, 'post').mockResolvedValue(mockedBadResponse);
    const response: Response = await petController.addANew(pet);
    expect(postMocked).toBeCalledTimes(1);
    expect(response).toEqual(mockedBadResponse);
  });

  test('updateAnExisting - 200 OK', async () => {
    pet = newPet();
    putMocked = jest.spyOn(ApiController.prototype, 'put').mockResolvedValue(mockedGoodResponse);
    const response: Response = await petController.updateAnExisting(pet);
    expect(putMocked).toBeCalledTimes(1);
    expect(response).toEqual(mockedGoodResponse);
  });

  test('updateAnExisting - 400 Bad Response', async () => {
    pet = newPet();
    putMocked = jest.spyOn(ApiController.prototype, 'put').mockResolvedValue(mockedBadResponse);
    const response: Response = await petController.updateAnExisting(pet);
    expect(putMocked).toBeCalledTimes(1);
    expect(response).toEqual(mockedBadResponse);
  });

  test('deleteById - 200 OK', async () => {
    deleteMocked = jest.spyOn(ApiController.prototype, 'delete').mockResolvedValue(mockedGoodResponse);
    const response: Response = await petController.deleteById(1111);
    expect(deleteMocked).toBeCalledTimes(1);
    expect(response).toEqual(mockedGoodResponse);
  });

  test('deleteById - 400 Bad Response', async () => {
    deleteMocked = jest.spyOn(ApiController.prototype, 'delete').mockResolvedValue(mockedBadResponse);
    const response: Response = await petController.deleteById(1111);
    expect(deleteMocked).toBeCalledTimes(1);
    expect(response).toEqual(mockedBadResponse);
  });

  test('uploadImage - 200 OK', async () => {
    postMocked = jest.spyOn(ApiController.prototype, 'post').mockResolvedValue(mockedGoodResponse);
    const response: Response = await petController.uploadImage(1111, 'images/shiba.jpeg', 'shiba inu');
    expect(postMocked.mock.calls[0][0]).toBe('/pet/1111?additionalMetadata=shiba inu');
    expect(typeof postMocked.mock.calls[0][1]).toBe('object');
    expect(postMocked.mock.calls[0][2]).toMatchObject({
      accept: 'application/json',
      'Content-Type': 'application/octet-stream',
      'user-agent': 'automaticTest',
    });
    expect(postMocked).toBeCalledTimes(1);
    expect(response).toEqual(mockedGoodResponse);
  });

  test('updateAnExistingByForm - 200 OK', async () => {
    postMocked = jest.spyOn(ApiController.prototype, 'post').mockResolvedValue(mockedGoodResponse);
    const response: Response = await petController.updateAnExistingByForm(1111, { name: 'rufus', status: 'sold' });
    expect(postMocked.mock.calls[0][0]).toBe('/pet/1111?name=rufus&status=sold');
    expect(typeof postMocked.mock.calls[0][1]).toBe('string');
    expect(postMocked).toBeCalledTimes(1);
    expect(response).toEqual(mockedGoodResponse);
  });
});
