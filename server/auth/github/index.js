'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');

var router = express.Router();

// GET /auth/github
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in GitHub authentication will involve redirecting
//   the user to github.com.  After authorization, GitHubwill redirect the user
//   back to this application at /auth/github/callback
router
  .get('/', passport.authenticate('github', {
    scope: ['user', 'user:email','repo'], //https://developer.github.com/v3/oauth/#scopes
    failureRedirect: '/signup',
    session: true
  }))

  .get('/callback', passport.authenticate('github', {
    failureRedirect: '/signup',
    session: true
  }), auth.setTokenCookie);

module.exports = router;
