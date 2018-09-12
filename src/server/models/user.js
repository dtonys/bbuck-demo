const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const StellarData = new Schema({
  account: { type: String, unique: true, dropDups: true },
  sequence: { type: Number, unique: true, dropDups: true },
});

const options = {
  timestamps: true,
};
const UserSchema = new Schema({
  fortnite_username: {
    type: String, unique: true, dropDups: true,
  },
  email: {
    type: String, unique: true, dropDups: true,
  },
  password_hash: String,
  username: {
    type: String, unique: true, dropDups: true,
  },
  stellar: StellarData,
}, options);

const User = mongoose.model('user', UserSchema);
module.exports = User;
