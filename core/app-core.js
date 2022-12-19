'use strict';
const AnchorDir = require('./anchor-dir');
const DALStack = require('./dal-stack');
const CmdHandler = require('./command/handler');


const Class = function DALAppCore(payload) {
  if (!this.core) this.core = {};
  const core_ = this.core;
  if (!payload) payload = {};

  const anchorDir_ = core_.anchorDir = new AnchorDir(payload);
  anchorDir_.anchorDirFindUp();

  core_.stack = DALStack.loadFromFile(anchorDir_.getStackPath(), core_.stack);
  core_.stack = DALStack.load(payload.stack, core_.stack);

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
