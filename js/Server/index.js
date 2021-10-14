"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Framework resources
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var isArray_1 = __importDefault(require("../lib/isArray"));
// Necessary parts
var Config_1 = __importDefault(require("./Config"));
/** Atlasjs Server Module */
var Server = /** @class */ (function () {
    function Server() {
        /** The Heart of the Server (Express) */
        this.Core = (0, express_1.default)();
        /** Server Settings */
        this.Config = Config_1.default;
    }
    /**
     * Configures the server
     *
     * @param config Configures the AtlasJS Server Module
     */
    Server.prototype.config = function (config) {
        var _this = this;
        // Set settings
        this.Config.set(config);
        // Configure the core
        this.Core.use((0, cors_1.default)()); // Treat the CORS
        this.Core.use(body_parser_1.default.urlencoded(this.Config.get('urlencoded'))); // Recognize URL Encoded
        this.Core.use(body_parser_1.default.json(this.Config.get('json'))); // Recognize JSON
        /** Directory or directory list with static content */
        var staticDir = this.Config.get('staticDir');
        // If you have static directories, define them
        if (staticDir) {
            staticDir = !(0, isArray_1.default)(staticDir) ? [staticDir,] : staticDir;
            staticDir.map(function (d) { return _this.Core.use(express_1.default.static(d)); });
        }
        this.Config.get('middleware', { forceArray: true, }).map(function (m) { return _this.Core.use(m); });
        return this;
    };
    /** Prepares the server */
    Server.prototype.prepare = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                // Run all routers
                this.Config.get('router').map(function (router) {
                    router({ Express: _this.Core, });
                });
                return [2 /*return*/];
            });
        });
    };
    /** Starts the server */
    Server.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Listening to the door
                this.Core.listen(this.Config.get('port'), this.Config.get('callback'));
                return [2 /*return*/];
            });
        });
    };
    return Server;
}());
exports.default = new Server();
