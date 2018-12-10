/*
 * gulp-inject-string
 * https://github.com/Schmicko/gulp-inject-string
 *
 * Copyright (c) 2014 Michael Hazell
 * Licensed under the MIT license.
 */

var es = require('event-stream'),
    PluginError = require('plugin-error');

var stream = function(injectMethod){
    return es.map(function (file, cb) {
        try {
            file.contents = new Buffer( injectMethod( String(file.contents) ));
        } catch (err) {
            return cb(new PluginError('gulp-inject-string', err));
        }
        cb(null, file);
    });
};

var forEachKey = function(searchObj, fileContents, callback) {
    var search, str;
    for(search in searchObj) {
        if (searchObj.hasOwnProperty(search)) {
            str = searchObj[search];
                fileContents = callback(search, str, fileContents);
        }
    }
    return fileContents;
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
        });
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
        });
    },
    beforeEach: function(search, str) {
        return stream(function(fileContents) {
            return fileContents.split(search).join(str + search);
        });
    },
    afterEach: function(search, str) {
        return stream(function(fileContents) {
            return fileContents.split(search).join(search + str);
        });
    },
    replace: function(search, str) {
      var searchObj = search;
      if(typeof search == "string") {
          searchObj = {};
		  searchObj[search] = str;
	  }
      return stream(function(fileContents) {
          return forEachKey(searchObj, fileContents, function(search, str, fileContentsModified) {
              return fileContentsModified.replace(new RegExp(search, 'g'), str);
          });
      });
    }
};

module.exports._stream = stream;
