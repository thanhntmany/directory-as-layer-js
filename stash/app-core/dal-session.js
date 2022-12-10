'use strict';


// Main Class
const Class = function DALSession(payload) {
  this.data = payload || {};
  this.file = null;
};

const proto_ = Class.prototype;


// @@ functions
proto_.initFromPathIfExists = function (file) {
  // #TODO:
  this.file = file || this.file;
  var payload = {"file": file};
  return this.init(payload);
};

proto_.init = function (payload) {
  this.data = payload || {};
  return this;
};

proto_.getDataPointer = function () {
  return this.data;
};

proto_.loadFromPath = function (file) {
  // #TODO:
  this.file = file || this.file;
  this.data = {};
  return this;
};

proto_.saveToPath = function (file) {
  // #TODO:
  file = this.file || file;
  console.log(this.data);
  return this;
};

// @@ Export
exports.Class = Class;

exports.create = function (payload) {
  return new this.Class(payload);
};

exports.initFromPathIfExists = function (...args) {
  var obj = this.create();
  return obj.initFromPathIfExists.apply(obj, args);
};

exports.init = function (...args) {
  var obj = this.create();
  return obj.init.apply(obj, args);
};
