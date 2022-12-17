'use strict';
const { isAbsolute, resolve } = require('path');
const DALStack = require('./dal-stack');
const DALHandleHandler = require('./dal-handle-handler');
const CmdHandler = require('./command/handler');


const Class = function DALAppCore(payload) {
  if (!this.core) this.core = {};
  const core_ = this.core;

  if (!payload) payload = {};
  for (var key in payload) {
    switch (key) {

      case 'stack':
        core_.stack = DALStack.load(payload.stack, core_.stack);
        break;

      case 'cwd':
        var cwd = payload.cwd;
        if (!isAbsolute(cwd)) cwd = resolve(cwd);
        core_['working-dir'] = cwd;
        break;

      default:
        core_[key] = payload[key];
        break;

    };
  };

  if (!('working-dir' in core_)) {
    core_['working-dir'] = process.cwd();
  };

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


// @@ debug
if (require.main === module) {
  var app = new Class({
    stack: [
      "./astraiers-server-core-ubuntu",
      { path: "/home/thanhntmany/base/any-whare" },
      { path: "/home/thanhntmany/l/asdf/aax/asda" },
      { path: "/home/thanhntmany/qwer/hjkl" },
      { path: "/home/thanhntmany/l/vbvcx/qwer" },
    ]
  });
  app.exec();

  console.log("\n===========================");
  console.dir(app, { depth: null });
};
