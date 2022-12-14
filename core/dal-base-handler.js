'use strict';
const { dirname, isAbsolute, join, resolve } = require('path');
const DALBase = require("./dal-base");
const { isDirectory, isSubdirectory, isFile } = require("../helper/fs-helper");
// @@ NOTE: This is a singleton module!!


// @@ Export
// constant
exports.DAL_BASE_DIR_NAME = DALBase.prototype.DAL_BASE_DIR_NAME;
exports.DAL_BASE_FILE_NAME = DALBase.prototype.DAL_BASE_FILE_NAME;


// helpers
exports.hasBaseFileAt = function (path) {
  return isFile(join(path, this.DAL_BASE_DIR_NAME, this.DAL_BASE_FILE_NAME))
};

exports.getBasePathFromDescendant = function (fromPath) {
  var last;
  do {
    if (this.hasBaseFileAt(fromPath)) return fromPath;

    last = fromPath;
    fromPath = dirname(fromPath);
    // At root diectory, dirname will return the same path as it's input.
  } while (fromPath !== last);

  return undefined;
};

exports.getBasePathFromCache = function (path) {
  for (var basePath in this.cache) {
    if (isSubdirectory(basePath, path)) return basePath;
  };

  return undefined;
};

exports.getBasePathOf = function (path) {

  if (!isAbsolute(path)) path = resolve(path);

  var baseDirPath = this.getBasePathFromDescendant(path);
  if (!baseDirPath) baseDirPath = this.getBasePathFromCache(path);
  if (!baseDirPath) baseDirPath = path;

  return baseDirPath
};


// class
exports.Class = DALBase;

exports.init = function (payload) {
  return new this.Class(payload);
};

exports.initBaseAt = function (path) {

  return this.init().load(path);
};

// @@ getting and caching
exports.cache = {};

exports.clearCache = function () {
  this.cache = {};
  return this;
};

exports.getBaseAt = function (path) {
  if (!isAbsolute(path)) path = resolve(path);
  return path in this.cache
    ? this.cache[path]
    : this.cache[path] = this.initBaseAt(path);
};

exports.getBaseOf = function (path) {
  return this.getBaseAt(this.getBasePathOf(path));
};
