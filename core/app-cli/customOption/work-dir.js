'use strict';
const { basename, resolve } = require('path');


// @@ Export
exports.cmdName = basename(__filename, ".js");

exports.parse = function(outOpt_, cKey, cValue, restArg_, restToken) {
  outOpt_[cKey] = resolve(cValue);

  return outOpt_
};

exports.compgen = function(outOpt_, restArg_, appCli, restToken, cKey, cValue) {
  return {};
};
