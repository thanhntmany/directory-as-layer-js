'use strict';
const DALLayer = require('./dal-layer');
const JSONio = require('./helper/json-io')


// @@ Main class
var DALHandler = function () { };

DALHandler.prototype.loadDALRaw = function (dalRawObject) {
  var rawLayers = dalRawObject.layers;
  if (!Array.isArray(rawLayers)) rawLayers = [];

  var layers = rawLayers
    .map(rawLayerPayload => DALLayer.init(rawLayerPayload));

  this.layers = layers;
};

DALHandler.prototype.loadDALFileAsync = function (file, callback) {
  if (typeof callback !== 'function') callback = () => { };

  JSONio.loadJSONAsync(file, (err, obj) => {
    this.loadDALRaw(obj);
    callback(this);
  });

};

DALHandler.prototype.initAsync = DALHandler.prototype.loadDALFileAsync;


exports.DALHandler = DALHandler;
exports.initAsync = function (...args) {
  var obj = new DALHandler();
  return obj.initAsync.apply(obj, args);
};
