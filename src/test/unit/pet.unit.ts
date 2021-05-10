import { makeTest } from '../../../setup/setup';
import { PetController } from '../../controllers/PetController';
import { newPet } from '../../data/PetFactory';
import { Response } from '../../../client/CustomResponse';
import { Pet } from '../../models/Pet';
import { SwaggerCheck } from '../../../utils/SwaggerCheck';

makeTest('Unit - Pet Controller', () => {
  let petController: PetController;
  let pet: Pet;
  let swagger: SwaggerCheck;

  beforeAll(() => {
    petController = new PetController('http://localhost:8080/api/v3');
    swagger = new SwaggerCheck('./openapiswagger.yml');
  });

  // test('Add new Pet - 200 OK', async () => {
  //   pet = newPet();
  //   const response: Response = await petController.addANew(pet);

  //   const swaggerErrors = swagger.validateSchema('/pet', 'post', response.statusCode, response.body);
  //   expect(response.statusCode).toEqual(200);
  //   expect(swaggerErrors.length === 0).toBeTruthy();
  // });
});
