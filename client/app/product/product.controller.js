'use strict';

angular.module('hardwarelabApp')
  .controller('ProductCtrl', function ($http, $upload, $scope,Auth,socket,Modal,$location) {
    $scope.isAdmin = Auth.isAdmin();
    $scope.message = 'Hello';
    $scope.products;
    $scope.reservations;
    $scope.rentals;

    $scope.modalLogin = Modal.confirm.askToLogin(function(message) { // callback when modal is confirmed
        $location.path("/login"); //will redirect to login page, make sure your controller is using $location
      });
    $scope.modalError = Modal.confirm.errorMessage();
    $scope.modalSuccess = Modal.confirm.successMessage();



    $http.get('/api/reservation-requests').success(function(reservations) {
      $scope.reservations = reservations;
      socket.syncUpdates('reservation-request', $scope.reservations);

      $http.get('/api/rentals/current').success(function(rentals) {
        $scope.rentals = rentals;
        socket.syncUpdates('rental', $scope.rentals);

        $http.get('/api/products').success(function(products) {
          $scope.products = products;
          socket.syncUpdates('product', $scope.products);
        });
      });

    });







    $scope.reserveProduct = function(product) {
      console.log(Auth.getCurrentUser());
      if($.isEmptyObject(Auth.getCurrentUser()))
      {
        $scope.modalLogin("reserve");
        return;
      }
      console.log(Auth.getCurrentUser()._id);
      $http.post('/api/reservation-requests', {user:Auth.getCurrentUser()._id,product:product._id})
           .error(function(message) {
                    $scope.modalError(message.error);
                    console.log(message);
            })
          .success(function(message){
          $scope.modalSuccess("You successfully reserved the item.");
           });
     };

    $scope.getProductRentals = function(product) {
      return $scope.rentals.filter(function(elem){ if(elem.product._id == product._id) return true;});
    }
    $scope.getProductReserved = function(product) {
      return $scope.reservations.filter(function(elem){ if(elem.product._id == product._id) return true;});
    }


    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('product');
    });
    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('reservation-request');
    });
    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('rental');
    });
  });


