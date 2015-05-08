'use strict';

angular.module('hardwarelabApp')
  .filter('markdownFilter', function ($sce) {
    return function (input) {
      if(input) {
        var converter = new Showdown.converter();
        return $sce.trustAsHtml(converter.makeHtml(input));
      }


    }
  });
