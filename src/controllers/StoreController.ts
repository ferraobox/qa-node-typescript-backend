import { ApiController } from '../../client/ApiController';
import { Response } from '../../client/CustomResponse';
import { Order } from '../models/Order';

class StoreController extends ApiController {
  constructor(baseUrl: string) {
    super(baseUrl);
  }

  inventoriesByStatus(): Promise<Response> {
    return super.get('/store/inventory');
  }

  placeAnOrder(body: Order): Promise<Response> {
    return super.post('/store/order', body);
  }

  findPurcharseOrderById(orderId: number): Promise<Response> {
    return super.get(`/store/order/${orderId}`);
  }

  deletePurcharseOrderById(orderId: number): Promise<Response> {
    return super.delete(`/store/order/${orderId}`);
  }
}

export { StoreController };
