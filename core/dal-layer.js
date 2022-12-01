'use strict';
const path = require('path');
const { isString } = require('./helper/string-helper');


// @@ Main class
var DALLayer = function () { };


DALLayer.prototype.load = function (payload, anchorDir) {

  if (isString(payload.anchorDir)) {
    anchorDir = payload.anchorDir;
  }
  else if (!isString(anchorDir)) anchorDir = process.cwd();

  if (isString(payload)) {
    this.path = payload;
  }
  else {
    if (isString(payload.path)) this.path = payload.path;
    if (isString(payload.key)) this.key = payload.key;
  };

  // Make sure the 'path' of DALLayer is always an absolute path.
  this.path = path.resolve(path.join(anchorDir, this.path));

  return this;
};

DALLayer.prototype.init = function (payload, anchorDir) {
  if (payload instanceof DALLayer) return payload;
  return this.load(payload, anchorDir);
};


exports.DALLayer = DALLayer;
exports.init = function (...args) {
  var obj = new DALLayer();
  return obj.init.apply(obj, args)
};
exports.massInit = function (payloads, anchorDir) {
  return payloads.map(payload => this.init(payload, anchorDir))
};
