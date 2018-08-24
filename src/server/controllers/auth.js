const PendingUser = require('../models/pending_user');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const handleAsyncError = require('../helpers/express').handleAsyncError;
const SessionModule = require('../models/session');
const createSessionWithCookie = SessionModule.createSessionWithCookie;
const getCurrentSessionAndUser = SessionModule.getCurrentSessionAndUser;
const deleteSession = SessionModule.deleteSession;
const SESSION_COOKIE_NAME = SessionModule.SESSION_COOKIE_NAME;


exports.signup = handleAsyncError(
  async ( req, res ) => {
    let {
      fortnite_username,
      email,
      password,
    } = req.body;

    // validate required
    if ( !fortnite_username || !email || !password ) {
      res.status(422);
      res.json({
        error: {
          message: 'Please enter all required fields',
        },
      });
      return;
    }

    // cleanup input
    fortnite_username = fortnite_username.trim();
    email = email.trim().toLowerCase();
    password = password.trim();

    // if a username or email is already pending, return error
    const pendingUsers = await Promise.all([
      PendingUser.findOne({ email: email }),
      PendingUser.findOne({ fortnite_username: fortnite_username }),
    ]);
    const emailPendingUser = pendingUsers[0];
    const usernamePendingUser = pendingUsers[1];

    if ( emailPendingUser || usernamePendingUser ) {
      res.status(422);
      res.json({
        error: {
          message: `${emailPendingUser ? 'email' : 'fortnite username'} is pending verification`,
        },
      });
      return;
    }

    // if a username or email is taken and verified, return error
    const users = Promise.all([
      User.findOne({ email: email }),
      User.findOne({ fortnite_username: fortnite_username }),
    ]);
    const emailUser = users[0];
    const userNameUser = users[1];

    if ( emailUser || userNameUser ) {
      res.status(422);
      res.json({
        error: {
          message: `${emailUser ? 'email' : 'fortnite username'} is taken by an existing account`,
        },
      });
      return;
    }

    // generate password hash
    const passwordHash = await new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, ( err, hash ) => {
        if ( err ) {
          reject(err);
        }
        resolve(hash);
      });
    });

    // create pendingUser
    const pendingUser = await PendingUser.create({
      fortnite_username,
      email,
      password_hash: passwordHash,
    });

    // return success
    res.json({
      data: pendingUser,
    });
  }
);

exports.login = handleAsyncError(
  async ( req, res ) => {
    let {
      email,
      password,
    } = req.body;

    console.log('req.body', req.body);

    // cleanup input
    email = email.trim().toLowerCase();
    password = password.trim();

    // find user by email
    const user = await PendingUser.findOne({ email: email });
    // check user not found
    if ( !user ) {
      res.status(404);
      res.json({
        error: {
          message: 'Email not found',
        },
      });
      return;
    }

    // validate password
    const validPassword = await new Promise(( resolve, reject ) => {
      bcrypt.compare(password, user.password_hash, ( err, valid ) => {
        if ( err ) {
          reject(err);
        }
        resolve(valid);
      });
    });

    // check wrong password error
    if ( !validPassword ) {
      res.status(422);
      res.json({
        error: {
          message: 'Wrong password',
        },
      });
      return;
    }
    // log the user in -> set cookie, return token for mobile
    const sessionId = await createSessionWithCookie( user._id.toString(), req, res );
    res.json({
      sessionToken: sessionId,
    });
  }
);

exports.session = handleAsyncError(
  async ( req, res ) => {
    const sessionId = req.cookies[SESSION_COOKIE_NAME] || req.query.sessionToken;
    if ( !sessionId ) {
      res.json({
        data: null,
      });
      return;
    }

    const { currentUser, currentSession } = await getCurrentSessionAndUser( sessionId );
    if ( !currentUser || !currentSession ) {
      res.json({
        data: null,
      });
      return;
    }
    const _currentUser = currentUser.toObject();
    // remove sensitive data
    delete _currentUser.password_hash;

    res.json({
      data: {
        currentUser: _currentUser,
        currentSession,
      },
    });
  }
);

exports.logout = handleAsyncError(
  async ( req, res ) => {
    const sessionId = req.cookies[SESSION_COOKIE_NAME] || req.query.sessionToken;
    if ( sessionId ) {
      deleteSession(sessionId);
      res.clearCookie(SESSION_COOKIE_NAME);
      res.json({
        data: null,
      });
      return;
    }
    res.json({
      data: null,
    });
  }
);
