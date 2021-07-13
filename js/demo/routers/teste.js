"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (params) {
    var Express = params.Express;
    Express.get("/teste", function (req, res) {
        res.json({ ok: 1 });
    });
});
