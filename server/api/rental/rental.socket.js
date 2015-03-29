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
  //@TODO: only send non-archive rentals
  Rental.populate(doc,['user','product'],function(err,doc){socket.emit('rental:save', doc);});


}

function onRemove(socket, doc, cb) {

  socket.emit('rental:remove', doc);
}
