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
    append: function(str){
        return stream(function(fileContents){
            // assume str is a string for now
            return fileContents + String(str);
        }, str);
    },
    prepend: function(str){
        return stream(function(fileContents){
            // assume str is a string for now
            return String(str) + fileContents;
        }, str);
    },
    wrap: function(start, end){
        return stream(function(fileContents){
            // assume start and end are strings
            return String(start) + fileContents + String(end);
        },  {start:start, end:end });
    },
    before: function(search, str){
        return stream(function(fileContents){
            var index, start, end;
            // the simplest thing ...
            index = fileContents.indexOf(search);
            if(index > -1){
                start = fileContents.substr(0, index);
                end = fileContents.substr(index);
                return start + str + end;
            } else {
                return fileContents;
            }

        }, {search: search, str: str});
    },
    after: function(search, str){
        return stream(function(fileContents){
            var index, start, end;
            index = fileContents.indexOf(search);
            if(index > -1){
                start = fileContents.substr(0, index + search.length);
                end = fileContents.substr(index + search.length);
                return start + str + end;
            } else {
                return fileContents;
            }
        }, {search:search, str:str});
    }
};
