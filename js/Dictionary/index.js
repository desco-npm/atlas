"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Framework resources
var objectMap_1 = __importDefault(require("../lib/objectMap"));
var replaceAll_1 = __importDefault(require("../lib/replaceAll"));
// Necessary parts
var Config_1 = __importDefault(require("./Config"));
/** AtlasJS Dictionary Module */
var Dictionary = /** @class */ (function () {
    function Dictionary() {
        /** Dictionary settings */
        this.Config = Config_1.default;
    }
    /**
     * Configures the AtlasJS Dictionary Module
     *
     * @param config Configures the AtlasJS Dictionary Module
     **/
    Dictionary.prototype.config = function (config) {
        // Arrow settings
        this.Config.set(config);
        return this;
    };
    /**
     * Get content
     *
     * @param id Content id in Module Dictionary
     * @param dictionary Module Message Dictionary
     * @param options Extra options
     **/
    Dictionary.prototype.get = function (id, dictionary, options) {
        var text = dictionary[this.Config.get('lang')][id];
        // Exchange variables by informed values
        (0, objectMap_1.default)((options === null || options === void 0 ? void 0 : options.bind) || {}, function (replaceThis, withThis) {
            text = (0, replaceAll_1.default)(text, "[[" + withThis + "]]", replaceThis);
        });
        return text;
    };
    return Dictionary;
}());
exports.default = new Dictionary();
