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
// Import framework resources
var objectPath_1 = __importDefault(require("../lib/objectPath"));
/** AtlasJS Settings Module */
var Config = /** @class */ (function () {
    function Config() {
        /** Default settings */
        this.defaults = {};
        /** Settings defined */
        this.configs = {};
    }
    /**
     * Set the default settings
     *
     * @param defaults: Default settings to be added to the module
     **/
    Config.prototype.setDefaults = function (defaults) {
        this.defaults = defaults; // Sets the standards
        this.set(this.configs); // Add defaults to settings
        return this;
    };
    /**
     * Set the settings
     *
     * @param configs Settings to be added to the module
     **/
    Config.prototype.set = function (configs) {
        this.configs = __assign(__assign({}, this.defaults), configs); // Merge user settings with defaults
        return this;
    };
    /**
     * Returns a Configuration
     
     * @param path Address of the configuration you want to access.Use points to access levels deeper
     */
    Config.prototype.get = function (path) {
        return objectPath_1.default.get(this.configs, path);
    };
    return Config;
}());
exports.default = Config;
