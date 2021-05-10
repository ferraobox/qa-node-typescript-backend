import { ApiController } from '../../client/ApiController';
import { Response } from '../../client/CustomResponse';
import { Pet } from '../models/Pet';
import * as fs from 'fs';

class PetController extends ApiController {
  constructor(baseUrl: string) {
    super(baseUrl);
  }

  updateAnExisting(body: Pet): Promise<Response> {
    return super.put('/pet', body);
  }

  addANew(body: Pet): Promise<Response> {
    return super.post('/pet', body);
  }

  findByStatus(status: string): Promise<Response> {
    return super.get(`/pet/findByStatus?status=${status}`);
  }

  findByTags(Tags: string[]): Promise<Response> {
    const tags = Tags.map((tag) => `tags=${tag}`).join('&');
    return super.get(`/pet/findByTags?${tags}`);
  }

  findById(petId: number): Promise<Response> {
    return super.get(`/pet/${petId}`);
  }

  updateAnExistingByForm(petId: number, form: Record<string, unknown>): Promise<Response> {
    const query: string = Object.keys(form)
      .map((key) => `${key}=${form[key]}`)
      .join('&');
    return super.post(`/pet/${petId}?${query}`, '');
  }

  deleteById(petId: number): Promise<Response> {
    return super.delete(`/pet/${petId}`);
  }

  uploadImage(petId: number, imagePath: string, AdditionalMetadata?: string): Promise<Response> {
    const additionalMetadata = AdditionalMetadata ? `?additionalMetadata=${AdditionalMetadata}` : '';
    const body = fs.readFileSync(imagePath);
    const headers = {
      accept: 'application/json',
      'Content-Type': 'application/octet-stream',
      'user-agent': 'automaticTest',
    };
    return super.post(`/pet/${petId}${additionalMetadata}`, body, headers);
  }
}

export { PetController };
