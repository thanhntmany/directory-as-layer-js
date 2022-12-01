'use strict';


// @@ Helper
function isString(obj) {
  return typeof obj === 'string' || obj instanceof String;
};

// @@ Main class
var DALLayer = function () { };

DALLayer.prototype.load = function (payload) {
  if (isString(payload)) {
    this.path = payload;
  }
  else {
    if (isString(payload.path)) this.path = payload.path;
    if (isString(payload.key)) this.key = payload.key;
  };

  return this;
};

DALLayer.prototype.init = function (payload, callbackFn) {
  return this.load(payload);
};


exports.DALLayer = DALLayer;
exports.init = function () {
  var obj = new DALLayer();
  return obj.init.apply(obj, arguments)
};
