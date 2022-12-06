'use strict';
const customOption = require("./customOption");


// @@ Main Class
const Class = function DALAppCli() {
  this.cliData = {
    restArg: [],
    option: {},
    optionHandler: {},
    commandArray: [],
    commandHandler: {}
  };
};

const proto_ = Class.prototype;


// @@ Functions
proto_.init = function (option) {
  return this;
};

proto_.getOptionHandler = function (key) {
  var cache_ = this.cliData.optionHandler
  if (key in customOption.alias) key = customOption.alias[key];
  if (key in cache_) {
    return cache_[key];
  };

  try {
    return cache_[key] = require("./customOption/" + key);
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
      return require("./customOption/none");
    }
    else throw error;
  };

};

proto_.getCommandHandler = function (key) {
  var cache_ = this.cliData.commandHandler
  if (key in cache_) {
    return cache_[key];
  };

  try {
    return cache_[key] = require("./command/" + key);
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
      return require("./command/none");
    }
    else throw error;
  };

};

proto_.parse = function (args) {
  /*
    dal
    [runtimeOption]      : Always starts with "-"

    Sequense of number of commandArray (separate by "--" if needed)
    <command>      : Does not start with "-"
    [command args] : Placed after command (the rest)

  */
  var restArg_ = this.cliData.restArg = Array.isArray(args) ? args.slice() : [],
    option_ = this.cliData.option;
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
      if (value === undefined) value = true;

      this.getOptionHandler(key).parse(option_, key, value, restArg_);
      continue;
    }

    // shortopts
    else if (token.startsWith("-")) {
      token = token.slice(1);
      if (token.length < 1) continue; // Skip if "-"

      key = token.charAt(0);
      token = token.slice(1);

      this.getOptionHandler(key).parse(option_, key, true, restArg_, token);
      continue;
    }

    // command
    else {
      restArg_.unshift(token);
      break; // jump to parse the rest arguments into commandArray
    };

  };

  var cmdName;
  while ((token = restArg_.shift()) !== undefined) {
    cmdName = token;
    // command parsing
    this.cliData.commandArray.push(
      this.getCommandHandler(cmdName).parse({}, cmdName, null, restArg_)
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
exports.optionAlias = {
  h: "help",
  v: "version",
  l: "list",
  o: "output",
  q: "quiet",
  r: "recursive",
  V: "verbose",
  f: "force"
};

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
