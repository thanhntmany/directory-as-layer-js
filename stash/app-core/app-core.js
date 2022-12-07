'use strict';
const DALBase = require("./dal-base");
const DALSession = require('./dal-session');
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

proto_.init = function (payload) {
  payload = payload || {};
  var option_ = payload.option || {};

  // init/resume session and make sure data obj is avaliable
  var sessionFilePath = option_.sessionFilePath;
  this.session = DALSession.initFromPathIfExists(sessionFilePath);
  var data_ = this.data_ = this.session.getDataPointer();

  var cwd = data_.cwd = data_.cwd || option_.cwd || process.cwd();
  // init DAL Base at any working directory.
  try {
    this.dalBase = DALBase.initFromDescendant(cwd);
  } catch (error) {
    // init DAL Base error
    // #TODO: Process special errors that are defined by me.
    throw error;
  };

  // # WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP WIP 


};

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
