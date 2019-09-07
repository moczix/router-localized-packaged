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
     * Guard to make sure we have single initialization of forRoot
     * @type {InjectionToken<LocalizeRouterModule>}
     */
    var LOCALIZE_ROUTER_FORROOT_GUARD = new core.InjectionToken('LOCALIZE_ROUTER_FORROOT_GUARD');
    /**
     * Static provider for keeping track of routes
     * @type {InjectionToken<Routes[]>}
     */
    var RAW_ROUTES = new core.InjectionToken('RAW_ROUTES');
    /**
     * Namespace for fail proof access of CacheMechanism
     */

    (function (CacheMechanism) {
        CacheMechanism.LocalStorage = 'LocalStorage';
        CacheMechanism.Cookie = 'Cookie';
    })(exports.CacheMechanism || (exports.CacheMechanism = {}));
    /**
     * Boolean to indicate whether to use cached language value
     * @type {InjectionToken<boolean>}
     */
    var USE_CACHED_LANG = new core.InjectionToken('USE_CACHED_LANG');
    /**
     * Cache mechanism type
     * @type {InjectionToken<CacheMechanism>}
     */
    var CACHE_MECHANISM = new core.InjectionToken('CACHE_MECHANISM');
    /**
     * Cache name
     * @type {InjectionToken<string>}
     */
    var CACHE_NAME = new core.InjectionToken('CACHE_NAME');
    /**
     * Function for calculating default language
     * @type {InjectionToken<DefaultLanguageFunction>}
     */
    var DEFAULT_LANG_FUNCTION = new core.InjectionToken('DEFAULT_LANG_FUNCTION');
    /**
     * Boolean to indicate whether prefix should be set for single language scenarios
     * @type {InjectionToken<boolean>}
     */
    var ALWAYS_SET_PREFIX = new core.InjectionToken('ALWAYS_SET_PREFIX');
    var LOCALIZE_CACHE_NAME = 'LOCALIZE_DEFAULT_LANGUAGE';
    var LocalizeRouterSettings = /** @class */ (function () {
        /**
         * Settings for localize router
         * @param {boolean} useCachedLang
         * @param {boolean} alwaysSetPrefix
         * @param {CacheMechanism} cacheMechanism
         * @param {string} cacheName
         * @param {DefaultLanguageFunction} defaultLangFunction
         */
        function LocalizeRouterSettings(useCachedLang, alwaysSetPrefix, cacheMechanism, cacheName, defaultLangFunction) {
            if (useCachedLang === void 0) { useCachedLang = true; }
            if (alwaysSetPrefix === void 0) { alwaysSetPrefix = true; }
            if (cacheMechanism === void 0) { cacheMechanism = exports.CacheMechanism.LocalStorage; }
            if (cacheName === void 0) { cacheName = LOCALIZE_CACHE_NAME; }
            if (defaultLangFunction === void 0) { defaultLangFunction = void 0; }
            this.useCachedLang = useCachedLang;
            this.alwaysSetPrefix = alwaysSetPrefix;
            this.cacheMechanism = cacheMechanism;
            this.cacheName = cacheName;
            this.defaultLangFunction = defaultLangFunction;
        }
        /** @nocollapse */ LocalizeRouterSettings.ngInjectableDef = core.ɵɵdefineInjectable({ token: LocalizeRouterSettings, factory: function LocalizeRouterSettings_Factory(t) { return new (t || LocalizeRouterSettings)(core.ɵɵinject(USE_CACHED_LANG), core.ɵɵinject(ALWAYS_SET_PREFIX), core.ɵɵinject(CACHE_MECHANISM), core.ɵɵinject(CACHE_NAME), core.ɵɵinject(DEFAULT_LANG_FUNCTION)); }, providedIn: null });
        return LocalizeRouterSettings;
    }());
    /*@__PURE__*/ core.ɵsetClassMetadata(LocalizeRouterSettings, [{
            type: core.Injectable
        }], function () { return [{ type: undefined, decorators: [{
                    type: core.Inject,
                    args: [USE_CACHED_LANG]
                }] }, { type: undefined, decorators: [{
                    type: core.Inject,
                    args: [ALWAYS_SET_PREFIX]
                }] }, { type: exports.CacheMechanism, decorators: [{
                    type: core.Inject,
                    args: [CACHE_MECHANISM]
                }] }, { type: undefined, decorators: [{
                    type: core.Inject,
                    args: [CACHE_NAME]
                }] }, { type: undefined, decorators: [{
                    type: core.Inject,
                    args: [DEFAULT_LANG_FUNCTION]
                }] }]; }, null);

    var COOKIE_EXPIRY = 30; // 1 month
    /**
     * Abstract class for parsing localization
     */
    var LocalizeParser = /** @class */ (function () {
        /**
         * Loader constructor
         * @param translate
         * @param location
         * @param settings
         */
        function LocalizeParser(translate, location, settings) {
            this.translate = translate;
            this.location = location;
            this.settings = settings;
        }
        /**
         * Initialize language and routes
         * @param routes
         * @returns {Promise<any>}
         */
        LocalizeParser.prototype.init = function (routes) {
            var _a;
            this.routes = routes;
            if (!this.locales || !this.locales.length) {
                return Promise.resolve();
            }
            /** detect current language */
            var locationLang = this.getLocationLang();
            var browserLang = this._getBrowserLang();
            if (this.settings.defaultLangFunction) {
                this.defaultLang = this.settings.defaultLangFunction(this.locales, this._cachedLang, browserLang);
            }
            else {
                this.defaultLang = this._cachedLang || browserLang || this.locales[0];
            }
            var selectedLanguage = locationLang || this.defaultLang;
            this.translate.setDefaultLang(this.defaultLang);
            var children = [];
            /** if set prefix is enforced */
            if (this.settings.alwaysSetPrefix) {
                var baseRoute = { path: '', redirectTo: this.defaultLang, pathMatch: 'full' };
                /** extract potential wildcard route */
                var wildcardIndex = routes.findIndex(function (route) { return route.path === '**'; });
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
        LocalizeParser.prototype.initChildRoutes = function (routes) {
            this._translateRouteTree(routes);
            return routes;
        };
        LocalizeParser.prototype.mutateRouterRootRoute = function (currentLanguage, previousLanguage, routes) {
            var previousTranslatedLanguage = this.settings.alwaysSetPrefix || previousLanguage !== this.defaultLang ?
                previousLanguage : '';
            var currentTranslatedLanguage = this.settings.alwaysSetPrefix || currentLanguage !== this.defaultLang ?
                currentLanguage : '';
            var baseRoute = routes.find(function (route) { return route.path === previousTranslatedLanguage; });
            if (baseRoute) {
                baseRoute.path = currentTranslatedLanguage;
            }
        };
        /**
         * Translate routes to selected language
         * @param language
         * @returns {Promise<any>}
         */
        LocalizeParser.prototype.translateRoutes = function (language) {
            var _this = this;
            this.setRootLanguage(language);
            return this.translate.use(language)
                .pipe(operators.map(function (translations) {
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
            }));
        };
        LocalizeParser.prototype.setRootLanguage = function (language) {
            this._cachedLang = language;
            if (this._languageRoute) {
                this._languageRoute.path = this.settings.alwaysSetPrefix || language !== this.defaultLang ?
                    language : '';
            }
        };
        /**
         * Translate the route node and recursively call for all it's children
         * @param routes
         * @private
         */
        LocalizeParser.prototype._translateRouteTree = function (routes) {
            var _this = this;
            routes.forEach(function (route) {
                if (route.path && route.path !== '**') {
                    _this._translateProperty(route, 'path');
                }
                if (route.redirectTo) {
                    _this._translateProperty(route, 'redirectTo', !route.redirectTo.indexOf('/'));
                }
                if (route.children) {
                    _this._translateRouteTree(route.children);
                }
                if (route.loadChildren && route._loadedConfig) {
                    _this._translateRouteTree(route._loadedConfig.routes);
                }
            });
        };
        /**
         * Translate property
         * If first time translation then add original to route data object
         * @param route
         * @param property
         * @param prefixLang
         * @private
         */
        LocalizeParser.prototype._translateProperty = function (route, property, prefixLang) {
            // set property to data if not there yet
            var routeData = route.data = route.data || {};
            if (!routeData.localizeRouter) {
                routeData.localizeRouter = {};
            }
            if (!routeData.localizeRouter[property]) {
                routeData.localizeRouter[property] = route[property];
            }
            var result = this.translateRoute(routeData.localizeRouter[property]);
            route[property] = prefixLang ? "/" + this.urlPrefix + result : result;
        };
        Object.defineProperty(LocalizeParser.prototype, "urlPrefix", {
            get: function () {
                return this.settings.alwaysSetPrefix || this.currentLang !== this.defaultLang ? this.currentLang : '';
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Translate route and return observable
         * @param path
         * @returns {string}
         */
        LocalizeParser.prototype.translateRoute = function (path) {
            var _this = this;
            var queryParts = path.split('?');
            if (queryParts.length > 2) {
                throw 'There should be only one query parameter block in the URL';
            }
            var pathSegments = queryParts[0].split('/');
            /** collect observables  */
            return pathSegments
                .map(function (part) { return part.length ? _this.translateText(part) : part; })
                .join('/') +
                (queryParts.length > 1 ? "?" + queryParts[1] : '');
        };
        /**
         * Get language from url
         * @returns {string}
         * @private
         */
        LocalizeParser.prototype.getLocationLang = function (url) {
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
         * Get user's language set in the browser
         * @returns {string}
         * @private
         */
        LocalizeParser.prototype._getBrowserLang = function () {
            return this._returnIfInLocales(this.translate.getBrowserLang());
        };
        Object.defineProperty(LocalizeParser.prototype, "_cachedLang", {
            /**
             * Get language from local storage or cookie
             * @returns {string}
             * @private
             */
            get: function () {
                if (!this.settings.useCachedLang) {
                    return;
                }
                if (this.settings.cacheMechanism === exports.CacheMechanism.LocalStorage) {
                    return this._cacheWithLocalStorage();
                }
                if (this.settings.cacheMechanism === exports.CacheMechanism.Cookie) {
                    return this._cacheWithCookies();
                }
            },
            /**
             * Save language to local storage or cookie
             * @param value
             * @private
             */
            set: function (value) {
                if (!this.settings.useCachedLang) {
                    return;
                }
                if (this.settings.cacheMechanism === exports.CacheMechanism.LocalStorage) {
                    this._cacheWithLocalStorage(value);
                }
                if (this.settings.cacheMechanism === exports.CacheMechanism.Cookie) {
                    this._cacheWithCookies(value);
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Cache value to local storage
         * @param value
         * @returns {string}
         * @private
         */
        LocalizeParser.prototype._cacheWithLocalStorage = function (value) {
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
         * Cache value via cookies
         * @param value
         * @private
         */
        LocalizeParser.prototype._cacheWithCookies = function (value) {
            if (typeof document === 'undefined' || typeof document.cookie === 'undefined') {
                return;
            }
            try {
                var name_1 = encodeURIComponent(this.settings.cacheName);
                if (value) {
                    var d = new Date();
                    d.setTime(d.getTime() + COOKIE_EXPIRY * 86400000); // * days
                    document.cookie = name_1 + "=" + encodeURIComponent(value) + ";expires=" + d.toUTCString();
                    return;
                }
                var regexp = new RegExp('(?:^' + name_1 + '|;\\s*' + name_1 + ')=(.*?)(?:;|$)', 'g');
                var result = regexp.exec(document.cookie);
                return decodeURIComponent(result[1]);
            }
            catch (e) {
                return; // should not happen but better safe than sorry
            }
        };
        /**
         * Check if value exists in locales list
         * @param value
         * @returns {any}
         * @private
         */
        LocalizeParser.prototype._returnIfInLocales = function (value) {
            if (value && this.locales.indexOf(value) !== -1) {
                return value;
            }
            return null;
        };
        /**
         * Get translated value
         * @param key
         * @returns {any}
         */
        LocalizeParser.prototype.translateText = function (key) {
            if (!this._translationObject) {
                return key;
            }
            var prefixedKey = this.prefix + key;
            var res = this.translate.getParsedResult(this._translationObject, prefixedKey);
            // ignore non-translated text like 'ROUTES.home'
            if (res === prefixedKey) {
                return key;
            }
            return res || key;
        };
        LocalizeParser = __decorate([
            __param(0, core.Inject(core$1.TranslateService)),
            __param(1, core.Inject(common.Location)),
            __param(2, core.Inject(LocalizeRouterSettings)),
            __metadata("design:paramtypes", [core$1.TranslateService,
                common.Location,
                LocalizeRouterSettings])
        ], LocalizeParser);
        return LocalizeParser;
    }());
    /**
     * Manually set configuration
     */
    var ManualParserLoader = /** @class */ (function (_super) {
        __extends(ManualParserLoader, _super);
        /**
         * CTOR
         * @param translate
         * @param location
         * @param settings
         * @param locales
         * @param prefix
         */
        function ManualParserLoader(translate, location, settings, locales, prefix) {
            if (locales === void 0) { locales = ['en']; }
            if (prefix === void 0) { prefix = 'ROUTES.'; }
            var _this = _super.call(this, translate, location, settings) || this;
            _this.locales = locales;
            _this.prefix = prefix || '';
            return _this;
        }
        /**
         * Initialize or append routes
         * @param routes
         * @returns {Promise<any>}
         */
        ManualParserLoader.prototype.load = function (routes) {
            var _this = this;
            return new Promise(function (resolve) {
                _this.init(routes).then(resolve);
            });
        };
        return ManualParserLoader;
    }(LocalizeParser));
    var DummyLocalizeParser = /** @class */ (function (_super) {
        __extends(DummyLocalizeParser, _super);
        function DummyLocalizeParser() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DummyLocalizeParser.prototype.load = function (routes) {
            var _this = this;
            return new Promise(function (resolve) {
                _this.init(routes).then(resolve);
            });
        };
        return DummyLocalizeParser;
    }(LocalizeParser));

    /**
     * Localization service
     * modifyRoutes
     */
    var LocalizeRouterService = /** @class */ (function () {
        /**
         * CTOR
         * @param parser
         * @param settings
         * @param router
         */
        function LocalizeRouterService(parser, settings, router) {
            this.parser = parser;
            this.settings = settings;
            this.router = router;
            this.routerEvents = new rxjs.Subject();
        }
        /**
         * Start up the service
         */
        LocalizeRouterService.prototype.init = function () {
            this.router.resetConfig(this.parser.routes);
            // subscribe to router events
            this.router.events
                .pipe(operators.filter(function (event) { return event instanceof router.NavigationStart; }), operators.pairwise())
                .subscribe(this._routeChanged());
        };
        /**
         * Change language and navigate to translated route
         * @param lang
         */
        LocalizeRouterService.prototype.changeLanguage = function (lang) {
            var _this = this;
            if (lang !== this.parser.currentLang) {
                var rootSnapshot_1 = this.router.routerState.snapshot.root;
                this.parser
                    .translateRoutes(lang)
                    .pipe(
                // set new routes to router
                operators.tap(function () { return _this.router.resetConfig(_this.parser.routes); }))
                    .subscribe(function () {
                    var urlSegments = _this.traverseSnapshot(rootSnapshot_1, true).filter(function (path, i) {
                        return !i || path; // filter out empty paths
                    });
                    var navigationExtras = __assign({}, (rootSnapshot_1.queryParamMap.keys.length ? { queryParams: rootSnapshot_1.queryParams } : {}), (rootSnapshot_1.fragment ? { fragment: rootSnapshot_1.fragment } : {}));
                    // use navigate to keep extras unchanged
                    _this.router.navigate(urlSegments, navigationExtras);
                });
            }
        };
        /**
         * Traverses through the tree to assemble new translated url
         * @param snapshot
         * @param isRoot
         * @returns {string}
         */
        LocalizeRouterService.prototype.traverseSnapshot = function (snapshot, isRoot) {
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
            var urlPart = this.parseSegmentValue(snapshot);
            var outletChildren = snapshot.children.filter(function (child) { return child.outlet !== router.PRIMARY_OUTLET; });
            var outlets = outletChildren.reduce(function (acc, cur) {
                var _a;
                return ({
                    outlets: __assign({}, acc.outlets, (_a = {}, _a[cur.outlet] = _this.parseSegmentValue(cur), _a))
                });
            }, { outlets: {} });
            var primaryChild = snapshot.children.find(function (child) { return child.outlet === router.PRIMARY_OUTLET; });
            return __spread([
                urlPart
            ], (Object.keys(snapshot.params).length ? [snapshot.params] : []), (outletChildren.length ? [outlets] : []), (primaryChild ? this.traverseSnapshot(primaryChild) : []));
        };
        /**
         * Extracts new segment value based on routeConfig and url
         * @param snapshot
         * @returns {string}
         */
        LocalizeRouterService.prototype.parseSegmentValue = function (snapshot) {
            var _this = this;
            if (snapshot.routeConfig) {
                if (snapshot.routeConfig.path === '**') {
                    return this.parser.translateRoute(snapshot.url
                        .filter(function (segment) { return segment.path; })
                        .map(function (segment) { return segment.path; })
                        .join('/'));
                }
                else if (snapshot.routeConfig.data) {
                    var subPathSegments = snapshot.routeConfig.data.localizeRouter.path.split('/');
                    return subPathSegments
                        .map(function (s, i) { return (s.indexOf(':') === 0 ? snapshot.url[i].path : _this.parser.translateRoute(s)); })
                        .join('/');
                }
            }
            return '';
        };
        /**
         * Translate route to current language
         * If new language is explicitly provided then replace language part in url with new language
         * @param path
         * @returns {string | any[]}
         */
        LocalizeRouterService.prototype.translateRoute = function (path) {
            var _this = this;
            // path is null (e.g. resetting auxiliary outlet)
            if (!path) {
                return path;
            }
            if (typeof path === 'string') {
                var url = this.parser.translateRoute(path);
                return !path.indexOf('/') ? "/" + this.parser.urlPrefix + url : url;
            }
            // it's an array
            var result = [];
            path.forEach(function (segment, index) {
                if (typeof segment === 'string') {
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
            });
            return result;
        };
        /**
         * Event handler to react on route change
         * @returns {(event:any)=>void}
         * @private
         */
        LocalizeRouterService.prototype._routeChanged = function () {
            var _this = this;
            return function (_a) {
                var _b = __read(_a, 2), previousEvent = _b[0], currentEvent = _b[1];
                var previousLang = _this.parser.getLocationLang(previousEvent.url) || _this.parser.defaultLang;
                var currentLang = _this.parser.getLocationLang(currentEvent.url) || _this.parser.defaultLang;
                if (currentLang !== previousLang) {
                    // mutate router config directly to avoid getting out of sync
                    _this.parser.mutateRouterRootRoute(currentLang, previousLang, _this.router.config);
                    _this.parser
                        .translateRoutes(currentLang)
                        .pipe(
                    // reset routes again once they are all translated
                    operators.tap(function () { return _this.router.resetConfig(_this.parser.routes); }))
                        .subscribe(function () {
                        // Fire route change event
                        _this.routerEvents.next(currentLang);
                    });
                }
            };
        };
        /** @nocollapse */ LocalizeRouterService.ngInjectableDef = core.ɵɵdefineInjectable({ token: LocalizeRouterService, factory: function LocalizeRouterService_Factory(t) { return new (t || LocalizeRouterService)(core.ɵɵinject(LocalizeParser), core.ɵɵinject(LocalizeRouterSettings), core.ɵɵinject(router.Router)); }, providedIn: null });
        return LocalizeRouterService;
    }());
    /*@__PURE__*/ core.ɵsetClassMetadata(LocalizeRouterService, [{
            type: core.Injectable
        }], function () { return [{ type: LocalizeParser, decorators: [{
                    type: core.Inject,
                    args: [LocalizeParser]
                }] }, { type: LocalizeRouterSettings, decorators: [{
                    type: core.Inject,
                    args: [LocalizeRouterSettings]
                }] }, { type: router.Router, decorators: [{
                    type: core.Inject,
                    args: [router.Router]
                }] }]; }, null);

    /**
     * Compare if two objects are same
     * @param o1
     * @param o2
     * @returns {boolean}
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
        var t1 = typeof o1, t2 = typeof o2, length, key, keySet;
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

    var VIEW_DESTROYED_STATE = 128;
    var LocalizeRouterPipe = /** @class */ (function () {
        /**
         * CTOR
         * @param localize
         * @param _ref
         */
        function LocalizeRouterPipe(localize, _ref) {
            var _this = this;
            this.localize = localize;
            this._ref = _ref;
            this.value = '';
            this.subscription = this.localize.routerEvents.subscribe(function () {
                _this.transform(_this.lastKey);
            });
        }
        LocalizeRouterPipe.prototype.ngOnDestroy = function () {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
        };
        /**
         * Transform current url to localized one
         * @param query
         * @returns {string | any[]}
         */
        LocalizeRouterPipe.prototype.transform = function (query) {
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
            if (this._ref._view.state & VIEW_DESTROYED_STATE) {
                return this.value;
            }
            this._ref.detectChanges();
            return this.value;
        };
        /** @nocollapse */ LocalizeRouterPipe.ngPipeDef = core.ɵɵdefinePipe({ name: "localize", type: LocalizeRouterPipe, factory: function LocalizeRouterPipe_Factory(t) { return new (t || LocalizeRouterPipe)(core.ɵɵdirectiveInject(LocalizeRouterService), core.ɵɵinjectPipeChangeDetectorRef()); }, pure: false });
        return LocalizeRouterPipe;
    }());
    /*@__PURE__*/ core.ɵsetClassMetadata(LocalizeRouterPipe, [{
            type: core.Pipe,
            args: [{
                    name: 'localize',
                    pure: false // required to update the value when the promise is resolved
                }]
        }], function () { return [{ type: LocalizeRouterService }, { type: core.ChangeDetectorRef }]; }, null);

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
         * Extend load with custom functionality
         * @param {string} path
         * @returns {Promise<NgModuleFactory<any>>}
         */
        LocalizeRouterConfigLoader.prototype.load = function (path) {
            var _this = this;
            return _super.prototype.load.call(this, path).then(function (factory) {
                return {
                    moduleType: factory.moduleType,
                    create: function (parentInjector) {
                        var module = factory.create(parentInjector);
                        var getMethod = module.injector.get.bind(module.injector);
                        module.injector['get'] = function (token, notFoundValue) {
                            var getResult = getMethod(token, notFoundValue);
                            if (token === router.ROUTES) {
                                // translate lazy routes
                                return _this.localize.initChildRoutes([].concat.apply([], __spread(getResult)));
                            }
                            else {
                                return getResult;
                            }
                        };
                        return module;
                    }
                };
            });
        };
        /** @nocollapse */ LocalizeRouterConfigLoader.ngInjectableDef = core.ɵɵdefineInjectable({ token: LocalizeRouterConfigLoader, factory: function LocalizeRouterConfigLoader_Factory(t) { return new (t || LocalizeRouterConfigLoader)(core.ɵɵinject(core.forwardRef(function () { return LocalizeParser; })), core.ɵɵinject(core.Compiler), core.ɵɵinject(core.SystemJsNgModuleLoaderConfig, 8)); }, providedIn: null });
        return LocalizeRouterConfigLoader;
    }(core.SystemJsNgModuleLoader));
    /*@__PURE__*/ core.ɵsetClassMetadata(LocalizeRouterConfigLoader, [{
            type: core.Injectable
        }], function () { return [{ type: LocalizeParser, decorators: [{
                    type: core.Inject,
                    args: [core.forwardRef(function () { return LocalizeParser; })]
                }] }, { type: core.Compiler }, { type: core.SystemJsNgModuleLoaderConfig, decorators: [{
                    type: core.Optional
                }] }]; }, null);

    var ParserInitializer = /** @class */ (function () {
        /**
         * CTOR
         * @param injector
         */
        function ParserInitializer(injector) {
            this.injector = injector;
        }
        /**
         * @returns {Promise<any>}
         */
        ParserInitializer.prototype.appInitializer = function () {
            var _this = this;
            var res = this.parser.load(this.routes);
            res.then(function () {
                var localize = _this.injector.get(LocalizeRouterService);
                localize.init();
            });
            return res;
        };
        /**
         * @param parser
         * @param routes
         * @returns {()=>Promise<any>}
         */
        ParserInitializer.prototype.generateInitializer = function (parser, routes) {
            this.parser = parser;
            this.routes = routes.reduce(function (a, b) { return a.concat(b); });
            return this.appInitializer;
        };
        /** @nocollapse */ ParserInitializer.ngInjectableDef = core.ɵɵdefineInjectable({ token: ParserInitializer, factory: function ParserInitializer_Factory(t) { return new (t || ParserInitializer)(core.ɵɵinject(core.Injector)); }, providedIn: null });
        return ParserInitializer;
    }());
    /*@__PURE__*/ core.ɵsetClassMetadata(ParserInitializer, [{
            type: core.Injectable
        }], function () { return [{ type: core.Injector }]; }, null);
    /**
     * @param p
     * @param parser
     * @param routes
     * @returns {any}
     */
    function getAppInitializer(p, parser, routes) {
        return p.generateInitializer(parser, routes).bind(p);
    }
    var LocalizeRouterModule = /** @class */ (function () {
        function LocalizeRouterModule() {
        }
        LocalizeRouterModule.forRoot = function (routes, config) {
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
        LocalizeRouterModule.forChild = function (routes) {
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
        /** @nocollapse */ LocalizeRouterModule.ngModuleDef = core.ɵɵdefineNgModule({ type: LocalizeRouterModule });
        /** @nocollapse */ LocalizeRouterModule.ngInjectorDef = core.ɵɵdefineInjector({ factory: function LocalizeRouterModule_Factory(t) { return new (t || LocalizeRouterModule)(); }, imports: [[common.CommonModule, router.RouterModule, core$1.TranslateModule]] });
        return LocalizeRouterModule;
    }());
    /*@__PURE__*/ core.ɵɵsetNgModuleScope(LocalizeRouterModule, { declarations: [LocalizeRouterPipe], imports: [common.CommonModule, router.RouterModule, core$1.TranslateModule], exports: [LocalizeRouterPipe] });
    /*@__PURE__*/ core.ɵsetClassMetadata(LocalizeRouterModule, [{
            type: core.NgModule,
            args: [{
                    imports: [common.CommonModule, router.RouterModule, core$1.TranslateModule],
                    declarations: [LocalizeRouterPipe],
                    exports: [LocalizeRouterPipe]
                }]
        }], null, null);
    /**
     * @param localizeRouterModule
     * @returns {string}
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
