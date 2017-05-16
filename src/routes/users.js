/* @flow */

import express from 'express';
import models from '../models';
import errors from '../lib/errors';
import HttpStatus from 'http-status-codes';

const router = express.Router();

router.post('/', (req, res, next: () => mixed) => {
  req.checkBody('username', 'required').notEmpty();
  req.checkBody('password', 'required').notEmpty();

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      return next(errors.ValidationError(result.array()));
    }

    models.User.register({ username: req.body.username, password: req.body.password }, function (err, user) {
      if (err) return next(err);
      res.status(HttpStatus.CREATED).header('Location', req.getBaseUrl() + user.username).end();
    });

  });
});

router.get('/:username', (req, res, next: () => mixed) => {

  res.app.oauth.authorise()(req, res, (err) => {
    if (err) return next(err);

    if (req.user.id === req.params.username) {
      res.status(HttpStatus.OK).end();
    } else {
      res.status(HttpStatus.UNAUTHORIZED).end();
    }
  });

});

export default router;
