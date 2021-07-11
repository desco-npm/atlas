"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
  Recursively, deeply merge of anything (objects, arrays, strings or nested thereof), which weighs
  contents by type hierarchy to ensure the maximum content is retained

  Third Party Resource

  NPM: https://www.npmjs.com/package/object-merge-advanced
*/
var object_merge_advanced_1 = __importDefault(require("object-merge-advanced"));
exports.default = object_merge_advanced_1.default;
