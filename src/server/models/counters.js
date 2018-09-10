const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CountersSchema = new Schema({
  _id: { type: String, unique: true },
  value: { type: Number, default: 0 },
});

const Counters = mongoose.model('counters', CountersSchema);
module.exports = {
  Counters,
  nextUserSequence: async () => {
    return new Promise((resolve, reject) => {
      Counters.findOneAndUpdate({ _id: 'user_sequence' }, { $inc: { value: 1 } }, { new: true }, (err, doc) => {
        if (err) {
          return reject(err);
        }
        return resolve(doc.value);
      });
    });
  },
};