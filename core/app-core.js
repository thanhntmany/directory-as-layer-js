'use strict';
const AnchorDir = require('./anchor-dir');
const DALStack = require('./dal-stack');
const CmdHandler = require('./command/handler');


const Class = function DALAppCore(payload) {
  this.core = {};
  const core_ = this.core;

  core_.anchorDir = new AnchorDir(payload.anchorDir);
  const anchorDir_ = core_.anchorDir;

  anchorDir_.anchorDirFindUp();

  core_.stack = new DALStack(anchorDir_.getStackPath());

  return this;
};
const proto_ = Class.prototype;


// @@ logging
proto_.log = function () {
  console.log.apply(null, arguments)
};

proto_.logError = function () {
  console.error.apply(null, arguments)
};


// @@ function
proto_.load = function (payload) {
  if (payload.anchorDir) this.core.anchorDir.load(payload.anchorDir);

  return this;
};

proto_.execCommand = function (cmdPayload) {
  return CmdHandler.execCommand(cmdPayload.cmd, cmdPayload, this);
};


// @@ export
module.exports.Class = Class;

module.exports.load = function (payload, instance) {
  return instance instanceof this.Class
    ? instance.constructor(payload)
    : new this.Class(payload);
};
