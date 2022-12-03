'use strict';
const path = require('path');
const { isString } = require('./helper/string-helper');


// @@ Main class
var DALLayer = function () {
  this.path = null;
  this.key = null;
};

DALLayer.prototype.load = function (payload) {

  if (isString(payload)) {
    this.path = payload;
    this.key = path.basename(this.path);
  }
  else {
    if (isString(payload.path)) this.path = payload.path;
    if (isString(payload.key)) this.key = payload.key;
  };

  // Make sure the 'path' of DALLayer is always an absolute path.
  // NOTE: The relative path is resolved base on the current working directory.
  if (!path.isAbsolute(this.path)) this.path = path.resolve(this.path);

  return this;
};

DALLayer.prototype.init = function (payload) {
  if (payload instanceof DALLayer) return payload;
  return this.load(payload);
};


// @@ Export
exports.Class = DALLayer;
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
