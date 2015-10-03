'use strict';

angular.module('hardwarelabApp')
  .controller('ProductCtrl', function ($scope,Auth,Modal,$modal, $location,productService) {
    $scope.isAdmin = Auth.isAdmin();


    $scope.productService = productService;


    $scope.modalLogin = Modal.confirm.askToLogin(function(message) { // callback when modal is confirmed
        $location.path("/login"); //will redirect to login page, make sure your controller is using $location
    });
    $scope.modalError = Modal.confirm.errorMessage();
    $scope.modalSuccess = Modal.confirm.successMessage();
    $scope.stock = productService.getProductStock;
  });


