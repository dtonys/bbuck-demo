const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const serializeError = require('serialize-error');

const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');


// NOTE: We're going to override the default express middleware
function handleErrorMiddleware( err, req, res, next ) { // eslint-disable-line no-unused-vars
  // NOTE: Add additional error processing here
  console.error('handleErrorMiddleware'); // eslint-disable-line no-console
  console.error(err); // eslint-disable-line no-console

  // In production, hide the error, return a generic `internal_server_error` response
  if ( process.env.NODE_ENV === 'production' ) {
    res.status(500);
    res.json({
      internal_server_error: true,
    });
    return;
  }
  // In development, expose the error details to the client
  res.status(500);
  res.json({
    internal_server_error: true,
    ...serializeError(err),
  });
}

function setupErrorHandling() {
  // Ensure that unhandledRejection is logged and exits the server
  process.on('unhandledRejection', (error) => {
    console.error('unhandledRejection'); // eslint-disable-line no-console
    console.error(error); // eslint-disable-line no-console
    process.exit(1);
  });
}

function createExpressApp() {
  // setup express and middleware
  const app = express();

  // serve webpack compiled assets
  if ( process.env.NODE_ENV !== 'production' ) {
    const compiler = webpack(webpackConfig('development'));
    app.use( webpackDevMiddleware(compiler) );
    app.use( webpackHotMiddleware(compiler) );
  }
  else {
    app.use( express.static('dist') );
  }

  app.use( express.static('public') );
  app.use( bodyParser.urlencoded({ extended: true }) );
  app.use( bodyParser.json() );

  // api routes
  app.use( require('./server/routes') );

  // serve production html
  app.get('*', ( req, res ) => {
    res.sendFile( path.join(__dirname, '../dist/index.html') );
  });

  app.use(handleErrorMiddleware);

  return app;
}

function startExpressServer( app ) {
  const port = process.env.PORT || 3000;
  return new Promise((resolve, reject) => {
    const listener = app.listen(port, (err) => {
      if ( err ) {
        reject(err);
      }
      console.log(`Server listening on ${port} in ${app.settings.env} mode.`); // eslint-disable-line no-console
      resolve(listener);
    });
  });
}

async function bootstrap() {
  // load env
  dotenv.load({
    path: path.resolve(__dirname, '../.env'),
  });

  setupErrorHandling();

  // initialize mailer
  require('./server/email/mailer');
  // setup mongodb
  await require('./server/setupMongo')();

  // initialize express
  const app = createExpressApp();
  await startExpressServer(app);

}

bootstrap()
  .catch((error) => {
    console.error('bootstrap error'); // eslint-disable-line no-console
    console.error(error); // eslint-disable-line no-console
  });
