const { MongoMemoryServer } = require('mongodb-memory-server');
const { mongoose } = require('../app_api/models/db');
const Trip = require('../app_api/models/travlr');
const trips = require('../data/trips.json');
const app = require('../app');

async function run() {
  const mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri('travlr'));
  await Trip.insertMany(trips);
  const server = app.listen(3000, () => {
    console.log('Travlr demo is running at http://localhost:3000');
    console.log('Run the Angular admin in another terminal with: cd app_admin && npm start');
  });

  async function stop() {
    await new Promise(resolve => server.close(resolve));
    await mongoose.disconnect();
    await mongoServer.stop();
  }
  process.once('SIGINT', () => stop().finally(() => process.exit(0)));
  process.once('SIGTERM', () => stop().finally(() => process.exit(0)));
}

run().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
