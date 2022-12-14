'use strict';
const { basename } = require('path');


// @@ Export
exports.cmdName = basename(__filename, ".js");

exports.parse = function (outOpt_, cKey, cValue, restArg_, restToken) {
  outOpt_.cmdName = exports.cmdName;

  return outOpt_
};

exports.compgen = function (outOpt_, restArg_, appCli, restToken, cKey, cValue) {
  return {};
};

exports.exec = function (commandOption, appCli) {
  console.log("\n");
  console.log("Directory As Layer JS ©Thanhnt.many");
  console.log("\nStack:")
  console.log(" 3 - source-code")
  console.log(" 2 - build-instraction")
  console.log(" 1 - production")
  console.log(" 0 - base")
  console.log("\nTree view: ~/lab/astraiers-ecosystem/astraiers-server-core-ubuntu/")
  console.log("   0   1   2   3          │");
  console.log("  ↴  |   |   |   |    1   ├─ dir1/");
  console.log("   * |   |   |   |    2   │  ├─ asdasd ");
  console.log("   * |   |   |   |    3   │  ├─ asdasd ");
  console.log("   * |   |   |   |    4   │  └─ asdasd ");
};
