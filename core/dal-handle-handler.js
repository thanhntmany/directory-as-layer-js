'use strict';
const { dirname, isAbsolute, join, resolve } = require('path');
const DALHandle = require("./dal-handle");
const { isSubdirectory, isFile } = require("../helper/fs-helper");
const JsonIO = require("../helper/json-io");
// @@ NOTE: This is a singleton module!!


// @@ Export
// constant
exports.DAL_HANDLE_DIR_NAME = ".dal";
exports.DAL_STACK_FILE_NAME = "stack.json";


// function
exports.Class = DALHandle;
exports.init = function (payload) {
  return new DALHandle(payload);
};

exports.initBaseAt = function (path) {
  var obj = this.init();
  obj.basePath = path;
  return obj;
};


// @@ getting and caching
exports.cache = {};

exports.clearCache = function () {
  this.cache = {};
  return this;
};

exports.getHandleAt = function (path) {
  if (!isAbsolute(path)) path = resolve(path);
  return path in this.cache
    ? this.cache[path]
    : this.cache[path] = this.initBaseAt(path);
};

exports.getBaseOf = function (path) {
  return this.getHandleAt(this.getBasePathOf(path));
};
