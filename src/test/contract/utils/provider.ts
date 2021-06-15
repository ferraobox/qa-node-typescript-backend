import { Pact, InteractionObject, Interaction } from '@pact-foundation/pact';

class Provider {
  provider: Pact;

  constructor(consumerName: string, providerName: string) {
    this.provider = new Pact({
      port: 8080,
      consumer: consumerName,
      provider: providerName,
    });
  }

  setup = () => this.provider.setup();

  finalize = () => this.provider.finalize();

  addInteraction = (interactionObj: InteractionObject | Interaction) => {
    return this.provider.addInteraction(interactionObj);
  };
}

export { Provider };
