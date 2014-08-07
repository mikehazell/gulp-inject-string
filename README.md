# gulp-inject-string

[![Build Status](https://travis-ci.org/Schmicko/gulp-inject-string.svg?branch=master)](https://travis-ci.org/Schmicko/gulp-inject-string)

Inject snippets in build

## Methods

```js
    append(str)         // Appends the string
    prepend(str)        // Prepends the string
    wrap(start, end)    // Wraps file contents in between *start* and *end*
    before(search, str) // Inserts the string before the first occurence of *search*
    after(search, str)  // Inserts the string after the first occurence of *search*
```

## Examples

See `examples/build` for output.

```js

var gulp = require('gulp'),
    rename = require('gulp-rename'),
    inject = require('gulp-inject-string');

gulp.task('inject:append', function(){
    gulp.src('src/example.html')
        .pipe(inject.append('\n<!-- Created: ' + Date() + ' -->'))
        .pipe(rename('append.html'))
        .pipe(gulp.dest('build'));
});

gulp.task('inject:prepend', function(){
    gulp.src('src/example.html')
        .pipe(inject.prepend('<!-- Created: ' + Date() + ' -->\n'))
        .pipe(rename('prepend.html'))
        .pipe(gulp.dest('build'));
});

gulp.task('inject:wrap', function(){
    gulp.src('src/example.html')
        .pipe(inject.wrap('<!-- Created: ' + Date() + ' -->\n', '<!-- Author: Mike Hazell -->'))
        .pipe(rename('wrap.html'))
        .pipe(gulp.dest('build'));
});

gulp.task('inject:before', function(){
    gulp.src('src/example.html')
        .pipe(inject.before('<script', '<script src="http://code.jquery.com/jquery-2.1.1.min.js"></script>\n'))
        .pipe(rename('before.html'))
        .pipe(gulp.dest('build'));
});

gulp.task('inject:after', function(){
    gulp.src('src/example.html')
        .pipe(inject.after('</title>', '\n<link rel="stylesheet" href="test.css">\n'))
        .pipe(rename('after.html'))
        .pipe(gulp.dest('build'));
});

gulp.task('default', ['inject:append', 'inject:prepend', 'inject:wrap', 'inject:before', 'inject:after']);

```
