import AuthCode from './oauth-authcode';
import AccessToken from './oauth-accesstoken';
import RefreshToken from './oauth-refreshtoken';
import User from './user';
import Client from './oauth-client';

// node-oauth2-server API
const oauth2ServerAPI = {};
oauth2ServerAPI.getAuthCode = AuthCode.getAuthCode;
oauth2ServerAPI.saveAuthCode = AuthCode.saveAuthCode;
oauth2ServerAPI.getAccessToken = AccessToken.getAccessToken;
oauth2ServerAPI.saveAccessToken = AccessToken.saveAccessToken;
oauth2ServerAPI.saveRefreshToken = RefreshToken.saveRefreshToken;
oauth2ServerAPI.getRefreshToken = RefreshToken.getRefreshToken;
oauth2ServerAPI.getUser = User.getUser;
oauth2ServerAPI.getClient = Client.getClient;
oauth2ServerAPI.grantTypeAllowed = Client.grantTypeAllowed;

export default oauth2ServerAPI;
