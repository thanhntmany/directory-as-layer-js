'use strict';
const DalFile = require("./dal-file");
const MainApp = require("./mainApp");


// @@ Main Class
const Class = function AppCli() {
};

const _proto = Class.prototype;


// @@ Logging
_proto.log = function () {
  console.log.apply(null, arguments)
};

_proto.logError = function () {
  console.error.apply(null, arguments)
};


// @@ Functions
_proto.init = function (options) {
  options = options || {};
  this.cwd = options.cwd || process.cwd();

  // #TODO: try-catch, if DALFileNotFound
  // this.dalFile = DalFile.findUpAndLoadDALFromDir(this.cwd);
  this.app = MainApp.initInDir(this.cwd);

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
