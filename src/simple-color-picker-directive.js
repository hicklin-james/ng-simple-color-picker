'use strict';

angular.module('ngSimpleColorPicker').directive('simpleColorPicker', [function () {
  return {
    scope: {},
    link: function (scope, element) {
      console.log("In directive!");
    }
  };
}]);