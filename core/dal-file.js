'use strict';
const { dirname, join } = require('path');
const JSONio = require('./helper/json-io')
const { isString } = require('./helper/string-helper');


// Error
function DALFileNotFound(...args) {
  this.action = args.pop() || "Error in DALFileHandler";
  this.message = args.pop();
  this.code = 'DALFileNotFound';
  console.trace('DALFileNotFound');
};


// Main Class
const Class = function DALFileHandler() {
  this.payload = null;
  this.file = null;
};

const _proto = Class.prototype;


// @@ constants
_proto.DALRELATIVEPATH = ".dal.json";


// @@ functions
_proto.load = function (file) {
  this.payload = JSONio.loadJSON(file);
  // If loadJSON throws error, the process will break here, 'payload' and 'file' attribute won't be changed.
  this.file = file;
  return this
};

_proto.findUpAndLoadDALFromDir = function (fromDir) {
  var _DALRELATIVEPATH = this.DALRELATIVEPATH;

  var fromDir = fromDir || process.cwd(), _fromDir;
  while (!this.payload) {
    try {

      this.load(join(fromDir, _DALRELATIVEPATH));
      return this;

    } catch (error) {

      if (error.code === 'ENOENT') {
        _fromDir = dirname(fromDir);
        // Throw error if reach the root directory. (for both windows and posix platform)
        if (_fromDir === fromDir) throw new DALFileNotFound(`DAL file '${_DALRELATIVEPATH}' not found in ancestor directories from this working directory:\n  ${process.cwd()}`);

        fromDir = _fromDir;
        // continue;
      }
      else throw error;

    };
  };

  return this;
};

// #TODO:
_proto.save = function (file) {};
_proto.saveTo = function (file) {};

_proto.standardize = function() {

  // In case attribute '.file' is a path.
  if (isString(this.file)) {
    // Make sure the 'path' of Class is always an absolute path.
    // NOTE: The relative path is resolved base on the current working directory.
    if (!path.isAbsolute(this.path)) this.path = path.resolve(this.path);
  };

};

// @@ Export
exports.Class = Class;

exports.DALRELATIVEPATH = _proto.DALRELATIVEPATH;
exports.DALFileNotFound = DALFileNotFound;

exports.create = function () {
  return new this.Class();
};

exports.findUpAndLoadDALFromDir = function(fromDir) {
  return this.create().findUpAndLoadDALFromDir(fromDir);
};
