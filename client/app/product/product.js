'use strict';

angular.module('hardwarelabApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('product', {
        url: '/product',
        templateUrl: 'app/product/product.html',
        controller: 'ProductCtrl'
      });
  });

angular.module('hardwarelabApp')
  .filter('smallerImgFilter', function () {
    return function (image) {
      return image.replace('.jpg','l.jpg');;

    };
  });
