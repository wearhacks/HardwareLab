'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProductSchema = new Schema({
  name: String,
  company: String,
  description: String,
  active: Boolean,
  quantity: { type: Number, min: 0},
  image: String,
  banner: String

});

module.exports = mongoose.model('Product', ProductSchema);


