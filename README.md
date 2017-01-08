# gulp-wp-cache-bust [![Build Status](https://travis-ci.org/tylercraft/gulp-wp-cache-bust.svg?branch=master)](https://travis-ci.org/tylercraft/gulp-wp-cache-bust)

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
