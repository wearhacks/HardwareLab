/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var ReservationRequest = require('./reservation-request.model');

exports.register = function(socket) {
  ReservationRequest.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  ReservationRequest.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {


  ReservationRequest.populate(doc,{path:'user product',select:'_id name'},
    function(err,doc){socket.emit('reservation-request:save', doc);});
}

function onRemove(socket, doc, cb) {
  socket.emit('reservation-request:remove', doc);
}
