const path = require('node:path');
const { once } = require('node:events');
const { spawnSync } = require('node:child_process');
const newman = require('newman');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { mongoose } = require('../app_api/models/db');
const Trip = require('../app_api/models/travlr');
const app = require('../app');

async function run() {
  const mongoServer = await MongoMemoryServer.create();
  let server;
  try {
    const seed = spawnSync('npm', ['run', 'seed'], {
      cwd: path.join(__dirname, '..'),
      env: { ...process.env, DB_URI: mongoServer.getUri('travlr') },
      encoding: 'utf8',
    });
    if (seed.status !== 0) throw new Error(`Database seed failed:\n${seed.stderr || seed.stdout}`);
    await mongoose.connect(mongoServer.getUri('travlr'));
    if (await Trip.countDocuments() !== 3) throw new Error('Database seed did not create three trips.');
    server = app.listen(0, '127.0.0.1');
    await once(server, 'listening');
    const baseUrl = `http://127.0.0.1:${server.address().port}`;

    await new Promise((resolve, reject) => {
      newman.run({
        collection: path.join(__dirname, '..', 'postman', 'travlr-module5.postman_collection.json'),
        envVar: [{ key: 'baseUrl', value: baseUrl }],
        reporters: 'cli',
      }, (error, summary) => {
        if (error) return reject(error);
        if (summary.run.failures.length) return reject(new Error('Postman collection had failed assertions.'));
        resolve();
      });
    });
  } finally {
    if (server) await new Promise(resolve => server.close(resolve));
    await mongoose.disconnect();
    await mongoServer.stop();
  }
}

run().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
