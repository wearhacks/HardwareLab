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

  //@TODO: only send non-archive rentals
  Rental.populate(doc,['user','product'],
    function(err,doc){
      if(doc.returned === false)
        socket.emit('rental:save', doc);
      else
        socket.emit('rental:remove', doc);
    });


}

function onRemove(socket, doc, cb) {

  socket.emit('rental:remove', doc);
}
