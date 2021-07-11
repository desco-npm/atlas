"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
  Este pacote irá gerar uma string fictícia aleatória com base no conjunto de caracteres disponíveis
  ou fornecidos, você também pode indicar o comprimento de sua string aleatória desejada. Caso você
  não se importe com exclusividade e não queira usar UUID, este o ajudará a conseguir o que deseja.

  Third Party Resource

  NPM: https://www.npmjs.com/package/@smakss/random-string
*/
var random_string_1 = __importDefault(require("@smakss/random-string"));
exports.default = random_string_1.default;
