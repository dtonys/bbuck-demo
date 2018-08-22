const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const options = {
  timestamps: true,
};
const UserSchema = new Schema({
  username: {
    type: String, unique: true, dropDups: true,
  },
  email: {
    type: String, unique: true, dropDups: true,
  },
  password_hash: String,
  is_epic_verified: Boolean,
}, options);

const User = mongoose.model('user', UserSchema);
module.exports = User;
