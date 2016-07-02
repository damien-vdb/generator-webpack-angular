'use strict';

/* eslint-disable require-jsdoc */
var ConfigBuilder = require('./webpack.config-builder');

var ENV = process.env.npm_lifecycle_event;

if (ENV === 'test' || ENV === 'test-watch') {
  module.exports = testConfiguration();
} else if (ENV === 'build') {
  module.exports = prodConfiguration();
} else {
  module.exports = devConfiguration();
}

function testConfiguration() {
  return new ConfigBuilder() //
  .withoutOutput() //
  .devtool('inline-source-map')//
  .coverage() //
  .build();
}

function prodConfiguration() {
  return new ConfigBuilder() //
  .entryPoint('./src/app/app.js') //
  .devtool('source-map') //
  .hashedOutput() //
  .noErrors() //
  .minify() //
  .copyStaticResources() //
  .build();
}

function devConfiguration() {
  return new ConfigBuilder() //
  .entryPoint('./src/app/app.js') //
  .devtool('eval-source-map') //
  .build();
}
