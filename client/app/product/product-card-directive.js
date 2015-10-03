'use strict';

angular.module('hardwarelabApp')
  .directive('productCard', function (productService) {
    return {
      template: '<div></div>',
      restrict: 'EA',
      bindToController: true,
      link: function (scope, element, attrs) {
        console.log('hello'+ productService.getProductStock(attrs.product));
        element.text('this is the productCard directive');
      }
    };
  });