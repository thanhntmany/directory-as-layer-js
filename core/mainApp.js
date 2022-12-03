'use strict';
const DALHandler = require('./dal');


// Main App
const App = function () {
};

// @@ Logging
App.prototype.log = function () {
  console.log.apply(null, arguments)
};

App.prototype.logError = function () {
  console.error.apply(null, arguments)
};

// @@ Load DAL
App.prototype.init = function (payload) {
  this.dal = DALHandler.init(payload);
  return this;
};

App.prototype.initAsync = function (file, callback) {
  DALHandler.initAsync(file, (dalHandler) => {
    this.dal = dalHandler;
    callback(this);
  });
};


exports.App = App;
exports.initAsync = function (file, callback) {
  var app = new App();
  app.initAsync(file, callback);
};
