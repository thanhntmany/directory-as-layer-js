'use strict';
// @@ NOTE: This is a singleton module!!


// @@ export


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
