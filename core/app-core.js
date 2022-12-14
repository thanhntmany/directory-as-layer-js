'use strict';
const DALBaseHandler = require("./dal-base-handler");
const CmdHandler = require("./command/handler");


const Class = function DALAppCore(payload) {
  if (!payload) payload = {};

  this.option = {
    cwd: payload.cwd || process.cwd()
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
proto_.initBase = function (path) {
  this.base = DALBaseHandler.getBaseOf(path || this.option.cwd);
};

proto_.execCommand = function (cmdPayload) {
  return CmdHandler.execCommand(cmdPayload.cmd, cmdPayload, this);
};


// @@ export
module.exports = Class


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
