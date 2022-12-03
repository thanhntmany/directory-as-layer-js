'use strict';
const path = require('path');
const DALLayerStack = require('./dal-layer-stack');
const JSONio = require('./helper/json-io')


// @@ Main class
const Class = function DALHandler() {
  this.stack = DALLayerStack.create();
};

const _proto = Class.prototype;


// @@ class's functions
_proto.loadDAL = function (payload) {
  this.stack.init(payload);
  return this;
};

_proto.init = function (payload) {
  this.loadDAL(payload);
  return this;
};


// @@ Export
exports.Class = Class;

exports.create = function () {
  return new this.Class();
};

exports.init = function (...args) {
  var obj = this.create();
  return obj.init.apply(obj, args);
};
