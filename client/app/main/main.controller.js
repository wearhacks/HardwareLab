'use strict';

angular.module('hardwarelabApp')
  .controller('MainCtrl', function ($scope, $http, Auth) {
    $scope.isLogged = Auth.isLoggedIn;
    $scope.getCurrentUser = Auth.getCurrentUser;
  });
