'use strict'
var __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { 'default': mod, }
}
Object.defineProperty(exports, '__esModule', { value: true, })
/*
  Retorna se o sistema operacional é WINDOWS

  Third Party Resource

  NPM: https://www.npmjs.com/package/platform-is
*/
var platform_is_1 = __importDefault(require('platform-is'))
exports.default = platform_is_1.default
