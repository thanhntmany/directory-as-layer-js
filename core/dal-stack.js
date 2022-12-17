'use strict';
const { isString } = require('../helper/string-helper');


// @@ Main class
const Class = function DALStack(payload) {
  if (!payload) payload = {};

  this.layers = payload.layers || [];

  return this;
};

const proto_ = Class.prototype;


// @@ export
exports.Class = Class;
exports.load = function (payload, instance) {
  return instance instanceof this.Class
    ? instance.constructor(payload)
    : new this.Class(payload);
};
