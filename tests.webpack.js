// This file is an entry point for angular tests
// Avoids some weird issues when using webpack + angular.

require('angular');
require('angular-mocks/angular-mocks');

require('./src/app/app');

var testsContext = require.context("./test", true, /.spec$/);
testsContext.keys().forEach(testsContext);