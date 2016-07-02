var generators = require('yeoman-generator');

var files = require('./files.json').files;

var WebpackAngularGenerator = generators.Base.extend({
  generate: generate
});

function generate() {
  var that = this;
  files.forEach(function(file) {
    that.fs.copy(that.templatePath(file), that.destinationPath(file));
  });
}

module.exports = WebpackAngularGenerator;
