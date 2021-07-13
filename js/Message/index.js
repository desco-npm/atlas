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
exports.EMessageColorType = exports.EMessageLangs = void 0;
// Framework resources
require("../lib/colors");
var cliHeader_1 = __importDefault(require("../lib/cliHeader"));
var objectMap_1 = __importDefault(require("../lib/objectMap"));
var replaceAll_1 = __importDefault(require("../lib/replaceAll"));
// Necessary parts
var Config_1 = __importDefault(require("./Config"));
/** AtlasJS Message Module */
var Message = /** @class */ (function () {
    function Message() {
        /** Message settings */
        this.Config = Config_1.default;
    }
    /**
     * Configures the AtlasJS Message Module
     *
     * @param config Configures the AtlasJS Message Module
     **/
    Message.prototype.config = function (config) {
        // Arrow settings
        this.Config.set(config);
        return this;
    };
    /** Write the header */
    Message.prototype.header = function () {
        cliHeader_1.default({
            title: 'AtlasJS v' + require('../../package.json').version,
            size: 29,
            align: 'center',
        });
    };
    /**
     * Write a message
     *
     * @param id Message ID within the Dictionary of Module Messages
     * @param dictionary Module Message Dictionary
     * @param options Extra options
     **/
    Message.prototype.put = function (id, dictionary, options) {
        // Generates message level tab according to configuration
        var tab = ''.padStart(((options === null || options === void 0 ? void 0 : options.level) || 1) * this.Config.get('tab'), ' ');
        // Retrieves message from the dictionary, according to the language defined in the settings
        var text = tab + dictionary[this.Config.get('lang')][id];
        // Exchange variables by informed values
        objectMap_1.default((options === null || options === void 0 ? void 0 : options.bind) || {}, function (replaceThis, withThis) {
            text = replaceAll_1.default(text, "[[" + withThis + "]]", replaceThis);
        });
        // A type was informed, format accordingly
        if (options === null || options === void 0 ? void 0 : options.type) {
            console.log(text[options === null || options === void 0 ? void 0 : options.type]);
        }
        else {
            console.log(text);
        }
    };
    /**
     * Write a successful message
     *
     * @param id Message ID within the Dictionary of Module Messages
     * @param dictionary Module Message Dictionary
     * @param options Extra options
     **/
    Message.prototype.success = function (id, dictionary, options) {
        this.put(id, dictionary, __assign(__assign({}, options), { type: EMessageColorType.success }));
    };
    /**
     * Write an error message
     *
     * @param id Message ID within the Dictionary of Module Messages
     * @param dictionary Module Message Dictionary
     * @param options Extra options
     **/
    Message.prototype.error = function (id, dictionary, options) {
        this.put(id, dictionary, __assign(__assign({}, options), { type: EMessageColorType.error }));
    };
    /**
     * Write an alert message
     *
     * @param id Message ID within the Dictionary of Module Messages
     * @param dictionary Module Message Dictionary
     * @param options Extra options
     **/
    Message.prototype.warning = function (id, dictionary, options) {
        this.put(id, dictionary, __assign(__assign({}, options), { type: EMessageColorType.warning }));
    };
    /**
     * Write an information message
     *
     * @param id Message ID within the Dictionary of Module Messages
     * @param dictionary Module Message Dictionary
     * @param options Extra options
     **/
    Message.prototype.info = function (id, dictionary, options) {
        this.put(id, dictionary, __assign(__assign({}, options), { type: EMessageColorType.success }));
    };
    return Message;
}());
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
exports.default = new Message();
