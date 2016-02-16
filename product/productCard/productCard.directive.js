'use strict';

angular.module('hardwarelabApp')
  .directive('productCard', function () {
    return {
      template: '<div></div>',
      restrict: 'EA',
      link: function (scope, element, attrs) {
        element.text('this is the productCard directive');
      }
    };
  });