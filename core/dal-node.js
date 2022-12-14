'use strict';
const { isAbsolute, join, resolve } = require('path');
const DALLayer = require("./dal-layer");
const JsonIO = require("../helper/json-io");
const { isDirectory } = require("../helper/fs-helper");


// @@ Main class
const Class = function DALBase(payload) {

  this.layer = new DALLayer(payload);
  this.stack = Array.isArray(payload.stack) ? payload.stack : [];

  return this;
};

const proto_ = Class.prototype;


// @@ class constant
proto_.DAL_BASE_DIR_NAME = ".dal";
proto_.DAL_METADATA_FILE_NAME = "base.json";


// @@ class function
proto_.toObject = function () {
  return {
    path: this.path,
    exclude: this.exclude,
    stack: this.stack,
  };
};

// IO with metadata file
proto_.getPathToBaseDir = function (path) {
  path = path || this.path || null;
  return join(path, this.DAL_BASE_DIR_NAME);
};

proto_.getPathToMetadataFile = function (path) {
  return join(this.getPathToBaseDir(path), this.DAL_METADATA_FILE_NAME);
};

proto_.hasBaseDirAt = function (path) {
  return isDirectory(this.getPathToBaseDir(path));
};

proto_.load = function (path) {
  if (!isAbsolute(path)) path = resolve(path);

  if (!this.hasBaseDirAt(path)) return this;

  this.path = path;
  try {
    return this.constructor(JsonIO.read(this.getPathToMetadataFile()));
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  };

  return this;
};

proto_.save = function (path) {
  JsonIO.write(this.getPathToMetadataFile(path), this.toObject());
  return this;
};


// @@ export
module.exports = Class
