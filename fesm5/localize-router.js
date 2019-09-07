import { InjectionToken, Injectable, Inject, Pipe, ChangeDetectorRef, forwardRef, Compiler, SystemJsNgModuleLoaderConfig, Optional, SystemJsNgModuleLoader, Injector, SkipSelf, NgModuleFactoryLoader, APP_INITIALIZER, NgModule } from '@angular/core';
import { __spread, __extends, __assign, __read } from 'tslib';
import { NavigationStart, PRIMARY_OUTLET, Router, ROUTES, RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { map, filter, pairwise, tap } from 'rxjs/operators';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Location, CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var LOCALIZE_ROUTER_FORROOT_GUARD = new InjectionToken('LOCALIZE_ROUTER_FORROOT_GUARD');
/** @type {?} */
var RAW_ROUTES = new InjectionToken('RAW_ROUTES');
/** @enum {string} */
var CacheMechanismEnum = {
    LocalStorage: 'LocalStorage',
    Cookie: 'Cookie',
};
/**
 * Namespace for fail proof access of CacheMechanism
 * @type {?}
 */
var USE_CACHED_LANG = new InjectionToken('USE_CACHED_LANG');
/** @type {?} */
var CACHE_MECHANISM = new InjectionToken('CACHE_MECHANISM');
/** @type {?} */
var CACHE_NAME = new InjectionToken('CACHE_NAME');
/** @type {?} */
var DEFAULT_LANG_FUNCTION = new InjectionToken('DEFAULT_LANG_FUNCTION');
/** @type {?} */
var ALWAYS_SET_PREFIX = new InjectionToken('ALWAYS_SET_PREFIX');
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
        { type: Injectable }
    ];
    /** @nocollapse */
    LocalizeRouterSettings.ctorParameters = function () { return [
        { type: Boolean, decorators: [{ type: Inject, args: [USE_CACHED_LANG,] }] },
        { type: Boolean, decorators: [{ type: Inject, args: [ALWAYS_SET_PREFIX,] }] },
        { type: undefined, decorators: [{ type: Inject, args: [CACHE_MECHANISM,] }] },
        { type: String, decorators: [{ type: Inject, args: [CACHE_NAME,] }] },
        { type: undefined, decorators: [{ type: Inject, args: [DEFAULT_LANG_FUNCTION,] }] }
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
            .pipe(map((/**
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
        { type: TranslateService, decorators: [{ type: Inject, args: [TranslateService,] }] },
        { type: Location, decorators: [{ type: Inject, args: [Location,] }] },
        { type: LocalizeRouterSettings, decorators: [{ type: Inject, args: [LocalizeRouterSettings,] }] }
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
var  /**
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
        this.routerEvents = new Subject();
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
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return event instanceof NavigationStart; })), pairwise())
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
            tap((/**
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
        function (child) { return child.outlet !== PRIMARY_OUTLET; }));
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
        function (child) { return child.outlet === PRIMARY_OUTLET; }));
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
                tap((/**
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
        { type: Injectable }
    ];
    /** @nocollapse */
    LocalizeRouterService.ctorParameters = function () { return [
        { type: LocalizeParser, decorators: [{ type: Inject, args: [LocalizeParser,] }] },
        { type: LocalizeRouterSettings, decorators: [{ type: Inject, args: [LocalizeRouterSettings,] }] },
        { type: Router, decorators: [{ type: Inject, args: [Router,] }] }
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
        { type: Pipe, args: [{
                    name: 'localize',
                    pure: false // required to update the value when the promise is resolved
                },] }
    ];
    /** @nocollapse */
    LocalizeRouterPipe.ctorParameters = function () { return [
        { type: LocalizeRouterService },
        { type: ChangeDetectorRef }
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
                        if (token === ROUTES) {
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
        { type: Injectable }
    ];
    /** @nocollapse */
    LocalizeRouterConfigLoader.ctorParameters = function () { return [
        { type: LocalizeParser, decorators: [{ type: Inject, args: [forwardRef((/**
                         * @return {?}
                         */
                        function () { return LocalizeParser; })),] }] },
        { type: Compiler },
        { type: SystemJsNgModuleLoaderConfig, decorators: [{ type: Optional }] }
    ]; };
    return LocalizeRouterConfigLoader;
}(SystemJsNgModuleLoader));
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
        { type: Injectable }
    ];
    /** @nocollapse */
    ParserInitializer.ctorParameters = function () { return [
        { type: Injector }
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
                    deps: [[LocalizeRouterModule, new Optional(), new SkipSelf()]]
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
                { provide: NgModuleFactoryLoader, useClass: LocalizeRouterConfigLoader },
                {
                    provide: APP_INITIALIZER,
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
        { type: NgModule, args: [{
                    imports: [CommonModule, RouterModule, TranslateModule],
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { ALWAYS_SET_PREFIX, CACHE_MECHANISM, CACHE_NAME, CacheMechanismEnum, DEFAULT_LANG_FUNCTION, DummyLocalizeParser, LOCALIZE_ROUTER_FORROOT_GUARD, LocalizeParser, LocalizeRouterConfigLoader, LocalizeRouterModule, LocalizeRouterPipe, LocalizeRouterService, LocalizeRouterSettings, ManualParserLoader, ParserInitializer, RAW_ROUTES, USE_CACHED_LANG, getAppInitializer, provideForRootGuard };
//# sourceMappingURL=localize-router.js.map
