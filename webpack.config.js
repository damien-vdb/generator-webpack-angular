'use strict';

var ConfigBuilder = require('./webpack.config-builder');

var ENV = process.env.npm_lifecycle_event;
var test = ENV === 'test' || ENV === 'test-watch';

var configBuilder = new ConfigBuilder();
if (test) {
	configBuilder.entryPoint({});
} else {
	configBuilder.entryPoint({
		app : './src/app/app.js'
	});
}
var config = configBuilder.generate();

module.exports = config;
