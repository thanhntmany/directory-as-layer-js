'use strict';
const { dirname, isAbsolute, join, resolve } = require('path');
const DALBase = require("./dal-base");
const { isDirectory, isSubdirectory, isFile } = require("../helper/fs-helper");
const JsonIO = require("../helper/json-io");
// @@ NOTE: This is a singleton module!!


// @@ Export
// constant
exports.DAL_BASE_DIR_NAME = ".dal";
exports.DAL_BASE_FILE_NAME = "base.json";


// helpers
exports.getPathToDalDirTo = function (path) {
  return join(path, this.DAL_BASE_DIR_NAME);
};

exports.getPathToBaseFileTo = function (path) {
  return join(this.getPathToDalDirTo(path), this.DAL_BASE_FILE_NAME);
};

exports.hasBaseFileAt = function (path) {
  return isFile(this.getPathToBaseFileTo(path));
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

exports.initWithBaseFile = function (baseFilePath) {
  var obj = this.init(JsonIO.read_NoThrowIfNoEntry(baseFilePath));
  obj.baseFilePath = baseFilePath;

  return obj;
};

exports.initBaseAt = function (path) {
  var obj = this.initWithBaseFile(this.getPathToBaseFileTo(path));
  obj.basePath = path;
  return obj;
};

// #TODO:
// convert to Object
// init .dal folder (if needed)
// save to base file

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
