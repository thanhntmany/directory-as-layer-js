'use strict';
const { dirname, join, resolve } = require('path');
const { isDirectory } = require('../helper/fs-helper');
const { isString } = require('../helper/string-helper');


// @@ Main class
const Class = function AnchorDir(payload) {
  this.anchorDir = process.cwd();
  this.dalPath = join(this.anchorDir, ".dal");
  this.stackPath = undefined;
  this.baseLayerPath = undefined;

  if (!payload) payload = {};
  if (isString(payload)) payload = { anchorDir: payload };
  this.load(payload);
  return this;
};

const proto_ = Class.prototype;


// @@ function
proto_.load = function (payload) {
  if (!payload) return this;
  if (isString(payload)) payload = { anchorDir: payload };

  if (payload.anchorDir) {
    this.anchorDir = resolve(payload.anchorDir);
    if (!payload.dalPath) this.dalPath = join(this.anchorDir, ".dal");;
  };
  if (payload.dalPath) this.dalPath = resolve(payload.dalPath);
  if (payload.stackPath) this.stackPath = resolve(payload.stackPath);
  if (payload.baseLayerPath) this.baseLayerPath = resolve(payload.baseLayerPath);

  return this;
};

proto_.anchorDirFindUp = function (fromDir) {
  if (!fromDir) fromDir = this.anchorDir;

  var anchorDir = fromDir, last;
  do {
    if (isDirectory(join(fromDir, ".dal"))) {
      anchorDir = fromDir;
      break;
    };

    last = fromDir;
    fromDir = dirname(fromDir);
  } while (fromDir !== last);
  this.anchorDir = anchorDir;
  this.dalPath = join(this.anchorDir, ".dal");

  return this;
};

proto_.getStackPath = function () {
  return this.stackPath || (this.stackPath = join(this.dalPath, "dal-stack.json"));
};

proto_.getBaseLayerPath = function () {
  return this.baseLayerPath || (this.baseLayerPath = join(this.dalPath, "dal-layer.json"));
};


// @@ export
module.exports = Class;