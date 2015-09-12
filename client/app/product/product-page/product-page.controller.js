'use strict';

angular.module('hardwarelabApp')
  .controller('ProductPageCtrl', function ($scope,$stateParams,$location,Auth, productService,Modal, $modal, $FB) {

    
    $scope.productService = productService;
    $scope.stock = productService.getProductStock;
    $scope.isAdmin = Auth.isAdmin;

    productService.getProduct($stateParams.product)
      .success(function(data){

        $scope.product = data;
        if(!$scope.product)
          $location.path("/product");

      });

    $scope.modalLogin = Modal.confirm.askToLogin(function(message) { // callback when modal is confirmed
      $location.path("/login"); //will redirect to login page, make sure your controller is using $location
    });
    $scope.modalError = Modal.confirm.errorMessage();
    $scope.modalSuccess = Modal.confirm.successMessage();
    $scope.reviewUrl = 'https://wearhacks.typeform.com/to/zOKCe2';


    $scope.reserveProduct = function(product) {
        productService.reservable(Auth.getCurrentUser()._id,product._id)
          .error(function(message) {
            $scope.modalError(message.error);
          })
          .success(function() {
            var modalInstance = $modal.open({
              templateUrl: 'app/product/product-page/rental-modal.html',
              controller: 'CreateResCtrl',
              size: 'lg',
              resolve: {
                product: function () {
                  return product;
                }
              }
            });

            modalInstance.result.then(function (selectedItem) {
              $scope.selected = selectedItem;
            }, function () {
              console.log('Modal dismissed at: ' + new Date());
            });
          });



      };



  });


angular.module('hardwarelabApp')
  .controller('CreateResCtrl', function ($scope, $modalInstance, Modal, product, Auth, productService) {

    'use strict';

    $scope.modalError = Modal.confirm.errorMessage();
    $scope.modalSuccess = Modal.confirm.successMessage();

    $scope.createReservation = function(reservation) {
      productService.reserveProduct(Auth.getCurrentUser()._id,product._id,reservation)
        .error(function(message) {
          $scope.modalError(message.error);
        })
        .success(function(message){
          $scope.modalSuccess("You successfully reserved the item.");
          $modalInstance.close();
        });
    }


    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
