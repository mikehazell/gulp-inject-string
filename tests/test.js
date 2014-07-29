
var fs = require('fs'),
    path = require('path'),
    gutil = require('gulp-util'),
    mocha = require('mocha'),
    expect = require('chai').expect,
    injectHtml = require('../');

var fixtureFile = fs.readFileSync(path.join(__dirname, './fixtures/index.html'));

describe('gulp-inject-html', function(){

    describe('interface', function(){
        it('should define an append method', function(){
            expect(injectHtml.append).to.be.a('function');
        });
        it('should define a prepend method', function(){
            expect(injectHtml.prepend).to.be.a('function');
        });
        it('should define a wrap method', function(){
            expect(injectHtml.wrap).to.be.a('function');
        });
        it('should define a before method');
        it('should define an after method');
    });


    describe('append', function () {

        var fakeFile;

        beforeEach(function () {
            fakeFile = new gutil.File({
                base: 'test/fixtures',
                cwd: 'test/',
                path: 'test/fixtures/index.html',
                contents: new Buffer(fixtureFile)
            });
        });

        it('should append the given string to the file', function(done){
            var stream = injectHtml.append('foorbar');
            var expectedFile = fixtureFile + 'foorbar';

            stream.once('data', function(newFile){
                expect(String(newFile.contents)).to.equal(expectedFile);
                done();
            });

            stream.write(fakeFile);
        });
    });


    describe('prepend', function () {
        var fakeFile;

        beforeEach(function () {
            fakeFile = new gutil.File({
                base: 'test/fixtures',
                cwd: 'test/',
                path: 'test/fixtures/index.html',
                contents: new Buffer(fixtureFile)
            });
        });

        it('should prepend the given string to the file', function(done){
            var stream = injectHtml.prepend('foobar');
            var expectedFile = 'foobar' + fixtureFile;

            stream.once('data', function(newFile){
                expect(String(newFile.contents)).to.equal(expectedFile);
                done();
            });

            stream.write(fakeFile);
        });

    });

    describe('wrap', function () {
        var fakeFile;

        beforeEach(function () {
            fakeFile = new gutil.File({
                base: 'test/fixtures',
                cwd: 'test/',
                path: 'test/fixtures/index.html',
                contents: new Buffer(fixtureFile)
            });
        });

        it('should warp the file with the given strings', function(done){
            var stream = injectHtml.wrap('foo', 'bar');
            var expectedFile = 'foo' + fixtureFile + 'bar';

            stream.once('data', function(newFile){
                expect(String(newFile.contents)).to.equal(expectedFile);
                done();
            });

            stream.write(fakeFile);
        });

    });

});
