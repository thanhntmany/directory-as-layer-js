'use strict';
const { dirname, isAbsolute, join } = require("path");
const DALLayer = require("./dal-layer");
const JsonIO = require("../helper/json-io");
const { isString } = require("../helper/string-helper");


// @@ Main class
const Class = function DALStack(payload) {
  this.layers = [];

  return this.load(payload);
};

const proto_ = Class.prototype;


// @@ function
proto_.load = function (payload) {
  if (isString(payload)) return this.loadFromFile(payload);

  if (!payload) payload = {};
  if (Array.isArray(payload.layers)) {
    this.layers = payload.layers.map(
      layerPayload => new DALLayer(layerPayload)
    );
  };

  return this;
};

proto_.loadFromFile = function (path) {
  var anchorDir = dirname(path);
  var payload = JsonIO.read(path);
  // #TODO: error ENOENT

  if (Array.isArray(payload.layers)) {
    payload.layers = payload.layers.map(obj => {
      if (isString(obj) && !isAbsolute(obj)) return join(anchorDir, obj);
      if (!isAbsolute(obj.path)) obj.path = join(anchorDir, obj.path);
      return obj;
    })
  };

  return this.load(payload);
};

proto_.insert = function (layerPayload, index) {
  this.layers.splice(index, 0, DALLayer.load(layerPayload));

  return this;
};

proto_.get = function (key) {
  // #TODO:
  return null;
};


// @@ export
module.exports = Class;
