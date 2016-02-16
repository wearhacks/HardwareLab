'use strict';

var _ = require('lodash');
var fs = require('fs-extra');
var Product = require('./product.model');
var config = require('../../config/environment');

// Get list of products
exports.index = function(req, res) {

  Product.find(function (err, products) {
    if(err) { return handleError(res, err); }
    return res.json(200, products);
  });
};

// Get a single product
exports.show = function(req, res) {
  Product.findById(req.params.id, function (err, product) {
    if(err) { return handleError(res, err); }
    if(!product) { return res.send(404); }
    return res.json(product);
  });
};

// Creates a new product in the DB.
exports.create = function(req, res) {
  Product.create(req.body, function(err, product) {
    if(err) { return handleError(res, err); }
    return res.json(201, product);
  });
};

// Updates an existing product in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Product.findById(req.params.id, function (err, product) {
    if (err) { return handleError(res, err); }
    if(!product) { return res.send(404); }
    var updated = _.merge(product, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, product);
    });
  });
};

// Deletes a product from the DB.
exports.destroy = function(req, res) {
  var app_path = require('../../app').get('appPath');
  Product.findById(req.params.id, function (err, product) {
    if(err) { return handleError(res, err); }
    if(!product) { return res.send(404); }
    //delete images
    var filePath = app_path + product.image ;
    fs.exists(filePath, function(exists){
      if(exists)
        fs.unlinkSync(filePath); //delete file if it exists
      else
        console.log("image file does not exist locally");
    });
    product.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};
exports.reviewlink = function(req,res) {
  console.log('test')
  return res.json(200,config.userfeedback);
}
function handleError(res, err) {
  return res.send(500, err);
}
