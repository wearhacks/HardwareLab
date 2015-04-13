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

    $scope.reservationDue = function(reserveTime) {

      return moment(reserveTime).calendar().toLowerCase();
    }
  });
