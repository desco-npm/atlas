"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
  Allows you to bypass the JS error display.

  Resources @desco/atlas
*/
var funError = console.error;
exports.default = (function (ignore) {
    console.error = ignore ? function () { } : funError;
});
