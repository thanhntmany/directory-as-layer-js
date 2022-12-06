'use strict';


// @@ Export
exports.parse = function (outOpt_, cKey, cValue, restArg_, restToken) {
  cKey = 'beeep';
  outOpt_[cKey] = restToken;

  return outOpt_
};

exports.compgen = function (outOpt_, restArg_, appCli, restToken, cKey, cValue) {
  return {};
};
