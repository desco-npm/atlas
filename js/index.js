"use strict";
/* O AtlasJS */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importa módulos do framework
var Server_1 = __importDefault(require("./Server"));
var Atlas = /** @class */ (function () {
    function Atlas() {
    }
    // Configura o Atlas
    Atlas.prototype.config = function (Config) {
        Server_1.default.config(Config.Server);
        return this;
    };
    // Prepara o Atlas
    Atlas.prototype.prepare = function () {
        return this;
    };
    // Inicia o servidor
    Atlas.prototype.start = function () {
        // Prepara o Atlas
        this.prepare();
        Server_1.default.start();
    };
    return Atlas;
}());
exports.default = new Atlas();
