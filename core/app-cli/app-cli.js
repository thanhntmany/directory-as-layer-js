'use strict';


// @@ Main Class
const Class = function DALAppCli() {
  this.restArg = [];
  this.option = {};
  this.commandArray = [];
};

const proto_ = Class.prototype;


// @@ Functions
proto_.init = function (option) {
  return this;
};

proto_.parse = function (args) {
  /*
    dal
    [runtimeOption]      : Always starts with "-"

    Sequense of commandArray (separate by "--" if needed)
    <command>      : Does not start with "-"
    [command args] : Placed after command (the rest)

  */
  var restArg_ = this.restArg = Array.isArray(args) ? args.slice() : [];

  var token, key, value;

  // parse runtimeOption
  while ((token = restArg_.shift()) !== undefined) {

    // longopts
    if (token.startsWith("--")) {
      token = token.slice(2);
      if (token.length < 1) continue; // Skip if "--"

      token = token.split("=", 2);
      key = token[0];
      value = token[1];

      // outOpt, restArg, appCli, restToken, cKey, cValue
      this.option[key] = value !== undefined ? value : true;

      continue;
    }

    // shortopts
    else if (token.startsWith("-")) {
      token = token.slice(1);
      if (token.length < 1) continue; // Skip if "-"

      key = token.charAt(0);
      token = token.slice(1);

      // _outputOption <-- restArg, appCli, restToken, cKey, cValue
      this.option[key] = true;
      restArg_.unshift("-" + token);

      continue;
    }

    else {
      restArg_.unshift(token);
      break; // jump to parse the rest arguments into commandArray
    };

  };

  while ((token = restArg_.shift()) !== undefined) {
    // command parsing
    // ......
    this.commandArray.push(
      token
    );
  };

  return this;
};

proto_.compgen = function (restArg) {
  this.parse(restArg);

};

proto_.exec = function (args) {
  this.parse(args);
  return this.run();
};

proto_.run = function () {
  return this;
};


// @@ Export
exports.Class = Class;

exports.create = function () {
  return new this.Class();
};

exports.init = function (...args) {
  var obj = this.create();
  return obj.init.apply(obj, args);
};

exports.compgen = function (...args) {
  var obj = this.create();
  return obj.compgen.apply(obj, args);
};

exports.exec = function (...args) {
  var obj = this.create();
  return obj.exec.apply(obj, args);
};
