'use strict';
const { isString } = require('../helper/string-helper');


// @@ Main class
const Class = function DALStack(payload) {
  this.layers = Array.isArray(payload) ? payload : [];
  return this;
};

const proto_ = Class.prototype;


// @@ function


// @@ export
module.exports = Class
