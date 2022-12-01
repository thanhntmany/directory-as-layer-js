'use strict';
const { isString } = require('./helper/string-helper');
const DALLayer = require('./dal-layer');


// @@ Main class
var DALLayerStack = function () {
  this.anchorDir = null;
  this.layers = [];
  this._key = {};
};

DALLayerStack.prototype.refresh_key = function () {

  var _this = this;
  this.layers.forEach(dalLayer => {
    if (isString(dalLayer.key) && isNaN(dalLayer.key)) _this._key[dalLayer.key] = dalLayer;
  });

  // The 'base' key is always point to the first layer.
  this._key['base'] = this.layers[0];
};

DALLayerStack.prototype.loadLayers = function (rawLayers) {
  if (!Array.isArray(rawLayers)) rawLayers = [];

  this.layers = DALLayer.massInit(rawLayers, this.anchorDir);
  this.refresh_key();

  return this;
};

DALLayerStack.prototype.init = function (payload) {
  this.anchorDir = payload.anchorDir || process.cwd();
  this.loadLayers(payload.layers);

  return this;
};


// @@ Modify stack
DALLayerStack.prototype.insert = function (...payloads) {
  this.layers.push.apply(this.layers, DALLayer.massInit(payloads, this.anchorDir));
  return this;
};

DALLayerStack.prototype.insertAt = function (index, ...payloads) {
  this.layers.splice.apply(this.layers, [index, 0].concat(DALLayer.massInit(payloads, this.anchorDir)));
  return this;
};

DALLayerStack.prototype.splice = function (start, deleteCount, ...payloads) {
  return this.layers.splice.apply(this.layers, [start, deleteCount].concat(DALLayer.massInit(payloads, this.anchorDir)));
};


// @@ Export
exports.DALLayerStack = DALLayerStack;
exports.create = function () {
  return new this.DALLayerStack();
};
exports.init = function (payload) {
  return this.create().init(payload)
};
