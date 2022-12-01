'use strict';
const DALHandler = require('./core/dal-handler');


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

// @@ Load DAL File
App.prototype.initAsync = function (file, callback) {

  DALHandler.initAsync(file, (dalHandler) => {
    this.dalHandler = dalHandler;
    callback(this);
  });

};


exports.App = App;
exports.initAsync = function (file, callback) {
  var app = new App();
  app.initAsync(file, callback);
};
