'use strict';
const Path = require('path');
const { readdirSync, statSync } = require('fs');
const { isString } = require('../helper/string-helper');


// @@ Main class
const Class = function DALLayer(payload) {
  this.tags = [];
  this.path = null;
  this.excludes = [];

  this.load(payload);
  return this;
};

const proto_ = Class.prototype;


// @@ function
proto_.load = function (payload) {
  if (!payload) return this;
  if (isString(payload)) payload = { path: payload };

  var path = payload.path;
  if (!Path.isAbsolute(path)) path = Path.resolve(path);
  if (payload.path) this.path = payload.path;

  if (Array.isArray(payload.tags)) this.tags = payload.tags;
  if (Array.isArray(payload.excludes)) this.excludes = payload.excludes;

  return this;
};

// @@
proto_.resolve = function (...paths) {
  return Path.resolve.apply(Path, paths.unshift(this.path))
};

proto_.stat = function (path, options) {
  options.throwIfNoEntry = false;
  return statSync(this.resolve(path), options);
};

proto_.readdir = function (path, options) {
  return readdirSync(this.resolve(path), options);
};


// @@ export
module.exports = Class;
