const path = require('path');
const dotenv = require('dotenv');
const repl = require('repl');
const mongoose = require('mongoose');


async function bootstrap() {
  // load env
  dotenv.load({
    path: path.resolve(__dirname, '../.env'),
  });

  // setup mongodb
  await require('./server/setupMongo')();

  const db = mongoose.connection;
  const replServer = repl.start({
    prompt: '[CONSOLE] > ',
  });

  // Expose mongoose to the repl to make queries
  replServer.context.mongoose = mongoose;
  Object.keys(db.models).forEach(( modelName ) => {
    replServer.context[modelName] = db.models[modelName];
  });
  replServer.context.counterModule = require('./server/models/counter');
}

bootstrap()
  .catch((error) => {
    console.log(error); // eslint-disable-line no-console
  });
