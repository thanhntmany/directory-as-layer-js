'use strict';
const Path = require('path');
const { readdirSync, statSync } = require('fs');
const { isString } = require('../helper/string-helper');


// @@ Main class
const Class = function DALLayer(payload) {
  if (!payload) payload = {};
  if (isString(payload)) payload = { path: payload };

  var path = payload.path || "";
  if (!Path.isAbsolute(path)) path = Path.resolve(path);

  this.tags = Array.isArray(payload.tags) ? payload.tags : [];
  this.path = path;
  this.excludes = Array.isArray(payload.excludes) ? payload.excludes : [];

  return this;
};

const proto_ = Class.prototype;


// @@ function
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
exports.Class = Class;

exports.load = function (payload, instance) {
  return instance instanceof this.Class
    ? instance.constructor(payload)
    : new this.Class(payload);
};
