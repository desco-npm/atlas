"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
  This package will generate a random dummy string based on the available set of characters or
  provided ones, you can also indicate the length of your desired random string. In case you don't
  care about uniqueness and don't want to use UUID this one will help you to achieve what you want

  Third Party Resource

  NPM: https://www.npmjs.com/package/@smakss/random-string
*/
var random_string_1 = __importDefault(require("@smakss/random-string"));
exports.default = random_string_1.default;
