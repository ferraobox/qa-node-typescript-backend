import { Matchers, InteractionObject, Interaction } from '@pact-foundation/pact';
import { term } from '@pact-foundation/pact/src/dsl/matchers';
import { Order } from '../../../models/Order';
const { like, regex } = Matchers;

export function getOrderIteraction(): InteractionObject | Interaction {
  return {
    state: 'there are orders',
    uponReceiving: 'a request for order',
    withRequest: {
      //path: '/api/v3/store/order',
      path: term({ generate: '/api/v3/store/order/1', matcher: '/api/v3/store/order/[A-Z0-9-]+' }),
      method: 'GET',
    },
    willRespondWith: {
      body: like({
        id: 1,
        petId: 1,
        quantity: 100,
        shipDate: regex({ generate: '2021-02-10T03:54:58.376Z', matcher: '^(?:[0-9]{4}-[0-9]{2}-[0-9]{2})?(?:[ T][0-9]{2}:[0-9]{2}:[0-9]{2})?(?:[.,][0-9]{3})?' }),
        status: 'placed',
        complete: true,
      }),
      status: 200,
    },
  };
}

export function postOrderIteraction(newOrder: Order): InteractionObject | Interaction {
  return {
    state: 'post new order',
    uponReceiving: 'order created',
    withRequest: {
      headers: {
        'Content-Type': 'application/json',
      },
      path: '/api/v3/store/order',
      method: 'POST',
      body: newOrder,
    },
    willRespondWith: {
      status: 200,
      body: like(newOrder),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  };
}

export function deleteOrderIteraction(): InteractionObject | Interaction {
  return {
    state: 'post new order',
    uponReceiving: 'order created',
    withRequest: {
      path: term({ generate: '/api/v3/store/order/123456789', matcher: '/api/v3/store/order/[A-Z0-9-]+' }),
      method: 'DELETE',
    },
    willRespondWith: {
      body: 'Order deleted!',
      status: 200,
    },
  };
}
