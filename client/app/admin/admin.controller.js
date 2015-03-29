'use strict';

angular.module('hardwarelabApp')
  .controller('AdminCtrl', function ($scope, $http, Auth,Modal, User,socket, $upload) {

    // Use the User $resource to fetch all users
    $scope.users = User.query();


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

    $scope.isAdmin = Auth.isAdmin();
    $scope.products;
    $scope.reservations;
    $scope.rentals;


    $http.get('/api/products').success(function(products) {
      $scope.products = products;
        socket.syncUpdates('product', $scope.products);
    });

    $http.get('/api/reservation-requests').success(function(reservations) {
      $scope.reservations = reservations;
        socket.syncUpdates('reservation-request', $scope.reservations);
    });

    $http.get('/api/rentals/current').success(function(rentals) {
      $scope.rentals = rentals;
        socket.syncUpdates('rental', $scope.rentals);
    });
    /**
      Rental requests
    **/
    $scope.addRental = function(reservation) {
      console.log("here?");
      $http.post('/api/rentals', {reservation:reservation._id,user:reservation.user._id, product:reservation.product._id})
        .success(function(message) {
          $scope.modalSuccess("Created a new rental successfully");
        })
        .error(function(message) {
          console.log(message);
          $scope.modalError(message.error);
        });;
    };
    $scope.removeReservation = function(reservation) {
        $http.delete('/api/reservation-requests/' + reservation._id);
    };

    $scope.returnRental = function(rental) {
      console.log("returning rental");
      $http.post('/api/rentals/return', rental)
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
      $scope.product.image = "/assets/images/products/"+$scope.product.name+"-"+$scope.files[0].name;
      $scope.upload($scope.files);
      $http.post('/api/products', product);
      $scope.product = '';
    };
    $scope.deleteProduct = function(product) {
      $http.delete('/api/products/' + product._id);
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
