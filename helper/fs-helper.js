'use strict';
const { statSync } = require('fs');
const { relative, isAbsolute } = require('path');


exports.isDirectory = function (path) {
  // #TODO + #NOTE: throwIfNoEntry han't worked as expected, so I have to use try-cath to bypass this issue.
  try {

    var stats = statSync(path, { throwIfNoEntry: false });
    return stats && stats.isDirectory();

  } catch (error) {

    if (error.code === 'ENOENT') {
      return false
    }
    else throw error;

  };
};

exports.isSubdirectory = function (parent, target) {
  var rel = relative(parent, target);
  return rel && !rel.startsWith('..') && !isAbsolute(rel);
};

exports.isFile = function (path) {
  // #TODO + #NOTE: throwIfNoEntry han't worked as expected, so I have to use try-cath to bypass this issue.
  try {

    var stats = statSync(path, { throwIfNoEntry: false });
    return stats && stats.isFile();

  } catch (error) {

    if (error.code === 'ENOENT') {
      return false
    }
    else throw error;

  };
};
