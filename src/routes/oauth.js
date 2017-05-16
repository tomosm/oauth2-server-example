/* @flow */

import express from 'express';
import HttpStatus from 'http-status-codes';
import oauthserver from 'oauth2-server';
import models from '../models';

const router = express.Router();

function provider(app: express) {
  app.oauth = oauthserver({
    model: models.oauth,
    grants: ['password', 'refresh_token'],
    alwaysIssueNewRefreshToken: false,
    // debug: true
  });
  app.use(app.oauth.errorHandler());

  router.post('/token', app.oauth.grant());
  router.get('/me', (req, res, next: () => mixed) => {
    res.app.oauth.authorise()(req, res, (err) => {
      if (err) return next(err);

      res.status(HttpStatus.OK).send({ username: req.user.id }).end();
    });
  });

  return router;
}

export default provider;
