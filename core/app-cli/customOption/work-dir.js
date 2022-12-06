'use strict';
const { resolve } = require('path');


// @@ Export
exports.parse = function(outOpt_, cKey, cValue, restArg_, restToken) {
  outOpt_[cKey] = resolve(cValue);

  return outOpt_
};

exports.compgen = function(outOpt_, restArg_, appCli, restToken, cKey, cValue) {
  return {};
};
