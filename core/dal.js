'use strict';
const path = require('path');
const DALLayerStack = require('./dal-layer-stack');
const JSONio = require('./helper/json-io')


// @@ Main class
const Class = function DALHandler() {
  this.anchorDir = null;
  this.stack = DALLayerStack.create();
};

const _proto = Class.prototype;


// @@ class's functions
_proto.loadDAL = function (payload) {
  this.stack.init(payload);
  return this;
};

_proto.loadDALFileAsync = function (file, callback) {
  if (typeof callback !== 'function') callback = () => { };

  // #TODO: process err cases
  JSONio.loadJSONAsync(file, (err, payload) => {

    if (!payload.anchorDir) payload.anchorDir = path.dirname(path.resolve(file));
    this.loadDAL(payload);

    callback(this);
  });

};

_proto.init = function (payload) {
  if (!payload.anchorDir) payload.anchorDir = process.cwd();
  this.loadDAL(payload);
  return this;
};

_proto.initAsync = _proto.loadDALFileAsync;


// @@ Export
exports.Class = Class;

exports.create = function () {
  return new this.Class();
};

exports.init = function (...args) {
  var obj = this.create();
  return obj.init.apply(obj, args);
};

exports.initAsync = function (...args) {
  var obj = this.create();
  return obj.initAsync.apply(obj, args);
};
