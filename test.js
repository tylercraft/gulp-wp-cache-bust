/*global describe, it*/
"use strict";

var fs = require("fs");
var es = require("event-stream");
var should = require("should");

require("mocha");

delete require.cache[require.resolve("./")];

var Vinyl = require("vinyl");
var cachebust = require("./");

describe("gulp-wp-cache-bust", function () {
  var expectedFile = new Vinyl({
    path: "test-files/expected/scripts.php",
    cwd: "test-files/",
    base: "test-files/expected",
    contents: fs.readFileSync("test-files/expected/scripts.php"),
  });

  it("should produce expected file", function (done) {
    var srcFile = new Vinyl({
      path: "test-files/raw/default_options.html",
      cwd: "test-files/",
      base: "test-files/raw",
      contents: fs.readFileSync("test-files/raw/scripts.php"),
    });
    var stream = cachebust({
      themeFolder: "test-files/raw",
    });

    stream.on("error", function (err) {
      should.exist(err);
      done(err);
    });

    stream.on("data", function (newFile) {
      should.exist(newFile);
      should.exist(newFile.contents);

      String(newFile.contents).should.equal(String(expectedFile.contents));
    });

    stream.on("end", function () {
      done();
    });

    stream.write(srcFile);
    stream.end();
  });
});
