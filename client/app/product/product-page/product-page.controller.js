'use strict';

angular.module('hardwarelabApp')
  .controller('ProductPageCtrl', function ($scope,$stateParams,$location,Auth, productService,Modal) {

    $scope.productService = productService;
    $scope.stock = 0;
    $scope.isAdmin = Auth.isAdmin;
    productService.getProduct($stateParams.product)
      .success(function(data){

        $scope.product = data;
        $scope.stock = productService.getProductStock(data);

        if(!$scope.product)
          $location.path("/product");

      });

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
