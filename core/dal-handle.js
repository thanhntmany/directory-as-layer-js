'use strict';
const DALStack = require("./dal-stack");


// @@ Main class
const Class = function DALHandle(payload) {
  if (!payload) payload = {};

  if ('externalKey' in payload) {
    this.externalKey = payload.externalKey;
  };

  if ('stack' in payload) {
    this.stack = new DALStack(
      Array.isArray(payload.stack) ? payload.stack : []
    );
  };

  return this;
};

const proto_ = Class.prototype;


// @@ class function


// @@ export
module.exports = Class
