'use strict';

angular.module('hardwarelabApp')
  .controller('ProductCtrl', function ($http, $upload, $scope,Auth,socket,Modal,$location,productService) {
    $scope.isAdmin = Auth.isAdmin();
    $scope.message = 'Hello';


    $scope.productService = productService;
    productService.syncUpdates();

    $scope.modalLogin = Modal.confirm.askToLogin(function(message) { // callback when modal is confirmed
        $location.path("/login"); //will redirect to login page, make sure your controller is using $location
      });
    $scope.modalError = Modal.confirm.errorMessage();
    $scope.modalSuccess = Modal.confirm.successMessage();




    $scope.reserveProduct = function(product) {
      if($.isEmptyObject(Auth.getCurrentUser())) {
        $scope.modalLogin("reserve");
      }
      else {
        $scope.productService.reserveProduct(Auth.getCurrentUser()._id,product._id)
          .error(function(message) {
            $scope.modalError(message.error);
            console.log(message);
          })
          .success(function(message){
            $scope.modalSuccess("You successfully reserved the item.");
          });
      }

     };


  });


