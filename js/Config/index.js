"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importa recursos do framework
var objectPath_1 = __importDefault(require("../lib/objectPath"));
// Classe de configurações
var Config = /** @class */ (function () {
    function Config() {
        this.defaults = {}; // Configurações padrões
        this.configs = {}; // Configurações definidas
    }
    // Seta as configurações padrões
    Config.prototype.setDefaults = function (defaults) {
        this.defaults = defaults; // Define os padrões
        this.set(this.configs); // Adiciona padrões as configurações
        return this;
    };
    // Seta as configurações
    Config.prototype.set = function (configs) {
        this.configs = __assign(__assign({}, this.defaults), configs);
        return this;
    };
    // Retorna uma configuração
    Config.prototype.get = function (path) {
        return objectPath_1.default.get(this.configs, path);
    };
    return Config;
}());
exports.default = Config;
