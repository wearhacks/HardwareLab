/**
 * Created by nadim54321 on 2015-05-08.
 */

angular.module('hardwarelabApp')
  .controller('ViewRentalCtrl', function ($scope, $modalInstance, rental, productService, Modal) {

  $scope.rental = rental;

    $scope.modalError = Modal.confirm.errorMessage();
    $scope.modalSuccess = Modal.confirm.successMessage();
    $scope.returnRental = function(rental) {
      productService.returnRental(rental)
        .success(function(message) {
          $scope.modalSuccess("Product returned successfully!");
          $modalInstance.close();
        })
        .error(function(message) {
          $scope.modalError("Oops,something went wrong! Could not return the product.");
        });
    };
  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
