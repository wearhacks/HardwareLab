'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ReservationRequestSchema = new Schema({
  user: {type: String, ref: 'User'},
  product: {type: String, ref: 'Product'},
  createdAt: {type:Date, expires: '6h' , default:Date.now}
});

module.exports = mongoose.model('ReservationRequest', ReservationRequestSchema);
