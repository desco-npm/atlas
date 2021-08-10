"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Required parts
var Config_1 = __importDefault(require("../Config")); //Generic class of configations
/** AtlasJS Message Settings */
var DictionaryConfig = /** @class */ (function (_super) {
    __extends(DictionaryConfig, _super);
    function DictionaryConfig() {
        var _this = _super.call(this) || this;
        // Set the default settings
        _this.setDefaults({
            lang: 'en',
        });
        return _this;
    }
    return DictionaryConfig;
}(Config_1.default));
exports.default = new DictionaryConfig();