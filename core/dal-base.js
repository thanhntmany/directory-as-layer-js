'use strict';
const DALStack = require("./dal-stack");


// @@ Main class
const Class = function DALBase(payload) {
  if (!payload) payload = {};

  this.externalKey = payload.externalKey;
  this.stack = new DALStack(
    Array.isArray(payload.stack) ? payload.stack : []
  );

  return this;
};

const proto_ = Class.prototype;


// @@ class function


// @@ export
module.exports = Class
