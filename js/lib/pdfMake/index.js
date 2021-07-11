"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
  Biblioteca de geração de documentos PDF para uso do lado do servidor e do lado do cliente em
  JavaScript puro.

  Third Party Resource

  NPM: https://www.npmjs.com/package/pdfmake
*/
var pdfmake_1 = __importDefault(require("pdfmake"));
exports.default = pdfmake_1.default;
