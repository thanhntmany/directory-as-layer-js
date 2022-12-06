'use strict';

exports.cmdName = module.filename;

exports.parse = function(restArg, appCli, cToken, cKey, cValue) {
  return {
    cmdName: exports.cmdName,
    hint: "paring resoult"
  };
};

exports.compgen = function(restArg, appCli, cToken, cKey, cValue) {
  return {
    cmdName: exports.cmdName,
    hint: "sssss"
  };
};

exports.exec = function(restArg, appCli, cToken, cKey, cValue) {
  console.log("running Ls");
  return restArg;
};
