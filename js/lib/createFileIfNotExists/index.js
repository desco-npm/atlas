"use strict";
/**
  Create a file if it doesn't exist

  Resources @desco/atlas
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("../fs"));
exports.default = (function (file) {
    if (!fs_1.default.existsSync(file)) {
        var stream = fs_1.default.createWriteStream(file);
        return Promise.resolve(stream);
    }
});
