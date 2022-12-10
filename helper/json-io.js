'use strict';
const { readFile, writeFile, readFileSync, writeFileSync } = require('fs');


// @@ Export
exports.ENCODING = "utf8";

exports.readAsync = function (file, ...args) {
  var callback = args.pop(); // (err, data) => {}
  var options = args.pop() || { "encoding": this.ENCODING };

  // #TODO: Makes it work properly on FreeBSD
  // ref https://nodejs.org/api/fs.html#fsreadfilepath-options-callback
  readFile(file, options, (err, obj) => {
    callback(err, JSON.parse(obj));
  });
};

exports.writeAsync = function (file, obj, ...args) {
  var callback = args.pop(); // (err, data) => {}
  var options = args.pop() || { "encoding": this.ENCODING };

  writeFile(file, JSON.stringify(obj), options, (err) => {
    callback(err);
  });
};

exports.read = function (file, ...args) {
  var options = args.pop() || { "encoding": this.ENCODING };

  // #TODO: Makes it work properly on FreeBSD
  // ref https://nodejs.org/api/fs.html#fsreadfilesyncpath-options
  return JSON.parse(readFileSync(file, options));
};

exports.write = function (file, obj, ...args) {
  var options = args.pop() || { "encoding": this.ENCODING };

  writeFileSync(file, JSON.stringify(obj), options);
};
