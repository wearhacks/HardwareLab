'use strict';

angular.module('hardwarelabApp')
  .controller('MainCtrl', function ($scope, $http, Auth) {
    $scope.isLogged = Auth.isLoggedIn;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $http.get('/api/config/warning_message').success(function(data) {
      $scope.warning = data.message;
    });
    
  });
