"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Necessary parts
var Config_1 = __importDefault(require("./Config"));
var ORM = /** @class */ (function () {
    function ORM() {
        /** Message settings */
        this.Config = Config_1.default;
    }
    /**
     * Configures the AtlasJS Message Module
     *
     * @param config Configures the AtlasJS Message Module
     **/
    ORM.prototype.config = function (config) {
        // Arrow settings
        this.Config.set(config);
        return this;
    };
    return ORM;
}());
exports.default = new ORM();
