'use strict';
const path = require('path');
const mainApp = require("./mainApp");
const JSONio = require('./helper/json-io')


// @@ Main AppCli
const Class = function AppCli () {
};

const _proto = Class.prototype;


_proto.DALRELATIVEPATH = exports.DALRELATIVEPATH = ".dal.json";
var DALNotFound                  = exports.DALNotFound     = function(message) {
  this.message = message;
  this.code = 'DALNotFound';
  this.action = 'findUpAndLoadDAL';
  console.trace('DALNotFound');
};


// @@ Logging
_proto.log = function () {
  console.log.apply(null, arguments)
};

_proto.logError = function () {
  console.error.apply(null, arguments)
};


// @@
_proto.loadDAL = function (file) {
  this.data = JSONio.loadJSONSync(path.join(fromDir, _DALRELATIVEPATH));
  return this
};

_proto.findUpAndLoadDAL = function (fromDir) {
  var _DALRELATIVEPATH = this.DALRELATIVEPATH;

  var dalPath, data, fromDir = fromDir || process.cwd(), _fromDir;
  var _join = path.join, _dirname = path.dirname;
  while (!data) {
    try {
      dalPath = _join(fromDir, _DALRELATIVEPATH);
      data = JSONio.loadJSONSync(dalPath);

      this.dalPath = dalPath;
      this.dalData = data;
      return this;

    } catch (error) {
      if (error.code === 'ENOENT') {
        _fromDir = _dirname(fromDir);

        // Break if reach the root directory. (for both windows and posix platform)
        if (_fromDir === fromDir) {
          this.dalPath = null;
          this.dalData = null;

          throw new DALNotFound(`DAL file '${_DALRELATIVEPATH}' not found!!`);
        };
        fromDir = _fromDir;
      }
      else throw error;
    };
  };

  return this;
};

_proto.initAsync = function (options, callback) {
  options = options || {};
  this.cwd = options.cwd || process.cwd();

  this.findUpAndLoadDAL(this.cwd);
  mainApp.initAsync(this.dalPath, app => {
    this.app = app;
    callback(this);
  });
  return this
};

// @@ Export
exports.Class = Class;

exports.create = function () {
  return new this.Class();
};

exports.initAsync = function (...args) {
  var callback = args.pop();
  var options = args.pop();

  var obj = this.create();
  return obj.initAsync(options, callback);
};
