
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
        it('should define a before method', function(){
            expect(injectHtml.before).to.be.a('function');
        });
        it('should define an after method', function(){
            expect(injectHtml.after).to.be.a('function');
        });
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

    describe('before', function () {
        var fakeFile;

        beforeEach(function () {
            fakeFile = new gutil.File({
                base: 'test/fixtures',
                cwd: 'test',
                path: 'test/fixtures/index.html',
                contents: new Buffer(fixtureFile)
            });
        });


        it('should insert the given string before the first instance of the search string', function(done){
            var stream = injectHtml.before('</body>','<h1>Before test</h1>');
            var expectedFile = fs.readFileSync( path.join(__dirname, './expected/before.html'));

            stream.once('data', function(newFile){
                expect(String(newFile.contents)).to.equal(String(expectedFile));
                done();
            });

            stream.write(fakeFile);
        });

        it('should do nothing if the search string is not found', function(done){
            var stream = injectHtml.before('IAMNOTTHERE', '<h1>Before test</h1>');
            var expectedFile = String(fixtureFile);

            stream.once('data', function(newFile){
                expect(String(newFile.contents)).to.equal(expectedFile);
                done();
            });

            stream.write(fakeFile)

        });

    });

    describe('after', function () {
        var fakeFile;

        beforeEach(function () {
            fakeFile = new gutil.File({
                base: 'test/fixtures',
                cwd: 'test',
                path: 'test/fixtures/index.html',
                contents: new Buffer(fixtureFile)
            });
        });

        it('should insert the given string after the first instance of the search string', function(done){
            var stream = injectHtml.after('</body>','<h1>After test</h1>');
            var expectedFile = fs.readFileSync( path.join(__dirname, './expected/after.html'));

            stream.once('data', function(newFile){
                expect(String(newFile.contents)).to.equal(String(expectedFile));
                done();
            });

            stream.write(fakeFile);
        });

        it('should do nothing if the search string is not found', function(done){
            var stream = injectHtml.after('IAMNOTTHERE','<h1>After test</h1>');
            var expectedFile = String(fixtureFile);

            stream.once('data', function(newFile){
                expect(String(newFile.contents)).to.equal(expectedFile);
                done();
            });

            stream.write(fakeFile);

        });

    });

    describe('_stream', function () {

        it('should fail with a gulp-util.PluginError', function(done){
            var stream = injectHtml._stream(null, { method: 'fail' });

            stream.once('error', function(error){
                expect(error.plugin).to.equal('gulp-inject-html');
                done();
            });

            stream.write('not a buffer');
        });

    });
});
