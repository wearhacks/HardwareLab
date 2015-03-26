'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RentalSchema = new Schema({
	user: {type: Schema.Types.ObjectId, ref: 'User'},
	product: {type: Schema.Types.ObjectId, ref: 'Product'},
	date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Rental', RentalSchema);