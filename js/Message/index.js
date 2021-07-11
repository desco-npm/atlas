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
    Message.prototype.header = function () {
        cliHeader_1.default({
            title: 'AtlasJS v' + require('../../package.json').version,
            size: 29,
            align: 'center',
        });
    };
    Message.prototype.put = function (text) {
        console.log(text);
    };
    Message.prototype.success = function (text) {
        this.put(text.green);
    };
    Message.prototype.error = function (text) {
        return this.put(text.red);
    };
    Message.prototype.warning = function (text) {
        return this.put(text.yellow);
    };
    Message.prototype.info = function (text) {
        return this.put(text.cyan);
    };
    return Message;
}());
exports.default = new Message();
