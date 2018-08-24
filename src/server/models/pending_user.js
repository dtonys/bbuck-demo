const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const EXPIRY_SECONDS = 60 * 60 * 24;
const PendingUserSchema = new Schema({
  fortnite_username: {
    type: String, unique: true, dropDups: true,
  },
  email: {
    type: String, unique: true, dropDups: true,
  },
  password_hash: String,
  // createdAt: { type: Date, expires: EXPIRY_SECONDS, default: Date.now },
});

const PendingUser = mongoose.model('pending_user', PendingUserSchema);
module.exports = PendingUser;
