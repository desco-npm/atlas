"use strict";
/** Message Module Types */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EMessageColorType = exports.EMessageLangs = void 0;
/** Languages supported by AtlasJS */
var EMessageLangs;
(function (EMessageLangs) {
    /** Portugês Brasileiro */
    EMessageLangs["ptbr"] = "ptbr";
    /** American English */
    EMessageLangs["en"] = "en";
})(EMessageLangs = exports.EMessageLangs || (exports.EMessageLangs = {}));
;
/** Colors by message type */
var EMessageColorType;
(function (EMessageColorType) {
    EMessageColorType["success"] = "green";
    EMessageColorType["error"] = "red";
    EMessageColorType["warning"] = "yellow";
    EMessageColorType["cyan"] = "info";
})(EMessageColorType = exports.EMessageColorType || (exports.EMessageColorType = {}));
