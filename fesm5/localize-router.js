import { InjectionToken, ɵɵdefineInjectable, ɵɵinject, ɵsetClassMetadata, Injectable, Inject, ɵɵdefinePipe, ɵɵdirectiveInject, ɵɵinjectPipeChangeDetectorRef, Pipe, ChangeDetectorRef, forwardRef, Compiler, SystemJsNgModuleLoaderConfig, SystemJsNgModuleLoader, Optional, Injector, SkipSelf, NgModuleFactoryLoader, APP_INITIALIZER, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule } from '@angular/core';
import { __spread, __decorate, __param, __metadata, __extends, __assign, __read } from 'tslib';
import { NavigationStart, PRIMARY_OUTLET, Router, ROUTES, RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { map, filter, pairwise, tap } from 'rxjs/operators';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Location, CommonModule } from '@angular/common';

/**
 * Guard to make sure we have single initialization of forRoot
 * @type {InjectionToken<LocalizeRouterModule>}
 */
var LOCALIZE_ROUTER_FORROOT_GUARD = new InjectionToken('LOCALIZE_ROUTER_FORROOT_GUARD');
/**
 * Static provider for keeping track of routes
 * @type {InjectionToken<Routes[]>}
 */
var RAW_ROUTES = new InjectionToken('RAW_ROUTES');
/**
 * Namespace for fail proof access of CacheMechanism
 */
var CacheMechanism;
(function (CacheMechanism) {
    CacheMechanism.LocalStorage = 'LocalStorage';
    CacheMechanism.Cookie = 'Cookie';
})(CacheMechanism || (CacheMechanism = {}));
/**
 * Boolean to indicate whether to use cached language value
 * @type {InjectionToken<boolean>}
 */
var USE_CACHED_LANG = new InjectionToken('USE_CACHED_LANG');
/**
 * Cache mechanism type
 * @type {InjectionToken<CacheMechanism>}
 */
var CACHE_MECHANISM = new InjectionToken('CACHE_MECHANISM');
/**
 * Cache name
 * @type {InjectionToken<string>}
 */
var CACHE_NAME = new InjectionToken('CACHE_NAME');
/**
 * Function for calculating default language
 * @type {InjectionToken<DefaultLanguageFunction>}
 */
var DEFAULT_LANG_FUNCTION = new InjectionToken('DEFAULT_LANG_FUNCTION');
/**
 * Boolean to indicate whether prefix should be set for single language scenarios
 * @type {InjectionToken<boolean>}
 */
