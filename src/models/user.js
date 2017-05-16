import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const OAuthUsersSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  // password_reset_token: { type: String, unique: true },
  reset_token_expires: Date
});

function hashPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

OAuthUsersSchema.static('register', function (fields, callback) {
  fields.password = hashPassword(fields.password);
  const user = new OAuthUsersModel(fields);
  user.save(callback);
});

OAuthUsersSchema.static('getUser', function (username, password, callback) {
  OAuthUsersModel.authenticate(username, password, function (err, user) {
    if (err || !user) return callback(err);
    callback(null, user.username);
  });
});

OAuthUsersSchema.static('authenticate', function (username, password, callback) {
  this.findOne({ username: username }, function (err, user) {
    if (err || !user) return callback(err);
    callback(null, bcrypt.compareSync(password, user.password) ? user : null);
  });
});

mongoose.model('users', OAuthUsersSchema);

const OAuthUsersModel = mongoose.model('users');

export default OAuthUsersModel;
