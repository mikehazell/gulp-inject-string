# gulp-inject-string

[![Build Status](https://travis-ci.org/mikehazell/gulp-inject-string.svg?branch=master)](https://travis-ci.org/mikehazell/gulp-inject-string)
[![NPM version](https://badge.fury.io/js/gulp-inject-string.svg)](http://badge.fury.io/js/gulp-inject-string)

Inject snippets in build

## Methods

```js
append(str)             // Appends the string
prepend(str)            // Prepends the string
wrap(start, end)        // Wraps file contents in between *start* and *end*
before(search, str)     // Inserts the string before the first occurence of *search*
after(search, str)      // Inserts the string after the first occurence of *search*
beforeEach(search, str) // Inserts the string before each occurence of *search*
afterEach(search, str)  // Inserts the string after each occurence of *search*
replace(search, str)    // Replaces each occurence of *search* with *str*
replaceAll(search, str) // Replaces each occurence of *search* with *str*
custom(function)        // Do what ever you want to do.
```

## Examples

See [examples/build](https://github.com/mikehazell/gulp-inject-string/tree/master/examples/build) for output.

```js

var gulp = require('gulp'),
    rename = require('gulp-rename'),
    inject = require('gulp-inject-string');

function injectAppend() {
    return gulp
        .src('src/example.html')
        .pipe(inject.append('\n<!-- Created: ' + Date() + ' -->'))
        .pipe(rename('append.html'))
        .pipe(gulp.dest('build'));
}

function injectPrepend() {
    return gulp
        .src('src/example.html')
        .pipe(inject.prepend('<!-- Created: ' + Date() + ' -->\n'))
        .pipe(rename('prepend.html'))
        .pipe(gulp.dest('build'));
}

function injectWrap() {
    return gulp
        .src('src/example.html')
        .pipe(
            inject.wrap(
                '<!-- Created: ' + Date() + ' -->\n',
                '<!-- Author: Mike Hazell -->'
            )
        )
        .pipe(rename('wrap.html'))
        .pipe(gulp.dest('build'));
}

function injectBefore() {
    return gulp
        .src('src/example.html')
        .pipe(
            inject.before(
                '<script',
                '<script src="http://code.jquery.com/jquery-2.1.1.min.js"></script>\n'
            )
        )
        .pipe(rename('before.html'))
        .pipe(gulp.dest('build'));
}

function injectAfter() {
    return gulp
        .src('src/example.html')
        .pipe(
            inject.after(
                '</title>',
                '\n<link rel="stylesheet" href="test.css">\n'
            )
        )
        .pipe(rename('after.html'))
        .pipe(gulp.dest('build'));
}

function injectBeforeEach() {
    return gulp
        .src('src/example.html')
        .pipe(inject.beforeEach('</p', ' Finis.'))
        .pipe(rename('beforeEach.html'))
        .pipe(gulp.dest('build'));
}

function injectAfterEach() {
    return gulp
        .src('src/example.html')
        .pipe(inject.afterEach('<p', ' class="bold"'))
        .pipe(rename('afterEach.html'))
        .pipe(gulp.dest('build'));
}

function injectReplace() {
    return gulp
        .src('src/example.html')
        .pipe(inject.replace('test.js', 'test.min.js'))
        .pipe(rename('replace.html'))
        .pipe(gulp.dest('build'));
}

function injectReplaceAll() {
    return gulp
        .src('src/example.html')
        .pipe(inject.replaceAll('Lorem ipsum', 'Muspi merol'))
        .pipe(rename('replaceAll.html'))
        .pipe(gulp.dest('build'));
}

function injectCustom() {
    return gulp
        .src('src/example.html')
        .pipe(inject.custom(function (str) {
            return str.split('\n').reverse().join('\n')
        }))
        .pipe(rename('custom.html'))
        .pipe(gulp.dest('build'));
}

exports.default = gulp.parallel(
    injectAppend,
    injectPrepend,
    injectWrap,
    injectBefore,
    injectAfter,
    injectBeforeEach,
    injectAfterEach,
    injectReplace,
    injectReplaceAll,
    injectCustom
);
```


## Changes

### v2.0.0 - 2019-07-12

**Breaking change:**

`replace` now matches the Javascript String.replace API. It can take a `String` or a `RegExp`
as the search parameter. If given a string it will only replace the first instance of that string.
To replace **all** instances of a string use the new method `replaceAll`.

**Feature**

New method `inject.custom` takes a method as it's only argument. This method will be called
with the entire content of the file as a `String` and should return a `String`. Beyond that
you can do what ever you want inside custom.

Thanks to [Eugene Zhuchenko](https://github.com/evanre) for that one and for his patience. It took me a while to merge this.

**Docs update**

Updated the docs and examples to match the gulp `export` API over the older `gulp.task` api.


### v1.1.1 - 2018-01-09

- Removed gulp-util dependency. Thanks [TheDancingCode](https://github.com/TheDancingCode)

### v1.1.0 - 2015-12-17

- Added `replace`. Thanks [alexweber](https://github.com/alexweber).
- Realised that as soon as you say something is complete and will not need to
change... someone will think of something else it should do.


### v1.0.0 - 2015-11-08

- Added beforeEach and afterEach. Thanks [Joachim](https://github.com/jbjorge).

After a year with no changes or issues, this might as well be a 1.0. It will probably never change again.
