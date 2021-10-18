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
var TypeORM_1 = require("../lib/TypeORM");
require("reflect-metadata");
// Framework Modules
var Exception_1 = __importDefault(require("../Exception"));
// Necessary parts
var Config_1 = __importDefault(require("./Config"));
var dictionary_1 = __importDefault(require("./dictionary"));
var ORM = /** @class */ (function () {
    function ORM() {
        /** Message settings */
        this.Config = Config_1.default;
        /** Default connection name */
        this.defaultConnectionName = 'default';
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
    /** Prepares the ORM */
    ORM.prototype.prepare = function () {
        return __awaiter(this, void 0, void 0, function () {
            var connectionConfig;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        connectionConfig = this.Config.get('connection');
                        return [4 /*yield*/, (0, TypeORM_1.createConnection)(connectionConfig).catch(function (e) {
                                Exception_1.default.discharge('InvalidConnection', dictionary_1.default, e);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, Promise.resolve()];
                }
            });
        });
    };
    /** Starts the ORM */
    ORM.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    /**
     * Gets connection from the connection manager.
     * If connection name wasn't specified, then "default" connection will be retrieved.
     *
     * @param connectionName Connection name. If omitted it will be "default" by default
     */
    ORM.prototype.getConnection = function (connectionName) {
        try {
            return (0, TypeORM_1.getConnection)(connectionName);
        }
        catch (e) {
            Exception_1.default.discharge('InvalidConnectionName', dictionary_1.default, e);
        }
    };
    /**
     * Gets repository from the connection.
     *
     * @param entity Entity Name
     * @param connectionName Connection name. If omitted it will be "default" by default
     */
    ORM.prototype.getRepository = function (entity, connectionName) {
        var _a;
        return (_a = this.getConnection(connectionName)) === null || _a === void 0 ? void 0 : _a.getRepository(entity);
    };
    /**
     * Gets QueryBuilder from the connection.
     *
     * @param entity Entity Name
     * @param connectionName Connection name. If omitted it will be "default" by default
     */
    ORM.prototype.getQueryBuilder = function (entity, connectionName) {
        var _a;
        return (_a = this.getRepository(entity, connectionName)) === null || _a === void 0 ? void 0 : _a.createQueryBuilder(entity);
    };
    return ORM;
}());
exports.default = new ORM();
