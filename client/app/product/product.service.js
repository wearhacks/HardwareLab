'use strict';

angular.module('hardwarelabApp')
  .service('productService', function ($http,socket) {

    var products = [];
    var reservations = [];
    var rentals = [];


    $http.get('/api/products').success(function(data) {
      products = data;
      $http.get('/api/reservation-requests').success(function(data) {
        reservations = data;
        $http.get('/api/rentals/current').success(function(data) {
          rentals = data;
          console.log("RELOADING DATA HERE");
          socket.syncUpdates('product', products);
          socket.syncUpdates('reservation-request', reservations);
          socket.syncUpdates('rental', rentals);
        });
      });
    });

    return {
      syncUpdates: function() {
        socket.syncUpdates('product', products);
        socket.syncUpdates('reservation-request', reservations);
        socket.syncUpdates('rental', rentals);
      },
      unsyncUpdates: function() {
        socket.unsyncUpdates('product');
        socket.unsyncUpdates('rental');
        socket.unsyncUpdates('reservation-request');
      },
      getProducts: function() {
          return products;
      },
      getActiveRentals: function() {
          return rentals;
      },
      getReservations: function() {
          return reservations;
      },
      getProductRentals : function(product) {
          return rentals.filter(function(elem){ if(elem.product._id == product._id) return true;});
      },
      getProductReserved : function(product) {
          return reservations.filter(function(elem){ if(elem.product._id == product._id) return true;});
      },
      reserveProduct: function(user_id,product_id) {
         return $http.post('/api/reservation-requests', {user:user_id,product:product_id});
      },
      addRental: function(reservation) {
        return $http.post('/api/rentals', {reservation:reservation._id,user:reservation.user._id, product:reservation.product._id});
      },
      deleteReservation: function(reservation) {
        return $http.delete('/api/reservation-requests/' + reservation._id);
      },
      returnRental: function(rental) {
        return $http.post('/api/rentals/return', rental);
      },
      addProduct: function(product) {
        return $http.post('/api/products', product);
      },
      deleteProduct: function(product) {
        console.log("delete");
        return $http.delete('/api/products/'+product._id);
      }
    };
  });