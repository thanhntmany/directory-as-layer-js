'use strict';


exports.isString = function (obj) {
  return typeof obj === 'string' || obj instanceof String;
};
