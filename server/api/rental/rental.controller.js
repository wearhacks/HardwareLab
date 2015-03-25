'use strict';

var _ = require('lodash');
var Rental = require('./rental.model');
var Product = require('../product/product.model');
var ReservationRequest = require('../reservation-request/reservation-request.model');
// Get list of rentals
exports.index = function(req, res) {
  Rental
  .find()
  .populate('user')
  .populate('product')
  .exec(function (err, rentals) {
    console.log(rentals);
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

//@nadbm: This is what callback hell looks like, look at the function below, makes no sense =/
// Look at exports.create_formatted to see how to somewhat format this
exports.create = function(req, res) {
  Rental.create(req.body, function(err, rental) {
    if(err) { return handleError(res, err); }
    console.log("removing reservation");
    ReservationRequest.findById(req.body.reservation, function(err,reservation){ 
      if(!reservation) { return res.send(404); }
      reservation.remove(function(err) {
        if(err) { return handleError(res, err); }
         Product.findById(req.body.product, function(err,product) {
          product.rented++;
          product.reserved--;
          product.save(function(err){
            if (err) { return handleError(res, err); }

          });
        });
      });
    });
   
    return res.json(201, rental);
  });
};


exports.create_formatted = function(req, res) {

  //Delete associated reservation
  var make_deleteReservation = function() {
    return function(err,reservation) { 
      console.log("removing reservation");
      if(!reservation) { return res.send(404); }
      reservation.remove(function(err) {
        if(err) { return handleError(res, err); }
        
        Product.findById(req.body.product, make_updateProduct());
      });
    }
  };
  //Update product values
  var make_updateProduct = function() {
    return function(err,product) {
       product.rented++;
          product.reserved--;
          product.save( function(err){
            if (err) { return handleError(res, err); }
             Rental.create(req.body,make_createRental());
          });
    }
  };
  //Create rental
  var make_createRental = function() {
    return function(err, rental) {
              if(err) { return handleError(res, err); }
              return res.json(201, rental);
    };
  };

  //Find reservation and delete it
  ReservationRequest.findById(req.body.reservation, make_deleteReservation());
 

};

exports.returnProd = function(req, res) {
  Rental.findById(req.body.id, function(err, rental) {
    if(err) { return handleError(res, err); }
    

    Product.findById(req.body.id, function(err,product) {
      product.rented--;
      product.save(function(err){
        rental.returned = true;
        rental.save(function(err){ if (err)return handleError(res, err);});
        if (err) { return handleError(res, err); }
      });
    });
    return res.json(201, rental);
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