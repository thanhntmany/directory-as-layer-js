'use strict';


// @@ Export
exports.parse = function(outOpt_, cKey, cValue, restArg_, restToken) {
  cKey = 'help';
  outOpt_[cKey] = cValue;

  // In case shortopts:
  if (restToken !== undefined) {
    restArg_.unshift("-" + restToken);
  };

  return outOpt_
};

exports.compgen = function(outOpt_, restArg_, appCli, restToken, cKey, cValue) {
  return {};
};
