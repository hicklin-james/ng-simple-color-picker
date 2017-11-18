/*!
 * See LICENSE in this repository for license information
 */
(function(){
'use strict';

angular.module('ngSimpleColorPicker').directive('simpleColorPicker', [function () {
  return {
    scope: {},
    link: function (scope, element) {
      console.log("In directive!");
    }
  };
}]);
'use strict';

angular.module('ngSimpleColorPicker', []);

})();