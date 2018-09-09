const deepDiff = require('deep-diff');
const asyncHelpers = require('../helpers/async');
const delay = asyncHelpers.delay;

const mailer = require('../email/mailer');
const EpicRequestsModule = require('./epicRequests');
const runEpicLoginFlow = EpicRequestsModule.runEpicLoginFlow;
const runEpicGetFriendsFlow = EpicRequestsModule.runEpicGetFriendsFlow;
const removeFriendRequest = EpicRequestsModule.removeFriendRequest;

const EpicGamesMetaModule = require('../models/epic_games_meta');
const getInstance = EpicGamesMetaModule.getInstance;
const createInstance = EpicGamesMetaModule.createInstance;
const PendingUser = require('../models/pending_user');


exports.initialize = async function initialize() {
  let epicGamesMeta = await getInstance();
  if ( !epicGamesMeta ) {
    epicGamesMeta = await createInstance();
  }
};

const HOUR_MS = 1000 * 60 * 60;
const SECONDS_MS = 1000;


// let loginOnInterval_count = 0;
async function loginOnInterval() {
  const epicGamesMeta = await getInstance();

  // logging
  // console.log('::loginOnInterval::');
  // console.log('loginOnInterval_count', loginOnInterval_count);
  // loginOnInterval_count++;

  // generate a new acess token, save to DB
  const token = await runEpicLoginFlow();
  console.log('***token***', token);
  epicGamesMeta.set({ accessToken: token });
  await epicGamesMeta.save();

  // wait X hours, re-run
  await delay( HOUR_MS * 6 );
  loginOnInterval();
}

async function verifyPendingUser( username ) {
  const pendingUser = await PendingUser.findOne({ fortnite_username: username });
  if ( !pendingUser ) return;
  // mark that we saw this user on our friends list
  pendingUser.set({ epic_friend_authenticated: true });
  await pendingUser.save();
  mailer.sendVerifyEmail( pendingUser.fortnite_username, pendingUser.email );
}

// let getFriendsAndProcessOnInterval_count = 0;
async function getFriendsAndProcessOnInterval() {
  const epicGamesMeta = await getInstance();
  const accessToken = epicGamesMeta.accessToken;

  // logging
  // console.log('::getFriendsAndProcessOnInterval::');
  // console.log('getFriendsAndProcessOnInterval_count', getFriendsAndProcessOnInterval_count);
  // getFriendsAndProcessOnInterval_count++;
  const fetchedFriendMap = await runEpicGetFriendsFlow(accessToken);
  console.log('***fetchedFriendMap***');
  console.log(fetchedFriendMap);

  for ( username in fetchedFriendMap ) {
    const userId = fetchedFriendMap[username];
    // Verify the user & send email
    await verifyPendingUser(username);
    // Remove the user from the friends list
    await removeFriendRequest(userId, accessToken);
  }

  // wait X seconds, re-run
  await delay( SECONDS_MS * 10 );
  getFriendsAndProcessOnInterval();
}

exports.loginOnInterval = loginOnInterval;
exports.getFriendsAndProcessOnInterval = getFriendsAndProcessOnInterval;
exports.verifyPendingUser = verifyPendingUser;
