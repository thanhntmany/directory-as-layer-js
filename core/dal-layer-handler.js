'use strict';
const { isAbsolute, resolve } = require('path');
const Class = require('./dal-layer');
// @@ NOTE: This is a singleton module!!


// @@ export
exports.Class = Class

exports.getInstance = function (key) {
  var path = key;
  if (!isAbsolute(path)) path = resolve(path);

  return this.Class(path);
};


// @@ getting and caching
exports.cache = {};

exports.clearCache = function () {
  this.cache = {};
  return this;
};

exports.get = function (key) {
  return key in this.cache
    ? this.cache[key]
    : this.cache[key] = this.getInstance(key);
};
