import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const OAuthAccessTokensSchema = new Schema({
  accessToken: { type: String, required: true, unique: true },
  clientId: String,
  userId: { type: String, required: true },
  expires: Date
});

mongoose.model('oauth_accesstokens', OAuthAccessTokensSchema);

const OAuthAccessTokensModel = mongoose.model('oauth_accesstokens');

module.exports.getAccessToken = function (bearerToken, callback) {
  OAuthAccessTokensModel.findOne({ accessToken: bearerToken }, callback);
};

module.exports.saveAccessToken = function (token, clientId, expires, userId, callback) {
  const fields = {
    clientId: clientId,
    userId: userId,
    expires: expires
  };

  OAuthAccessTokensModel.update({ accessToken: token }, fields, { upsert: true }, function (err) {
    // if (err) {
    //   console.error(err);
    // }

    callback(err);
  });
};
