import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const authorizedClientIds = ['system'];

const OAuthClientsSchema = new Schema({
  clientId: { type: String, required: true, unique: true },
  clientSecret: String,
  redirectUri: String
});

OAuthClientsSchema.static('getClient', function (clientId, clientSecret, callback) {
  const params = { clientId: clientId };
  if (clientSecret) {
    params.clientSecret = clientSecret;
  }

  OAuthClientsModel.findOne(params, callback);
});

OAuthClientsSchema.static('grantTypeAllowed', function (clientId, grantType, callback) {
  if (grantType === 'password' || grantType === 'authorization_code') {
    return callback(false, authorizedClientIds.indexOf(clientId) >= 0);
  } else {
    return callback(true);
  }
});

mongoose.model('oauth_clients', OAuthClientsSchema);
const OAuthClientsModel = mongoose.model('oauth_clients');

export default OAuthClientsModel;
