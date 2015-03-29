'use strict';

var _ = require('lodash');
var async = require('async');
var ReservationRequest = require('./reservation-request.model');
var Rental = require('../rental/rental.model');
var Product = require('../product/product.model');

// Get list of reservation_requests
exports.index = function(req, res) {
  ReservationRequest
  .find()
  .populate('user','name id')
  .populate('product','name id')
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
  if(!req.body.user) { return res.send(400); }

  async.waterfall([
    function(next) {
      ReservationRequest.count(req.body,next);
    },
    function(reservCount,next) {
      if(reservCount > 0)
        return res.json(400,{error: "You are already on the waitlist!"});
      else
        Rental.count({user:req.body.user,product:req.body.product,returned:false},next);
    },
    function(rentalCount,next) {
      if(rentalCount > 0)
        return res.json(400,{error: "You already rented this item!"});
      else
        Product.findById(req.body.product,next);
        // ReservationRequest.create(req.body,next);
    },
    function(product,next) {
        ReservationRequest.count({product:req.body.product},function(err,res_count) {next(err,product.quantity,res_count)});
    },
    function(product_qty,reservCount,next) {
        Rental.count({product:req.body.product, returned:false},function(err,rentalCount) {next(err,product_qty,reservCount,rentalCount)});
    },
    function(product_qty,reservCount,rentalCount,next) {
      if((reservCount+rentalCount) >= product_qty)
        return res.json(400,{error: "Sorry, none available currently, check later!"});
      else
       ReservationRequest.create(req.body,next);
    }
  ], function (err, reservation) {
    if(err)
      return handleError(res, err);
    else
      return res.json(201, reservation);
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



      if(err) { return handleError(res, err); }

    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
