'use strict';

var _ = require('lodash');
var async = require('async');
var Rental = require('./rental.model');
var Product = require('../product/product.model');
var ReservationRequest = require('../reservation-request/reservation-request.model');
// Get list of rentals
exports.index = function(req, res) {
  Rental
  .find()
  .populate('user','name id')
  .populate('product','name id')
  .exec(function (err, rentals) {

    if(err) { return handleError(res, err); }
    return res.json(200, rentals);
  });
};

exports.archive = function(req, res) {
  Rental
    .find({returned:true})
    .populate('user')
    .populate('product')
    .exec(function (err, rentals) {

      if(err) { return handleError(res, err); }
      return res.json(200, rentals);
    });
};

exports.current = function(req, res) {
  Rental
    .find({returned:false})
    .populate('user')
    .populate('product')
    .exec(function (err, rentals) {

      if(err) { return handleError(res, err); }
      return res.json(200, rentals);
    });
};
exports.user_rental = function(req, res) {
  Rental
    .find({user:req.params.id})
    .populate('user')
    .populate('product')
    .exec(function (err, rentals) {

      if(err) { return handleError(res, err); }
      return res.json(200, rentals);
    });
};

exports.product_rental = function(req, res) {
  Rental
    .find({product:req.params.id})
    .populate('user')
    .populate('product')
    .exec(function (err, rentals) {

      if(err) { return handleError(res, err); }
      return res.json(200, rentals);
    });
};

// Get a single rental
exports.show = function(req, res) {
  Rental.findById(req.params.id, function (err, rental) {
    if(err) { return handleError(res, err); }
    if(!rental) { return res.send(404); }
    return res.json(rental);
  });
};



// Creates a new rental in the DB.

exports.create = function(req, res) {
  //@nadbm Using Async to avoid callback hell

  async.waterfall([
    function(next) {
      Rental.where({ product : req.body.product,returned : false }).count(next);
    },
    function(rentalCount,next) {
      Product.findById(req.body.product).exec(function(err,product){next(err,rentalCount,product)});
    },
    function(rentalCount, product,next) {
      if(rentalCount >= product.quantity)
        return res.json(400, {error:"Every "+product.name+" have been rented out. Try later."});
      else
        ReservationRequest.findById(req.body.reservation,next);
    },
    function(reservation,next) {
      if(reservation === null)
        return res.json(400, {error:"Reservation no longer not exist. Rental is probably created."});
      else
        reservation.remove(next);
    },
    function(removedRes,next) {
      Rental.create(req.body,next);
    }
  ], function (err, rental) {
    if(err)
      return handleError(res, err);
    else
      return res.json(201, rental);
  });

  //The code below is what Im avoiding by using Async
/*
  Rental.where({ product : req.body.product }).count(function(err,rentalCount) {

    Product.findById(req.body.product, function(err,product) {
        console.log(product);
        if (err) { return handleError(res, err); }
        if(rentalCount < product.quantity) {
          //remove reservation
          ReservationRequest.findById(req.body.reservation, function(err,reservation){
            if(!reservation) { return res.send(404); }
            reservation.remove(function(err) {
              if(err) { return handleError(res, err); }

              Rental.create(req.body, function(err, rental) {
                if(err) { return handleError(res, err); }
                return res.json(201, rental);
              });
            });
          });
        }
        else {
          return res.json(304, {error:"Every "+product.name+" have been rented out. Try later."});
        }


    });
  });

*/
};



exports.returnProd = function(req, res) {

  Rental.findById(req.body._id, function(err, rental) {
    if(err || !rental) { return handleError(res, err); }

    rental.returned = true;
    rental.returnDate = Date.now();

    rental.save(function(err,rental) {
      if (err)return handleError(res, err);
      return res.json(200,rental);

    });


  });


}
// Updates an existing rental in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Rental.findById(req.params.id, function (err, rental) {
    if (err) { return handleError(res, err); }
    if(!rental) { return res.send(404); }
    var updated = _.merge(rental, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, rental);
    });
  });
};

// Deletes a rental from the DB.
exports.destroy = function(req, res) {
  Rental.findById(req.params.id, function (err, rental) {
    if(err) { return handleError(res, err); }
    if(!rental) { return res.send(404); }
    rental.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
