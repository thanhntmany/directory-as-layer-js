'use strict';
const { statSync, mkdirSync } = require('fs');
const { dirname, join } = require('path');
const { isString } = require('./helper/string-helper');
const { isDirectory } = require('./helper/fs-helper');


// constant
exports.constant = {
  ANCHOR_BASENAME: ".dal"
};


// error
exports.error = {};
exports.error.ERR_FAILED_TO_CONNECT_BASE_DIR = function ERR_FAILED_TO_CONNECT_BASE_DIR(payload) {
  this.code = 'ERR_FAILED_TO_CONNECT_BASE_DIR';
  this.payload = payload;
};

const ERR_FAILED_TO_CONNECT_BASE_DIR = function (payload) {
  this.code = 'ERR_FAILED_TO_CONNECT_BASE_DIR';
  this.payload = payload;
};

const ERR_FAILED_TO_INITIALIZE_NEW_BASE_DIR = function (payload) {
  this.code = 'ERR_FAILED_TO_INITIALIZE_NEW_BASE_DIR';
  this.payload = payload;
};


// main class
const Class = function DALBaseHandler() {
  this.baseDirPath = null;
};

const _proto = Class.prototype;


// @@ class.constant
_proto.ANCHOR_BASENAME = exports.constant.ANCHOR_BASENAME;


// @@ function
_proto.isBaseDir = function (path) {
  return isDirectory(join(path, this.ANCHOR_BASENAME));
};

_proto.connectBaseDir = function (path) {
  if (this.isBaseDir(path)) {
    this.baseDirPath = path;
    return this;
  }
  else throw new ERR_FAILED_TO_CONNECT_BASE_DIR({ "path": path });
};

_proto.findBaseFromDescendantUp = function (fromPath) {
  if (!isString(fromPath)) return undefined;

  var last;
  do {
    if (this.isBaseDir(fromPath)) return fromPath;

    last = fromPath;
    fromPath = dirname(fromPath);
    // At root diectory, dirname will return the same path as it's input.
  } while (fromPath !== last);

  return undefined;
};

_proto.connectBaseFromDescendantUp = function (fromDir) {
  var baseDirPath = this.findBaseFromDescendantUp(fromDir);
  if (!baseDirPath) throw new ERR_FAILED_TO_CONNECT_BASE_DIR({ "fromDescendantPath": path });

  return this.connectBaseDir(baseDirPath);
};

_proto.init = function (payload) {
  if (payload instanceof this.constructor) return payload;

  return this;
};

_proto.initializeNewBaseAtDir = function (dirPath) {
  // if (!isDirectory(dirPath)) throw new 

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
