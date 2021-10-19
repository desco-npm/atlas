"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Framework Modules
var Message_1 = __importDefault(require("../Message"));
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
        // Set settings
        this.Config.set(config);
        return this;
    };
    /**
     * Executes an exception, displaying the proper message and finalizing the execution of the
     * program
     *
     * error Error id
     * Error Error Object Returned by Node
     */
    Exception.prototype.discharge = function (id, dictionary, e) {
        Message_1.default.breakLine();
        Message_1.default.error(id + 'Title', dictionary, { format: ['bold',] });
        Message_1.default.error(id + 'Message', dictionary);
        Message_1.default.breakLine();
        if (this.Config.get('details')) {
            console.log(e);
        }
        process.exit();
    };
    return Exception;
}());
exports.default = new Exception();
