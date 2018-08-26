const path = require('path');
const dotenv = require('dotenv');

async function bootstrap() {
  // load env
  dotenv.load({
    path: path.resolve(__dirname, '../.env'),
  });

  // setup mongodb
  await require('./server/setupMongo')();

  // setup && initialie EpicGamesService
  const EpicGamesService = require('./server/services/epicGames');
  await EpicGamesService.initialize();

  // run getFriendsAndProcessOnInterval
  EpicGamesService.getFriendsAndProcessOnInterval();
}

bootstrap()
  .catch((error) => {
    console.error('runEpicLoginFlow::bootstrap error'); // eslint-disable-line no-console
    console.error(error); // eslint-disable-line no-console
  });
