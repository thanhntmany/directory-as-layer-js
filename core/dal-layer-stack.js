'use strict';
const { isString } = require('./helper/string-helper');
const DALLayer = require('./dal-layer');


// @@ Main class
const Class = function DALLayerStack() {
  this.exclude = [];
  this.layers = [];
  this._key = {};
};

const _proto = Class.prototype;


// @@ class's functions
_proto.refresh_key = function () {

  var _this = this;
  this.layers.forEach(dalLayer => {
    if (isString(dalLayer.key) && isNaN(dalLayer.key)) _this._key[dalLayer.key] = dalLayer;
  });

  // The 'base' key is always point to the first layer.
  this._key['base'] = this.layers[0];
};

_proto.loadLayers = function (payloads) {
  if (!Array.isArray(payloads)) payloads = [];

  this.layers = DALLayer.massInit(payloads);
  this.refresh_key();

  return this;
};

_proto.init = function (payload) {
  this.exclude = payload.exclude || [];
  this.loadLayers(payload.layers);

  return this;
};


// @ Modify stack
_proto.insert = function (...layerPayloads) {
  this.layers.push.apply(this.layers, DALLayer.massInit(layerPayloads));
  return this;
};

_proto.insertAt = function (index, ...layerPayloads) {
  this.layers.splice.apply(this.layers, [index, 0].concat(DALLayer.massInit(layerPayloads)));
  return this;
};

_proto.splice = function (start, deleteCount, ...layerPayloads) {
  return this.layers.splice.apply(this.layers, [start, deleteCount].concat(DALLayer.massInit(layerPayloads)));
};


// @@ Export
exports.Class = Class;

exports.create = function () {
  return new this.Class();
};

exports.init = function (payload) {
  return this.create().init(payload)
};
