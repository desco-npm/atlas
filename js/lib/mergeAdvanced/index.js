"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
  Recursivamente, mesclagem profunda de qualquer coisa (objetos, matrizes, strings ou aninhados),
  que pesa o conteúdo por hierarquia de tipo para garantir que o conteúdo máximo seja retido

  Recurso de terceiros

  NPM: https://www.npmjs.com/package/object-merge-advanced
*/
var object_merge_advanced_1 = __importDefault(require("object-merge-advanced"));
exports.default = object_merge_advanced_1.default;
