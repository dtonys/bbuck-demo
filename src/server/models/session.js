const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const createEncryptor = require('simple-encryptor');


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
module.exports = Session;
