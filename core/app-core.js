'use strict';
const DalFile = require("./dal-file");
const DALHandler = require('./dal');


// Main Class
const Class = function DALAppCore () {
};

const _proto = Class.prototype;


// @@ logging
_proto.log = function () {
  console.log.apply(null, arguments)
};

_proto.logError = function () {
  console.error.apply(null, arguments)
};


// @@ functions
_proto.loadDAL = function (payload) {
  this.dal = DALHandler.init(payload);
  return this;
};

_proto.init = _proto.loadDAL;

_proto.initInDir = function (dirPath) {
  // dalFile must be standardized before processing.
  this.dalFile = DalFile.findUpAndLoadDALFromDir(dirPath).standardize();
  this.loadDAL(this.dalFile.payload);
  return this;
};


// @@ Export
exports.Class = Class;

exports.create = function () {
  return new this.Class();
};

exports.init = function (payload) {
  return this.create().init(payload)
};

exports.initInDir = function (...args) {
  var obj = this.create();
  return obj.initInDir.apply(obj, args);
};
