'use strict';
const { basename } = require('path');


// @@ Export
exports.cmdName = basename(__filename, ".js");

exports.parse = function (outOpt_, cKey, cValue, restArg_, restToken) {
  outOpt_.cmdName = exports.cmdName;
  outOpt_.cmdNameRaw = cKey;

  var noOption = restArg_.findIndex(token => !token.startsWith("-"));
  if (noOption > 0) {
    outOpt_.rawOptions = restArg_.splice(0, noOption)
  };

  return outOpt_
};

exports.compgen = function (outOpt_, restArg_, appCli, restToken, cKey, cValue) {
  return {};
};

exports.exec = function (commandOption, appCli) {
  return {};
};
