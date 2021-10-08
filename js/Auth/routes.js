"use strict";
// Framework Modules
/* /--/ */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Necessary parts
var _1 = __importDefault(require("./"));
var Config_1 = __importDefault(require("./Config"));
exports.default = (function (_a) {
    var Express = _a.Express;
    Express.post(Config_1.default.get('routes.register'), function (req, res) {
        _1.default.register(req.body)
            .then(function (response) { return res.json(response); })
            .catch(function (e) { return res.status(e.statusCode).json(e); });
    });
    Express.put(Config_1.default.get('routes.login'), function (req, res) {
        _1.default.login(req.body)
            .then(function (response) { return res.json(response); })
            .catch(function (e) {
            res.status(e.statusCode).json(e);
        });
    });
    Express.put(Config_1.default.get('routes.sendActiveCode'), function (req, res) {
        _1.default.sendActiveCodeMail(req.body)
            .then(function (response) { return res.json(response); })
            .catch(function (e) { return res.status(e.statusCode).json(e); });
    });
    Express.put(Config_1.default.get('routes.active'), function (req, res) {
        _1.default.active(req.body)
            .then(function (response) { return res.json(response); })
            .catch(function (e) { return res.status(e.statusCode).json(e); });
    });
    Express.put(Config_1.default.get('routes.sendRefreshPasswordCode'), function (req, res) {
        _1.default.sendRefreshPasswordCode(req.body)
            .then(function (response) { return res.json(response); })
            .catch(function (e) { return res.status(e.statusCode).json(e); });
    });
    Express.put(Config_1.default.get('routes.refreshPassword'), function (req, res) {
        _1.default.refreshPassword(req.body)
            .then(function (response) { return res.json(response); })
            .catch(function (e) { return res.status(e.statusCode).json(e); });
    });
    Express.put(Config_1.default.get('routes.logout'), function (req, res) {
        _1.default.logout(req.headers.authorization)
            .then(function (response) { return res.json(response); })
            .catch(function (e) { return res.status(e.statusCode).json(e); });
    });
});
