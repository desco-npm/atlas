"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Framework resources
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var readDir_1 = __importDefault(require("../lib/readDir"));
var path_1 = __importDefault(require("../lib/path"));
var mkdirIfNotExists_1 = __importDefault(require("../lib/mkdirIfNotExists"));
// Framework Modules
var __1 = __importDefault(require("../"));
// Necessary parts
var Config_1 = __importDefault(require("./Config"));
/** Atlasjs Server Module */
var Server = /** @class */ (function () {
    function Server() {
        /** The Heart of the Server (Express) */
        this.Core = express_1.default();
        /** Server Settings */
        this.Config = Config_1.default;
        /** Routes directory */
        this.routerDir = '';
    }
    /**
     * Configures the server
     *
     * @param config Configures the AtlasJS Server Module
     */
    Server.prototype.config = function (config) {
        // Set settings
        this.Config.set(config);
        return this;
    };
    /** Prepares the server */
    Server.prototype.prepare = function () {
        // configure the core
        this.Core.use(cors_1.default()); // Treat the CORS
        this.Core.use(body_parser_1.default.urlencoded(this.Config.get('queryString'))); // Recognize QueryString
        this.Core.use(body_parser_1.default.json(this.Config.get('body'))); // Recognize Body
        // Set dynamic properties
        this.routerDir = path_1.default.join(__1.default.projectDir, this.Config.get('routerDir'));
        this.loadRouters();
    };
    /** Load project routes */
    Server.prototype.loadRouters = function () {
        var _this = this;
        // Create route directory if it does not exist
        mkdirIfNotExists_1.default(this.routerDir);
        // List the routes
        var routers = readDir_1.default(this.routerDir);
        // Cycle through and execute all routes
        routers.map(function (routerName) {
            var router = require(path_1.default.join(_this.routerDir, routerName)).default;
            router({ Express: _this.Core, entity: routerName.slice(0, -3), });
        });
    };
    /** Starts the server */
    Server.prototype.start = function () {
        // Prepares the server
        this.prepare();
        // Listening to the door
        this.Core.listen(this.Config.get('port'), this.Config.get('callback'));
    };
    return Server;
}());
exports.default = new Server();
