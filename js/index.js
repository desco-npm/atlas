"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Framework resources
var appRootDir_1 = __importDefault(require("./lib/appRootDir"));
var path_1 = __importDefault(require("./lib/path"));
// Framework Modules
var Message_1 = __importDefault(require("./Message"));
var Exception_1 = __importDefault(require("./Exception"));
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
    }
    /**
     * Configure the AtlasJS
     *
     * @param config Configures the AtlasJS
     **/
    Atlas.prototype.config = function (Config) {
        Message_1.default.config(Config.Message);
        Exception_1.default.config(Config.Exception);
        Server_1.default.config(Config.Server);
        ORM_1.default.config(Config.ORM);
        return this;
    };
    /** Prepare the AtlasJS */
    Atlas.prototype.prepare = function () {
        return this;
    };
    /** Start AtlasJS */
    Atlas.prototype.start = function () {
        this.prepare();
        Message_1.default.header();
        Server_1.default.start();
    };
    return Atlas;
}());
exports.default = new Atlas();
