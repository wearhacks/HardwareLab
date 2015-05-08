'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN: 'http://localhost:9000',
  SESSION_SECRET: "hardwarelab-secret",

  FACEBOOK_ID: 'app-id',
  FACEBOOK_SECRET: 'secret',

  GOOGLE_ID: 'app-id',
  GOOGLE_SECRET: 'secret',

  GITHUB_CLIENT_ID : "4bdef2bab2b89ac7f2bf",
  GITHUB_CLIENT_SECRET : "5732b62382af7934d40f348e7abb3ff3ef735719",
  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
