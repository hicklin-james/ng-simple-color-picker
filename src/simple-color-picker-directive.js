'use strict';

angular.module('ngSimpleColorPicker', ['ui.bootstrap']);

angular.module('ngSimpleColorPicker').factory('SimpleColorPickerService', [function() {
  var SimpleColorPickerService = {};

  var hexRegex = /^#(?:[A-Fa-f0-9]{3}){1,2}$/;
  var rgbRegex = /^rgb[(](?:\s*0*(?:\d\d?(?:\.\d+)?(?:\s*%)?|\.\d+\s*%|100(?:\.0*)?\s*%|(?:1\d\d|2[0-4]\d|25[0-5])(?:\.\d+)?)\s*(?:,(?![)])|(?=[)]))){3}[)]$/;
  var hslRegex = /^hsl[(]\s*0*(?:[12]?\d{1,2}|3(?:[0-5]\d|60))\s*(?:\s*,\s*0*(?:\d\d?(?:\.\d+)?\s*%|\.\d+\s*%|100(?:\.0*)?\s*%)){2}\s*[)]$/;

  var checkColorType = function(color) {
    if (hexRegex.test(color)) {
      return 'hex';
    } else if (rgbRegex.test(color)) {
      return 'rgb';
    } else if (hslRegex.test(color)) {
      return 'hsl';
    } else {
      return null;
    }
  };

  // Converting from Hex to RGB
  var convertHexToRgb = function(hexColor) {
    var rhc = angular.copy(hexColor);
    if (hexColor.length === 4) {
      rhc = hexColor[1] + hexColor[1] + hexColor[2] + hexColor[2] + hexColor[3] + hexColor[3]; 
    }

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(rhc);
      
    var rgb = {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    };

    return 'rgb(' + String(rgb.r) + ',' + String(rgb.g) + ',' + String(rgb.b) + ')';
  };

  // Converting from Hex to HSL
  var convertHexToHsl = function(hexColor) {
    var rgb = convertHexToRgb(hexColor);
    var hsl = convertRgbToHsl(rgb);
    return hsl;
  };

  // Converting from RGB to Hex
  var componentToHex = function(c) {
    var hex = c.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  var convertRgbToHex = function(rgbColor) {
    var a = rgbColor.split('(')[1].split(')')[0];
    a = a = a.split(',');
    return '#' + componentToHex(parseInt(a[0])) + componentToHex(parseInt(a[1])) + componentToHex(parseInt(a[2]));
  };

  // Converting from RGB to HSL
  var convertRgbToHslHelper = function(r, g, b) {
    r /= 255, g /= 255, b /= 255;

    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }

      h /= 6;
    }

    return 'hsl(' + String(parseInt(h * 360)) + ',' + String(parseInt(s * 100)) + '%,' + String(parseInt(l * 100)) + '%)';
  };

  var convertRgbToHsl = function(rgbColor) {
    var a = rgbColor.split('(')[1].split(')')[0];
    a = a = a.split(',');
    return convertRgbToHslHelper(parseInt(a[0]), parseInt(a[1]), parseInt(a[2]));
  };

  // Converting from HSL to RGB
  var convertHslToRgbHelper = function(h, s, l) {
    var r, g, b;

    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      function hue2rgb(p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      }

      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;

      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    return 'rgb(' + String(parseInt(r * 255)) + ',' + String(parseInt(g * 255)) + ',' + String(parseInt(b * 255)) + ')';
  };

  var convertHslToRgb = function(hslColor) {
    var a = hslColor.split('(')[1].split(')')[0];
    a = a.split(',');
    return convertHslToRgbHelper(parseFloat(a[0]/360), parseFloat(a[1])/100, parseFloat(a[2])/100);
  };

  // Converting from HSL to Hex
  var convertHslToHex = function(hslColor) {
    var rgbColor = convertHslToRgb(hslColor);
    var hexColor = convertRgbToHex(rgbColor);
    return hexColor
  };

  var convertColorsToHex = function(colors) {
    return colors.map(function(c) {
      var colorFormat = checkColorType(c);
      switch (colorFormat) {
        case 'hex':
          return c;
        break;
        case 'rgb':
          return convertRgbToHex(c);
          break;
        case 'hsl':
          return convertHslToHex(c);
          break;
        default:
          return c;
          break;
      }
    });
  };

  var convertColorsToRgb = function(colors) {
    return colors.map(function(c) {
      var colorFormat = checkColorType(c);
      switch (colorFormat) {
        case 'hex':
          return convertHexToRgb(c);
        break;
        case 'rgb':
          return c;
          break;
        case 'hsl':
          return convertHslToRgb(c);
          break;
        default:
          return c;
          break;
      }
    });
  };

  var convertColorsToHsl = function(colors) {
    return colors.map(function(c) {
      var colorFormat = checkColorType(c);
      switch (colorFormat) {
        case 'hex':
          return convertHexToHsl(c);
        break;
        case 'rgb':
          return convertRgbToHsl(c);
          break;
        case 'hsl':
          return c;
          break;
        default:
          return c;
          break;
      }
    });
  };

  SimpleColorPickerService.convertColors = function(colors, toFormat) {
    switch (toFormat) {
      case 'hex':
        return convertColorsToHex(colors);
        break;
      case 'rgb':
        return convertColorsToRgb(colors);
        break;
      case 'hsl':
        return convertColorsToHsl(colors);
        break;
      default:

        break;
    }
  };

  return SimpleColorPickerService;
}]);

angular.module('ngSimpleColorPicker').directive('simpleColorPicker', [function () {
  
  var SimpleColorPickerCtrl = function($scope, SimpleColorPickerService) {
    var defaultHexColors = ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', 
      '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1', '#bfacc8', '#cfd186'];
    //var defaultHexColors = ["rgb(123,123,123)"]
    $scope.colorFormat = angular.isDefined($scope.colorFormat) ? $scope.colorFormat : "hex";
    $scope.selectableColors = angular.isDefined($scope.selectableColors) ? $scope.selectableColors : defaultHexColors;
    $scope.colorPickerAppendToBody = angular.isDefined($scope.colorPickerAppendToBody) ? $scope.colorPickerAppendToBody : false;
    //if (!attrs.colorFormat) { attrs.colorFormat = "hex"; }
    //if (!attrs.selectableColors) { attrs.selectableColors = defaultHexColors; } 

    $scope.items = SimpleColorPickerService.convertColors($scope.selectableColors, $scope.colorFormat)

    console.log($scope.items);

    $scope.changedColor = function(nc) {
      $scope.color = nc
    }
  };

  return {
    scope: {
      color: "=ngModel",
      colorFormat: "@?colorFormat",
      selectableColors: "=?selectableColors",
      colorPickerAppendToBody: "@?colorPickerAppendToBody"
    },
    controller: SimpleColorPickerCtrl,
    template: '<div class="simple-color-picker-wrapper"> \
                <span uib-dropdown dropdown-append-to-body="{{colorPickerAppendToBody}}"> \
                  <div class="input-group"> \
                    <input uib-dropdown-toggle class="form-control" type="text" ng-model="color" \> \
                    <span class="input-group-addon" ng-style="{\'background\': color}">&nbsp;&nbsp;</span> \
                  </div> \
                  <ul class="dropdown-menu simple-color-picker" uib-dropdown-menu> \
                    <li ng-repeat="choice in items" class="clickable" ng-style="{\'background\': choice}" ng-click="changedColor(choice)"> \
                    </li> \
                  </ul> \
                </span> \
              </div>'
  };
}]);