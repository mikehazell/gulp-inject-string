var gulp = require('gulp'),
    rename = require('gulp-rename'),
    inject = require('../');

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
        .pipe(
            inject.custom(function(str) {
                return str
                    .split('\n')
                    .reverse()
                    .join('\n');
            })
        )
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
