"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
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
var appRootDir_1 = __importDefault(require("./lib/appRootDir"));
var path_1 = __importDefault(require("./lib/path"));
// Framework Modules
var Dictionary_1 = __importDefault(require("./Dictionary"));
var Message_1 = __importDefault(require("./Message"));
var Exception_1 = __importDefault(require("./Exception"));
var Mail_1 = __importDefault(require("./Mail"));
var Auth_1 = __importDefault(require("./Auth"));
var Server_1 = __importDefault(require("./Server"));
var ORM_1 = __importDefault(require("./ORM"));
var Atlas = /** @class */ (function () {
    function Atlas() {
        /** Directory of the project using AtlasJS */
        this.projectDir = appRootDir_1.default.get();
        /** AtlasJS directory in use */
        this.atlasDir = __dirname;
        /** Default operating system directory separator in use */
        this.pathSep = path_1.default.sep;
        // Scope of Atlas Standard Routes
        this.defaultScopeRouter = '/@atlas';
    }
    /**
     * Configure the AtlasJS
     *
     * @param config Configures the AtlasJS
     **/
    Atlas.prototype.config = function (Config) {
        Dictionary_1.default.config(Config.Dictionary);
        Message_1.default.config(Config.Message);
        Exception_1.default.config(Config.Exception);
        if (Config.Mail) {
            Mail_1.default.config(Config.Mail);
        }
        if (Config.ORM) {
            ORM_1.default.config(Config.ORM);
        }
        if (Config.Server) {
            Server_1.default.config(Config.Server);
        }
        if (Config.Auth) {
            Auth_1.default.config(Config.Auth);
        }
        return this;
    };
    /** Prepare the AtlasJS */
    Atlas.prototype.prepare = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!Mail_1.default.Config.configured) return [3 /*break*/, 2];
                        return [4 /*yield*/, Mail_1.default.prepare()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!ORM_1.default.Config.configured) return [3 /*break*/, 4];
                        return [4 /*yield*/, ORM_1.default.prepare()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!Auth_1.default.Config.configured) return [3 /*break*/, 6];
                        return [4 /*yield*/, Auth_1.default.prepare()];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        if (!Server_1.default.Config.configured) return [3 /*break*/, 8];
                        return [4 /*yield*/, Server_1.default.prepare()];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    /** Start AtlasJS */
    Atlas.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prepare()];
                    case 1:
                        _a.sent();
                        Message_1.default.header();
                        if (!Mail_1.default.Config.configured) return [3 /*break*/, 3];
                        return [4 /*yield*/, Mail_1.default.start()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!Auth_1.default.Config.configured) return [3 /*break*/, 5];
                        return [4 /*yield*/, Auth_1.default.start()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        if (!ORM_1.default.Config.configured) return [3 /*break*/, 7];
                        return [4 /*yield*/, ORM_1.default.start()];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        if (!Server_1.default.Config.configured) return [3 /*break*/, 9];
                        return [4 /*yield*/, Server_1.default.start()];
                    case 8:
                        _a.sent();
                        _a.label = 9;
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    return Atlas;
}());
exports.default = new Atlas();
__exportStar(require("./types"), exports);
