const mongoose = require('mongoose');


// set config
mongoose.set('debug', true);
mongoose.Promise = global.Promise;

// require all models
require('./models/session');
require('./models/user');
require('./models/pending_user');

// setup connection
module.exports = () => {
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
};
