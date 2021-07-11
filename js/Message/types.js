"use strict";
/* Tipos do módulo de mensagens */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EMessageColorType = exports.EMessageLangs = void 0;
// Idiomas suportados pelo framework
var EMessageLangs;
(function (EMessageLangs) {
    EMessageLangs["ptbr"] = "ptbr";
    EMessageLangs["en"] = "en";
})(EMessageLangs = exports.EMessageLangs || (exports.EMessageLangs = {}));
;
// Cores por tipo de mensagem
var EMessageColorType;
(function (EMessageColorType) {
    EMessageColorType["success"] = "green";
    EMessageColorType["error"] = "red";
    EMessageColorType["warning"] = "yellow";
    EMessageColorType["cyan"] = "info";
})(EMessageColorType = exports.EMessageColorType || (exports.EMessageColorType = {}));
