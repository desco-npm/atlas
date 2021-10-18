"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Express-interceptor allows you to define a previous step before sending a response.
 *
 * This allows you to do anything you want with the response, such as processing, transforming,
 * replacing, or logging it. Express-interceptor allows you to avoid calling next() over and over.
 *
 * Further more, you can avoid managing nested scopes. Using a declarative API, it’s simple to use
 * and maintain.
 *
 * Third Party Resource
 *
 * NPM: https://www.npmjs.com/package/express-interceptor
 */
var express_interceptor_1 = __importDefault(require("express-interceptor"));
exports.default = express_interceptor_1.default;
