'use strict';


var config = require('../../config/environment');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var expireDate = function() {
  return new Date(Date.now() + config.rental.reservationTime);
}


var ReservationRequestSchema = new Schema({
  user: {type: String, ref: 'User'},
  product: {type: String, ref: 'Product'},
  createdAt: {type:Date, default:Date.now },
  expires: {type:Date, default:expireDate}
});


module.exports = mongoose.model('ReservationRequest', ReservationRequestSchema);
