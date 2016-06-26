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
		.hashedOutput()
		.devtool('source-map')
		.handleCss()
		.noErrors()
		.minify()
		.renderHtml()
		.copyStaticResources();
} else {
	configBuilder
		.devtool('eval-source-map')
		.handleCss()
		.renderHtml()
		.entryPoint('./src/app/app.js');
}

var config = configBuilder.generate();

module.exports = config;
