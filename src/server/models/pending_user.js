const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// The pending user will expire after one day
const EXPIRY_SECONDS = 60 * 60 * 24;
const PendingUserSchema = new Schema({
  fortnite_username: {
    type: String, unique: true, dropDups: true,
  },
  epic_friend_authenticated: { type: Boolean, default: false },
  email: {
    type: String, unique: true, dropDups: true,
  },
  password_hash: String,
  createdAt: { type: Date, expires: EXPIRY_SECONDS, default: Date.now },
});

const PendingUser = mongoose.model('pending_user', PendingUserSchema);
module.exports = PendingUser;
