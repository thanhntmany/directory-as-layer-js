'use strict';
// const DALHandler = require('./dal');


// // Main AppCLI
// const AppCLI = function () {
// };

// // @@ Logging
// AppCLI.prototype.log = function () {
//   console.log.apply(null, arguments)
// };

// AppCLI.prototype.logError = function () {
//   console.error.apply(null, arguments)
// };

// // @@ Load DAL File
// AppCLI.prototype.initAsync = function (file, callback) {

//   DALHandler.initAsync(file, (dalHandler) => {
//     this.dal = dalHandler;
//     callback(this);
//   });

// };


// exports.AppCLI = AppCLI;
// exports.initAsync = function (file, callback) {
//   var app = new AppCLI();
//   app.initAsync(file, callback);
// };

console.log("Run CLI App!!!");
console.log(process.argv);