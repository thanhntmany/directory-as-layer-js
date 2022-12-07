'use strict';


// @@ Export
exports.cmdName = module.filename;

exports.parse = function(restArg, cToken, appCli) {
  return {
    cmdName: exports.cmdName,
    hint: "paring resoult"
  };
};

exports.compgen = function(restArg, cToken, appCli) {
  return {
    cmdName: exports.cmdName,
    hint: "sssss"
  };
};

exports.exec = function(restArg, cToken, appCli) {
  console.log("running Ls");
  return restArg;
};
