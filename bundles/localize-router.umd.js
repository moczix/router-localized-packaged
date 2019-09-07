(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/router'), require('rxjs'), require('rxjs/operators'), require('@ngx-translate/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('localize-router', ['exports', '@angular/core', '@angular/router', 'rxjs', 'rxjs/operators', '@ngx-translate/core', '@angular/common'], factory) :
    (global = global || self, factory(global['localize-router'] = {}, global.ng.core, global.ng.router, global.rxjs, global.rxjs.operators, global.core$1, global.ng.common));
}(this, function (exports, core, router, rxjs, operators, core$1, common) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
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
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var LOCALIZE_ROUTER_FORROOT_GUARD = new core.InjectionToken('LOCALIZE_ROUTER_FORROOT_GUARD');
    /** @type {?} */
    var RAW_ROUTES = new core.InjectionToken('RAW_ROUTES');
    /** @enum {string} */
    var CacheMechanismEnum = {
        LocalStorage: 'LocalStorage',
        Cookie: 'Cookie',
    };
    /**
     * Namespace for fail proof access of CacheMechanism
     * @type {?}
     */
    var USE_CACHED_LANG = new core.InjectionToken('USE_CACHED_LANG');
    /** @type {?} */
    var CACHE_MECHANISM = new core.InjectionToken('CACHE_MECHANISM');
    /** @type {?} */
    var CACHE_NAME = new core.InjectionToken('CACHE_NAME');
    /** @type {?} */
    var DEFAULT_LANG_FUNCTION = new core.InjectionToken('DEFAULT_LANG_FUNCTION');
    /** @type {?} */
    var ALWAYS_SET_PREFIX = new core.InjectionToken('ALWAYS_SET_PREFIX');
    /**
     * Config interface for LocalizeRouter
     * @record
     */
    function LocalizeRouterConfig() { }
    if (false) {
        /** @type {?|undefined} */
        LocalizeRouterConfig.prototype.parser;
        /** @type {?|undefined} */
        LocalizeRouterConfig.prototype.useCachedLang;
        /** @type {?|undefined} */
        LocalizeRouterConfig.prototype.cacheMechanism;
        /** @type {?|undefined} */
        LocalizeRouterConfig.prototype.cacheName;
        /** @type {?|undefined} */
        LocalizeRouterConfig.prototype.defaultLangFunction;
        /** @type {?|undefined} */
        LocalizeRouterConfig.prototype.alwaysSetPrefix;
    }
    /** @type {?} */
    var LOCALIZE_CACHE_NAME = 'LOCALIZE_DEFAULT_LANGUAGE';
    var LocalizeRouterSettings = /** @class */ (function () {
        function LocalizeRouterSettings(useCachedLang, alwaysSetPrefix, cacheMechanism, cacheName, defaultLangFunction) {
            if (useCachedLang === void 0) { useCachedLang = true; }
            if (alwaysSetPrefix === void 0) { alwaysSetPrefix = true; }
            if (cacheMechanism === void 0) { cacheMechanism = CacheMechanismEnum.LocalStorage; }
            if (cacheName === void 0) { cacheName = LOCALIZE_CACHE_NAME; }
            if (defaultLangFunction === void 0) { defaultLangFunction = void 0; }
            this.useCachedLang = useCachedLang;
            this.alwaysSetPrefix = alwaysSetPrefix;
            this.cacheMechanism = cacheMechanism;
            this.cacheName = cacheName;
            this.defaultLangFunction = defaultLangFunction;
        }
        LocalizeRouterSettings.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        LocalizeRouterSettings.ctorParameters = function () { return [
            { type: Boolean, decorators: [{ type: core.Inject, args: [USE_CACHED_LANG,] }] },
            { type: Boolean, decorators: [{ type: core.Inject, args: [ALWAYS_SET_PREFIX,] }] },
            { type: undefined, decorators: [{ type: core.Inject, args: [CACHE_MECHANISM,] }] },
            { type: String, decorators: [{ type: core.Inject, args: [CACHE_NAME,] }] },
            { type: undefined, decorators: [{ type: core.Inject, args: [DEFAULT_LANG_FUNCTION,] }] }
        ]; };
        return LocalizeRouterSettings;
    }());
    if (false) {
        /** @type {?} */
        LocalizeRouterSettings.prototype.useCachedLang;
        /** @type {?} */
        LocalizeRouterSettings.prototype.alwaysSetPrefix;
        /** @type {?} */
        LocalizeRouterSettings.prototype.cacheMechanism;
        /** @type {?} */
        LocalizeRouterSettings.prototype.cacheName;
        /** @type {?} */
        LocalizeRouterSettings.prototype.defaultLangFunction;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var COOKIE_EXPIRY = 30;
    // 1 month
    /**
     * Abstract class for parsing localization
     * @abstract
     */
    var LocalizeParser = /** @class */ (function () {
        function LocalizeParser(translate, location, settings) {
            this.translate = translate;
            this.location = location;
            this.settings = settings;
        }
        /**
         * @protected
         * @param {?} routes
         * @return {?}
         */
        LocalizeParser.prototype.init = /**
         * @protected
         * @param {?} routes
         * @return {?}
         */
        function (routes) {
            var _a;
            this.routes = routes;
            if (!this.locales || !this.locales.length) {
                return Promise.resolve();
            }
            /**
             * detect current language
             * @type {?}
             */
            var locationLang = this.getLocationLang();
            /** @type {?} */
            var browserLang = this._getBrowserLang();
            if (this.settings.defaultLangFunction) {
                this.defaultLang = this.settings.defaultLangFunction(this.locales, this._cachedLang, browserLang);
            }
            else {
                this.defaultLang = this._cachedLang || browserLang || this.locales[0];
            }
            /** @type {?} */
            var selectedLanguage = locationLang || this.defaultLang;
            this.translate.setDefaultLang(this.defaultLang);
            /** @type {?} */
            var children = [];
            /** if set prefix is enforced */
            if (this.settings.alwaysSetPrefix) {
                /** @type {?} */
                var baseRoute = { path: '', redirectTo: this.defaultLang, pathMatch: 'full' };
                /**
                 * extract potential wildcard route
                 * @type {?}
                 */
                var wildcardIndex = routes.findIndex((/**
                 * @param {?} route
                 * @return {?}
                 */
                function (route) { return route.path === '**'; }));
                if (wildcardIndex !== -1) {
                    this._wildcardRoute = routes.splice(wildcardIndex, 1)[0];
                }
                children = this.routes.splice(0, this.routes.length, baseRoute);
            }
            else {
                children = this.routes.splice(0, this.routes.length);
            }
            /** exclude certain routes */
            for (var i = children.length - 1; i >= 0; i--) {
                if (children[i].data && children[i].data['skipRouteLocalization']) {
                    this.routes.push(children[i]);
                    children.splice(i, 1);
                }
            }
            /** append children routes */
            if (children && children.length) {
                if (this.locales.length > 1 || this.settings.alwaysSetPrefix) {
                    this._languageRoute = { children: children };
                    this.routes.unshift(this._languageRoute);
                }
                else {
                    (_a = this.routes).unshift.apply(_a, __spread(children));
                }
            }
            /** ...and potential wildcard route */
            if (this._wildcardRoute && this.settings.alwaysSetPrefix) {
                this.routes.push(this._wildcardRoute);
            }
            /** translate routes */
            return this.translateRoutes(selectedLanguage).toPromise();
        };
        /**
         * @param {?} routes
         * @return {?}
         */
        LocalizeParser.prototype.initChildRoutes = /**
         * @param {?} routes
         * @return {?}
         */
        function (routes) {
            this._translateRouteTree(routes);
            return routes;
        };
        /**
         * @param {?} currentLanguage
         * @param {?} previousLanguage
         * @param {?} routes
         * @return {?}
         */
        LocalizeParser.prototype.mutateRouterRootRoute = /**
         * @param {?} currentLanguage
         * @param {?} previousLanguage
         * @param {?} routes
         * @return {?}
         */
        function (currentLanguage, previousLanguage, routes) {
            /** @type {?} */
            var previousTranslatedLanguage = this.settings.alwaysSetPrefix || previousLanguage !== this.defaultLang ?
                previousLanguage : '';
            /** @type {?} */
            var currentTranslatedLanguage = this.settings.alwaysSetPrefix || currentLanguage !== this.defaultLang ?
                currentLanguage : '';
            /** @type {?} */
            var baseRoute = routes.find((/**
             * @param {?} route
             * @return {?}
             */
            function (route) { return route.path === previousTranslatedLanguage; }));
            if (baseRoute) {
                baseRoute.path = currentTranslatedLanguage;
            }
        };
        /**
         * @param {?} language
         * @return {?}
         */
        LocalizeParser.prototype.translateRoutes = /**
         * @param {?} language
         * @return {?}
         */
        function (language) {
            var _this = this;
            this.setRootLanguage(language);
            return this.translate.use(language)
                .pipe(operators.map((/**
             * @param {?} translations
             * @return {?}
             */
            function (translations) {
                _this._translationObject = translations;
                _this.currentLang = language;
                if (_this._languageRoute) {
                    _this._translateRouteTree(_this._languageRoute.children);
                    // if there is wildcard route
                    if (_this._wildcardRoute && _this._wildcardRoute.redirectTo) {
                        _this._translateProperty(_this._wildcardRoute, 'redirectTo', true);
                    }
                }
                else {
                    _this._translateRouteTree(_this.routes);
                }
            })));
        };
        /**
         * @private
         * @param {?} language
         * @return {?}
         */
        LocalizeParser.prototype.setRootLanguage = /**
         * @private
         * @param {?} language
         * @return {?}
         */
        function (language) {
            this._cachedLang = language;
            if (this._languageRoute) {
                this._languageRoute.path = this.settings.alwaysSetPrefix || language !== this.defaultLang ?
                    language : '';
            }
        };
        /**
         * @private
         * @param {?} routes
         * @return {?}
         */
        LocalizeParser.prototype._translateRouteTree = /**
         * @private
         * @param {?} routes
         * @return {?}
         */
        function (routes) {
            var _this = this;
            routes.forEach((/**
             * @param {?} route
             * @return {?}
             */
            function (route) {
                if (route.path && route.path !== '**') {
                    _this._translateProperty(route, 'path');
                }
                if (route.redirectTo) {
                    _this._translateProperty(route, 'redirectTo', !route.redirectTo.indexOf('/'));
                }
                if (route.children) {
                    _this._translateRouteTree(route.children);
                }
                if (route.loadChildren && ((/** @type {?} */ (route)))._loadedConfig) {
                    _this._translateRouteTree(((/** @type {?} */ (route)))._loadedConfig.routes);
                }
            }));
        };
        /**
         * @private
         * @param {?} route
         * @param {?} property
         * @param {?=} prefixLang
         * @return {?}
         */
        LocalizeParser.prototype._translateProperty = /**
         * @private
         * @param {?} route
         * @param {?} property
         * @param {?=} prefixLang
         * @return {?}
         */
        function (route, property, prefixLang) {
            // set property to data if not there yet
            /** @type {?} */
            var routeData = route.data = route.data || {};
            if (!routeData.localizeRouter) {
                routeData.localizeRouter = {};
            }
            if (!routeData.localizeRouter[property]) {
                routeData.localizeRouter[property] = ((/** @type {?} */ (route)))[property];
            }
            /** @type {?} */
            var result = this.translateRoute(routeData.localizeRouter[property]);
            ((/** @type {?} */ (route)))[property] = prefixLang ? "/" + this.urlPrefix + result : result;
        };
        Object.defineProperty(LocalizeParser.prototype, "urlPrefix", {
            get: /**
             * @return {?}
             */
            function () {
                return this.settings.alwaysSetPrefix || this.currentLang !== this.defaultLang ? this.currentLang : '';
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} path
         * @return {?}
         */
        LocalizeParser.prototype.translateRoute = /**
         * @param {?} path
         * @return {?}
         */
        function (path) {
            var _this = this;
            /** @type {?} */
            var queryParts = path.split('?');
            if (queryParts.length > 2) {
                throw 'There should be only one query parameter block in the URL';
            }
            /** @type {?} */
            var pathSegments = queryParts[0].split('/');
            /** collect observables  */
            return pathSegments
                .map((/**
             * @param {?} part
             * @return {?}
             */
            function (part) { return part.length ? _this.translateText(part) : part; }))
                .join('/') +
                (queryParts.length > 1 ? "?" + queryParts[1] : '');
        };
        /**
         * @param {?=} url
         * @return {?}
         */
        LocalizeParser.prototype.getLocationLang = /**
         * @param {?=} url
         * @return {?}
         */
        function (url) {
            /** @type {?} */
            var pathSlices = (url || this.location.path() || '')
                .split('#')[0]
                .split('?')[0]
                .split('/');
            if (pathSlices.length > 1 && this.locales.indexOf(pathSlices[1]) !== -1) {
                return pathSlices[1];
            }
            if (pathSlices.length && this.locales.indexOf(pathSlices[0]) !== -1) {
                return pathSlices[0];
            }
            return null;
        };
        /**
         * @private
         * @return {?}
         */
        LocalizeParser.prototype._getBrowserLang = /**
         * @private
         * @return {?}
         */
        function () {
            return this._returnIfInLocales(this.translate.getBrowserLang());
        };
        Object.defineProperty(LocalizeParser.prototype, "_cachedLang", {
            get: /**
             * @private
             * @return {?}
             */
            function () {
                if (!this.settings.useCachedLang) {
                    return;
                }
                if (this.settings.cacheMechanism === CacheMechanismEnum.LocalStorage) {
                    return this._cacheWithLocalStorage();
                }
                if (this.settings.cacheMechanism === CacheMechanismEnum.Cookie) {
                    return this._cacheWithCookies();
                }
            },
            set: /**
             * @private
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (!this.settings.useCachedLang) {
                    return;
                }
                if (this.settings.cacheMechanism === CacheMechanismEnum.LocalStorage) {
                    this._cacheWithLocalStorage(value);
                }
                if (this.settings.cacheMechanism === CacheMechanismEnum.Cookie) {
                    this._cacheWithCookies(value);
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         * @param {?=} value
         * @return {?}
         */
        LocalizeParser.prototype._cacheWithLocalStorage = /**
         * @private
         * @param {?=} value
         * @return {?}
         */
        function (value) {
            if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') {
                return;
            }
            try {
                if (value) {
                    window.localStorage.setItem(this.settings.cacheName, value);
                    return;
                }
                return this._returnIfInLocales(window.localStorage.getItem(this.settings.cacheName));
            }
            catch (e) {
                // weird Safari issue in private mode, where LocalStorage is defined but throws error on access
                return;
            }
        };
        /**
         * @private
         * @param {?=} value
         * @return {?}
         */
        LocalizeParser.prototype._cacheWithCookies = /**
         * @private
         * @param {?=} value
         * @return {?}
         */
        function (value) {
            if (typeof document === 'undefined' || typeof document.cookie === 'undefined') {
                return;
            }
            try {
                /** @type {?} */
                var name_1 = encodeURIComponent(this.settings.cacheName);
                if (value) {
                    /** @type {?} */
                    var d = new Date();
                    d.setTime(d.getTime() + COOKIE_EXPIRY * 86400000); // * days
                    document.cookie = name_1 + "=" + encodeURIComponent(value) + ";expires=" + d.toUTCString();
                    return;
                }
                /** @type {?} */
                var regexp = new RegExp('(?:^' + name_1 + '|;\\s*' + name_1 + ')=(.*?)(?:;|$)', 'g');
                /** @type {?} */
                var result = regexp.exec(document.cookie);
                return decodeURIComponent(result[1]);
            }
            catch (e) {
                return; // should not happen but better safe than sorry
            }
        };
        /**
         * @private
         * @param {?} value
         * @return {?}
         */
        LocalizeParser.prototype._returnIfInLocales = /**
         * @private
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value && this.locales.indexOf(value) !== -1) {
                return value;
            }
            return null;
        };
        /**
         * @private
         * @param {?} key
         * @return {?}
         */
        LocalizeParser.prototype.translateText = /**
         * @private
         * @param {?} key
         * @return {?}
         */
        function (key) {
            if (!this._translationObject) {
                return key;
            }
            /** @type {?} */
            var prefixedKey = this.prefix + key;
            /** @type {?} */
            var res = this.translate.getParsedResult(this._translationObject, prefixedKey);
            // ignore non-translated text like 'ROUTES.home'
            if (res === prefixedKey) {
                return key;
            }
            return res || key;
        };
        /** @nocollapse */
        LocalizeParser.ctorParameters = function () { return [
            { type: core$1.TranslateService, decorators: [{ type: core.Inject, args: [core$1.TranslateService,] }] },
            { type: common.Location, decorators: [{ type: core.Inject, args: [common.Location,] }] },
            { type: LocalizeRouterSettings, decorators: [{ type: core.Inject, args: [LocalizeRouterSettings,] }] }
        ]; };
        return LocalizeParser;
    }());
    if (false) {
        /** @type {?} */
        LocalizeParser.prototype.locales;
        /** @type {?} */
        LocalizeParser.prototype.currentLang;
        /** @type {?} */
        LocalizeParser.prototype.routes;
        /** @type {?} */
        LocalizeParser.prototype.defaultLang;
        /**
         * @type {?}
         * @protected
         */
        LocalizeParser.prototype.prefix;
        /**
         * @type {?}
         * @private
         */
        LocalizeParser.prototype._translationObject;
        /**
         * @type {?}
         * @private
         */
        LocalizeParser.prototype._wildcardRoute;
        /**
         * @type {?}
         * @private
         */
        LocalizeParser.prototype._languageRoute;
        /**
         * @type {?}
         * @private
         */
        LocalizeParser.prototype.translate;
        /**
         * @type {?}
         * @private
         */
        LocalizeParser.prototype.location;
        /**
         * @type {?}
         * @private
         */
        LocalizeParser.prototype.settings;
        /**
         * @abstract
         * @param {?} routes
         * @return {?}
         */
        LocalizeParser.prototype.load = function (routes) { };
    }
    /**
     * Manually set configuration
     */
    var   /**
     * Manually set configuration
     */
    ManualParserLoader = /** @class */ (function (_super) {
        __extends(ManualParserLoader, _super);
        function ManualParserLoader(translate, location, settings, locales, prefix) {
            if (locales === void 0) { locales = ['en']; }
            if (prefix === void 0) { prefix = 'ROUTES.'; }
            var _this = _super.call(this, translate, location, settings) || this;
            _this.locales = locales;
            _this.prefix = prefix || '';
            return _this;
        }
        /**
         * @param {?} routes
         * @return {?}
         */
        ManualParserLoader.prototype.load = /**
         * @param {?} routes
         * @return {?}
         */
        function (routes) {
            var _this = this;
            return new Promise((/**
             * @param {?} resolve
             * @return {?}
             */
            function (resolve) {
                _this.init(routes).then(resolve);
            }));
        };
        return ManualParserLoader;
    }(LocalizeParser));
    var DummyLocalizeParser = /** @class */ (function (_super) {
        __extends(DummyLocalizeParser, _super);
        function DummyLocalizeParser() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @param {?} routes
         * @return {?}
         */
        DummyLocalizeParser.prototype.load = /**
         * @param {?} routes
         * @return {?}
         */
        function (routes) {
            var _this = this;
            return new Promise((/**
             * @param {?} resolve
             * @return {?}
             */
            function (resolve) {
                _this.init(routes).then(resolve);
            }));
        };
        return DummyLocalizeParser;
    }(LocalizeParser));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Localization service
     * modifyRoutes
     */
    var LocalizeRouterService = /** @class */ (function () {
        function LocalizeRouterService(parser, settings, router) {
            this.parser = parser;
            this.settings = settings;
            this.router = router;
            this.routerEvents = new rxjs.Subject();
        }
        /**
         * Start up the service
         */
        /**
         * Start up the service
         * @return {?}
         */
        LocalizeRouterService.prototype.init = /**
         * Start up the service
         * @return {?}
         */
        function () {
            this.router.resetConfig(this.parser.routes);
            // subscribe to router events
            this.router.events
                .pipe(operators.filter((/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return event instanceof router.NavigationStart; })), operators.pairwise())
                .subscribe(this._routeChanged());
        };
        /**
         * @param {?} lang
         * @return {?}
         */
        LocalizeRouterService.prototype.changeLanguage = /**
         * @param {?} lang
         * @return {?}
         */
        function (lang) {
            var _this = this;
            if (lang !== this.parser.currentLang) {
                /** @type {?} */
                var rootSnapshot_1 = this.router.routerState.snapshot.root;
                this.parser
                    .translateRoutes(lang)
                    .pipe(
                // set new routes to router
                operators.tap((/**
                 * @return {?}
                 */
                function () { return _this.router.resetConfig(_this.parser.routes); })))
                    .subscribe((/**
                 * @return {?}
                 */
                function () {
                    /** @type {?} */
                    var urlSegments = _this.traverseSnapshot(rootSnapshot_1, true).filter((/**
                     * @param {?} path
                     * @param {?} i
                     * @return {?}
                     */
                    function (path, i) {
                        return !i || path; // filter out empty paths
                    }));
                    /** @type {?} */
                    var navigationExtras = __assign({}, (rootSnapshot_1.queryParamMap.keys.length ? { queryParams: rootSnapshot_1.queryParams } : {}), (rootSnapshot_1.fragment ? { fragment: rootSnapshot_1.fragment } : {}));
                    // use navigate to keep extras unchanged
                    _this.router.navigate(urlSegments, navigationExtras);
                }));
            }
        };
        /**
         * @private
         * @param {?} snapshot
         * @param {?=} isRoot
         * @return {?}
         */
        LocalizeRouterService.prototype.traverseSnapshot = /**
         * @private
         * @param {?} snapshot
         * @param {?=} isRoot
         * @return {?}
         */
        function (snapshot, isRoot) {
            var _this = this;
            if (isRoot === void 0) { isRoot = false; }
            if (isRoot) {
                if (!snapshot.firstChild) {
                    return [''];
                }
                if (this.settings.alwaysSetPrefix || this.parser.currentLang !== this.parser.defaultLang) {
                    return __spread(["/" + this.parser.currentLang], this.traverseSnapshot(snapshot.firstChild.firstChild));
                }
                else {
                    return __spread(this.traverseSnapshot(snapshot.firstChild.firstChild));
                }
            }
            /** @type {?} */
            var urlPart = this.parseSegmentValue(snapshot);
            /** @type {?} */
            var outletChildren = snapshot.children.filter((/**
             * @param {?} child
             * @return {?}
             */
            function (child) { return child.outlet !== router.PRIMARY_OUTLET; }));
            /** @type {?} */
            var outlets = outletChildren.reduce((/**
             * @param {?} acc
             * @param {?} cur
             * @return {?}
             */
            function (acc, cur) {
                var _a;
                return ({
                    outlets: __assign({}, acc.outlets, (_a = {}, _a[cur.outlet] = _this.parseSegmentValue(cur), _a))
                });
            }), { outlets: {} });
            /** @type {?} */
            var primaryChild = snapshot.children.find((/**
             * @param {?} child
             * @return {?}
             */
            function (child) { return child.outlet === router.PRIMARY_OUTLET; }));
            return __spread([
                urlPart
            ], (Object.keys(snapshot.params).length ? [snapshot.params] : []), (outletChildren.length ? [outlets] : []), (primaryChild ? this.traverseSnapshot(primaryChild) : []));
        };
        /**
         * @private
         * @param {?} snapshot
         * @return {?}
         */
        LocalizeRouterService.prototype.parseSegmentValue = /**
         * @private
         * @param {?} snapshot
         * @return {?}
         */
        function (snapshot) {
            var _this = this;
            if (snapshot.routeConfig) {
                if (snapshot.routeConfig.path === '**') {
                    return this.parser.translateRoute(snapshot.url
                        .filter((/**
                     * @param {?} segment
                     * @return {?}
                     */
                    function (segment) { return segment.path; }))
                        .map((/**
                     * @param {?} segment
                     * @return {?}
                     */
                    function (segment) { return segment.path; }))
                        .join('/'));
                }
                else if (snapshot.routeConfig.data) {
                    /** @type {?} */
                    var subPathSegments = snapshot.routeConfig.data.localizeRouter.path.split('/');
                    return subPathSegments
                        .map((/**
                     * @param {?} s
                     * @param {?} i
                     * @return {?}
                     */
                    function (s, i) { return (s.indexOf(':') === 0 ? snapshot.url[i].path : _this.parser.translateRoute(s)); }))
                        .join('/');
                }
            }
            return '';
        };
        /**
         * @param {?} path
         * @return {?}
         */
        LocalizeRouterService.prototype.translateRoute = /**
         * @param {?} path
         * @return {?}
         */
        function (path) {
            var _this = this;
            // path is null (e.g. resetting auxiliary outlet)
            if (!path) {
                return path;
            }
            if (typeof path === 'string') {
                /** @type {?} */
                var url = this.parser.translateRoute(path);
                return !path.indexOf('/') ? "/" + this.parser.urlPrefix + url : url;
            }
            // it's an array
            /** @type {?} */
            var result = [];
            ((/** @type {?} */ (path))).forEach((/**
             * @param {?} segment
             * @param {?} index
             * @return {?}
             */
            function (segment, index) {
                if (typeof segment === 'string') {
                    /** @type {?} */
                    var res = _this.parser.translateRoute(segment);
                    if (!index && !segment.indexOf('/')) {
                        result.push("/" + _this.parser.urlPrefix + res);
                    }
                    else {
                        result.push(res);
                    }
                }
                else {
                    // translate router outlets block
                    if (segment && segment.outlets) {
                        /** @type {?} */
                        var outlets = {};
                        for (var key in segment.outlets) {
                            if (segment.outlets.hasOwnProperty(key)) {
                                outlets[key] = _this.translateRoute(segment.outlets[key]);
                            }
                        }
                        result.push(__assign({}, segment, { outlets: outlets }));
                    }
                    else {
                        result.push(segment);
                    }
                }
            }));
            return result;
        };
        /**
         * @private
         * @return {?}
         */
        LocalizeRouterService.prototype._routeChanged = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            return (/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var _b = __read(_a, 2), previousEvent = _b[0], currentEvent = _b[1];
                /** @type {?} */
                var previousLang = _this.parser.getLocationLang(previousEvent.url) || _this.parser.defaultLang;
                /** @type {?} */
                var currentLang = _this.parser.getLocationLang(currentEvent.url) || _this.parser.defaultLang;
                if (currentLang !== previousLang) {
                    // mutate router config directly to avoid getting out of sync
                    _this.parser.mutateRouterRootRoute(currentLang, previousLang, _this.router.config);
                    _this.parser
                        .translateRoutes(currentLang)
                        .pipe(
                    // reset routes again once they are all translated
                    operators.tap((/**
                     * @return {?}
                     */
                    function () { return _this.router.resetConfig(_this.parser.routes); })))
                        .subscribe((/**
                     * @return {?}
                     */
                    function () {
                        // Fire route change event
                        _this.routerEvents.next(currentLang);
                    }));
                }
            });
        };
        LocalizeRouterService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        LocalizeRouterService.ctorParameters = function () { return [
            { type: LocalizeParser, decorators: [{ type: core.Inject, args: [LocalizeParser,] }] },
            { type: LocalizeRouterSettings, decorators: [{ type: core.Inject, args: [LocalizeRouterSettings,] }] },
            { type: router.Router, decorators: [{ type: core.Inject, args: [router.Router,] }] }
        ]; };
        return LocalizeRouterService;
    }());
    if (false) {
        /** @type {?} */
        LocalizeRouterService.prototype.routerEvents;
        /** @type {?} */
        LocalizeRouterService.prototype.parser;
        /** @type {?} */
        LocalizeRouterService.prototype.settings;
        /**
         * @type {?}
         * @private
         */
        LocalizeRouterService.prototype.router;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} o1
     * @param {?} o2
     * @return {?}
     */
    function equals(o1, o2) {
        if (o1 === o2) {
            return true;
        }
        if (o1 === null || o2 === null) {
            return false;
        }
        if (o1 !== o1 && o2 !== o2) {
            return true; // NaN === NaN
        }
        /** @type {?} */
        var t1 = typeof o1;
        /** @type {?} */
        var t2 = typeof o2;
        /** @type {?} */
        var length;
        /** @type {?} */
        var key;
        /** @type {?} */
        var keySet;
        if (t1 === t2 && t1 === 'object') {
            if (Array.isArray(o1)) {
                if (!Array.isArray(o2)) {
                    return false;
                }
                if ((length = o1.length) === o2.length) {
                    for (key = 0; key < length; key++) {
                        if (!equals(o1[key], o2[key])) {
                            return false;
                        }
                    }
                    return true;
                }
            }
            else {
                if (Array.isArray(o2)) {
                    return false;
                }
                keySet = Object.create(null);
                for (key in o1) {
                    if (o1.hasOwnProperty(key)) {
                        if (!equals(o1[key], o2[key])) {
                            return false;
                        }
                        keySet[key] = true;
                    }
                }
                for (key in o2) {
                    if (o2.hasOwnProperty(key)) {
                        if (!(key in keySet) && typeof o2[key] !== 'undefined') {
                            return false;
                        }
                    }
                }
                return true;
            }
        }
        return false;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var VIEW_DESTROYED_STATE = 128;
    var LocalizeRouterPipe = /** @class */ (function () {
        function LocalizeRouterPipe(localize, _ref) {
            var _this = this;
            this.localize = localize;
            this._ref = _ref;
            this.value = '';
            this.subscription = this.localize.routerEvents.subscribe((/**
             * @return {?}
             */
            function () {
                _this.transform(_this.lastKey);
            }));
        }
        /**
         * @return {?}
         */
        LocalizeRouterPipe.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
        };
        /**
         * @param {?} query
         * @return {?}
         */
        LocalizeRouterPipe.prototype.transform = /**
         * @param {?} query
         * @return {?}
         */
        function (query) {
            if (!query || query.length === 0 || !this.localize.parser.currentLang) {
                return query;
            }
            if (equals(query, this.lastKey) && equals(this.lastLanguage, this.localize.parser.currentLang)) {
                return this.value;
            }
            this.lastKey = query;
            this.lastLanguage = this.localize.parser.currentLang;
            /** translate key and update values */
            this.value = this.localize.translateRoute(query);
            this.lastKey = query;
            // if view is already destroyed, ignore firing change detection
            if (((/** @type {?} */ (this._ref)))._view.state & VIEW_DESTROYED_STATE) {
                return this.value;
            }
            this._ref.detectChanges();
            return this.value;
        };
        LocalizeRouterPipe.decorators = [
            { type: core.Pipe, args: [{
                        name: 'localize',
                        pure: false // required to update the value when the promise is resolved
                    },] }
        ];
        /** @nocollapse */
        LocalizeRouterPipe.ctorParameters = function () { return [
            { type: LocalizeRouterService },
            { type: core.ChangeDetectorRef }
        ]; };
        return LocalizeRouterPipe;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        LocalizeRouterPipe.prototype.value;
        /**
         * @type {?}
         * @private
         */
        LocalizeRouterPipe.prototype.lastKey;
        /**
         * @type {?}
         * @private
         */
        LocalizeRouterPipe.prototype.lastLanguage;
        /**
         * @type {?}
         * @private
         */
        LocalizeRouterPipe.prototype.subscription;
        /**
         * @type {?}
         * @private
         */
        LocalizeRouterPipe.prototype.localize;
        /**
         * @type {?}
         * @private
         */
        LocalizeRouterPipe.prototype._ref;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Extension of SystemJsNgModuleLoader to enable localization of route on lazy load
     */
    var LocalizeRouterConfigLoader = /** @class */ (function (_super) {
        __extends(LocalizeRouterConfigLoader, _super);
        function LocalizeRouterConfigLoader(localize, _compiler, config) {
            var _this = _super.call(this, _compiler, config) || this;
            _this.localize = localize;
            return _this;
        }
        /**
         * @param {?} path
         * @return {?}
         */
        LocalizeRouterConfigLoader.prototype.load = /**
         * @param {?} path
         * @return {?}
         */
        function (path) {
            var _this = this;
            return _super.prototype.load.call(this, path).then((/**
             * @param {?} factory
             * @return {?}
             */
            function (factory) {
                return {
                    moduleType: factory.moduleType,
                    create: (/**
                     * @param {?} parentInjector
                     * @return {?}
                     */
                    function (parentInjector) {
                        /** @type {?} */
                        var module = factory.create(parentInjector);
                        /** @type {?} */
                        var getMethod = module.injector.get.bind(module.injector);
                        module.injector['get'] = (/**
                         * @param {?} token
                         * @param {?} notFoundValue
                         * @return {?}
                         */
                        function (token, notFoundValue) {
                            /** @type {?} */
                            var getResult = getMethod(token, notFoundValue);
                            if (token === router.ROUTES) {
                                // translate lazy routes
                                return _this.localize.initChildRoutes([].concat.apply([], __spread(getResult)));
                            }
                            else {
                                return getResult;
                            }
                        });
                        return module;
                    })
                };
            }));
        };
        LocalizeRouterConfigLoader.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        LocalizeRouterConfigLoader.ctorParameters = function () { return [
            { type: LocalizeParser, decorators: [{ type: core.Inject, args: [core.forwardRef((/**
                             * @return {?}
                             */
                            function () { return LocalizeParser; })),] }] },
            { type: core.Compiler },
            { type: core.SystemJsNgModuleLoaderConfig, decorators: [{ type: core.Optional }] }
        ]; };
        return LocalizeRouterConfigLoader;
    }(core.SystemJsNgModuleLoader));
    if (false) {
        /**
         * @type {?}
         * @private
         */
        LocalizeRouterConfigLoader.prototype.localize;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ParserInitializer = /** @class */ (function () {
        function ParserInitializer(injector) {
            this.injector = injector;
        }
        /**
         * @return {?}
         */
        ParserInitializer.prototype.appInitializer = /**
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var res = this.parser.load(this.routes);
            res.then((/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var localize = _this.injector.get(LocalizeRouterService);
                localize.init();
            }));
            return res;
        };
        /**
         * @param {?} parser
         * @param {?} routes
         * @return {?}
         */
        ParserInitializer.prototype.generateInitializer = /**
         * @param {?} parser
         * @param {?} routes
         * @return {?}
         */
        function (parser, routes) {
            this.parser = parser;
            this.routes = routes.reduce((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            function (a, b) { return a.concat(b); }));
            return this.appInitializer;
        };
        ParserInitializer.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        ParserInitializer.ctorParameters = function () { return [
            { type: core.Injector }
        ]; };
        return ParserInitializer;
    }());
    if (false) {
        /** @type {?} */
        ParserInitializer.prototype.parser;
        /** @type {?} */
        ParserInitializer.prototype.routes;
        /**
         * @type {?}
         * @private
         */
        ParserInitializer.prototype.injector;
    }
    /**
     * @param {?} p
     * @param {?} parser
     * @param {?} routes
     * @return {?}
     */
    function getAppInitializer(p, parser, routes) {
        return p.generateInitializer(parser, routes).bind(p);
    }
    var LocalizeRouterModule = /** @class */ (function () {
        function LocalizeRouterModule() {
        }
        /**
         * @param {?} routes
         * @param {?=} config
         * @return {?}
         */
        LocalizeRouterModule.forRoot = /**
         * @param {?} routes
         * @param {?=} config
         * @return {?}
         */
        function (routes, config) {
            if (config === void 0) { config = {}; }
            return {
                ngModule: LocalizeRouterModule,
                providers: [
                    {
                        provide: LOCALIZE_ROUTER_FORROOT_GUARD,
                        useFactory: provideForRootGuard,
                        deps: [[LocalizeRouterModule, new core.Optional(), new core.SkipSelf()]]
                    },
                    { provide: USE_CACHED_LANG, useValue: config.useCachedLang },
                    { provide: ALWAYS_SET_PREFIX, useValue: config.alwaysSetPrefix },
                    { provide: CACHE_NAME, useValue: config.cacheName },
                    { provide: CACHE_MECHANISM, useValue: config.cacheMechanism },
                    { provide: DEFAULT_LANG_FUNCTION, useValue: config.defaultLangFunction },
                    LocalizeRouterSettings,
                    config.parser || { provide: LocalizeParser, useClass: DummyLocalizeParser },
                    {
                        provide: RAW_ROUTES,
                        multi: true,
                        useValue: routes
                    },
                    LocalizeRouterService,
                    ParserInitializer,
                    { provide: core.NgModuleFactoryLoader, useClass: LocalizeRouterConfigLoader },
                    {
                        provide: core.APP_INITIALIZER,
                        multi: true,
                        useFactory: getAppInitializer,
                        deps: [ParserInitializer, LocalizeParser, RAW_ROUTES]
                    }
                ]
            };
        };
        /**
         * @param {?} routes
         * @return {?}
         */
        LocalizeRouterModule.forChild = /**
         * @param {?} routes
         * @return {?}
         */
        function (routes) {
            return {
                ngModule: LocalizeRouterModule,
                providers: [
                    {
                        provide: RAW_ROUTES,
                        multi: true,
                        useValue: routes
                    }
                ]
            };
        };
        LocalizeRouterModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule, router.RouterModule, core$1.TranslateModule],
                        declarations: [LocalizeRouterPipe],
                        exports: [LocalizeRouterPipe]
                    },] }
        ];
        return LocalizeRouterModule;
    }());
    /**
     * @param {?} localizeRouterModule
     * @return {?}
     */
    function provideForRootGuard(localizeRouterModule) {
        if (localizeRouterModule) {
            throw new Error("LocalizeRouterModule.forRoot() called twice. Lazy loaded modules should use LocalizeRouterModule.forChild() instead.");
        }
        return 'guarded';
    }

    exports.ALWAYS_SET_PREFIX = ALWAYS_SET_PREFIX;
    exports.CACHE_MECHANISM = CACHE_MECHANISM;
    exports.CACHE_NAME = CACHE_NAME;
    exports.CacheMechanismEnum = CacheMechanismEnum;
    exports.DEFAULT_LANG_FUNCTION = DEFAULT_LANG_FUNCTION;
    exports.DummyLocalizeParser = DummyLocalizeParser;
    exports.LOCALIZE_ROUTER_FORROOT_GUARD = LOCALIZE_ROUTER_FORROOT_GUARD;
    exports.LocalizeParser = LocalizeParser;
    exports.LocalizeRouterConfigLoader = LocalizeRouterConfigLoader;
    exports.LocalizeRouterModule = LocalizeRouterModule;
    exports.LocalizeRouterPipe = LocalizeRouterPipe;
    exports.LocalizeRouterService = LocalizeRouterService;
    exports.LocalizeRouterSettings = LocalizeRouterSettings;
    exports.ManualParserLoader = ManualParserLoader;
    exports.ParserInitializer = ParserInitializer;
    exports.RAW_ROUTES = RAW_ROUTES;
    exports.USE_CACHED_LANG = USE_CACHED_LANG;
    exports.getAppInitializer = getAppInitializer;
    exports.provideForRootGuard = provideForRootGuard;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=localize-router.umd.js.map
