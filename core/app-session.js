'use strict';


const Class = module.exports = function DALAppCoreSession(payload) {
  console.log("@@ Init Session.");
  this.data = payload || {};
  this.file = null;

  return this;
};

const proto_ = Class.prototype;


// @@ function
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
  console.log("@@ Persit Session.");
  // #TODO:
  file = this.file || file;
  console.log(this.data);
  return this;
};

proto_.save = function () {
  return this.saveToPath(this.file);
};
