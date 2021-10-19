"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
  Returns an array with no repeated elements

  Resources @desco/atlas
*/
exports.default = (function (array) { return array.filter(function (item, key, self) { return self.indexOf(item) === key; }); });
