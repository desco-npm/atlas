"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
  inflection-js is a port of the functionality from Ruby on Rails' Active Support Inflection classes
  into Javascript. inflection is a port of inflection-js to node.js npm package. Instead of
  extending JavaScript native string object like inflection-js does, inflection separate the methods
  to a independent package to avoid unexpected behaviors.

  Third Party Resource

  NPM: https://www.npmjs.com/package/inflection
*/
var inflection_1 = __importDefault(require("inflection"));
exports.default = inflection_1.default;
