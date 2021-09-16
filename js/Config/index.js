"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Framework resources
var objectPath_1 = __importDefault(require("../lib/objectPath"));
var objectMerge_1 = require("../lib/objectMerge");
/** AtlasJS Settings Module */
var Config = /** @class */ (function () {
    function Config() {
        /** Default settings */
        this.defaults = {};
        /** Settings defined */
        this.configs = {};
        /** If it was configured */
        this.configured = false;
    }
    /**
     * Set the default settings
     *
     * @param defaults: Default settings to be added to the module
     **/
    Config.prototype.setDefaults = function (defaults) {
        this.defaults = defaults; // Sets the standards
        this.set(this.configs, true); // Add defaults to settings
        return this;
    };
    /**
     * Set the settings
     *
     * @param configs Settings to be added to the module
     * @param ignoreConfigured Ignore the setting of the "configured" flag
     **/
    Config.prototype.set = function (configs, ignoreConfigured) {
        if (ignoreConfigured === void 0) { ignoreConfigured = false; }
        this.configs = objectMerge_1.objectMerge(this.defaults, configs, {}); // Merge user settings with defaults
        // Mark as configured
        if (!ignoreConfigured) {
            this.configured = true;
        }
        return this;
    };
    /**
     * Returns a Configuration
     * @param path Address of the configuration you want to access.Use points to access levels deeper
     */
    Config.prototype.get = function (path) {
        if (path) {
            return objectPath_1.default.get(this.configs, path);
        }
        else {
            return this.configs;
        }
    };
    return Config;
}());
exports.default = Config;
