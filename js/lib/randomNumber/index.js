"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (min, max, params) {
    if (min === void 0) { min = 0; }
    if (max === void 0) { max = 99999999999999999999999999999999999999; }
    var padStart = params.padStart || 0;
    var padEnd = params.padEnd || 0;
    min = Math.ceil(min);
    max = Math.floor(max);
    var num = (Math.floor(Math.random() * (max - min + 1)) + min).toString();
    if (padStart) {
        return num.padStart(padStart, '0');
    }
    else if (padEnd) {
        return num.padStart(padEnd, '0');
    }
    else {
        return num;
    }
});
//# sourceMappingURL=index.js.map