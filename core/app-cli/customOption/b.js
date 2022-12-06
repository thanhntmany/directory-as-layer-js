'use strict';
const { basename } = require('path');


// @@ Export
exports.cmdName = basename(__filename);

exports.parse = function(outOpt_, cKey, cValue, restArg_, restToken) {
  outOpt_[cKey] = restToken;

  return outOpt_
};

exports.compgen = function(outOpt_, restArg_, appCli, restToken, cKey, cValue) {
  return {};
};
