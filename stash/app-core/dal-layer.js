'use strict';
const { isString } = require('./helper/string-helper');
const DalFile = require("./dal-file");


// @@ Main class
const Class = function DALLayer() {
  this.path = null;
};

const proto_ = Class.prototype;


// @@ function
proto_.load = function (payload) {
  this.path = payload.path;
  if (isString(payload.key)) this.key = payload.key;
  return this;
};

proto_.init = function (payload) {
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
