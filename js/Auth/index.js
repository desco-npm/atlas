"use strict";
/**
 * TODO: Colocar Pattern de URL em método próprio pois esta repetido em dois métodos
 * TODO: Registro validar confirmação de senha
 * TODO: Atualização de senha validar confirmação de senha
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Framework resources
var randomString_1 = __importDefault(require("../lib/randomString"));
var replaceAll_1 = __importDefault(require("../lib/replaceAll"));
var objectFilter_1 = __importDefault(require("../lib/objectFilter"));
var jsonWebToken_1 = __importDefault(require("../lib/jsonWebToken"));
var urlPattern_1 = __importDefault(require("../lib/urlPattern"));
var inflection_1 = __importDefault(require("../lib/inflection"));
var isArray_1 = __importDefault(require("../lib/isArray"));
var moment_1 = __importDefault(require("../lib/moment"));
// Framework Modules
var Server_1 = __importDefault(require("../Server"));
var ORM_1 = __importDefault(require("../ORM"));
var Mail_1 = __importDefault(require("../Mail"));
var REST_1 = __importDefault(require("../REST"));
// Necessary parts
var Config_1 = __importDefault(require("./Config"));
var routes_1 = __importDefault(require("./routes"));
var dictionary_1 = __importDefault(require("./dictionary"));
/** Atlasjs Auth Module */
var Auth = /** @class */ (function () {
    function Auth() {
        /** Auth Settings */
        this.Config = Config_1.default;
    }
    /**
     * Configures the Auth
     *
     * @param config Configures the AtlasJS Auth Module
     */
    Auth.prototype.config = function (config) {
        // Set settings
        this.Config.set(config);
        return this;
    };
    /** Prepares the Auth */
    Auth.prototype.prepare = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_c) {
                this.Connection = ORM_1.default.getConnection(Config_1.default.get('connectionName'));
                this.userEntityName = Config_1.default.get('user.entityName');
                this.groupEntityName = Config_1.default.get('ACL.group.entityName');
                this.resourceEntityName = Config_1.default.get('ACL.resource.entityName');
                this.permissionEntityName = Config_1.default.get('ACL.permission.entityName');
                this.UserRepository = (_a = this.Connection) === null || _a === void 0 ? void 0 : _a.getRepository(this.userEntityName);
                this.ResourceRepository = (_b = this.Connection) === null || _b === void 0 ? void 0 : _b.getRepository(this.resourceEntityName);
                // Add middleware
                Server_1.default.Core.use(function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
                    var publicResource, user;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.isPublicResource(req.url, req.method)
                                // If the route is public, release
                            ];
                            case 1:
                                publicResource = _a.sent();
                                // If the route is public, release
                                if (publicResource) {
                                    next();
                                    return [2 /*return*/];
                                }
                                // No token, returns error
                                if (!req.headers.authorization) {
                                    REST_1.default.getError('ACCESS_WITHOUT_TOKEN', dictionary_1.default).catch(function (e) {
                                        res.status(401).json(e);
                                    });
                                    return [2 /*return*/];
                                }
                                return [4 /*yield*/, this.getUserByToken(req.headers.authorization)
                                    // If not found user, token is invalid. Inform
                                ];
                            case 2:
                                user = _a.sent();
                                // If not found user, token is invalid. Inform
                                if (!user) {
                                    REST_1.default.getError('ACCESS_INVALID_TOKEN', dictionary_1.default).catch(function (e) {
                                        res.status(403).json(e);
                                    });
                                    return [2 /*return*/];
                                }
                                return [4 /*yield*/, this.resourcePermissionByUser(user, req.url, req.method)];
                            case 3:
                                // If user does not have permission for the requested resource, inform
                                if (!(_a.sent())) {
                                    REST_1.default.getError('ACCESS_RESTRICT', dictionary_1.default).catch(function (e) {
                                        res.status(403).json(e);
                                    });
                                    return [2 /*return*/];
                                }
                                req.headers.userData = user;
                                next();
                                return [2 /*return*/];
                        }
                    });
                }); });
                // Add routes
                routes_1.default({ Express: Server_1.default.Core, });
                return [2 /*return*/];
            });
        });
    };
    /** Starts the Auth */
    Auth.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    /**
     * Register the user
     *
     * @param data Object containing user data to be saved
     */
    Auth.prototype.register = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var registerReturnProps, user, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        registerReturnProps = Config_1.default.get('registerReturnProps');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.UserRepository.save(data)];
                    case 2:
                        user = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        return [2 /*return*/, REST_1.default.getError('USER_ALREADY_EXISTS', dictionary_1.default, { error: e_1, })];
                    case 4: 
                    // Send the email
                    return [4 /*yield*/, this.sendActiveCodeMail(user)
                        // Filtering object to return only the desired data
                    ];
                    case 5:
                        // Send the email
                        _a.sent();
                        // Filtering object to return only the desired data
                        user = objectFilter_1.default(user, function (v, k) { return registerReturnProps.indexOf(k) !== -1; });
                        return [2 /*return*/, user];
                }
            });
        });
    };
    /**
     * Send email with activation code
     *
     * @param user Object containing user data
     */
    Auth.prototype.sendActiveCodeMail = function (user) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, login, activeCode, email, active, _c, transporter, from, _d, subject, text, html;
            var _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _b = this.Config.get('user.prop'), login = _b.login, activeCode = _b.activeCode, email = _b.email, active = _b.active;
                        _c = Config_1.default.get('mail'), transporter = _c.transporter, from = _c.from;
                        _d = Config_1.default.get('mail.activeCode'), subject = _d.subject, text = _d.text, html = _d.html;
                        if (!(Object.keys(user).length === 1)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.UserRepository.findOne((_e = {}, _e[login] = user[login], _e))];
                    case 1:
                        user = _f.sent();
                        _f.label = 2;
                    case 2:
                        // If you don't find the user, it returns an error
                        if (!user) {
                            return [2 /*return*/, REST_1.default.getError('SEND_ACTIVE_USER_NOT_FOUND', dictionary_1.default, {})];
                        }
                        // If user is already active, ends with error
                        if (user[active]) {
                            return [2 /*return*/, REST_1.default.getError('SEND_ACTIVE_ALREADY_ACTIVE_USER', dictionary_1.default, {})];
                        }
                        // Generate code
                        user[activeCode] = this.generateCode();
                        return [4 /*yield*/, this.UserRepository.save(user)
                            // Send mail
                        ];
                    case 3:
                        // Save code
                        user = _f.sent();
                        // Send mail
                        return [4 /*yield*/, ((_a = Mail_1.default.transporter(transporter)) === null || _a === void 0 ? void 0 : _a.sendMail({
                                from: from.name ? from.name + " <" + from.mail + ">" : from.mail,
                                to: user[email],
                                subject: subject,
                                text: replaceAll_1.default(text, '[[CODE]]', user[activeCode]),
                                html: replaceAll_1.default(html, '[[CODE]]', user[activeCode]),
                            }))];
                    case 4:
                        // Send mail
                        _f.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Activates a user given the correct activation code
     *
     * @param user User data to be active
     */
    Auth.prototype.active = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, active, activeCode, email, e_2;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.Config.get('user.prop'), active = _a.active, activeCode = _a.activeCode, email = _a.email;
                        return [4 /*yield*/, this.UserRepository.findOne((_b = {},
                                _b[email] = user[email],
                                _b[activeCode] = user[activeCode],
                                _b))
                            // If there was an error, reject
                        ];
                    case 1:
                        // User search
                        user = _c.sent();
                        // If there was an error, reject
                        if (!user) {
                            return [2 /*return*/, REST_1.default.getError('ACTIVE_USER_NOT_FOUND', dictionary_1.default, {})];
                        }
                        // Erase code and activate account
                        user[activeCode] = null;
                        user[active] = true;
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.UserRepository.save(user)];
                    case 3:
                        // Save changes
                        user = _c.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_2 = _c.sent();
                        return [2 /*return*/, REST_1.default.getError('ACTIVE_USER_ERROR', dictionary_1.default, { error: e_2, })];
                    case 5: 
                    // Log in and return
                    return [2 /*return*/, this.login(user)];
                }
            });
        });
    };
    /**
     * Send password recovery email
     *
     * @param user User data to have password recovered
     */
    Auth.prototype.sendRefreshPasswordCode = function (user) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, email, refreshPasswordCode, sendRefreshPasswordCodeReturnProps, e_3, _c, transporter, from, refreshPasswordCodeMail, subject, text, html;
            var _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _b = this.Config.get('user.prop'), email = _b.email, refreshPasswordCode = _b.refreshPasswordCode;
                        sendRefreshPasswordCodeReturnProps = this.Config.get('sendRefreshPasswordCodeReturnProps');
                        return [4 /*yield*/, this.UserRepository.findOne((_d = {}, _d[email] = user[email], _d))
                            // If you don't find the user, it returns an error
                        ];
                    case 1:
                        // user search
                        user = _e.sent();
                        // If you don't find the user, it returns an error
                        if (!user) {
                            return [2 /*return*/, REST_1.default.getError('SEND_PASSWORD_RECOVER_USER_NOT_FOUND', dictionary_1.default, {})];
                        }
                        /** Generate recover password code */
                        user[refreshPasswordCode] = this.generateCode();
                        _e.label = 2;
                    case 2:
                        _e.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.UserRepository.save(user)];
                    case 3:
                        _e.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_3 = _e.sent();
                        return [2 /*return*/, REST_1.default.getError('SEND_PASSWORD_RECOVER_SAVE_ERROR', dictionary_1.default, { error: e_3, })];
                    case 5:
                        _c = Config_1.default.get('mail'), transporter = _c.transporter, from = _c.from;
                        refreshPasswordCodeMail = Config_1.default.get('mail.refreshPasswordCode');
                        subject = refreshPasswordCodeMail.subject, text = refreshPasswordCodeMail.text, html = refreshPasswordCodeMail.html;
                        // Send mail
                        return [4 /*yield*/, ((_a = Mail_1.default.transporter(transporter)) === null || _a === void 0 ? void 0 : _a.sendMail({
                                from: from.name ? from.name + " <" + from.mail + ">" : from.mail,
                                to: user[email],
                                subject: subject,
                                text: replaceAll_1.default(text, '[[CODE]]', user[refreshPasswordCode]),
                                html: replaceAll_1.default(html, '[[CODE]]', user[refreshPasswordCode]),
                            }))];
                    case 6:
                        // Send mail
                        _e.sent();
                        return [2 /*return*/, objectFilter_1.default(user, function (v, k) { return sendRefreshPasswordCodeReturnProps.indexOf(k) !== -1; })];
                }
            });
        });
    };
    /**
     * Authenticate a user
     *
     * @param user User data to have password recovered
     */
    Auth.prototype.login = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var loginReturnProps, loginReturnTokenProps, _a, login, password, token, active, _b, key, algorithm, bdUser, e_4;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        loginReturnProps = this.Config.get('loginReturnProps');
                        loginReturnTokenProps = this.Config.get('loginReturnTokenProps');
                        _a = this.Config.get('user.prop'), login = _a.login, password = _a.password, token = _a.token, active = _a.active;
                        _b = this.Config.get('hash'), key = _b.key, algorithm = _b.algorithm;
                        return [4 /*yield*/, this.UserRepository.findOne((_c = {}, _c[login] = user[login], _c))
                            // If you don't find the user, it returns an error
                            // If password doesn't match, return error
                        ];
                    case 1:
                        bdUser = _d.sent();
                        // If you don't find the user, it returns an error
                        // If password doesn't match, return error
                        if (!bdUser || bdUser[password] !== user[password]) {
                            return [2 /*return*/, REST_1.default.getError('LOGIN_INVALID_CREDENTIALS', dictionary_1.default, {})];
                        }
                        // If user is not active, returns error
                        if (!bdUser[active]) {
                            return [2 /*return*/, REST_1.default.getError('LOGIN_INACTIVE_USER', dictionary_1.default, {})];
                        }
                        // Generate a token
                        bdUser[token] = jsonWebToken_1.default.sign(__assign(__assign({}, objectFilter_1.default(bdUser, function (v, k) { return loginReturnTokenProps.indexOf(k) !== -1; })), { time: moment_1.default().format() }), key, { algorithm: algorithm, });
                        _d.label = 2;
                    case 2:
                        _d.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.UserRepository.save(bdUser)];
                    case 3:
                        _d.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_4 = _d.sent();
                        return [2 /*return*/, REST_1.default.getError('LOGIN_SAVE_TOKEN_ERROR', dictionary_1.default, { error: e_4, })];
                    case 5: return [2 /*return*/, objectFilter_1.default(bdUser, function (v, k) { return loginReturnProps.indexOf(k) !== -1; })];
                }
            });
        });
    };
    /**
     * Update user password
     *
     * @param user User data to be active
     */
    Auth.prototype.refreshPassword = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var refreshPasswordReturnProps, _a, refreshPasswordCode, email, password, token, bdUser, e_5, loginUser;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        refreshPasswordReturnProps = this.Config.get('refreshPasswordReturnProps');
                        _a = this.Config.get('user.prop'), refreshPasswordCode = _a.refreshPasswordCode, email = _a.email, password = _a.password, token = _a.token;
                        return [4 /*yield*/, this.UserRepository.findOne((_b = {}, _b[email] = user[email], _b))
                            // If there was an error, reject
                        ];
                    case 1:
                        bdUser = _c.sent();
                        // If there was an error, reject
                        if (!bdUser || bdUser[refreshPasswordCode] !== user[refreshPasswordCode]) {
                            return [2 /*return*/, REST_1.default.getError('REFRESH_PASSWORD_INVALID_CODE', dictionary_1.default, {})];
                        }
                        // Erase code and update password
                        bdUser[refreshPasswordCode] = null;
                        bdUser[password] = user[password];
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.UserRepository.save(bdUser)];
                    case 3:
                        bdUser = _c.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_5 = _c.sent();
                        return [2 /*return*/, REST_1.default.getError('REFRESH_PASSWORD_SAVE_ERROR', dictionary_1.default, { error: e_5, })];
                    case 5: return [4 /*yield*/, this.login(bdUser)
                        // Get token
                    ];
                    case 6:
                        loginUser = _c.sent();
                        // Get token
                        bdUser[token] = loginUser[token];
                        // Filtering object to return only the desired data
                        bdUser = objectFilter_1.default(bdUser, function (v, k) { return refreshPasswordReturnProps.indexOf(k) !== -1; });
                        return [2 /*return*/, Promise.resolve(bdUser)];
                }
            });
        });
    };
    /**
     * Logs out the user
     *
     * @param userToken the user's token
     */
    Auth.prototype.logout = function (userToken) {
        return __awaiter(this, void 0, void 0, function () {
            var refreshPasswordReturnProps, _a, refreshPasswordCode, email, password, token, user, e_6;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // If not passed token, returns with error
                        if (!userToken) {
                            return [2 /*return*/, REST_1.default.getError('LOGOUT_WITHOUT_TOKEN', dictionary_1.default, {})];
                        }
                        refreshPasswordReturnProps = this.Config.get('refreshPasswordReturnProps');
                        _a = this.Config.get('user.prop'), refreshPasswordCode = _a.refreshPasswordCode, email = _a.email, password = _a.password, token = _a.token;
                        return [4 /*yield*/, this.getUserByToken(userToken)
                            // If there was an error, reject
                        ];
                    case 1:
                        user = _b.sent();
                        // If there was an error, reject
                        if (!user) {
                            return [2 /*return*/, REST_1.default.getError('LOGOUT_USER_NOT_FOUND', dictionary_1.default, {})];
                        }
                        // Erase token
                        user[token] = null;
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.UserRepository.save(user)];
                    case 3:
                        _b.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_6 = _b.sent();
                        return [2 /*return*/, REST_1.default.getError('LOGOUT_SAVE_ERROR', dictionary_1.default, { error: e_6, })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /** Get user by Token */
    Auth.prototype.getUserByToken = function (userToken) {
        var _a;
        /** Name of the property containing the token */
        var token = this.Config.get('user.prop').token;
        // Search and return
        return this.UserRepository.findOne({
            where: (_a = {}, _a[token] = userToken === null || userToken === void 0 ? void 0 : userToken.split(' ')[1], _a),
            relations: [this.groupEntityName,]
        });
    };
    /**
     * Returns if a resource is public
     *
     * @param resource The name of the resource
     * @param method The method used in the resource
     */
    Auth.prototype.isPublicResource = function (resource, method) {
        return __awaiter(this, void 0, void 0, function () {
            var publicGroupId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        publicGroupId = this.Config.get('publicGroup');
                        return [4 /*yield*/, this.resourcePermissionByUserGroup(resource, method, publicGroupId)];
                    case 1: return [2 /*return*/, (_a.sent()) === true];
                }
            });
        });
    };
    /**
     * Returns if a resource is released for a group
     *
     * @param resourceName The name of the resource
     * @param method The method used in the resource
     * @param userGroupId Group id
     */
    Auth.prototype.resourcePermissionByUserGroup = function (resourceName, method, userGroupId) {
        return __awaiter(this, void 0, void 0, function () {
            var permissionEntity, allowProp, resources, resource, allow, deny;
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        permissionEntity = inflection_1.default.pluralize(this.permissionEntityName);
                        allowProp = this.Config.get('ACL.permission.prop.allow');
                        // turning id into array
                        userGroupId = isArray_1.default(userGroupId) ? userGroupId : [userGroupId,];
                        return [4 /*yield*/, this.ResourceRepository.find({
                                where: (_a = {},
                                    _a[this.Config.get('ACL.resource.prop.method')] = method,
                                    _a),
                                relations: [permissionEntity, permissionEntity + "." + this.groupEntityName],
                            })];
                    case 1:
                        resources = (_b.sent())
                            /** TODO: Aprender a mover a verificação de grupo para o método find do TypeORM */
                            .filter(function (i) {
                            return i[permissionEntity].filter(function (p) {
                                var _a;
                                return userGroupId.indexOf((_a = p[_this.groupEntityName]) === null || _a === void 0 ? void 0 : _a.id) !== -1;
                            }).length > 0;
                        });
                        resource = resources.filter(function (i) {
                            var url = new urlPattern_1.default(i.name);
                            return url.match(resourceName) !== null;
                        })[0];
                        // If you can't find permission, use the default
                        if (!resource) {
                            return [2 /*return*/, null];
                        }
                        allow = resource[permissionEntity].filter(function (i) { return i[allowProp] === true; }).length > 0;
                        deny = resource[permissionEntity].filter(function (i) { return i[allowProp] === false; }).length > 0;
                        // If denying, return true
                        // Otherwise, if releasing, returns false
                        // If nothing, return default null
                        if (deny)
                            return [2 /*return*/, false];
                        else if (allow)
                            return [2 /*return*/, true];
                        else
                            return [2 /*return*/, null];
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Returns if a resource is released for a user
     *
     * @param user The user id
     * @param resourceName The name of the resource
     * @param method The method used in the resource
     */
    Auth.prototype.resourcePermissionByUser = function (user, resourceName, method) {
        return __awaiter(this, void 0, void 0, function () {
            var userGroupEntity, permissionEntity, allowProp, resources, userResources, userResource, allow, deny;
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        userGroupEntity = inflection_1.default.pluralize(this.groupEntityName);
                        permissionEntity = inflection_1.default.pluralize(this.permissionEntityName);
                        allowProp = this.Config.get('ACL.permission.prop.allow');
                        return [4 /*yield*/, this.ResourceRepository.find({
                                where: (_a = {},
                                    _a[this.Config.get('ACL.resource.prop.method')] = method,
                                    _a),
                                relations: [permissionEntity, permissionEntity + "." + this.userEntityName],
                            })];
                    case 1:
                        resources = (_b.sent());
                        userResources = resources.filter(function (i) {
                            return i[permissionEntity].filter(function (p) {
                                var _a;
                                return user.id === ((_a = p[_this.userEntityName]) === null || _a === void 0 ? void 0 : _a.id);
                            }).length > 0;
                        });
                        userResource = userResources.filter(function (i) {
                            var url = new urlPattern_1.default(i.name);
                            return url.match(resourceName) !== null;
                        })[0];
                        if (userResource) {
                            allow = userResource[permissionEntity].filter(function (i) { return i[allowProp] === true; }).length > 0;
                            deny = userResource[permissionEntity].filter(function (i) { return i[allowProp] === false; }).length > 0;
                            // If denying, return true
                            // Otherwise, if releasing, returns false
                            // If nothing, return default null
                            if (deny)
                                return [2 /*return*/, false];
                            else if (allow)
                                return [2 /*return*/, true];
                        }
                        // Returns if you have permission in any of the groups
                        return [2 /*return*/, this.resourcePermissionByUserGroup(resourceName, method, user[userGroupEntity].map(function (i) { return i.id; }))];
                }
            });
        });
    };
    /** Create and return a code */
    Auth.prototype.generateCode = function () {
        return randomString_1.default(Config_1.default.get('code.length'), Config_1.default.get('code.type'));
    };
    return Auth;
}());
exports.default = new Auth();
