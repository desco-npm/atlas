"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (params) {
    var Express = params.Express, entity = params.entity;
    Express.get("/" + entity, function (req, res) {
        res.json({ ok: 1 });
    });
});
