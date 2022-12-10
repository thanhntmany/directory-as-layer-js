'use strict';
const JsonIO = require("../helper/json-io");


// @@ NOTE: This is a singleton module!!
// @@ Main class
const Class = function DALSession(payload) {
  this.obj = payload || {};
  return this;
};

const proto_ = Class.prototype;


// @@ class function
proto_.read = function (path) {
  if (!path) return this;

  this.path = path;
  return this.constructor.call(this, JsonIO.read(path));
};

proto_.save = function (path) {
  path = path || this.path;

  // #TODO: Adress error
  if (!path) return;

  JsonIO.write(path, this.obj)

};

// @@ getting and caching
exports.cache = {};
var cache_ = exports.cache;


// @@ Export
exports.Class = Class;

exports.init = function (key) {
  return new Class();
};

exports.load = function (key) {
  return new Class();
};

exports.clearCache = function () {
  cache_ = this.cache = {};
  return this;
};


// @@ function
exports.execCommand = function (cmd, payload, coreApp) {
  return this.get(cmd).exec(payload, coreApp);
};
