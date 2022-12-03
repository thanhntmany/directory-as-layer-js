'use strict';
const path = require('path');
const cli = require('./core/cli');
const JSONio = require('./core/helper/json-io')



console.log("Run CLI App!!!");
console.log("\nCurrent working directory:\n", process.cwd());
console.log(process.argv);

console.log("========================================");
console.dir(cli.init(), {"depth": null});
console.log("========================================");
