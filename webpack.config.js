'use strict';

var ConfigBuilder = require('./webpack.config-builder');

var ENV = process.env.npm_lifecycle_event;
var test = ENV === 'test' || ENV === 'test-watch';
var prod = ENV === 'build';

var configBuilder = new ConfigBuilder();

if (test) {
	configBuilder
		.withoutOutput()
		.devtool('inline-source-map')
		.coverage();
} else if (prod) {
	configBuilder
		.entryPoint('./src/app/app.js')
		.devtool('source-map')
		.hashedOutput()
		.noErrors()
		.minify()
		.copyStaticResources();
} else {
	configBuilder
		.entryPoint('./src/app/app.js')
		.devtool('eval-source-map');
}

var config = configBuilder.generate();

module.exports = config;
