"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __importDefault(require("../index"));
var types_1 = require("../Message/types");
index_1.default
    .config({ Message: { lang: types_1.EMessageLangs.ptbr, }, })
    .start();
