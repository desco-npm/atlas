"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isWindows = exports.isMac = exports.isLinux = void 0;
/**
  Returns if the operating system is Linux

  Third Party Resource

  NPM: https://www.npmjs.com/package/platform-is
*/
var platform_is_1 = require("platform-is");
Object.defineProperty(exports, "isLinux", { enumerable: true, get: function () { return platform_is_1.isLinux; } });
Object.defineProperty(exports, "isMac", { enumerable: true, get: function () { return platform_is_1.isMac; } });
Object.defineProperty(exports, "isWindows", { enumerable: true, get: function () { return platform_is_1.isWindows; } });
exports.default = { isLinux: isLinux, isMac: isMac, isLinux: isLinux, };
