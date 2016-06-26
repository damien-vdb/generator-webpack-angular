'use strict';

// Modules
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
var ENV = process.env.npm_lifecycle_event;
var isTest = ENV === 'test' || ENV === 'test-watch';
var isProd = ENV === 'build';

module.exports = ConfigBuilder;

function ConfigBuilder() {
	

	var that = this;
  
  /**
   * Config
   * Reference: http://webpack.github.io/docs/this.configuration.html
   * This is the object where all this.configuration gets set
   */
  this.config = {
		  entry : {},
  };
  
  this.output = true;
  this.fileNames = '[name].bundle.js';
  
  function computeOutput() {
	  if(!that.output) {
		  return {};
	  }
	  return {
		    // Absolute output directory
		    path: __dirname + '/dist',

		    // Output path from the view of the page
		    // Uses webpack-dev-server in development
		    publicPath: '/',

		    // Filename for entry points
		    // Only adds hash in build mode
		    filename: that.fileNames + '.js',

		    // Filename for non-entry points
		    // Only adds hash in build mode
		    chunkFilename: that.fileNames + '.js'
		  };	
  }

  this.withoutOutput = function() {
	  this.output = false;
	  return this;
  }
  
  this.hashedOutput = function() {
	  this.fileNames = '[name].[hash]';
	  return this;
  }
  
  this.generate = function() {
	  this.config.output = computeOutput();
	  console.log('config : '+ this.config);
	  return this.config;
  }

  this.entryPoint = function(entry) {
	  this.config.entry.app = entry;
	  return this;
  };

  this.devtool = function(devtool) {
	  this.config.devtool = devtool;
	  return this;
  };

  /**
   * Loaders
   * Reference: http://webpack.github.io/docs/this.configuration.html#module-loaders
   * List: http://webpack.github.io/docs/list-of-loaders.html
   * This handles most of the magic responsible for converting modules
   */

  // Initialize module
  this.config.module = {
    preLoaders: [],
    loaders: [{
      // CSS LOADER
      // Reference: https://github.com/webpack/css-loader
      // Allow loading css through js
      //
      // Reference: https://github.com/postcss/postcss-loader
      // Postprocess your css with PostCSS plugins
      test: /\.css$/,
      // Reference: https://github.com/webpack/extract-text-webpack-plugin
      // Extract css files in production builds
      //
      // Reference: https://github.com/webpack/style-loader
      // Use style-loader in development.
      loader: isTest ? 'null' : ExtractTextPlugin.extract('style', 'css?sourceMap!postcss')
    }, {
      // ASSET LOADER
      // Reference: https://github.com/webpack/file-loader
      // Copy png, jpg, jpeg, gif, svg, woff, woff2, ttf, eot files to output
      // Rename the file using the asset hash
      // Pass along the updated reference to your code
      // You can add here any file extension you want to get copied to your output
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
      loader: 'file'
    }, {
      // HTML LOADER
      // Reference: https://github.com/webpack/raw-loader
      // Allow loading html through js
      test: /\.html$/,
      loader: 'raw'
    }]
  };

  this.coverage = function() {
	  // ISPARTA LOADER
	  // Reference: https://github.com/ColCh/isparta-instrumenter-loader
	  // Instrument JS files with Isparta for subsequent code coverage reporting
	  // Skips node_modules and files that end with .spec.js
	  this.config.module.preLoaders.push({
	      test: /\.js$/,
	      exclude: [
	        /node_modules/,
	        /\.spec\.js$/
	      ],
	      loader: 'isparta-instrumenter'
	    });
	  return this;
  };

  /**
   * PostCSS
   * Reference: https://github.com/postcss/autoprefixer-core
   * Add vendor prefixes to your css
   */
  this.config.postcss = [
    autoprefixer({
      browsers: ['last 2 version']
    })
  ];

  /**
   * Plugins
   * Reference: http://webpack.github.io/docs/this.configuration.html#plugins
   * List: http://webpack.github.io/docs/list-of-plugins.html
   */
  this.config.plugins = [];

  // Skip rendering index.html in test mode
  if (!isTest) {
    // Reference: https://github.com/ampedandwired/html-webpack-plugin
    // Render index.html
    this.config.plugins.push(
      new HtmlWebpackPlugin({
        template: './src/public/index.html',
        inject: 'body'
      }),

      // Reference: https://github.com/webpack/extract-text-webpack-plugin
      // Extract css files
      // Disabled when in test mode or not in build mode
      new ExtractTextPlugin('[name].[hash].css', {disable: !isProd})
    )
  }

  this.noErrors = function() {
	  this.config.plugins.push(
		      // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
		      // Only emit files when there are no errors
		      new webpack.NoErrorsPlugin());
	  return this;
  }
  
  this.minify = function() {
	  this.config.plugins.push(
	    		
		      // Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
		      // Dedupe modules in the output
		      new webpack.optimize.DedupePlugin(),

		      // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
		      // Minify all javascript, switch loaders to minimizing mode
		      new webpack.optimize.UglifyJsPlugin());
	  return this;
  }
  // Add build specific plugins
  if (isProd) {
    this.config.plugins.push(
    		
      // Copy assets from the public folder
      // Reference: https://github.com/kevlened/copy-webpack-plugin
      new CopyWebpackPlugin([{
        from: __dirname + '/src/public'
      }])
    )
  }

  /**
   * Dev server this.configuration
   * Reference: http://webpack.github.io/docs/this.configuration.html#devserver
   * Reference: http://webpack.github.io/docs/webpack-dev-server.html
   */
  this.config.devServer = {
    contentBase: './src/public',
    stats: 'minimal'
  };

};
