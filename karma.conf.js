module.exports = function karmaConfig(config) {
	config.set({
		frameworks : [ 'jasmine' ],

		reporters : [ 'progress', 'coverage' ],

		files : [ 'tests.webpack.js' ],

		preprocessors : {
			'tests.webpack.js' : [ 'webpack', 'sourcemap' ]
		},

		browsers : [ 'PhantomJS' ],

		singleRun : true,

		coverageReporter : {
			dir : 'coverage/',
			reporters : [ {
				type : 'text-summary'
			}, {
				type : 'html'
			} ]
		},

		webpack : require('./webpack.config'),

		// Hide webpack build information from output
		webpackMiddleware : {
			noInfo : 'errors-only'
		}
	});
};
