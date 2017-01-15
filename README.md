# gulp-wp-cache-bust &middot; [![Build Status](https://img.shields.io/travis/tylercraft/gulp-wp-cache-bust.svg?style=flat-square)](https://travis-ci.org/tylercraft/gulp-wp-cache-bust) [![Coverage Status](https://img.shields.io/coveralls/tylercraft/gulp-wp-cache-bust/master.svg?style=flat-square)](https://coveralls.io/github/tylercraft/gulp-wp-cache-bust?branch=master) [![npm version](https://img.shields.io/npm/v/gulp-wp-cache-bust.svg?style=flat-square)](https://www.npmjs.com/package/gulp-wp-cache-bust) [![Dev Dependencies](https://img.shields.io/david/tylercraft/gulp-wp-cache-bust.svg?style=flat-square)](https://david-dm.org/tylercraft/gulp-wp-cache-bust)

> Wordpress cache busting plugin for [gulp](https://github.com/tylercraft/gulp-wp-cache-bust)


## Wordpress config

There are many ways to embed files in Wordpress. You can manually link to a file, or use the `wp_enqueue_script`/`wp_enqueue_style` and `wp_register_script`/`wp_register_style` methods. Often there could be a need to mix and match both methods within the same theme. To cachebust your files, create a php file within your theme and define the files as constants:

```
<?php

define('RESET_CSS', get_template_directory_uri() . '/css/reset.css');
define('ABSOLUTE_PATH_TO_FILE', '/css/reset.css');
define('THIRD_PARTY', 'https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js');
```

This plugin will read this file and modify it to this:

```
<?php

define('RESET_CSS', get_template_directory_uri() . '/css/reset.css?v=84507b8f4af3062c3888dbd83bde27ea');
define('ABSOLUTE_PATH_TO_FILE', '/css/reset.css?v=84507b8f4af3062c3888dbd83bde27ea');
define('THIRD_PARTY', 'https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js');
```

You can then use these constants in functions.php (or wherever you want).

An example functions.php file:

```
<?php

include 'scripts.php';

wp_enqueue_style('reset_css', RESET_CSS);
wp_enqueue_script('site_vendor_js', VENDOR_JS, null, false, true);

```

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
