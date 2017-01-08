var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

var crypto = require('crypto');
var fs = require('fs');
var through = require('through2');

const PLUGIN_NAME = 'gulp-wp-cache-bust';

function md5(str) {
  var hash = crypto.createHash('md5');
  hash.update(fs.readFileSync(str));
  return hash.digest('hex');
};

function removePreviousVersioning(filePath) {
  // Remove any previous cache busting references
  return filePath.lastIndexOf("?v=") > 0
    ? filePath.substring(0, filePath.lastIndexOf("?v=")) + '\''
    : filePath;
}

function gulpWPCacheBust(options) {
  options = options || {};

  if (!options.rootPath) {
    options.rootPath = '';
  }

	return through.obj(function (file, enc, cb) {
		if (file.isNull()) {
			cb(null, file);
			return;
		}

		if (file.isStream()) {
      throw new PluginError(PLUGIN_NAME, 'Streaming not supported!');
		}

		if (file.isBuffer()) {
			file.contents = new Buffer(String(file.contents));

      var regex = /(define\(([^;]+)\))/g;

      var m;
      var buffer = new Buffer(String(file.contents));
      while ((m = regex.exec(buffer)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
          regex.lastIndex++;
        }

        if (m[2]) {
          var ogDefinition = m[2];
          var nonVersionedDefinition = removePreviousVersioning(ogDefinition);
          var params = nonVersionedDefinition.split(',');

          if (params[1]) {
            filePath = params[1].trim();

            // Only check local files
            if(!(/(http:\/\/|https:\/\/)/.test(filePath))){
              // remove ticks/quotes
              var r = /(['"]+)/g;
              cleanFilePath = filePath.replace(r, '');

              // if using get_template_directory_uri, swap for themeFolder
              var r = /(get_template_directory_uri\(\)[ .]+)/g;
              if(r.test(cleanFilePath)){
                if (options.themeFolder) {
                  cleanFilePath = cleanFilePath.replace(r, options.themeFolder);
                } else {
                  throw new PluginError(PLUGIN_NAME, 'Theme folder is not defined.');
                }
              } else if (cleanFilePath[0] === '/') {
                // Absolute path
                cleanFilePath = cleanFilePath.replace('/', options.rootPath);
              } else {
                return;
              }

              var hashCSS = md5(cleanFilePath);

              var slashSplits = cleanFilePath.split('/');
              var fileName = slashSplits[slashSplits.length - 1];
              var versionedFileName = fileName + '?v=' + hashCSS;
              var newDefinition = nonVersionedDefinition.replace(
                fileName,
                versionedFileName
              );
              //console.log(definition, newDefinition);
              file.contents = new Buffer(
                String(file.contents).replace(ogDefinition, newDefinition)
              );
            }
          }
        }
      }

			this.push(file);
		}

		cb(null, file);
	});
};

module.exports = gulpWPCacheBust;
