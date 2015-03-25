'use strict';

angular.module('hardwarelabApp')
  .controller('ProductCtrl', function ($http, $upload, $scope,Auth,socket,Modal,$location) {
    $scope.isAdmin = Auth.isAdmin();
    $scope.message = 'Hello';
    $scope.products;
    $scope.reservations;

    $scope.modalLogin = Modal.confirm.askToLogin(function(message) { // callback when modal is confirmed
        $location.path("/login"); //will redirect to login page, make sure your controller is using $location
      });
    $scope.modalError = Modal.confirm.errorMessage();

     $http.get('/api/products').success(function(products) {
      $scope.products = products;
      socket.syncUpdates('product', $scope.products);
      console.log($scope.products)
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
            });
     };

     $scope.$on('$destroy', function () {
      socket.unsyncUpdates('product');
    });
  });


