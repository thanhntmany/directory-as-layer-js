'use strict';


// @@ NOTE: This is a singleton module.
// @@ getting and caching
var cache_ = exports.cache = {};

exports.get = function (key) {
  if (key in cache_) return cache_[key];
  try {

    return cache_[key] = require("./module/" + key);

  } catch (error) {
    if (error.code !== 'MODULE_NOT_FOUND') throw error;
  };

  return require("./module/default");
};

exports.clearCache = function () {
  cache_ = this.cache = {};
  return this;
};


// @@ function
exports.execCommand = function (cmd, payload, app) {
  return this.get(cmd).exec(payload, app)
};
