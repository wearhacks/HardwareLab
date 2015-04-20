'use strict';

angular.module('hardwarelabApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('product-page', {
        url: '/product/:product',
        templateUrl: 'app/product/product-page/product-page.html',
        controller: 'ProductPageCtrl'
      });
  });
