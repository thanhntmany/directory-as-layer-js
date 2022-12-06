'use strict';
const { mkdirSync } = require('fs');
const { dirname, isAbsolute, join, resolve } = require('path');
const { isDirectory } = require('./helper/fs-helper');


// constant
exports.constant = {
  ANCHOR_BASENAME: ".dal"
};


// error
exports.error = {};
exports.error.ERR_FAILED_TO_CONNECT_BASE_DIR = function ERR_FAILED_TO_CONNECT_BASE_DIR(payload) {
  this.code = this.constructor.name;
  this.payload = payload;
};
exports.error.ERR_FAILED_TO_INITIALIZE_NEW_BASE_DIR = function ERR_FAILED_TO_INITIALIZE_NEW_BASE_DIR(payload) {
  this.code = this.constructor.name;
  this.payload = payload;
};


// main class
const Class = function DALBase() {
  this.baseDirPath = null;
};

const proto_ = Class.prototype;


// @@ class.constant
proto_.ANCHOR_BASENAME = exports.constant.ANCHOR_BASENAME;


// @@ function
proto_.isBaseDir = function (path) {
  return isDirectory(join(path, this.ANCHOR_BASENAME));
};

proto_.connectBaseDir = function (path) {
  if (this.isBaseDir(path)) {
    this.baseDirPath = path;
    return this;
  }
  else throw new ERR_FAILED_TO_CONNECT_BASE_DIR({ "path": path });
};

proto_.findBaseFromDescendantUp = function (fromPath) {
  if (isAbsolute(fromPath)) fromPath = resolve(fromPath);

  var last;
  do {
    if (this.isBaseDir(fromPath)) return fromPath;

    last = fromPath;
    fromPath = dirname(fromPath);
    // At root diectory, dirname will return the same path as it's input.
  } while (fromPath !== last);

  return undefined;
};

proto_.connectBaseFromDescendantUp = function (fromDir) {
  var baseDirPath = this.findBaseFromDescendantUp(fromDir);
  if (!baseDirPath) throw new ERR_FAILED_TO_CONNECT_BASE_DIR({ "fromDescendantPath": path });

  return this.connectBaseDir(baseDirPath);
};

proto_.init = function (payload) {
  if (payload instanceof this.constructor) return payload;

  return this;
};

proto_.initializeNewBaseAtDir = function (dirPath) {
  if (!isDirectory(dirPath)) throw new ERR_FAILED_TO_INITIALIZE_NEW_BASE_DIR({
    'dirPath': dirPath,
    'msg': "It's not a valid directory path"
  });

  try {
    return this.connectBaseDir(dirPath);
  } catch (error) {
    if (!(error instanceof ERR_FAILED_TO_CONNECT_BASE_DIR)) throw error
  };

  // #TODO: refactor this
  mkdirSync(join(dirPath, this.ANCHOR_BASENAME));
  mkdirSync(join(dirPath, this.ANCHOR_BASENAME, "layer"));
  mkdirSync(join(dirPath, this.ANCHOR_BASENAME, "stack"));
  mkdirSync(join(dirPath, this.ANCHOR_BASENAME, "tmp"));
  mkdirSync(join(dirPath, this.ANCHOR_BASENAME, "tmp", "cache"));
  mkdirSync(join(dirPath, this.ANCHOR_BASENAME, "tmp", "session"));

  return this;
};


// @@ export
exports.Class = Class;

exports.create = function () {
  return new this.Class();
};

exports.init = function (...args) {
  var obj = this.create();
  return obj.init.apply(obj, args);
};

exports.initFromDescendant = function (...args) {
  var obj = this.create();
  return obj.connectBaseFromDescendantUp.apply(obj, args);
};

exports.initializeNewBaseAtDir = function (...args) {
  var obj = this.create();
  return obj.initializeNewBaseAtDir.apply(obj, args);
};
