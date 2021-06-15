const { Verifier } = require('@pact-foundation/pact');

(async function main() {
  try {
    await new Verifier({
      providerBaseUrl: 'http://localhost:8080',
      pactUrls: [`${process.env.PWD}/pacts/consumer-storeapi.json`],
    }).verifyProvider();
  } catch (error) {
    console.error('Error: ' + error.message);
    process.exit(1);
  }
})();
