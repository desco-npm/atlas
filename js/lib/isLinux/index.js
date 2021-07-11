"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
  Retorna se o sistema operacional é LINUX

  Recurso de terceiros

  NPM: https://www.npmjs.com/package/platform-is
*/
var platform_is_1 = require("platform-is");
exports.default = platform_is_1.isLinux;
