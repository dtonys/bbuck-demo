const mongoose = require('mongoose');


// set config
mongoose.set('debug', true);
mongoose.Promise = global.Promise;

// require all models
require('./models/session');
require('./models/user');
require('./models/pending_user');
require('./models/epic_games_meta');
require('./models/counter');

function mongoConnect() {
  return new Promise(( resolve, reject ) => {
    const connection = mongoose.connect(`${process.env.MONGODB_CONNECTION_URL}/${process.env.MONGODB_DATABASE_NAME}`, {
      promiseLibrary: global.Promise,
      config: {
        autoIndex: true,
      },
    });
    connection
      .then(resolve)
      .catch(( error ) => {
        reject(error);
      });
  });
}

// setup connection
module.exports = () => {
  return Promise.resolve()
    .then(() => {
      return mongoConnect();
    })
    .then(() => {
      const EpicGamesService = require('./services/epicGames');
      return EpicGamesService.initialize();
    })
    .then(() => {
      const CounterModule = require('./models/counter');
      return CounterModule.getOrCreateInstance();
    });
};
