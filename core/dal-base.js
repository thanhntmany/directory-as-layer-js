'use strict';
const { isAbsolute, join, resolve } = require('path');
const DALStack = require("./dal-stack");
const JsonIO = require("../helper/json-io");
const { isDirectory, isFile } = require("../helper/fs-helper");


// @@ Main class
const Class = function DALBase(payload) {
  if (payload === undefined) payload = {};

  this.externalKey = payload.externalKey;

  this.stack = new DALStack(
    Array.isArray(payload.stack) ? payload.stack : []
  );

  return this;
};

const proto_ = Class.prototype;


// @@ class constant
proto_.DAL_BASE_DIR_NAME = ".dal";
proto_.DAL_BASE_FILE_NAME = "base.json";


// @@ class function
proto_.toObject = function () {
  return {
    // #TODO:
    path: this.path,
    exclude: this.exclude,
    stack: this.stack,
  };
};

// IO with metadata file
proto_.getPathToDalDir = function (path) {
  path = path || this.path || null;
  return join(path, this.DAL_BASE_DIR_NAME);
};

proto_.getPathToBaseFile = function (path) {
  return join(this.getPathToDalDir(path), this.DAL_BASE_FILE_NAME);
};

proto_.hasBaseFileAt = function (path) {
  return isFile(this.getPathToBaseFile(path));
};

proto_.load = function (path) {
  if (!isAbsolute(path)) path = resolve(path);

  if (!this.hasBaseFileAt(path)) return this;

  this.path = path;
  try {
    return this.constructor(JsonIO.read(this.getPathToBaseFile()));
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  };

  return this;
};

proto_.save = function (path) {
  JsonIO.write(this.getPathToBaseFile(path), this.toObject());
  return this;
};


// @@ export
module.exports = Class
