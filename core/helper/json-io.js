'use strict';
const fs = require('fs');


exports.loadJSONAsync = function (file, ...args) {
  var callback = args.pop(); // (err, data) => {}
  var options = args.pop() || { "encoding": "utf8" };

  // #TODO: Makes it work properly on FreeBSD
  // ref https://nodejs.org/api/fs.html#fsreadfilepath-options-callback
  fs.readFile(file, options, (err, data) => {
    callback(err, JSON.parse(data));
  });

};

exports.loadJSONSync = function (file, ...args) {
  var options = args.pop() || { "encoding": "utf8" };

  // #TODO: Makes it work properly on FreeBSD
  // ref https://nodejs.org/api/fs.html#fsreadfilesyncpath-options
  var data = fs.readFileSync(file, options);
  return JSON.parse(data);
};
