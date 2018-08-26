const PendingUser = require('../models/pending_user');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const handleAsyncError = require('../helpers/express').handleAsyncError;
const SessionModule = require('../models/session');
const createSessionWithCookie = SessionModule.createSessionWithCookie;
const getCurrentSessionAndUser = SessionModule.getCurrentSessionAndUser;
const deleteSession = SessionModule.deleteSession;
const SESSION_COOKIE_NAME = SessionModule.SESSION_COOKIE_NAME;
const EpicGamesMetaModule = require('../models/epic_games_meta');
const EpicGamesService = '../services/epicGames';
const verifyPendingUser = EpicGamesService.verifyPendingUser;

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
    fortnite_username = fortnite_username ? fortnite_username.trim() : '';
    email = email ? email.trim().toLowerCase() : '';
    password = password ? password.trim() : '';

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

    // if user is already a friend, send the verification email
    const epicGamesMeta = await EpicGamesMetaModule.getInstance();
    const friendsMap = JSON.parse(epicGamesMeta.friendMap);
    if ( friendsMap[fortnite_username] ) {
      await verifyPendingUser(fortnite_username);
    }

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
    email = email ? email.trim().toLowerCase() : '';
    password = password ? password.trim() : '';


    const pendingUser = await PendingUser.findOne({ email: email });
    const user = await User.findOne({ email: email });
    // if only a pending user is found, show error
    if ( pendingUser && !user ) {
      res.status(422);
      res.json({
        error: {
          message: 'This account is pending verification',
        },
      });
      return;
    }
    // check user not found
    if ( !user ) {
      res.status(404);
      res.json({
        error: {
          message: 'Account not found',
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
    const { currentUser } = await getCurrentSessionAndUser( sessionId );
    console.log('currentUser');
    console.log(currentUser);

    // remove sensitive data
    const _currentUser = currentUser.toObject();
    delete _currentUser.password_hash;
    delete _currentUser.__v;

    res.json({
      data: {
        sessionToken: sessionId,
        user: _currentUser,
      },
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
    // remove sensitive data
    const _currentUser = currentUser.toObject();
    delete _currentUser.password_hash;
    delete _currentUser.__v;

    res.json({
      data: {
        user: _currentUser,
        session: currentSession,
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

// Promote pending user to real user, allowing them to log in
exports.verify = handleAsyncError(
  async ( req, res ) => {
    const fortnite_username = req.query.fortnite_username;
    const pendingUser = await PendingUser.findOne({ fortnite_username: fortnite_username });
    if ( !pendingUser ) {
      res.redirect('/');
      return;
    }

    // copy info from pending user to validated user
    await User.create({
      fortnite_username: pendingUser.fortnite_username,
      email: pendingUser.email,
      password_hash: pendingUser.password_hash,
    });

    // redirect to login page
    res.redirect('/');
  }
);

