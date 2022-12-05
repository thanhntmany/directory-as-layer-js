'use strict';
const AppCore = require("./app-core");
const DALBaseHandler = require("./dal-base-handler");
const { isString } = require('./helper/string-helper');


// @@ Main Class
const Class = function DALAppCli() {
  this.option = {};
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
_proto.initDalBase = function (options) {
  options = options || {};
  this.cwd = options.cwd || process.cwd();
  this.dalBase = DALBaseHandler.initFromDescendant(this.cwd);
  return this;
};

_proto.init = function (options) {
  return this;
};

_proto.parse = function (argv) {
  /*
    dal
    [options]      : Always starts with "-"
    <command>      : Does not start with "-"
    [command args] : Placed after command (the rest)
  */
  var _cmdRest = this.cmdRest = Array.isArray(argv) ? argv.slice() : [];
  var _option = this.option;

  // parse options
  var token, t, i, key, value;
  if (!isString(token = _cmdRest.shift())) return this;
  while (token.startsWith("-")) {

    if (token.startsWith("--")) {
      t = token.slice(2).split("=");
      key = t[0];

      if (key.length > 0) {
        value = t[1];
        _option[key] = value !== undefined ? value : true;
      };
    }
    else {
      token = token.slice(1);
      key = token;

      i = _cmdRest.findIndex(t => t.startsWith("-"));
      if (i === 0) {
        _option[key] = true;
      }
      else if (i > 0) {
        _option[key] = _cmdRest.splice(0, i);
      }
      else {
        _option[key] = _cmdRest.splice(0, _cmdRest.length);
      };

    };

    if (!isString(token = _cmdRest.shift())) return this;
  };

  // parse command
  this.cmdName = token;

  return this;
};

_proto.compgen = function (payload) {
  this.parse(payload);

};

_proto.run = function () {
  return this;
};

_proto.exec = function (argv) {
  this.initDalBase()

  return this.parse(argv).run();
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

exports.exec = function (...args) {
  var obj = this.create();
  return obj.exec.apply(obj, args);
};

exports.compgen = function (...args) {
  var obj = this.create();
  return obj.compgen.apply(obj, args);
};
