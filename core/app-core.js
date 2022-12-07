'use strict';
const CmdHandler = require("./command/handler");


// @@ Main Class
const Class = function DALAppCore() {
  // session
  this.data = {
    stack: [
      { path: "/home/thanhntmany/base/any-whare" },
      { path: "/home/thanhntmany/l/asdf/aax/asda" },
      { path: "/home/thanhntmany/qwer/hjkl" },
      { path: "/home/thanhntmany/l/vbvcx/qwer" },
    ]
  };

  this.commandArray = [
    { cmd: "ls" },
    { cmd: "pull" },
  ];

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


// @@ Export
exports.Class = Class;

var app = new Class();
app.exec();
// console.log();
