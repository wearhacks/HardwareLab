'use strict';

var _ = require('lodash');

// Get list of configs
exports.index = function(req, res) {
  Config.find(function (err, configs) {
    if(err) { return handleError(res, err); }
    return res.json(200, configs);
  });
};

// Get a single config
exports.show = function(req, res) {
  console.log(process.env);
  if(req.params.id == "warning_message")
    return res.json({message: process.env.HOME_WARNING_MESSAGE});
  else if(req.params.id == "typeform_link")
    return res.json({message: process.env.TYPEFORM});
};


function handleError(res, err) {
  return res.send(500, err);
}