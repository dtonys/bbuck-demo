const mongoose = require('mongoose');
const parseDomain = require('parse-domain');
const Schema = mongoose.Schema;
const createEncryptor = require('simple-encryptor');
const PendingUser = require('../models/pending_user');

const encryptor = createEncryptor( process.env.ENCRYPTION_SECRET );
const SESSION_DURATION_SECONDS = 60 * 60 * 24;
const SESSION_COOKIE_NAME = 'Session';

const SessionSchema = new Schema({
  _id: String,
  createdAt: { type: Date, expires: SESSION_DURATION_SECONDS, default: Date.now },
});
const Session = mongoose.model('session', SessionSchema);

exports.SESSION_DURATION_SECONDS = SESSION_DURATION_SECONDS;
exports.SESSION_COOKIE_NAME = SESSION_COOKIE_NAME;
exports.Model = Session;

// Get the value we need to set to the domain for cross subdomain cookies
// .bbuck.io -> www.bbuck.io, api.bbuck.io
function getCrossDomainCookieValue( req ) {
  const parsed = parseDomain(req.get('host'));
  if ( parsed && parsed.domain && parsed.tld ) {
    return `.${parsed.domain}.${parsed.tld}`;
  }
  return undefined;
}

async function createSession( userId ) {
  const encryptedUserId = encryptor.encrypt(userId);
  const session = await Session.create({
    _id: encryptedUserId,
  });
  return session;
}

exports.deleteSession = async function deleteSession( sessionId ) {
  await Session.remove({ _id: sessionId });
};

exports.createSessionWithCookie = async function createSessionWithCookie( userId, req, res ) {
  const createdSession = await createSession( userId );
  res.cookie(
    SESSION_COOKIE_NAME,
    createdSession._id,
    {
      httpOnly: true, // Prevent client side javascript from stealing session token
      maxAge: 1000 * SESSION_DURATION_SECONDS,
      domain: getCrossDomainCookieValue(req),
    }
  );
  return createdSession._id;
};

exports.getCurrentSessionAndUser = async function getCurrentSessionAndUser( sessionId ) {
  if ( !sessionId ) {
    return { user: null, session: null };
  }
  const userId = encryptor.decrypt(sessionId);
  const [ currentUser, currentSession ] = await Promise.all([
    PendingUser.findOne({ _id: userId }),
    Session.findOne({ _id: sessionId }),
  ]);
  return {
    currentUser,
    currentSession,
  };
};
