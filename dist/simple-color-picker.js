/*!
 * See LICENSE in this repository for license information
 */
(function(){
'use strict';

app = angular.module('ngSimpleColorPicker')

app.directive('simpleColorPicker', [function () {
      return {
        scope: {},
        link: function (scope, element) {
          console.log("In directive!");
        }
      };
    }
  ]);
'use strict';

app = angular.module('ngSimpleColorPicker', []);

})();