'use strict';
var config = require('../../config/environment');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RentalSchema = new Schema({
	user: {type: Schema.Types.ObjectId, ref: 'User'},
	product: {type: Schema.Types.ObjectId, ref: 'Product'},
  product_unique_id: {type:String},
  full_name: {type:String},
  phone_number: {type:String},
  extra_info:{type:String},
  returned: {type: Boolean, default: false},
	date: { type: Date, default: Date.now },
  returnDate: {type:Date, default:Date.now },
  imageData:{type:String}
});

module.exports = mongoose.model('Rental', RentalSchema);
