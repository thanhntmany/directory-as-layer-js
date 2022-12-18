'use strict';
const { dirname, join, resolve } = require('path');
const { isDirectory } = require('../helper/fs-helper');


// @@ Main class
const Class = function AnchorDir(payload) {
  if (!payload) payload = {};

  if (payload.anchorDir) {
    this.anchorDir = resolve(payload.anchorDir);
  }
  else if (!this.anchorDir) this.anchorDir = process.cwd();

  if (payload.dalPath) {
    this.dalPath = resolve(payload.dalPath);
  }
  else if (!this.dalPath) this.dalPath = join(this.anchorDir, '.dal');;

  if (payload.stackPath) this.stackPath = resolve(payload.stackPath);
  if (payload.baseLayerPath) this.baseLayerPath = resolve(payload.baseLayerPath);

  return this;
};

const proto_ = Class.prototype;


// @@ function
proto_.getStackPath = function () {
  return this.stackPath
    || (this.stackPath = join(this.dalPath, "dal-stack.json"));
};

proto_.getBaseLayerPath = function () {
  return this.baseLayerPath
    || (this.baseLayerPath = join(this.dalPath, "dal-layer.json"));
};


// @@ export
exports.Class = Class;

exports.load = function (payload, instance) {
  return instance instanceof this.Class
    ? instance.constructor(payload)
    : new this.Class(payload);
};

exports.loadFromUp = function (fromDir, payload, instance) {
  if (!fromDir) fromDir = process.cwd();

  var anchorDir = fromDir, last;
  do {
    if (isDirectory(join(fromDir, ".dal"))) {
      anchorDir = fromDir;
      break;
    };

    last = fromDir;
    fromDir = dirname(fromDir);
  } while (fromDir !== last);

  if (!payload) payload = {};
  payload.anchorDir = anchorDir;

  return this.load(payload, instance);
};

exports.initAt = function (path) {
  if (!path) path = process.cwd();
  return this.load({
    anchorDir: path
  });
};
