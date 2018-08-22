const User = require('../models/user');
const bcrypt = require('bcrypt');
const handleAsyncError = require('../helpers/express').handleAsyncError

exports.signup = handleAsyncError(
  async ( req, res ) => {
    const {
      username,
      email,
      password,
    } = req.body;

    // check if a verified user already exists with email
    // const existingUser = await User.findOne({ email: email });
    // if ( existingUser ) {
    //   res.status(422);
    //   res.json({
    //     error: {
    //       message: 'User email already in use',
    //     },
    //   });
    //   return;
    // }


    res.json({
      name: 'signup',
    });
  }
);

exports.login = handleAsyncError(
  async ( req, res ) => {
    const {
      email,
      password,
    } = req.body;

    res.json({
      name: 'login',
    });
  }
);

exports.session = handleAsyncError(
  async ( req, res ) => {
    res.json({
      name: 'session',
    });
  }
);

exports.logout = handleAsyncError(
  async ( req, res ) => {
    res.json({
      name: 'logout',
    });
  }
);
