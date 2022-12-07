'use strict';
const customOption = require("./customOption/__custom");
const customCommand = require("./command/__custom");


// @@ Main Class
const Class = function DALAppCli() {

  this.cliData = {
    restArg: [],
    option: {},
    commandArray: [],
  };

  this.cache = {
    optionHandler: {},
    commandHandler: {},
  };

};

const proto_ = Class.prototype;


// @@ Functions
proto_.init = function (option) {
  return this;
};

proto_.getOptionHandler = function (key) {
  var cache_ = this.cache.optionHandler
  if (key in customOption.alias) key = customOption.alias[key];
  if (key in cache_) {
    return cache_[key];
  };

  try {
    return cache_[key] = require("./customOption/" + key);
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
      var loadedModule = require("./customOption/none")
      return cache_[loadedModule.cmdName] = loadedModule;
    }
    else throw error;
  };

};

proto_.getCommandHandler = function (key) {
  var cache_ = this.cache.commandHandler
  if (key in customCommand.alias) key = customCommand.alias[key];
  if (key in cache_) {
    return cache_[key];
  };

  try {
    return cache_[key] = require("../command/" + key);
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
      var loadedModule = require("./command/none")
      return cache_[loadedModule.cmdName] = loadedModule;
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
  // This mechanism make user being able to input a sequence of many commands.
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
  return this.parse(restArg);
};

proto_.exec = function (args) {
  // If commandline end with "\?", break executing and switch to compgen mode.
  if (args[args.length - 1].endsWith("?")) {
    return this.compgen(args);
  };

  this.parse(args);
  return this.run(this.cliData);
};

proto_.run = function (cliData) {
  console.log(cliData);

  // Processing cli option


  // Execite command
  var cmd;
  while ((cmd = cliData.commandArray.shift()) !== undefined) {
    this.getCommandHandler(cmd.cmdName).exec(cmd, this);
  };

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