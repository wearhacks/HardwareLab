/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Rental = require('./rental.model');

exports.register = function(socket) {
  Rental.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Rental.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  console.log("really?");
  Rental.populate(doc,['user','product'],function(err,doc){socket.emit('rental:save', doc);});

  
}

function onRemove(socket, doc, cb) {
	console.log("really?REMOVED Rental");
  socket.emit('rental:remove', doc);
}