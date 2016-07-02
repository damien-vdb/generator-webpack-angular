var MODULE_NAME = 'FirstPageController';

angular.module('app').controller(MODULE_NAME, function() {
  var vm = this;

  vm.url = 'https://github.com/preboot/angular-webpack';
});

module.exports = MODULE_NAME;
