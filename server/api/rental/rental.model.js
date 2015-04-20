'use strict';
var config = require('../../config/environment');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var returnDate = function() {
  return new Date(Date.now() + config.rental.rentalTime);
}
var RentalSchema = new Schema({
	user: {type: Schema.Types.ObjectId, ref: 'User'},
	product: {type: Schema.Types.ObjectId, ref: 'Product'},
  returned: {type: Boolean, default: false},
	date: { type: Date, default: Date.now },
  returnDate: {type:Date, default:returnDate}
});

module.exports = mongoose.model('Rental', RentalSchema);
