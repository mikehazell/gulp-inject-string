/*
 * gulp-inject-html
 * https://github.com/Schmicko/gulp-inject-html
 *
 * Copyright (c) 2014 Michael Hazell
 * Licensed under the MIT license.
 */

var es = require('event-stream'),
    gutil = require('gulp-util');


var stream = function(injectMethod, opts){
    return es.map(function (file, cb) {
        try {
            file.contents = new Buffer( injectMethod( String(file.contents) ));
        } catch (err) {
            return cb(new gutil.PluginError('gulp-inject-reload', err, opts));
        }
        cb(null, file);
    });
};

module.exports = {
    append: function(opts){
        return stream(function(fileContents){
            // assume opts is a string for now
            return fileContents + opts;
        }, opts);
    },
    prepend: function(opts){
        return stream(function(fileContents){
            // assume opts is a string for now
            return opts + fileContents;
        });
    },
    wrap: function(start, end){
        return stream(function(fileContents){
            // assume start and end are strings
            return start + fileContents + end;
        });
    }
};
