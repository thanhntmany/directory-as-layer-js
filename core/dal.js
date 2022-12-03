'use strict';
const { isString } = require('./helper/string-helper');
const DALLayer = require('./dal-layer');


// @@ Main class
const Class = function DALHandler() {
  this.exclude = [];
  this.stack = [];
  this._key = {};
};

const _proto = Class.prototype;


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


// @@ class's functions
_proto.refresh_key = function () {

  var _this = this;
  this.stack.forEach((dalLayer, index) => {
    if (isString(dalLayer.key) && isNaN(dalLayer.key)) _this._key[dalLayer.key] = index;
  });

  // The 'base' key is always point to the first layer.
  this._key['base'] = 0;
};

_proto.loadLayers = function (layersPayload) {
  if (!Array.isArray(layersPayload)) layersPayload = [];

  this.stack = DALLayer.massInit(layersPayload);
  this.refresh_key();

  return this;
};


_proto.loadDAL = function (payload) {
  if (Array.isArray(payload.exclude)) this.exclude = payload.exclude;
  this.loadLayers(payload.stack);
  return this;
};

_proto.init = function (payload) {
  this.loadDAL(payload);
  return this;
};


// @@ Export
exports.Class = Class;

exports.create = function () {
  return new this.Class();
};

exports.init = function (...args) {
  var obj = this.create();
  return obj.init.apply(obj, args);
};
