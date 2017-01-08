# gulp-wp-cache-bust &middot; [![Build Status](https://img.shields.io/travis/tylercraft/gulp-wp-cache-bust.svg?style=flat-square)](https://travis-ci.org/tylercraft/gulp-wp-cache-bust) [![Coverage Status](https://img.shields.io/coveralls/tylercraft/gulp-wp-cache-bust/master.svg?style=flat-square)](https://coveralls.io/github/tylercraft/gulp-wp-cache-bust?branch=master) [![npm version](https://img.shields.io/npm/v/gulp-wp-cache-bust.svg?style=flat-square)](https://www.npmjs.com/package/gulp-wp-cache-bust) [![Dev Dependencies](https://img.shields.io/david/tylercraft/gulp-wp-cache-bust.svg?style=flat-square)](https://david-dm.org/tylercraft/gulp-wp-cache-bust)

> Wordpress cache busting plugin for [gulp](https://github.com/tylercraft/gulp-wp-cache-bust)

## Install

```
$ npm install --save-dev gulp-wp-cache-bust
```


## Usage

```js
const gulp = require('gulp');
const wpcachebust = require('gulp-wp-cache-bust');

gulp.task('default', () =>
  gulp.src('./dev/wp-content/themes/themeName/scripts.php', {base: './'})
      .pipe(wpcachebust({
        themeFolder: './dev/wp-content/themes/themeName',
        rootPath: './'
      }))
      .pipe(gulp.dest('./'))
);
```


## API

### imagemin([options])

#### options

Type: `Object`

##### rootPath

Type: `string`<br>
Default: ``

Root path of dev folder. Used if path to file is absolute (`/css/main.css/`).

##### themeFolder

Type: `string`<br>
Default: `null`

Path to Wordpress theme folder. Used to find file when path to includes `get_template_directory_uri()`.

## License

MIT © [Tyler Craft](http://tylercraft.com)
