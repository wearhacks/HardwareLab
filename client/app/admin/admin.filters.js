/**
 * Created by nadim54321 on 2015-05-08.
 */
angular.module('hardwarelabApp')
  .filter('rentalFilter', function () {
    var compare = function(a,b) {
      if(typeof a === "undefined" || typeof b === "undefined")return true;
      return a.toUpperCase().indexOf(b.toUpperCase())> -1 ;
    };
    return function (rentals, input) {
      var filtered = rentals.filter(function(d) {
        return (compare(d.full_name,input) ||
                compare(d.user.name,input) ||
                compare(d.user.email,input)||
                compare(d.product.name,input))
      });
       return filtered;

    };
  });
angular.module('hardwarelabApp')
  .filter('reservationFilter', function () {
    var compare = function(a,b) {
      if(typeof a === "undefined" || typeof b === "undefined")return true;
      return a.toUpperCase().indexOf(b.toUpperCase())> -1 ;
    };
    return function (reservations, input) {
        var filtered = reservations.filter(function(d) {

        return (compare(d.full_name,input) ||
        compare(d.user.name,input) ||
        compare(d.product.name,input))
      });
      return filtered;

    };
  });
