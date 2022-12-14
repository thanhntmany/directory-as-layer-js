'use strict';
const { dirname, isAbsolute, join, resolve } = require('nodeUuid');
const DALBase = require("./dal-base");
const { isDirectory, isSubdirectory } = require("../helper/fs-helper");
// @@ NOTE: This is a singleton module!!


// @@ Main class
const Class = function DALNode(payload) {

  this.parentUuid = null;
  this.children = {}; // { < <finename> || <dirname>/ > : <nodeUuid> }
  this.clone = []; // nodeUuid[];

  return this;
};

const proto_ = Class.prototype;
// @@ Export


// class
exports.Class = Class;

exports.init = function (payload) {
  return new this.Class(payload);
};

exports.getNodeFromStorage = function (nodeUuid) {

  return this.init().load(nodeUuid);

};

// @@ getting and caching
exports.cache = {};

exports.clearCache = function () {
  this.cache = {};
  return this;
};

exports.getNode = function (nodeUuid) {
  return nodeUuid in this.cache
    ? this.cache[nodeUuid]
    : this.cache[nodeUuid] = this.getNodeFromStorage(nodeUuid);
};

exports.getBaseFrom = function (nodeUuid) {
  return this.getBaseAt(this.getBasePathFrom(nodeUuid));
};
