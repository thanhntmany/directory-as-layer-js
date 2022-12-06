'use strict';
const DalFile = require("./dal-file");
const DALHandler = require('./dal');


// Main Class
const Class = function DALAppCore () {
};

const proto_ = Class.prototype;


// @@ logging
proto_.log = function () {
  console.log.apply(null, arguments)
};

proto_.logError = function () {
  console.error.apply(null, arguments)
};


// @@ functions
proto_.loadDAL = function (payload) {
  this.dal = DALHandler.init(payload);
  return this;
};

proto_.init = proto_.loadDAL;

proto_.initInDir = function (dirPath) {
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
