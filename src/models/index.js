import config from '../../config';
import mongoose from 'mongoose';
mongoose.Promise = require('bluebird');
mongoose.connect(config.db, {});

// const oauth = require('./oauth');
// const User = require('./user');
// const OAuthClientsModel = require('./oauth-client');

import oauth from './oauth';
import User from './user';
import OAuthClientsModel from './oauth-client';

export default { oauth, User, OAuthClientsModel, mongoose };
