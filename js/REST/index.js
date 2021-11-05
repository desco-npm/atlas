"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Framework Modules
var Dictionary_1 = __importDefault(require("../Dictionary"));
// Necessary parts
var Config_1 = __importDefault(require("./Config"));
/** AtlasJS REST Module */
var REST = /** @class */ (function () {
    function REST() {
        /** REST settings */
        this.Config = Config_1.default;
    }
    /**
     * Configures the AtlasJS REST Module
     *
     * @param config Configures the AtlasJS REST Module
     **/
    REST.prototype.config = function (config) {
        // Arrow settings
        this.Config.set(config);
        return this;
    };
    /**
     * Returns an error response
     *
     * @param id Message ID within the Dictionary of Module Messages
     * @param dictionary Module Message Dictionary
     * @param options Extra options
     */
    REST.prototype.getError = function (id, dictionary, options) {
        // Retrieves message from the dictionary, according to the language defined in the settings
        var message = Dictionary_1.default.get("REST_ERROR_" + id, dictionary, { bind: options === null || options === void 0 ? void 0 : options.bind, });
        // The error
        var error = {
            statusCode: (options === null || options === void 0 ? void 0 : options.statusCode) || 500,
            errorId: id,
            message: message,
            details: this.Config.get('details') ? options === null || options === void 0 ? void 0 : options.error : undefined
        };
        return (options === null || options === void 0 ? void 0 : options.pure) ? error : Promise.reject(error);
    };
    return REST;
}());
exports.default = new REST();
//# sourceMappingURL=index.js.map