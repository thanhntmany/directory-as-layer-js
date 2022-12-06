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
  return {};
};
