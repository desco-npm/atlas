"use strict";
/* O módulo de mensagens */
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
// Recursos de terceiros
require("../lib/colors");
var cliHeader_1 = __importDefault(require("../lib/cliHeader"));
// Importa recursos do framework
var objectMap_1 = __importDefault(require("../lib/objectMap"));
var replaceAll_1 = __importDefault(require("../lib/replaceAll"));
// Partes necessárias
var Config_1 = __importDefault(require("./Config"));
var types_1 = require("./types");
var Message = /** @class */ (function () {
    function Message() {
        this.Config = Config_1.default; // As configurações das mensagens
    }
    // Configura o servidor
    Message.prototype.config = function (config) {
        // Seta as configurações
        this.Config.set(config);
        return this;
    };
    // Escreve o cabeçalho
    Message.prototype.header = function () {
        cliHeader_1.default({
            title: 'AtlasJS v' + require('../../package.json').version,
            size: 29,
            align: 'center',
        });
    };
    // Escreve uma mensagem
    Message.prototype.put = function (id, dictionary, options) {
        var tab = ''.padStart(((options === null || options === void 0 ? void 0 : options.level) || 1) * this.Config.get('tab'), ' ');
        var text = tab + dictionary[this.Config.get('lang')][id];
        objectMap_1.default((options === null || options === void 0 ? void 0 : options.bind) || {}, function (replaceThis, withThis) {
            text = replaceAll_1.default(text, "[[" + withThis + "]]", replaceThis);
        });
        if (options === null || options === void 0 ? void 0 : options.type) {
            console.log(text[options === null || options === void 0 ? void 0 : options.type]);
        }
        else {
            console.log(text);
        }
    };
    // Escreve uma mensagem de sucesso
    Message.prototype.success = function (id, dictionary, options) {
        this.put(id, dictionary, __assign(__assign({}, options), { type: types_1.EMessageColorType.success }));
    };
    // Escreve uma mensagem de erro
    Message.prototype.error = function (id, dictionary, options) {
        this.put(id, dictionary, __assign(__assign({}, options), { type: types_1.EMessageColorType.error }));
    };
    // Escreve uma mensagem de alerta
    Message.prototype.warning = function (id, dictionary, options) {
        this.put(id, dictionary, __assign(__assign({}, options), { type: types_1.EMessageColorType.warning }));
    };
    // Escreve uma mensagem de informação
    Message.prototype.info = function (id, dictionary, options) {
        this.put(id, dictionary, __assign(__assign({}, options), { type: types_1.EMessageColorType.success }));
    };
    return Message;
}());
exports.default = new Message();
