'use strict';
const { dirname, isAbsolute, join, resolve } = require('path');
const JSONio = require('./helper/json-io')
const { isString } = require('./helper/string-helper');


// @@ Constant
const Constant = {};
Constant.DALRELATIVEPATH = ".dal.json"


// Error
function DALFileNotFound(...args) {
  this.action = args.pop() || "Error in DALFileHandler";
  this.message = args.pop();
  this.code = 'DALFileNotFound';
};

function DALLayerPayloadProcessingFailed(...args) {
  this.error = args.pop();
  this.code = 'DALLayerPayloadProcessingFailed';
};

const _Error = {};
_Error.DALFileNotFound = DALFileNotFound;
_Error.DALLayerPayloadProcessingFailed = DALLayerPayloadProcessingFailed;


// Main Class
const Class = function DALFileHandler() {
  this.payload = null;
  this.file = null;
};

const proto_ = Class.prototype;


// @@ Class's Constants
proto_.DALRELATIVEPATH = Constant.DALRELATIVEPATH;


// @@ functions
proto_.standardize = function () {

  // In case attribute '.file' is a path.
  if (isString(this.file)) {
    var anchorDir = dirname(this.file);

    this.payload.stack = this.payload.stack.map(
      layerPayload => {

        var obj = {};

        if (isString(layerPayload)) { obj.path = layerPayload }
        else {
          // Processing like as a pure Js Object.
          if (isString(layerPayload.path)) obj.path = layerPayload.path;
          if (isString(layerPayload.key)) obj.key = layerPayload.key;
        };

        if (isString(obj.path)) {
          // Make sure the 'path' of Class is always an absolute path.
          if (!isAbsolute(obj.path)) obj.path = resolve(join(anchorDir, obj.path));
        }
        else throw new _Error.DALLayerPayloadProcessingFailed({
          "failedProcessedlayerPayload": layerPayload,
          "fromFile": this.file
        });

        return obj;
      },
      this
    );

  };

  return this
};

proto_.save = function (file) { };// #TODO
proto_.saveTo = function (file) { };// #TODO

proto_.load = function (file) {
  try {
    this.payload = JSONio.loadJSON(file);
    // If loadJSON throws error, the process will break here, 'payload' and 'file' attribute won't be changed.
    this.file = file;
    return this
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new DALFileNotFound(`DAL file '${file}' not found!!`, 'load');
    }
    else throw error;
  };
};

proto_.loadDALOfDirectory = function (dirPath) {
  return this.load(join(dirPath, this.DALRELATIVEPATH))
};

proto_.findUpAndLoadDALFromDir = function (fromDir) {

  var _fromDir;
  while (!this.payload) {
    try {
      return this.loadDALOfDirectory(fromDir);
    } catch (error) {

      if (error instanceof DALFileNotFound) {
        _fromDir = dirname(fromDir);

        // Throw error if reach the root directory. (for both windows and posix platform)
        if (_fromDir === fromDir) throw new DALFileNotFound(`DAL file '${this._DALRELATIVEPATH}' not found in ancestor directories from this working directory: ${process.cwd()}`, "findUpAndLoadDALFromDir");

        fromDir = _fromDir;
        // continue;
      }
      else throw error;
    };
  };

  return this;
};


// @@ Export
exports.Class = Class;
exports.Constant = Constant;
exports.Error = _Error;

exports.create = function () {
  return new this.Class();
};

exports.loadDALOfDirectory = function (...args) {
  var obj = this.create();
  return obj.loadDALOfDirectory.apply(obj, args);
};

exports.findUpAndLoadDALFromDir = function (fromDir) {
  return this.create().findUpAndLoadDALFromDir(fromDir);
};
