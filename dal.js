'use strict';
const path = require('path');
const DALLayerStack = require('./core/dal-layer-stack');
const DALLayer = require('./core/dal-layer');
const JSONio = require('./core/helper/json-io')


// @@ Main class
var DALHandler = function () {
  this.stack = DALLayerStack.create();
};

DALHandler.prototype.loadDALFileAsync = function (file, callback) {
  if (typeof callback !== 'function') callback = () => { };

  JSONio.loadJSONAsync(file, (err, payload) => {
    if (!payload.anchorDir) payload.anchorDir = path.dirname(path.resolve(file));

    this.stack.init(payload);

    callback(this);
  });

};

DALHandler.prototype.initAsync = DALHandler.prototype.loadDALFileAsync;


exports.DALHandler = DALHandler;
exports.initAsync = function (...args) {
  var obj = new DALHandler();
  return obj.initAsync.apply(obj, args);
};
