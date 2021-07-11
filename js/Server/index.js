"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Third-party modules
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
// Necessary parts
var Config_1 = __importDefault(require("./Config"));
/** Atlasjs Server Module */
var Server = /** @class */ (function () {
    function Server() {
        /** The Heart of the Server (Express) */
        this.Core = express_1.default();
        /** Server Settings */
        this.Config = Config_1.default;
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
        this.Core.use(cors_1.default()); // Trata o CORS
        this.Core.use(body_parser_1.default.urlencoded(this.Config.get('queryString'))); // Reconhece QueryString
        this.Core.use(body_parser_1.default.json(this.Config.get('body'))); // Reconhece Body
        return this;
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
