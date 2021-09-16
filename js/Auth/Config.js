"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Framework Modules
var ORM_1 = __importDefault(require("../ORM"));
// Necessary parts
var Config_1 = __importDefault(require("../Config")); // Generic class of configations
/** Config AtlasJS Auth Module */
var AuthConfig = /** @class */ (function (_super) {
    __extends(AuthConfig, _super);
    function AuthConfig() {
        var _this = _super.call(this) || this;
        // Set the default settings
        _this.setDefaults({
            registerReturnProps: ['email',],
            loginReturnProps: ['email', 'token', 'active',],
            loginReturnTokenProps: ['email',],
            sendRefreshPasswordCodeReturnProps: ['email',],
            refreshPasswordReturnProps: ['email', 'token',],
            passwordSalt: 10,
            code: {
                length: 6,
                type: 'uppernumeric',
            },
            connectionName: ORM_1.default.defaultConnectionName,
            routes: {
                register: '/auth/register',
                login: '/auth/login',
                sendActiveCode: '/auth/send_active_code',
                active: '/auth/active',
                sendRefreshPasswordCode: '/auth/send_refresh_password_code',
                refreshPassword: '/auth/refresh_password',
                logout: '/auth/logout',
            },
            mail: {
                transporter: 'default',
                activeCode: {
                    subject: 'Active Code',
                    text: 'Your activation code is [[CODE]]',
                    html: 'Your activation code is <b>[[CODE]]</b>',
                },
                refreshPasswordCode: {
                    subject: 'Password Recovery Code',
                    text: 'Your password recovery code is [[CODE]]',
                    html: 'Your password recovery code is <b>[[CODE]]</b>',
                },
            },
            token: {
                algorithm: 'HS256',
            },
            user: {
                entityName: 'User',
                prop: {
                    login: 'email',
                    email: 'email',
                    password: 'password',
                    refreshPasswordCode: 'refreshPasswordCode',
                    active: 'active',
                    activeCode: 'activeCode',
                    token: 'token',
                    tokenType: 'tipoToken',
                    tokenValidate: 'tokenValidate',
                },
            },
            group: {
                entityName: 'UserGroup',
                prop: {
                    name: 'name'
                }
            },
            permission: {
                entityName: 'Permission',
                prop: {
                    allow: 'allow',
                },
            },
            resource: {
                entityName: 'Resource',
                prop: {
                    method: 'method',
                    name: 'name',
                }
            },
        });
        return _this;
    }
    return AuthConfig;
}(Config_1.default));
exports.default = new AuthConfig();
