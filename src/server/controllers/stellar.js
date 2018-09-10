const User = require('../models/user');
const handleAsyncError = require('../helpers/express').handleAsyncError;

exports.stellarToml = handleAsyncError(
  async ( req, res ) => {
    res
      .header('Content-Type', 'text/plain')
      .send(process.env.STELLAR_TOML);
  }
);

exports.federation = handleAsyncError(
  async ( req, res ) => {
    const {
      type,
      q,
    } = req.query;

    if (type !== 'name') {
      res
        .status(422)
        .json({
          error: 'Unsupported federation type',
        });
      return;
    }
    const [ name, host ] = q.split('*');
    if (host !== process.env.HOST) {
      res
        .status(422)
        .json({
          error: 'Unsupported federation domain',
        });
      return;
    }

    const user = await User.findOne({ username: name });

    if (user) {
      res.json({
        stellar_address: q,
        account: user.stellar.account,
      });
    } else {
      res
        .status(422)
        .json({
          error: 'User not found',
        });
    }
  }
);
