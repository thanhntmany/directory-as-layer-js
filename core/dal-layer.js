'use strict';
const path = require('path');
const { isString } = require('./helper/string-helper');


// @@ Main class
const Class = function DALLayer() {
  this.path = null;
  this.key = null;
};

const _proto = Class.prototype;


// @@ class's functions
_proto.load = function (payload) {
  this.path = payload.path;
  if (isString(payload.key)) {
    this.key = payload.key;
  };
  // else {
  //   try {}
  // };
  return this;
};

_proto.init = function (payload) {
  if (payload instanceof Class) return payload;
  return this.load(payload);
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

exports.massInit = function (payloads) {
  return payloads.map(this.init, this);
};
