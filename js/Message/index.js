"use strict";
/* O módulo de mensagens */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Recursos de terceiros
require("../lib/colors");
var cliHeader_1 = __importDefault(require("../lib/cliHeader"));
var Message = /** @class */ (function () {
    function Message() {
        this.tab = 2; // Quantos espaços de recuo a cada nível de mensagem
    }
    // Escreve o cabeçalho
    Message.prototype.header = function () {
        cliHeader_1.default({
            title: 'AtlasJS v' + require('../../package.json').version,
            size: 29,
            align: 'center',
        });
    };
    // Escreve uma mensagem
    Message.prototype.put = function (text, level) {
        if (level === void 0) { level = 0; }
        var tab = ''.padStart(level * this.tab, ' ');
        console.log(tab + text);
    };
    // Escreve uma mensagem de sucesso
    Message.prototype.success = function (text, level) {
        this.put(text.green, level);
    };
    // Escreve uma mensagem de erro
    Message.prototype.error = function (text, level) {
        this.put(text.red, level);
    };
    // Escreve uma mensagem de alerta
    Message.prototype.warning = function (text, level) {
        this.put(text.yellow, level);
    };
    // Escreve uma mensagem de informação
    Message.prototype.info = function (text, level) {
        this.put(text.cyan, level);
    };
    return Message;
}());
exports.default = new Message();
