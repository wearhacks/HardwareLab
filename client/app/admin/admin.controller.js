'use strict';

angular.module('hardwarelabApp')
  .controller('AdminCtrl', function ($scope, $http,$location,$modal, Auth,Modal, User,socket, $upload,productService) {

    $scope.myChannel = {
      // the fields below are all optional
      videoHeight: 800,
      videoWidth: 600,
      video: null // Will reference the video element on success
    };
    // Use the User $resource to fetch all users
    $scope.users = User.query();
    $scope.productService =  productService;

    $scope.delete = Modal.confirm.delete(function(user) { // callback when modal is confirmed
      User.remove({ id: user._id });
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    });

    $scope.modalError = Modal.confirm.errorMessage();
    $scope.modalSuccess = Modal.confirm.successMessage();

    $scope.isAdmin = Auth.isAdmin;

    if (!Auth.isAdmin()) {
      console.log('DENY');
      $location.path('/');
    }
    /**
      Rental requests
    **/
    $scope.openRentalModal = function (reservation) {

      var modalInstance = $modal.open({
        templateUrl: 'app/admin/rental-modal.html',
        controller: 'CreateRentalCtrl',
        size: 'lg',
        resolve: {
          reservation: function () {
            return reservation;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });
    };


    $scope.removeReservation = function(reservation) {
      productService.deleteReservation(reservation);
    };

    $scope.viewRental = function(rental) {
      var modalInstance = $modal.open({
        templateUrl: 'app/admin/view-rental-modal.html',
        controller: 'ViewRentalCtrl',
        size: 'lg',
        resolve: {
          rental: function () {
            return rental;
          }
        }
      });
    }

    $scope.returnRental = function(rental) {
      productService.returnRental(rental)
        .success(function(message) {
          $scope.modalSuccess("Product returned successfully!");
        })
        .error(function(message) {
          $scope.modalError("Oops,something went wrong! Could not return the product.");
        });
    };

     /***
      Product methods
     **/
     $scope.addProduct = function(product) {
      if($scope.product === '') {
        return;
      }
      $scope.product.image = "/assets/product-images/"+$scope.product.name+"-"+$scope.files[0].name;
      $scope.upload($scope.files);
      productService.addProduct(product);
      $scope.product = '';
    };
    $scope.deleteProduct = function(product) {
      console.log(product);
      productService.deleteProduct(product);
    };

    $scope.upload = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                $upload.upload({
                    url: '/api/products/upload',
                    fields: {'product': $scope.product.name},
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' +
                                evt.config.file.name);
                }).success(function (data, status, headers, config) {
                    console.log('file ' + config.file.name + 'uploaded. Response: ' +
                                JSON.stringify(data));
                });
            }
        }
    };

  });


