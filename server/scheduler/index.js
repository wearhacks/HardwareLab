var schedule = require('node-schedule');
var ReservationRequest = require('../api/reservation-request/reservation-request.model');

var scheduler = {

  scheduleDeleteReservation: function(reservation) {
    console.log(reservation);
    var job = schedule.scheduleJob('job-remove-reservation'+reservation,reservation.expires, function () {
      console.log("scheduled task: delete reservation");

      ReservationRequest.findById(reservation._id, function (err, reservation) {
        if(err || !reservation) { console.log("failed"); return; }
        reservation.remove();
      });
    });
  }

}

module.exports = scheduler;
