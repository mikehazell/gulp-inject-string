/*
 * gulp-inject-string
 * https://github.com/Schmicko/gulp-inject-string
 *
 * Copyright (c) 2014 Michael Hazell
 * Licensed under the MIT license.
 */

var es = require('event-stream'),
    gutil = require('gulp-util');

var stream = function(injectMethod){
    return es.map(function (file, cb) {
        try {
            file.contents = new Buffer( injectMethod( String(file.contents) ));
        } catch (err) {
            return cb(new gutil.PluginError('gulp-inject-string', err));
        }
        cb(null, file);
    });
};

module.exports = {
    append: function(str){
        return stream(function(fileContents){
            // assume str is a string for now
            return fileContents + String(str);
        });
    },
    prepend: function(str){
        return stream(function(fileContents){
            // assume str is a string for now
            return String(str) + fileContents;
        });
    },
    wrap: function(start, end){
        return stream(function(fileContents){
            // assume start and end are strings
            return String(start) + fileContents + String(end);
        });
    },
    _appendString: function(fileContents, stringInTheMiddle, endSearch) {
        var start, end;

        start = fileContents.substr(0, endSearch);
        end = fileContents.substr(endSearch);

        return start + stringInTheMiddle + end;
    },
    before: function(search, str){
        var self = this;

        return stream(function(fileContents){
            var index;
            // the simplest thing ...
            index = fileContents.indexOf(search);
            if(index > -1){
                return self._appendString(fileContents, str, index);
            } else {
                return fileContents;
            }
        });
    },
    after: function(search, str){
        var self = this;

        return stream(function(fileContents){
            var index;
            index = fileContents.indexOf(search);
            if(index > -1){
                return self._appendString(fileContents, str, index + search.length);
            } else {
                return fileContents;
            }
        });
    },
    before_array: function(search, array) {
        var self = this;
        return stream(function(fileContents){
            var index, finalRet = fileContents;
            index = fileContents.indexOf(search);

            if(index > -1){
                for (i=array.length -1; i >= 0; i--) {
                    finalRet = self._appendString(finalRet, array[i] + "\n", index);
                }
            }
            return finalRet;
        });
    },
    after_array: function(search, array) {
        var self = this;
        return stream(function(fileContents){
            var index, finalRet = fileContents;
            index = fileContents.indexOf(search);

            if(index > -1){
                for (i=array.length -1; i >= 0; i--) {
                    finalRet = self._appendString(finalRet, "\n" + array[i], index + search.length);
                }
            }
            return finalRet;
        });
    }
};

module.exports._stream = stream;
