const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const USER_SEQUENCE_ID = 'user_sequence';
const CountersSchema = new Schema({
  _id: { type: String, default: USER_SEQUENCE_ID },
  value: { type: Number, default: 0 },
});

const Counters = mongoose.model('counter', CountersSchema);
exports.Counters = Counters;
exports.getOrCreateInstance = async () => {
  let userCounter = await Counters.findOne({ _id: USER_SEQUENCE_ID });
  if ( userCounter ) return userCounter;
  userCounter = await Counters.create({});
  return userCounter;
};

exports.nextUserSequence = async () => {
  const updatedCounter = await Counters.findOneAndUpdate(
    { _id: USER_SEQUENCE_ID },
    { $inc: { value: 1 } },
    { new: true },
  );
  return updatedCounter.value;
};
