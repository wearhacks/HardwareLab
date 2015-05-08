/**
 * Created by nadim54321 on 2015-04-19.
 */
'use strict';

angular.module('hardwarelabApp')
  .directive("scrollproduct", function ($window) {
    return function(scope, element, attrs) {

      if ($($window).height() >= element.offset().top) {

        element.css("opacity",1);
      }


      angular.element($window).bind("scroll", function() {

        if (this.pageYOffset + $(this).height() >= element.offset().top) {
          element.css("opacity",1);
        } else {
          element.css("opacity",0);
        }
        scope.$apply();
      });
    };
});
