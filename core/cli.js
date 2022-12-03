'use strict';
const path = require('path');
const mainApp = require("./mainApp");
const JSONio = require('./helper/json-io')




// @@ Main AppCli
const AppCli = function () {
};
AppCli.prototype.DALRELATIVEPATH = exports.DALRELATIVEPATH = ".dal.json";
var DALNotFound                  = exports.DALNotFound     = function(message) {
  this.message = message;
  this.code = 'DALNotFound';
  this.action = 'findUpAndLoadDAL';
  console.trace('DALNotFound');
};


// @@ Logging
AppCli.prototype.log = function () {
  console.log.apply(null, arguments)
};

AppCli.prototype.logError = function () {
  console.error.apply(null, arguments)
};


// @@
AppCli.prototype.loadDAL = function (file) {
  this.data = JSONio.loadJSONSync(path.join(fromDir, _DALRELATIVEPATH));
  return this
};

AppCli.prototype.findUpAndLoadDAL = function (fromDir) {
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

AppCli.prototype.initAsync = function (options, callback) {
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
exports.AppCli = AppCli;
exports.initAsync = function (...args) {
  var callback = args.pop();
  var options = args.pop();

  var appCli = new AppCli();
  return appCli.initAsync(options, callback);
};
