var gulp = require('gulp'),
    rename = require('gulp-rename'),
    injectHtml = require('../');

gulp.task('inject:append', function(){
    gulp.src('src/example.html')
        .pipe(injectHtml.append('\n<!-- Created: ' + Date() + ' -->'))
        .pipe(rename('append.html'))
        .pipe(gulp.dest('build'));
});

gulp.task('inject:prepend', function(){
    gulp.src('src/example.html')
        .pipe(injectHtml.prepend('<!-- Created: ' + Date() + ' -->\n'))
        .pipe(rename('prepend.html'))
        .pipe(gulp.dest('build'));
});

gulp.task('inject:wrap', function(){
    gulp.src('src/example.html')
        .pipe(injectHtml.wrap('<!-- Created: ' + Date() + ' -->\n', '<!-- Author: Mike Hazell -->'))
        .pipe(rename('wrap.html'))
        .pipe(gulp.dest('build'));
});

gulp.task('inject:before', function(){
    gulp.src('src/example.html')
        .pipe(injectHtml.before('<script', '<script src="http://code.jquery.com/jquery-2.1.1.min.js"></script>\n'))
        .pipe(rename('before.html'))
        .pipe(gulp.dest('build'));
});

gulp.task('inject:after', function(){
    gulp.src('src/example.html')
        .pipe(injectHtml.after('</title>', '\n<link rel="stylesheet" href="test.css">\n'))
        .pipe(rename('after.html'))
        .pipe(gulp.dest('build'));
});

gulp.task('default', ['inject:append', 'inject:prepend', 'inject:wrap', 'inject:before', 'inject:after']);
