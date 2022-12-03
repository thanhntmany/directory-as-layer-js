'use strict';
const { isString } = require('./helper/string-helper');
const DALLayer = require('./dal-layer');


// @@ Main class
const Class = function DALStack() {
  this.exclude = [];
  this.stack = [];
  this._key = {};
};

const _proto = Class.prototype;


// @@ class's functions
_proto.refresh_key = function () {

  var _this = this;
  this.stack.forEach(dalLayer => {
    if (isString(dalLayer.key) && isNaN(dalLayer.key)) _this._key[dalLayer.key] = dalLayer;
  });

  // The 'base' key is always point to the first layer.
  this._key['base'] = this.stack[0];
};

_proto.loadLayers = function (payloads) {
  if (!Array.isArray(payloads)) payloads = [];

  this.stack = DALLayer.massInit(payloads);
  this.refresh_key();

  return this;
};

_proto.init = function (payload) {
  this.exclude = payload.exclude || [];
  this.loadLayers(payload.stack);

  return this;
};


// @ Modify stack
_proto.insert = function (...layerPayloads) {
  this.stack.push.apply(this.stack, DALLayer.massInit(layerPayloads));
  return this;
};

_proto.insertAt = function (index, ...layerPayloads) {
  this.stack.splice.apply(this.stack, [index, 0].concat(DALLayer.massInit(layerPayloads)));
  return this;
};

_proto.splice = function (start, deleteCount, ...layerPayloads) {
  return this.stack.splice.apply(this.stack, [start, deleteCount].concat(DALLayer.massInit(layerPayloads)));
};


// @@ Export
exports.Class = Class;

exports.create = function () {
  return new this.Class();
};

exports.init = function (payload) {
  return this.create().init(payload)
};
