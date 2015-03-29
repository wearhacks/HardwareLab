'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProductSchema = new Schema({
  name: String,
  description: String,
  active: Boolean,
  quantity: { type: Number, min: 0},
  image: String

});

module.exports = mongoose.model('Product', ProductSchema);


