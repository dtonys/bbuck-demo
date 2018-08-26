const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EPIC_GAMES_META_ID = 'EPIC_GAMES_META_ID';

const EpicGamesMetaSchema = new Schema({
  _id: { type: String, default: EPIC_GAMES_META_ID },
  // { <user_name>: <user_id>, <user_name>: <user_id> }
  friendMap: { type: String, default: '{}' },
  accessToken: { type: String },
});

const EpicGamesMeta = mongoose.model('epic_games_meta', EpicGamesMetaSchema);
exports.getInstance = async () => {
  console.log('getInstance');
  const instance = await EpicGamesMeta.findOne({ _id: EPIC_GAMES_META_ID });
  return instance;
};
exports.createInstance = async () => {
  console.log('createInstance');
  const instance = await EpicGamesMeta.create({});
  return instance;
};
