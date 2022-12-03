'use strict';
const DALHandler = require('./dal');


// Main Class
const Class = function App () {
};

const _proto = Class.prototype;


// @@ Logging
_proto.log = function () {
  console.log.apply(null, arguments)
};

_proto.logError = function () {
  console.error.apply(null, arguments)
};


// @@ Load DAL
_proto.init = function (payload) {
  this.dal = DALHandler.init(payload);
  return this;
};

_proto.initAsync = function (file, callback) {
  DALHandler.initAsync(file, (dalHandler) => {
    this.dal = dalHandler;
    callback(this);
  });
};


// @@ Export
exports.Class = Class;

exports.create = function () {
  return new this.Class();
};

exports.initAsync = function (file, callback) {
  var obj = this.create();
  obj.initAsync(file, callback);
};
