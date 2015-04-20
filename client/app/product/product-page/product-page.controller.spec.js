'use strict';

describe('Controller: ProductPageCtrl', function () {

  // load the controller's module
  beforeEach(module('hardwarelabApp'));

  var ProductPageCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProductPageCtrl = $controller('ProductPageCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
