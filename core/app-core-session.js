'use strict';


const Class = module.exports = function DALAppCoreSession(payload) {
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
  // #TODO:
  file = this.file || file;
  console.log(this.data);
  return this;
};
