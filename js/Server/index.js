"use strict";
/* O módulo de servidor */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Módulos de terceiros
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
// Partes necessárias
var Config_1 = __importDefault(require("./Config"));
// A classe de servidor
var Server = /** @class */ (function () {
    function Server() {
        this.Core = express_1.default(); // O coração do servidor (Express)
        this.Config = Config_1.default; // As configurações do servidor
    }
    // Configura o servidor
    Server.prototype.config = function (config) {
        // Seta as configurações
        this.Config.set(config);
        return this;
    };
    // Prepara o servidor
    Server.prototype.prepare = function () {
        // Configure o core
        this.Core.use(cors_1.default()); // Trata o CORS
        this.Core.use(body_parser_1.default.urlencoded(this.Config.get('queryString'))); // Reconhece QueryString
        this.Core.use(body_parser_1.default.json(this.Config.get('body'))); // Reconhece Body
        return this;
    };
    // Inicia o servidor
    Server.prototype.start = function () {
        // Prepara o servidor
        this.prepare();
        // Fica escutando a porta
        this.Core.listen(this.Config.get('port'), this.Config.get('callback'));
    };
    return Server;
}());
exports.default = new Server();
