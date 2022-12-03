'use strict';
const path = require('path');
const AppCli = require('./core/app-cli');
const JSONio = require('./core/helper/json-io')



console.log("Run CLI App!!!");
console.log("\nCurrent working directory:\n", process.cwd());
console.log(process.argv);

console.log("========================================");
console.dir(AppCli.init(), {"depth": null});
console.log("========================================");
