import { InjectionToken, Injectable, Inject, Pipe, ChangeDetectorRef, SystemJsNgModuleLoader, forwardRef, Compiler, SystemJsNgModuleLoaderConfig, Optional, Injector, SkipSelf, NgModuleFactoryLoader, APP_INITIALIZER, NgModule } from '@angular/core';
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
const LOCALIZE_ROUTER_FORROOT_GUARD = new InjectionToken('LOCALIZE_ROUTER_FORROOT_GUARD');
/** @type {?} */
const RAW_ROUTES = new InjectionToken('RAW_ROUTES');
/** @enum {string} */
const CacheMechanismEnum = {
    LocalStorage: 'LocalStorage',
    Cookie: 'Cookie',
};
/**
 * Namespace for fail proof access of CacheMechanism
 * @type {?}
 */
const USE_CACHED_LANG = new InjectionToken('USE_CACHED_LANG');
/** @type {?} */
const CACHE_MECHANISM = new InjectionToken('CACHE_MECHANISM');
/** @type {?} */
const CACHE_NAME = new InjectionToken('CACHE_NAME');
/** @type {?} */
const DEFAULT_LANG_FUNCTION = new InjectionToken('DEFAULT_LANG_FUNCTION');
/** @type {?} */
const ALWAYS_SET_PREFIX = new InjectionToken('ALWAYS_SET_PREFIX');
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
const LOCALIZE_CACHE_NAME = 'LOCALIZE_DEFAULT_LANGUAGE';
class LocalizeRouterSettings {
    /**
     * @param {?=} useCachedLang
     * @param {?=} alwaysSetPrefix
     * @param {?=} cacheMechanism
     * @param {?=} cacheName
     * @param {?=} defaultLangFunction
     */
    constructor(useCachedLang = true, alwaysSetPrefix = true, cacheMechanism = CacheMechanismEnum.LocalStorage, cacheName = LOCALIZE_CACHE_NAME, defaultLangFunction = void 0) {
        this.useCachedLang = useCachedLang;
        this.alwaysSetPrefix = alwaysSetPrefix;
        this.cacheMechanism = cacheMechanism;
        this.cacheName = cacheName;
        this.defaultLangFunction = defaultLangFunction;
    }
}
LocalizeRouterSettings.decorators = [
    { type: Injectable }
];
/** @nocollapse */
LocalizeRouterSettings.ctorParameters = () => [
    { type: Boolean, decorators: [{ type: Inject, args: [USE_CACHED_LANG,] }] },
    { type: Boolean, decorators: [{ type: Inject, args: [ALWAYS_SET_PREFIX,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [CACHE_MECHANISM,] }] },
    { type: String, decorators: [{ type: Inject, args: [CACHE_NAME,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [DEFAULT_LANG_FUNCTION,] }] }
];
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
const COOKIE_EXPIRY = 30;
// 1 month
/**
 * Abstract class for parsing localization
 * @abstract
 */
class LocalizeParser {
    /**
     * @param {?} translate
     * @param {?} location
     * @param {?} settings
     */
    constructor(translate, location, settings) {
        this.translate = translate;
        this.location = location;
        this.settings = settings;
    }
    /**
     * @protected
     * @param {?} routes
     * @return {?}
     */
    init(routes) {
        this.routes = routes;
        if (!this.locales || !this.locales.length) {
            return Promise.resolve();
        }
        /**
         * detect current language
         * @type {?}
         */
        const locationLang = this.getLocationLang();
        /** @type {?} */
        const browserLang = this._getBrowserLang();
        if (this.settings.defaultLangFunction) {
            this.defaultLang = this.settings.defaultLangFunction(this.locales, this._cachedLang, browserLang);
        }
        else {
            this.defaultLang = this._cachedLang || browserLang || this.locales[0];
        }
        /** @type {?} */
        const selectedLanguage = locationLang || this.defaultLang;
        this.translate.setDefaultLang(this.defaultLang);
        /** @type {?} */
        let children = [];
        /** if set prefix is enforced */
        if (this.settings.alwaysSetPrefix) {
            /** @type {?} */
            const baseRoute = { path: '', redirectTo: this.defaultLang, pathMatch: 'full' };
            /**
             * extract potential wildcard route
             * @type {?}
             */
            const wildcardIndex = routes.findIndex((/**
             * @param {?} route
             * @return {?}
             */
            (route) => route.path === '**'));
            if (wildcardIndex !== -1) {
                this._wildcardRoute = routes.splice(wildcardIndex, 1)[0];
            }
            children = this.routes.splice(0, this.routes.length, baseRoute);
        }
        else {
            children = this.routes.splice(0, this.routes.length);
        }
        /** exclude certain routes */
        for (let i = children.length - 1; i >= 0; i--) {
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
                this.routes.unshift(...children);
            }
        }
        /** ...and potential wildcard route */
        if (this._wildcardRoute && this.settings.alwaysSetPrefix) {
            this.routes.push(this._wildcardRoute);
        }
        /** translate routes */
        return this.translateRoutes(selectedLanguage).toPromise();
    }
    /**
     * @param {?} routes
     * @return {?}
     */
    initChildRoutes(routes) {
        this._translateRouteTree(routes);
        return routes;
    }
    /**
     * @param {?} currentLanguage
     * @param {?} previousLanguage
     * @param {?} routes
     * @return {?}
     */
    mutateRouterRootRoute(currentLanguage, previousLanguage, routes) {
        /** @type {?} */
        const previousTranslatedLanguage = this.settings.alwaysSetPrefix || previousLanguage !== this.defaultLang ?
            previousLanguage : '';
        /** @type {?} */
        const currentTranslatedLanguage = this.settings.alwaysSetPrefix || currentLanguage !== this.defaultLang ?
            currentLanguage : '';
        /** @type {?} */
        const baseRoute = routes.find((/**
         * @param {?} route
         * @return {?}
         */
        route => route.path === previousTranslatedLanguage));
        if (baseRoute) {
            baseRoute.path = currentTranslatedLanguage;
        }
    }
    /**
     * @param {?} language
     * @return {?}
     */
    translateRoutes(language) {
        this.setRootLanguage(language);
        return this.translate.use(language)
            .pipe(map((/**
         * @param {?} translations
         * @return {?}
         */
        translations => {
            this._translationObject = translations;
            this.currentLang = language;
            if (this._languageRoute) {
                this._translateRouteTree(this._languageRoute.children);
                // if there is wildcard route
                if (this._wildcardRoute && this._wildcardRoute.redirectTo) {
                    this._translateProperty(this._wildcardRoute, 'redirectTo', true);
                }
            }
            else {
                this._translateRouteTree(this.routes);
            }
        })));
    }
    /**
     * @private
     * @param {?} language
     * @return {?}
     */
    setRootLanguage(language) {
        this._cachedLang = language;
        if (this._languageRoute) {
            this._languageRoute.path = this.settings.alwaysSetPrefix || language !== this.defaultLang ?
                language : '';
        }
    }
    /**
     * @private
     * @param {?} routes
     * @return {?}
     */
    _translateRouteTree(routes) {
        routes.forEach((/**
         * @param {?} route
         * @return {?}
         */
        (route) => {
            if (route.path && route.path !== '**') {
                this._translateProperty(route, 'path');
            }
            if (route.redirectTo) {
                this._translateProperty(route, 'redirectTo', !route.redirectTo.indexOf('/'));
            }
            if (route.children) {
                this._translateRouteTree(route.children);
            }
            if (route.loadChildren && ((/** @type {?} */ (route)))._loadedConfig) {
                this._translateRouteTree(((/** @type {?} */ (route)))._loadedConfig.routes);
            }
        }));
    }
    /**
     * @private
     * @param {?} route
     * @param {?} property
     * @param {?=} prefixLang
     * @return {?}
     */
    _translateProperty(route, property, prefixLang) {
        // set property to data if not there yet
        /** @type {?} */
        const routeData = route.data = route.data || {};
        if (!routeData.localizeRouter) {
            routeData.localizeRouter = {};
        }
        if (!routeData.localizeRouter[property]) {
            routeData.localizeRouter[property] = ((/** @type {?} */ (route)))[property];
        }
        /** @type {?} */
        const result = this.translateRoute(routeData.localizeRouter[property]);
        ((/** @type {?} */ (route)))[property] = prefixLang ? `/${this.urlPrefix}${result}` : result;
    }
    /**
     * @return {?}
     */
    get urlPrefix() {
        return this.settings.alwaysSetPrefix || this.currentLang !== this.defaultLang ? this.currentLang : '';
    }
    /**
     * @param {?} path
     * @return {?}
     */
    translateRoute(path) {
        /** @type {?} */
        const queryParts = path.split('?');
        if (queryParts.length > 2) {
            throw 'There should be only one query parameter block in the URL';
        }
        /** @type {?} */
        const pathSegments = queryParts[0].split('/');
        /** collect observables  */
        return pathSegments
            .map((/**
         * @param {?} part
         * @return {?}
         */
        (part) => part.length ? this.translateText(part) : part))
            .join('/') +
            (queryParts.length > 1 ? `?${queryParts[1]}` : '');
    }
    /**
     * @param {?=} url
     * @return {?}
     */
    getLocationLang(url) {
        /** @type {?} */
        const pathSlices = (url || this.location.path() || '')
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
    }
    /**
     * @private
     * @return {?}
     */
    _getBrowserLang() {
        return this._returnIfInLocales(this.translate.getBrowserLang());
    }
    /**
     * @private
     * @return {?}
     */
    get _cachedLang() {
        if (!this.settings.useCachedLang) {
            return;
        }
        if (this.settings.cacheMechanism === CacheMechanismEnum.LocalStorage) {
            return this._cacheWithLocalStorage();
        }
        if (this.settings.cacheMechanism === CacheMechanismEnum.Cookie) {
            return this._cacheWithCookies();
        }
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    set _cachedLang(value) {
        if (!this.settings.useCachedLang) {
            return;
        }
        if (this.settings.cacheMechanism === CacheMechanismEnum.LocalStorage) {
            this._cacheWithLocalStorage(value);
        }
        if (this.settings.cacheMechanism === CacheMechanismEnum.Cookie) {
            this._cacheWithCookies(value);
        }
    }
    /**
     * @private
     * @param {?=} value
     * @return {?}
     */
    _cacheWithLocalStorage(value) {
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
    }
    /**
     * @private
     * @param {?=} value
     * @return {?}
     */
    _cacheWithCookies(value) {
        if (typeof document === 'undefined' || typeof document.cookie === 'undefined') {
            return;
        }
        try {
            /** @type {?} */
            const name = encodeURIComponent(this.settings.cacheName);
            if (value) {
                /** @type {?} */
                const d = new Date();
                d.setTime(d.getTime() + COOKIE_EXPIRY * 86400000); // * days
                document.cookie = `${name}=${encodeURIComponent(value)};expires=${d.toUTCString()}`;
                return;
            }
            /** @type {?} */
            const regexp = new RegExp('(?:^' + name + '|;\\s*' + name + ')=(.*?)(?:;|$)', 'g');
            /** @type {?} */
            const result = regexp.exec(document.cookie);
            return decodeURIComponent(result[1]);
        }
        catch (e) {
            return; // should not happen but better safe than sorry
        }
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    _returnIfInLocales(value) {
        if (value && this.locales.indexOf(value) !== -1) {
            return value;
        }
        return null;
    }
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    translateText(key) {
        if (!this._translationObject) {
            return key;
        }
        /** @type {?} */
        const prefixedKey = this.prefix + key;
        /** @type {?} */
        const res = this.translate.getParsedResult(this._translationObject, prefixedKey);
        // ignore non-translated text like 'ROUTES.home'
        if (res === prefixedKey) {
            return key;
        }
        return res || key;
    }
}
/** @nocollapse */
LocalizeParser.ctorParameters = () => [
    { type: TranslateService, decorators: [{ type: Inject, args: [TranslateService,] }] },
    { type: Location, decorators: [{ type: Inject, args: [Location,] }] },
    { type: LocalizeRouterSettings, decorators: [{ type: Inject, args: [LocalizeRouterSettings,] }] }
];
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
class ManualParserLoader extends LocalizeParser {
    /**
     * @param {?} translate
     * @param {?} location
     * @param {?} settings
     * @param {?=} locales
     * @param {?=} prefix
     */
    constructor(translate, location, settings, locales = ['en'], prefix = 'ROUTES.') {
        super(translate, location, settings);
        this.locales = locales;
        this.prefix = prefix || '';
    }
    /**
     * @param {?} routes
     * @return {?}
     */
    load(routes) {
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        (resolve) => {
            this.init(routes).then(resolve);
        }));
    }
}
class DummyLocalizeParser extends LocalizeParser {
    /**
     * @param {?} routes
     * @return {?}
     */
    load(routes) {
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        (resolve) => {
            this.init(routes).then(resolve);
        }));
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Localization service
 * modifyRoutes
 */
class LocalizeRouterService {
    /**
     * @param {?} parser
     * @param {?} settings
     * @param {?} router
     */
    constructor(parser, settings, router) {
        this.parser = parser;
        this.settings = settings;
        this.router = router;
        this.routerEvents = new Subject();
    }
    /**
     * Start up the service
     * @return {?}
     */
    init() {
        this.router.resetConfig(this.parser.routes);
        // subscribe to router events
        this.router.events
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        (event) => event instanceof NavigationStart)), pairwise())
            .subscribe(this._routeChanged());
    }
    /**
     * @param {?} lang
     * @return {?}
     */
    changeLanguage(lang) {
        if (lang !== this.parser.currentLang) {
            /** @type {?} */
            const rootSnapshot = this.router.routerState.snapshot.root;
            this.parser
                .translateRoutes(lang)
                .pipe(
            // set new routes to router
            tap((/**
             * @return {?}
             */
            () => this.router.resetConfig(this.parser.routes))))
                .subscribe((/**
             * @return {?}
             */
            () => {
                /** @type {?} */
                const urlSegments = this.traverseSnapshot(rootSnapshot, true).filter((/**
                 * @param {?} path
                 * @param {?} i
                 * @return {?}
                 */
                (path, i) => {
                    return !i || path; // filter out empty paths
                }));
                /** @type {?} */
                const navigationExtras = Object.assign({}, (rootSnapshot.queryParamMap.keys.length ? { queryParams: rootSnapshot.queryParams } : {}), (rootSnapshot.fragment ? { fragment: rootSnapshot.fragment } : {}));
                // use navigate to keep extras unchanged
                this.router.navigate(urlSegments, navigationExtras);
            }));
        }
    }
    /**
     * @private
     * @param {?} snapshot
     * @param {?=} isRoot
     * @return {?}
     */
    traverseSnapshot(snapshot, isRoot = false) {
        if (isRoot) {
            if (!snapshot.firstChild) {
                return [''];
            }
            if (this.settings.alwaysSetPrefix || this.parser.currentLang !== this.parser.defaultLang) {
                return [`/${this.parser.currentLang}`, ...this.traverseSnapshot(snapshot.firstChild.firstChild)];
            }
            else {
                return [...this.traverseSnapshot(snapshot.firstChild.firstChild)];
            }
        }
        /** @type {?} */
        const urlPart = this.parseSegmentValue(snapshot);
        /** @type {?} */
        const outletChildren = snapshot.children.filter((/**
         * @param {?} child
         * @return {?}
         */
        (child) => child.outlet !== PRIMARY_OUTLET));
        /** @type {?} */
        const outlets = outletChildren.reduce((/**
         * @param {?} acc
         * @param {?} cur
         * @return {?}
         */
        (acc, cur) => ({
            outlets: Object.assign({}, acc.outlets, { [cur.outlet]: this.parseSegmentValue(cur) })
        })), { outlets: {} });
        /** @type {?} */
        const primaryChild = snapshot.children.find((/**
         * @param {?} child
         * @return {?}
         */
        (child) => child.outlet === PRIMARY_OUTLET));
        return [
            urlPart,
            ...(Object.keys(snapshot.params).length ? [snapshot.params] : []),
            ...(outletChildren.length ? [outlets] : []),
            ...(primaryChild ? this.traverseSnapshot(primaryChild) : [])
        ];
    }
    /**
     * @private
     * @param {?} snapshot
     * @return {?}
     */
    parseSegmentValue(snapshot) {
        if (snapshot.routeConfig) {
            if (snapshot.routeConfig.path === '**') {
                return this.parser.translateRoute(snapshot.url
                    .filter((/**
                 * @param {?} segment
                 * @return {?}
                 */
                (segment) => segment.path))
                    .map((/**
                 * @param {?} segment
                 * @return {?}
                 */
                (segment) => segment.path))
                    .join('/'));
            }
            else if (snapshot.routeConfig.data) {
                /** @type {?} */
                const subPathSegments = snapshot.routeConfig.data.localizeRouter.path.split('/');
                return subPathSegments
                    .map((/**
                 * @param {?} s
                 * @param {?} i
                 * @return {?}
                 */
                (s, i) => (s.indexOf(':') === 0 ? snapshot.url[i].path : this.parser.translateRoute(s))))
                    .join('/');
            }
        }
        return '';
    }
    /**
     * @param {?} path
     * @return {?}
     */
    translateRoute(path) {
        // path is null (e.g. resetting auxiliary outlet)
        if (!path) {
            return path;
        }
        if (typeof path === 'string') {
            /** @type {?} */
            const url = this.parser.translateRoute(path);
            return !path.indexOf('/') ? `/${this.parser.urlPrefix}${url}` : url;
        }
        // it's an array
        /** @type {?} */
        let result = [];
        ((/** @type {?} */ (path))).forEach((/**
         * @param {?} segment
         * @param {?} index
         * @return {?}
         */
        (segment, index) => {
            if (typeof segment === 'string') {
                /** @type {?} */
                const res = this.parser.translateRoute(segment);
                if (!index && !segment.indexOf('/')) {
                    result.push(`/${this.parser.urlPrefix}${res}`);
                }
                else {
                    result.push(res);
                }
            }
            else {
                // translate router outlets block
                if (segment && segment.outlets) {
                    /** @type {?} */
                    let outlets = {};
                    for (let key in segment.outlets) {
                        if (segment.outlets.hasOwnProperty(key)) {
                            outlets[key] = this.translateRoute(segment.outlets[key]);
                        }
                    }
                    result.push(Object.assign({}, segment, { outlets: outlets }));
                }
                else {
                    result.push(segment);
                }
            }
        }));
        return result;
    }
    /**
     * @private
     * @return {?}
     */
    _routeChanged() {
        return (/**
         * @param {?} __0
         * @return {?}
         */
        ([previousEvent, currentEvent]) => {
            /** @type {?} */
            const previousLang = this.parser.getLocationLang(previousEvent.url) || this.parser.defaultLang;
            /** @type {?} */
            const currentLang = this.parser.getLocationLang(currentEvent.url) || this.parser.defaultLang;
            if (currentLang !== previousLang) {
                // mutate router config directly to avoid getting out of sync
                this.parser.mutateRouterRootRoute(currentLang, previousLang, this.router.config);
                this.parser
                    .translateRoutes(currentLang)
                    .pipe(
                // reset routes again once they are all translated
                tap((/**
                 * @return {?}
                 */
                () => this.router.resetConfig(this.parser.routes))))
                    .subscribe((/**
                 * @return {?}
                 */
                () => {
                    // Fire route change event
                    this.routerEvents.next(currentLang);
                }));
            }
        });
    }
}
LocalizeRouterService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
LocalizeRouterService.ctorParameters = () => [
    { type: LocalizeParser, decorators: [{ type: Inject, args: [LocalizeParser,] }] },
    { type: LocalizeRouterSettings, decorators: [{ type: Inject, args: [LocalizeRouterSettings,] }] },
    { type: Router, decorators: [{ type: Inject, args: [Router,] }] }
];
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
    let t1 = typeof o1;
    /** @type {?} */
    let t2 = typeof o2;
    /** @type {?} */
    let length;
    /** @type {?} */
    let key;
    /** @type {?} */
    let keySet;
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
const VIEW_DESTROYED_STATE = 128;
class LocalizeRouterPipe {
    /**
     * @param {?} localize
     * @param {?} _ref
     */
    constructor(localize, _ref) {
        this.localize = localize;
        this._ref = _ref;
        this.value = '';
        this.subscription = this.localize.routerEvents.subscribe((/**
         * @return {?}
         */
        () => {
            this.transform(this.lastKey);
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    /**
     * @param {?} query
     * @return {?}
     */
    transform(query) {
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
    }
}
LocalizeRouterPipe.decorators = [
    { type: Pipe, args: [{
                name: 'localize',
                pure: false // required to update the value when the promise is resolved
            },] }
];
/** @nocollapse */
LocalizeRouterPipe.ctorParameters = () => [
    { type: LocalizeRouterService },
    { type: ChangeDetectorRef }
];
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
class LocalizeRouterConfigLoader extends SystemJsNgModuleLoader {
    /**
     * @param {?} localize
     * @param {?} _compiler
     * @param {?=} config
     */
    constructor(localize, _compiler, config) {
        super(_compiler, config);
        this.localize = localize;
    }
    /**
     * @param {?} path
     * @return {?}
     */
    load(path) {
        return super.load(path).then((/**
         * @param {?} factory
         * @return {?}
         */
        (factory) => {
            return {
                moduleType: factory.moduleType,
                create: (/**
                 * @param {?} parentInjector
                 * @return {?}
                 */
                (parentInjector) => {
                    /** @type {?} */
                    const module = factory.create(parentInjector);
                    /** @type {?} */
                    const getMethod = module.injector.get.bind(module.injector);
                    module.injector['get'] = (/**
                     * @param {?} token
                     * @param {?} notFoundValue
                     * @return {?}
                     */
                    (token, notFoundValue) => {
                        /** @type {?} */
                        const getResult = getMethod(token, notFoundValue);
                        if (token === ROUTES) {
                            // translate lazy routes
                            return this.localize.initChildRoutes([].concat(...getResult));
                        }
                        else {
                            return getResult;
                        }
                    });
                    return module;
                })
            };
        }));
    }
}
LocalizeRouterConfigLoader.decorators = [
    { type: Injectable }
];
/** @nocollapse */
LocalizeRouterConfigLoader.ctorParameters = () => [
    { type: LocalizeParser, decorators: [{ type: Inject, args: [forwardRef((/**
                     * @return {?}
                     */
                    () => LocalizeParser)),] }] },
    { type: Compiler },
    { type: SystemJsNgModuleLoaderConfig, decorators: [{ type: Optional }] }
];
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
class ParserInitializer {
    /**
     * @param {?} injector
     */
    constructor(injector) {
        this.injector = injector;
    }
    /**
     * @return {?}
     */
    appInitializer() {
        /** @type {?} */
        const res = this.parser.load(this.routes);
        res.then((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const localize = this.injector.get(LocalizeRouterService);
            localize.init();
        }));
        return res;
    }
    /**
     * @param {?} parser
     * @param {?} routes
     * @return {?}
     */
    generateInitializer(parser, routes) {
        this.parser = parser;
        this.routes = routes.reduce((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        (a, b) => a.concat(b)));
        return this.appInitializer;
    }
}
ParserInitializer.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ParserInitializer.ctorParameters = () => [
    { type: Injector }
];
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
class LocalizeRouterModule {
    /**
     * @param {?} routes
     * @param {?=} config
     * @return {?}
     */
    static forRoot(routes, config = {}) {
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
    }
    /**
     * @param {?} routes
     * @return {?}
     */
    static forChild(routes) {
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
    }
}
LocalizeRouterModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, RouterModule, TranslateModule],
                declarations: [LocalizeRouterPipe],
                exports: [LocalizeRouterPipe]
            },] }
];
/**
 * @param {?} localizeRouterModule
 * @return {?}
 */
function provideForRootGuard(localizeRouterModule) {
    if (localizeRouterModule) {
        throw new Error(`LocalizeRouterModule.forRoot() called twice. Lazy loaded modules should use LocalizeRouterModule.forChild() instead.`);
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
