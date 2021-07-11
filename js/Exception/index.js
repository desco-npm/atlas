"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Necessary parts
var Config_1 = __importDefault(require("./Config"));
/** AtlasJS Exception Module */
var Exception = /** @class */ (function () {
    function Exception() {
        /** Exception settings */
        this.Config = Config_1.default;
    }
    /**
     * Configures the AtlasJS Exception Module
     *
     * @param config Configures the AtlasJS Exception Module
     **/
    Exception.prototype.config = function (config) {
        // Arrow settings
        this.Config.set(config);
        return this;
    };
    /**
     * Executes an exception, displaying the proper message and finalizing the execution of the
     * program
     *
     * Error Error Object Returned by Node
     */
    Exception.prototype.discharge = function (e) {
        console.log();
        process.exit();
    };
    return Exception;
}());
exports.default = new Exception();
