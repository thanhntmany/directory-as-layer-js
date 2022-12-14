'use strict';
const DALBaseHandler = require("./dal-base-handler");
const CmdHandler = require("./command/handler");


const Class = module.exports = function DALAppCore(payload) {

  this.base = DALBaseHandler.getBaseOf(process.cwd());

  this.commandArray = [
    { cmd: "ls" },
    { cmd: "pull" },
  ];

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

proto_.exec = function () {
  this.commandArray.forEach(this.execCommand, this);
  return this;
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
