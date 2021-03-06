/**
 *  This file contains all of the user settings for the gulp build process
 */
module.exports = {

  srcJs: ['src/**/*.module.js', 'src/**/*.js', '!src/**/*_test.js'],
  srcCss: ['src/**/*.css'],
  tests: 'src/**/*_test.js',
  buildFolder: 'dist',
  buildJsFilename: 'simple-color-picker.js',
  banner: '/*!\n' +
    ' * See LICENSE in this repository for license information\n' +
    ' */\n',
  closureStart: '(function(){\n',
  closureEnd: '\n})();'

};