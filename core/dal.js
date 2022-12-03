'use strict';
const path = require('path');
const DALLayerStack = require('./dal-layer-stack');
const JSONio = require('./helper/json-io')


// @@ Main class
var DALHandler = function () {
  this.anchorDir = null;
  this.stack = DALLayerStack.create();
};

DALHandler.prototype.loadDAL = function (payload) {
  this.stack.init(payload);
  return this;
};

DALHandler.prototype.loadDALFileAsync = function (file, callback) {
  if (typeof callback !== 'function') callback = () => { };

    // #TODO: process err
    JSONio.loadJSONAsync(file, (err, payload) => {

    if (!payload.anchorDir) payload.anchorDir = path.dirname(path.resolve(file));
    this.loadDAL(payload);

    callback(this);
  });

};

DALHandler.prototype.init = function (payload) {
  if (!payload.anchorDir) payload.anchorDir = process.cwd();
  this.loadDAL(payload);
  return this;
};

DALHandler.prototype.initAsync = DALHandler.prototype.loadDALFileAsync;


// @@ Export
exports.DALHandler = DALHandler;

exports.init = function (...args) {
  var obj = new DALHandler();
  return obj.init.apply(obj, args);
};

exports.initAsync = function (...args) {
  var obj = new DALHandler();
  return obj.initAsync.apply(obj, args);
};
