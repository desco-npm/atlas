"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
  Obtenha rastreamentos de pilha v8 como uma matriz de objetos CallSite.

  Recurso de terceiros

  NPM: https://www.npmjs.com/package/stack-trace
*/
var stack_trace_1 = __importDefault(require("stack-trace"));
exports.default = stack_trace_1.default;
