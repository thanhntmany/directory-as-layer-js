'use strict';

exports.cmdName = module.filename;

exports.parse = function(restArgArray, option, cToken, cKey, cValue) {
  return {
    cmdName: exports.cmdName,
    hint: "paring resoult"
  };
};

exports.compgen = function(restArgArray, appCli, cToken, cKey, cValue) {
  return {
    cmdName: exports.cmdName,
    hint: "sssss"
  };
};

exports.exec = function(restArgArray, appCli, cToken, cKey, cValue) {
  console.log("running Ls");
  return restArgArray;
};
