'use strict';
const Session = require("./app-session");
const CmdHandler = require("./command/handler");


const Class = module.exports = function DALAppCore() {

  // pure JS object to be able to use session
  this.option = {};
  // current runtime
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
proto_.initSession = function () {
  this.option = (this.sessionHandler = new Session(this.option)).getDataPointer();
  return this;
};

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
