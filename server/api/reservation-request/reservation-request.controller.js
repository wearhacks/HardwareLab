'use strict';

var _ = require('lodash');
var ReservationRequest = require('./reservation-request.model');
var Rental = require('../rental/rental.model');
var Product = require('../product/product.model');

// Get list of reservation_requests
exports.index = function(req, res) {
  ReservationRequest
  .find()
  .populate('user')
  .populate('product')
  .exec(function (err, reservation_requests) {
    //console.log(reservation_requests);
    if(err) { return handleError(res, err); }
    return res.json(200, reservation_requests);
  });
};

// Get a single reservation_request
exports.show = function(req, res) {
  ReservationRequest
  .findById(req.params.id)
  .populate('user')
  .populate('product')
  .exec(
    function (err, reservation_request) {
      if(err) { return handleError(res, err); }
      if(!reservation_request) { return res.send(404); }
      return res.json(reservation_request);
    });
};

// Creates a new reservation_request in the DB.
exports.create = function(req, res) {
  //@nadbm @TODO: dont let same user reserve multiple times!! Send proper json message to handle
  //this on the front-end

  ReservationRequest.count(req.body, function (err, count) {
    if(count > 0)
      return res.json(400,{error: "You are already on the waitlist!"}); 
    Rental.count(req.body,function(err,rental_count) {
      if(rental_count > 0)
        return res.json(400,{error: "You already rented this item!"}); 
      if(!req.body.user) { return res.send(400); }
      ReservationRequest.create(req.body, function(err, reservation_request) {
      //find product and update reserved numbers

      Product.findById(req.body.product,function(err,product) {
        if((product.reserved + product.rented) < product.quantity) {
          product.reserved++;
          product.save(function (err) {
            if (err) { return handleError(res, err); }
            return res.json(201, reservation_request);
          });
        }
        else {
          return res.json(400,{error: "No "+product.name+" can be reserved. There are none left :(. Try again later!"});
        }
      });




    });

    });
    
  });
};

// Updates an existing reservation_request in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  ReservationRequest.findById(req.params.id, function (err, reservation_request) {
    if (err) { return handleError(res, err); }
    if(!reservation_request) { return res.send(404); }
    var updated = _.merge(reservation_request, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, reservation_request);
    });
  });
};

// Deletes a reservation_request from the DB.
exports.destroy = function(req, res) {
  ReservationRequest.findById(req.params.id, function (err, reservation_request) {

    if(err) { return handleError(res, err); }
    if(!reservation_request) { return res.send(404); }
    reservation_request.remove(function(err) {

      //reduce reserved on product
      Product.findById(reservation_request.product,function(err,product) {
        product.reserved--;
        product.save(function (err) {
          console.log(product.name+" has been reserved +1");
          if (err) { return handleError(res, err); }
          return res.send(204);
        });
      });

      if(err) { return handleError(res, err); }
      
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}