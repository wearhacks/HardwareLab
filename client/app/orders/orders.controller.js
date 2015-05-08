'use strict';

angular.module('hardwarelabApp')
  .controller('OrdersCtrl', function  ($upload, $scope,Auth,Modal,$location,productService,moment) {
    if(!Auth.isLoggedIn())
      $location.path("/login");

    $scope.productService = productService;
    $scope.userId = Auth.getCurrentUser()._id;
    $scope.message = 'Hello';
    $scope.a = moment();
    $scope.date = new moment();
    console.log($scope.date);

    $scope.dueDate = function(reserveTime) {
      return moment(reserveTime).calendar().toLowerCase();
    }
    $scope.expired = function(rental) {
      if(rental.date > rental.returnDate)
        return 'Please return your rental. This was due '+ $scope.dueDate(rental.returnDate);
      else
        return 'Please return this by '+ $scope.dueDate(rental.returnDate);
    }
  });