var ALWAYS_SET_PREFIX = new InjectionToken('ALWAYS_SET_PREFIX');
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
        if (cacheMechanism === void 0) { cacheMechanism = CacheMechanism.LocalStorage; }
        if (cacheName === void 0) { cacheName = LOCALIZE_CACHE_NAME; }
        if (defaultLangFunction === void 0) { defaultLangFunction = void 0; }
        this.useCachedLang = useCachedLang;
        this.alwaysSetPrefix = alwaysSetPrefix;
        this.cacheMechanism = cacheMechanism;
        this.cacheName = cacheName;
        this.defaultLangFunction = defaultLangFunction;
    }
    /** @nocollapse */ LocalizeRouterSettings.ngInjectableDef = ɵɵdefineInjectable({ token: LocalizeRouterSettings, factory: function LocalizeRouterSettings_Factory(t) { return new (t || LocalizeRouterSettings)(ɵɵinject(USE_CACHED_LANG), ɵɵinject(ALWAYS_SET_PREFIX), ɵɵinject(CACHE_MECHANISM), ɵɵinject(CACHE_NAME), ɵɵinject(DEFAULT_LANG_FUNCTION)); }, providedIn: null });
    return LocalizeRouterSettings;
}());
/*@__PURE__*/ ɵsetClassMetadata(LocalizeRouterSettings, [{
        type: Injectable
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [USE_CACHED_LANG]
            }] }, { type: undefined, decorators: [{
                type: Inject,
                args: [ALWAYS_SET_PREFIX]
            }] }, { type: CacheMechanism, decorators: [{
                type: Inject,
                args: [CACHE_MECHANISM]
            }] }, { type: undefined, decorators: [{
                type: Inject,
                args: [CACHE_NAME]
            }] }, { type: undefined, decorators: [{
                type: Inject,
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
            .pipe(map(function (translations) {
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
            if (this.settings.cacheMechanism === CacheMechanism.LocalStorage) {
                return this._cacheWithLocalStorage();
            }
            if (this.settings.cacheMechanism === CacheMechanism.Cookie) {
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
            if (this.settings.cacheMechanism === CacheMechanism.LocalStorage) {
                this._cacheWithLocalStorage(value);
            }
            if (this.settings.cacheMechanism === CacheMechanism.Cookie) {
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
        __param(0, Inject(TranslateService)),
        __param(1, Inject(Location)),
        __param(2, Inject(LocalizeRouterSettings)),
        __metadata("design:paramtypes", [TranslateService,
            Location,
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
        this.routerEvents = new Subject();
    }
    /**
     * Start up the service
     */
    LocalizeRouterService.prototype.init = function () {
        this.router.resetConfig(this.parser.routes);
        // subscribe to router events
        this.router.events
            .pipe(filter(function (event) { return event instanceof NavigationStart; }), pairwise())
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
            tap(function () { return _this.router.resetConfig(_this.parser.routes); }))
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
        var outletChildren = snapshot.children.filter(function (child) { return child.outlet !== PRIMARY_OUTLET; });
        var outlets = outletChildren.reduce(function (acc, cur) {
            var _a;
            return ({
                outlets: __assign({}, acc.outlets, (_a = {}, _a[cur.outlet] = _this.parseSegmentValue(cur), _a))
            });
        }, { outlets: {} });
        var primaryChild = snapshot.children.find(function (child) { return child.outlet === PRIMARY_OUTLET; });
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
                tap(function () { return _this.router.resetConfig(_this.parser.routes); }))
                    .subscribe(function () {
                    // Fire route change event
                    _this.routerEvents.next(currentLang);
                });
            }
        };
    };
    /** @nocollapse */ LocalizeRouterService.ngInjectableDef = ɵɵdefineInjectable({ token: LocalizeRouterService, factory: function LocalizeRouterService_Factory(t) { return new (t || LocalizeRouterService)(ɵɵinject(LocalizeParser), ɵɵinject(LocalizeRouterSettings), ɵɵinject(Router)); }, providedIn: null });
    return LocalizeRouterService;
}());
/*@__PURE__*/ ɵsetClassMetadata(LocalizeRouterService, [{
        type: Injectable
    }], function () { return [{ type: LocalizeParser, decorators: [{
                type: Inject,
                args: [LocalizeParser]
            }] }, { type: LocalizeRouterSettings, decorators: [{
                type: Inject,
                args: [LocalizeRouterSettings]
            }] }, { type: Router, decorators: [{
                type: Inject,
                args: [Router]
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
    /** @nocollapse */ LocalizeRouterPipe.ngPipeDef = ɵɵdefinePipe({ name: "localize", type: LocalizeRouterPipe, factory: function LocalizeRouterPipe_Factory(t) { return new (t || LocalizeRouterPipe)(ɵɵdirectiveInject(LocalizeRouterService), ɵɵinjectPipeChangeDetectorRef()); }, pure: false });
    return LocalizeRouterPipe;
}());
/*@__PURE__*/ ɵsetClassMetadata(LocalizeRouterPipe, [{
        type: Pipe,
        args: [{
                name: 'localize',
                pure: false // required to update the value when the promise is resolved
            }]
    }], function () { return [{ type: LocalizeRouterService }, { type: ChangeDetectorRef }]; }, null);

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
                        if (token === ROUTES) {
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
    /** @nocollapse */ LocalizeRouterConfigLoader.ngInjectableDef = ɵɵdefineInjectable({ token: LocalizeRouterConfigLoader, factory: function LocalizeRouterConfigLoader_Factory(t) { return new (t || LocalizeRouterConfigLoader)(ɵɵinject(forwardRef(function () { return LocalizeParser; })), ɵɵinject(Compiler), ɵɵinject(SystemJsNgModuleLoaderConfig, 8)); }, providedIn: null });
    return LocalizeRouterConfigLoader;
}(SystemJsNgModuleLoader));
/*@__PURE__*/ ɵsetClassMetadata(LocalizeRouterConfigLoader, [{
        type: Injectable
    }], function () { return [{ type: LocalizeParser, decorators: [{
                type: Inject,
                args: [forwardRef(function () { return LocalizeParser; })]
            }] }, { type: Compiler }, { type: SystemJsNgModuleLoaderConfig, decorators: [{
                type: Optional
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
    /** @nocollapse */ ParserInitializer.ngInjectableDef = ɵɵdefineInjectable({ token: ParserInitializer, factory: function ParserInitializer_Factory(t) { return new (t || ParserInitializer)(ɵɵinject(Injector)); }, providedIn: null });
    return ParserInitializer;
}());
/*@__PURE__*/ ɵsetClassMetadata(ParserInitializer, [{
        type: Injectable
    }], function () { return [{ type: Injector }]; }, null);
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
    /** @nocollapse */ LocalizeRouterModule.ngModuleDef = ɵɵdefineNgModule({ type: LocalizeRouterModule });
    /** @nocollapse */ LocalizeRouterModule.ngInjectorDef = ɵɵdefineInjector({ factory: function LocalizeRouterModule_Factory(t) { return new (t || LocalizeRouterModule)(); }, imports: [[CommonModule, RouterModule, TranslateModule]] });
    return LocalizeRouterModule;
}());
/*@__PURE__*/ ɵɵsetNgModuleScope(LocalizeRouterModule, { declarations: [LocalizeRouterPipe], imports: [CommonModule, RouterModule, TranslateModule], exports: [LocalizeRouterPipe] });
/*@__PURE__*/ ɵsetClassMetadata(LocalizeRouterModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, RouterModule, TranslateModule],
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

/**
 * Generated bundle index. Do not edit.
 */

export { ALWAYS_SET_PREFIX, CACHE_MECHANISM, CACHE_NAME, CacheMechanism, DEFAULT_LANG_FUNCTION, DummyLocalizeParser, LOCALIZE_ROUTER_FORROOT_GUARD, LocalizeParser, LocalizeRouterConfigLoader, LocalizeRouterModule, LocalizeRouterPipe, LocalizeRouterService, LocalizeRouterSettings, ManualParserLoader, ParserInitializer, RAW_ROUTES, USE_CACHED_LANG, getAppInitializer, provideForRootGuard };
//# sourceMappingURL=localize-router.js.map
