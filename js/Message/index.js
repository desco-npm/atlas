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
// Framework Modules
var Dictionary_1 = __importDefault(require("../Dictionary"));
// Framework resources
require("../lib/colors");
var cliHeader_1 = __importDefault(require("../lib/cliHeader"));
// Types
var types_1 = require("./types");
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
        (0, cliHeader_1.default)({
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
        var _a;
        // Generates message level tab according to configuration
        var tab = ''.padStart(((options === null || options === void 0 ? void 0 : options.level) || 1) * this.Config.get('tab'), ' ');
        // Symbol to be displayed before message
        var symbol = (options === null || options === void 0 ? void 0 : options.symbol) ? (options === null || options === void 0 ? void 0 : options.symbol) + " " : '';
        // Retrieves message from the dictionary, according to the language defined in the settings
        var text = tab + symbol + Dictionary_1.default.get(id, dictionary, { bind: options === null || options === void 0 ? void 0 : options.bind, });
        // A type was informed, format accordingly
        if (options === null || options === void 0 ? void 0 : options.type) {
            text = text[options === null || options === void 0 ? void 0 : options.type];
        }
        // Apply extra formats
        (_a = options === null || options === void 0 ? void 0 : options.format) === null || _a === void 0 ? void 0 : _a.map(function (f) {
            text = text[f];
        });
        // Writing the message
        console.log(text);
    };
    /**
     * Write a successful message
     *
     * @param id Message ID within the Dictionary of Module Messages
     * @param dictionary Module Message Dictionary
     * @param options Extra options
     **/
    Message.prototype.success = function (id, dictionary, options) {
        this.put(id, dictionary, __assign(__assign({}, options), { type: types_1.MessageColorType.success, symbol: '[SUC]' }));
    };
    /**
     * Write an error message
     *
     * @param id Message ID within the Dictionary of Module Messages
     * @param dictionary Module Message Dictionary
     * @param options Extra options
     **/
    Message.prototype.error = function (id, dictionary, options) {
        this.put(id, dictionary, __assign(__assign({}, options), { type: types_1.MessageColorType.error, symbol: '[ERR]' }));
    };
    /**
     * Write an alert message
     *
     * @param id Message ID within the Dictionary of Module Messages
     * @param dictionary Module Message Dictionary
     * @param options Extra options
     **/
    Message.prototype.warning = function (id, dictionary, options) {
        this.put(id, dictionary, __assign(__assign({}, options), { type: types_1.MessageColorType.warning, symbol: '[WAR]' }));
    };
    /**
     * Write an information message
     *
     * @param id Message ID within the Dictionary of Module Messages
     * @param dictionary Module Message Dictionary
     * @param options Extra options
     **/
    Message.prototype.info = function (id, dictionary, options) {
        options = options || {};
        this.put(id, dictionary, __assign(__assign({}, options), { type: types_1.MessageColorType.success, symbol: '[INF]' }));
    };
    /** Line break */
    Message.prototype.breakLine = function () {
        console.log();
    };
    return Message;
}());
exports.default = new Message();
//# sourceMappingURL=index.js.map