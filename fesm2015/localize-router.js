import { InjectionToken, ɵɵdefineInjectable, ɵɵinject, ɵsetClassMetadata, Injectable, Inject, ɵɵdefinePipe, ɵɵdirectiveInject, ɵɵinjectPipeChangeDetectorRef, Pipe, ChangeDetectorRef, SystemJsNgModuleLoader, forwardRef, Compiler, SystemJsNgModuleLoaderConfig, Optional, Injector, SkipSelf, NgModuleFactoryLoader, APP_INITIALIZER, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule } from '@angular/core';
import { NavigationStart, PRIMARY_OUTLET, Router, ROUTES, RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { map, filter, pairwise, tap } from 'rxjs/operators';
import { __decorate, __param, __metadata } from 'tslib';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Location, CommonModule } from '@angular/common';

/**
 * Guard to make sure we have single initialization of forRoot
 * @type {InjectionToken<LocalizeRouterModule>}
 */
const LOCALIZE_ROUTER_FORROOT_GUARD = new InjectionToken('LOCALIZE_ROUTER_FORROOT_GUARD');
/**
 * Static provider for keeping track of routes
 * @type {InjectionToken<Routes[]>}
 */
const RAW_ROUTES = new InjectionToken('RAW_ROUTES');
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
const USE_CACHED_LANG = new InjectionToken('USE_CACHED_LANG');
/**
 * Cache mechanism type
 * @type {InjectionToken<CacheMechanism>}
 */
const CACHE_MECHANISM = new InjectionToken('CACHE_MECHANISM');
/**
 * Cache name
 * @type {InjectionToken<string>}
 */
const CACHE_NAME = new InjectionToken('CACHE_NAME');
/**
 * Function for calculating default language
 * @type {InjectionToken<DefaultLanguageFunction>}
 */
const DEFAULT_LANG_FUNCTION = new InjectionToken('DEFAULT_LANG_FUNCTION');
/**
 * Boolean to indicate whether prefix should be set for single language scenarios
 * @type {InjectionToken<boolean>}
 */
const ALWAYS_SET_PREFIX = new InjectionToken('ALWAYS_SET_PREFIX');
const LOCALIZE_CACHE_NAME = 'LOCALIZE_DEFAULT_LANGUAGE';
class LocalizeRouterSettings {
    /**
     * Settings for localize router
     * @param {boolean} useCachedLang
     * @param {boolean} alwaysSetPrefix
     * @param {CacheMechanism} cacheMechanism
     * @param {string} cacheName
     * @param {DefaultLanguageFunction} defaultLangFunction
     */
    constructor(useCachedLang = true, alwaysSetPrefix = true, cacheMechanism = CacheMechanism.LocalStorage, cacheName = LOCALIZE_CACHE_NAME, defaultLangFunction = void 0) {
        this.useCachedLang = useCachedLang;
        this.alwaysSetPrefix = alwaysSetPrefix;
        this.cacheMechanism = cacheMechanism;
        this.cacheName = cacheName;
        this.defaultLangFunction = defaultLangFunction;
    }
}
/** @nocollapse */ LocalizeRouterSettings.ngInjectableDef = ɵɵdefineInjectable({ token: LocalizeRouterSettings, factory: function LocalizeRouterSettings_Factory(t) { return new (t || LocalizeRouterSettings)(ɵɵinject(USE_CACHED_LANG), ɵɵinject(ALWAYS_SET_PREFIX), ɵɵinject(CACHE_MECHANISM), ɵɵinject(CACHE_NAME), ɵɵinject(DEFAULT_LANG_FUNCTION)); }, providedIn: null });
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

const COOKIE_EXPIRY = 30; // 1 month
/**
 * Abstract class for parsing localization
 */
let LocalizeParser = class LocalizeParser {
    /**
     * Loader constructor
     * @param translate
     * @param location
     * @param settings
     */
    constructor(translate, location, settings) {
        this.translate = translate;
        this.location = location;
        this.settings = settings;
    }
    /**
     * Initialize language and routes
     * @param routes
     * @returns {Promise<any>}
     */
    init(routes) {
        this.routes = routes;
        if (!this.locales || !this.locales.length) {
            return Promise.resolve();
        }
        /** detect current language */
        const locationLang = this.getLocationLang();
        const browserLang = this._getBrowserLang();
        if (this.settings.defaultLangFunction) {
            this.defaultLang = this.settings.defaultLangFunction(this.locales, this._cachedLang, browserLang);
        }
        else {
            this.defaultLang = this._cachedLang || browserLang || this.locales[0];
        }
        const selectedLanguage = locationLang || this.defaultLang;
        this.translate.setDefaultLang(this.defaultLang);
        let children = [];
        /** if set prefix is enforced */
        if (this.settings.alwaysSetPrefix) {
            const baseRoute = { path: '', redirectTo: this.defaultLang, pathMatch: 'full' };
            /** extract potential wildcard route */
            const wildcardIndex = routes.findIndex((route) => route.path === '**');
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
    initChildRoutes(routes) {
        this._translateRouteTree(routes);
        return routes;
    }
    mutateRouterRootRoute(currentLanguage, previousLanguage, routes) {
        const previousTranslatedLanguage = this.settings.alwaysSetPrefix || previousLanguage !== this.defaultLang ?
            previousLanguage : '';
        const currentTranslatedLanguage = this.settings.alwaysSetPrefix || currentLanguage !== this.defaultLang ?
            currentLanguage : '';
        const baseRoute = routes.find(route => route.path === previousTranslatedLanguage);
        if (baseRoute) {
            baseRoute.path = currentTranslatedLanguage;
        }
    }
    /**
     * Translate routes to selected language
     * @param language
     * @returns {Promise<any>}
     */
    translateRoutes(language) {
        this.setRootLanguage(language);
        return this.translate.use(language)
            .pipe(map(translations => {
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
        }));
    }
    setRootLanguage(language) {
        this._cachedLang = language;
        if (this._languageRoute) {
            this._languageRoute.path = this.settings.alwaysSetPrefix || language !== this.defaultLang ?
                language : '';
        }
    }
    /**
     * Translate the route node and recursively call for all it's children
     * @param routes
     * @private
     */
    _translateRouteTree(routes) {
        routes.forEach((route) => {
            if (route.path && route.path !== '**') {
                this._translateProperty(route, 'path');
            }
            if (route.redirectTo) {
                this._translateProperty(route, 'redirectTo', !route.redirectTo.indexOf('/'));
            }
            if (route.children) {
                this._translateRouteTree(route.children);
            }
            if (route.loadChildren && route._loadedConfig) {
                this._translateRouteTree(route._loadedConfig.routes);
            }
        });
    }
    /**
     * Translate property
     * If first time translation then add original to route data object
     * @param route
     * @param property
     * @param prefixLang
     * @private
     */
    _translateProperty(route, property, prefixLang) {
        // set property to data if not there yet
        const routeData = route.data = route.data || {};
        if (!routeData.localizeRouter) {
            routeData.localizeRouter = {};
        }
        if (!routeData.localizeRouter[property]) {
            routeData.localizeRouter[property] = route[property];
        }
        const result = this.translateRoute(routeData.localizeRouter[property]);
        route[property] = prefixLang ? `/${this.urlPrefix}${result}` : result;
    }
    get urlPrefix() {
        return this.settings.alwaysSetPrefix || this.currentLang !== this.defaultLang ? this.currentLang : '';
    }
    /**
     * Translate route and return observable
     * @param path
     * @returns {string}
     */
    translateRoute(path) {
        const queryParts = path.split('?');
        if (queryParts.length > 2) {
            throw 'There should be only one query parameter block in the URL';
        }
        const pathSegments = queryParts[0].split('/');
        /** collect observables  */
        return pathSegments
            .map((part) => part.length ? this.translateText(part) : part)
            .join('/') +
            (queryParts.length > 1 ? `?${queryParts[1]}` : '');
    }
    /**
     * Get language from url
     * @returns {string}
     * @private
     */
    getLocationLang(url) {
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
     * Get user's language set in the browser
     * @returns {string}
     * @private
     */
    _getBrowserLang() {
        return this._returnIfInLocales(this.translate.getBrowserLang());
    }
    /**
     * Get language from local storage or cookie
     * @returns {string}
     * @private
     */
    get _cachedLang() {
        if (!this.settings.useCachedLang) {
            return;
        }
        if (this.settings.cacheMechanism === CacheMechanism.LocalStorage) {
            return this._cacheWithLocalStorage();
        }
        if (this.settings.cacheMechanism === CacheMechanism.Cookie) {
            return this._cacheWithCookies();
        }
    }
    /**
     * Save language to local storage or cookie
     * @param value
     * @private
     */
    set _cachedLang(value) {
        if (!this.settings.useCachedLang) {
            return;
        }
        if (this.settings.cacheMechanism === CacheMechanism.LocalStorage) {
            this._cacheWithLocalStorage(value);
        }
        if (this.settings.cacheMechanism === CacheMechanism.Cookie) {
            this._cacheWithCookies(value);
        }
    }
    /**
     * Cache value to local storage
     * @param value
     * @returns {string}
     * @private
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
     * Cache value via cookies
     * @param value
     * @private
     */
    _cacheWithCookies(value) {
        if (typeof document === 'undefined' || typeof document.cookie === 'undefined') {
            return;
        }
        try {
            const name = encodeURIComponent(this.settings.cacheName);
            if (value) {
                const d = new Date();
                d.setTime(d.getTime() + COOKIE_EXPIRY * 86400000); // * days
                document.cookie = `${name}=${encodeURIComponent(value)};expires=${d.toUTCString()}`;
                return;
            }
            const regexp = new RegExp('(?:^' + name + '|;\\s*' + name + ')=(.*?)(?:;|$)', 'g');
            const result = regexp.exec(document.cookie);
            return decodeURIComponent(result[1]);
        }
        catch (e) {
            return; // should not happen but better safe than sorry
        }
    }
    /**
     * Check if value exists in locales list
     * @param value
     * @returns {any}
     * @private
     */
    _returnIfInLocales(value) {
        if (value && this.locales.indexOf(value) !== -1) {
            return value;
        }
        return null;
    }
    /**
     * Get translated value
     * @param key
     * @returns {any}
     */
    translateText(key) {
        if (!this._translationObject) {
            return key;
        }
        const prefixedKey = this.prefix + key;
        const res = this.translate.getParsedResult(this._translationObject, prefixedKey);
        // ignore non-translated text like 'ROUTES.home'
        if (res === prefixedKey) {
            return key;
        }
        return res || key;
    }
};
LocalizeParser = __decorate([
    __param(0, Inject(TranslateService)),
    __param(1, Inject(Location)),
    __param(2, Inject(LocalizeRouterSettings)),
    __metadata("design:paramtypes", [TranslateService,
        Location,
        LocalizeRouterSettings])
], LocalizeParser);
/**
 * Manually set configuration
 */
class ManualParserLoader extends LocalizeParser {
    /**
     * CTOR
     * @param translate
     * @param location
     * @param settings
     * @param locales
     * @param prefix
     */
    constructor(translate, location, settings, locales = ['en'], prefix = 'ROUTES.') {
        super(translate, location, settings);
        this.locales = locales;
        this.prefix = prefix || '';
    }
    /**
     * Initialize or append routes
     * @param routes
     * @returns {Promise<any>}
     */
    load(routes) {
        return new Promise((resolve) => {
            this.init(routes).then(resolve);
        });
    }
}
class DummyLocalizeParser extends LocalizeParser {
    load(routes) {
        return new Promise((resolve) => {
            this.init(routes).then(resolve);
        });
    }
}

/**
 * Localization service
 * modifyRoutes
 */
class LocalizeRouterService {
    /**
     * CTOR
     * @param parser
     * @param settings
     * @param router
     */
    constructor(parser, settings, router) {
        this.parser = parser;
        this.settings = settings;
        this.router = router;
        this.routerEvents = new Subject();
    }
    /**
     * Start up the service
     */
    init() {
        this.router.resetConfig(this.parser.routes);
        // subscribe to router events
        this.router.events
            .pipe(filter((event) => event instanceof NavigationStart), pairwise())
            .subscribe(this._routeChanged());
    }
    /**
     * Change language and navigate to translated route
     * @param lang
     */
    changeLanguage(lang) {
        if (lang !== this.parser.currentLang) {
            const rootSnapshot = this.router.routerState.snapshot.root;
            this.parser
                .translateRoutes(lang)
                .pipe(
            // set new routes to router
            tap(() => this.router.resetConfig(this.parser.routes)))
                .subscribe(() => {
                const urlSegments = this.traverseSnapshot(rootSnapshot, true).filter((path, i) => {
                    return !i || path; // filter out empty paths
                });
                const navigationExtras = Object.assign({}, (rootSnapshot.queryParamMap.keys.length ? { queryParams: rootSnapshot.queryParams } : {}), (rootSnapshot.fragment ? { fragment: rootSnapshot.fragment } : {}));
                // use navigate to keep extras unchanged
                this.router.navigate(urlSegments, navigationExtras);
            });
        }
    }
    /**
     * Traverses through the tree to assemble new translated url
     * @param snapshot
     * @param isRoot
     * @returns {string}
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
        const urlPart = this.parseSegmentValue(snapshot);
        const outletChildren = snapshot.children.filter((child) => child.outlet !== PRIMARY_OUTLET);
        const outlets = outletChildren.reduce((acc, cur) => ({
            outlets: Object.assign({}, acc.outlets, { [cur.outlet]: this.parseSegmentValue(cur) })
        }), { outlets: {} });
        const primaryChild = snapshot.children.find((child) => child.outlet === PRIMARY_OUTLET);
        return [
            urlPart,
            ...(Object.keys(snapshot.params).length ? [snapshot.params] : []),
            ...(outletChildren.length ? [outlets] : []),
            ...(primaryChild ? this.traverseSnapshot(primaryChild) : [])
        ];
    }
    /**
     * Extracts new segment value based on routeConfig and url
     * @param snapshot
     * @returns {string}
     */
    parseSegmentValue(snapshot) {
        if (snapshot.routeConfig) {
            if (snapshot.routeConfig.path === '**') {
                return this.parser.translateRoute(snapshot.url
                    .filter((segment) => segment.path)
                    .map((segment) => segment.path)
                    .join('/'));
            }
            else if (snapshot.routeConfig.data) {
                const subPathSegments = snapshot.routeConfig.data.localizeRouter.path.split('/');
                return subPathSegments
                    .map((s, i) => (s.indexOf(':') === 0 ? snapshot.url[i].path : this.parser.translateRoute(s)))
                    .join('/');
            }
        }
        return '';
    }
    /**
     * Translate route to current language
     * If new language is explicitly provided then replace language part in url with new language
     * @param path
     * @returns {string | any[]}
     */
    translateRoute(path) {
        // path is null (e.g. resetting auxiliary outlet)
        if (!path) {
            return path;
        }
        if (typeof path === 'string') {
            const url = this.parser.translateRoute(path);
            return !path.indexOf('/') ? `/${this.parser.urlPrefix}${url}` : url;
        }
        // it's an array
        let result = [];
        path.forEach((segment, index) => {
            if (typeof segment === 'string') {
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
        });
        return result;
    }
    /**
     * Event handler to react on route change
     * @returns {(event:any)=>void}
     * @private
     */
    _routeChanged() {
        return ([previousEvent, currentEvent]) => {
            const previousLang = this.parser.getLocationLang(previousEvent.url) || this.parser.defaultLang;
            const currentLang = this.parser.getLocationLang(currentEvent.url) || this.parser.defaultLang;
            if (currentLang !== previousLang) {
                // mutate router config directly to avoid getting out of sync
                this.parser.mutateRouterRootRoute(currentLang, previousLang, this.router.config);
                this.parser
                    .translateRoutes(currentLang)
                    .pipe(
                // reset routes again once they are all translated
                tap(() => this.router.resetConfig(this.parser.routes)))
                    .subscribe(() => {
                    // Fire route change event
                    this.routerEvents.next(currentLang);
                });
            }
        };
    }
}
/** @nocollapse */ LocalizeRouterService.ngInjectableDef = ɵɵdefineInjectable({ token: LocalizeRouterService, factory: function LocalizeRouterService_Factory(t) { return new (t || LocalizeRouterService)(ɵɵinject(LocalizeParser), ɵɵinject(LocalizeRouterSettings), ɵɵinject(Router)); }, providedIn: null });
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
    let t1 = typeof o1, t2 = typeof o2, length, key, keySet;
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

const VIEW_DESTROYED_STATE = 128;
class LocalizeRouterPipe {
    /**
     * CTOR
     * @param localize
     * @param _ref
     */
    constructor(localize, _ref) {
        this.localize = localize;
        this._ref = _ref;
        this.value = '';
        this.subscription = this.localize.routerEvents.subscribe(() => {
            this.transform(this.lastKey);
        });
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    /**
     * Transform current url to localized one
     * @param query
     * @returns {string | any[]}
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
        if (this._ref._view.state & VIEW_DESTROYED_STATE) {
            return this.value;
        }
        this._ref.detectChanges();
        return this.value;
    }
}
/** @nocollapse */ LocalizeRouterPipe.ngPipeDef = ɵɵdefinePipe({ name: "localize", type: LocalizeRouterPipe, factory: function LocalizeRouterPipe_Factory(t) { return new (t || LocalizeRouterPipe)(ɵɵdirectiveInject(LocalizeRouterService), ɵɵinjectPipeChangeDetectorRef()); }, pure: false });
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
class LocalizeRouterConfigLoader extends SystemJsNgModuleLoader {
    constructor(localize, _compiler, config) {
        super(_compiler, config);
        this.localize = localize;
    }
    /**
     * Extend load with custom functionality
     * @param {string} path
     * @returns {Promise<NgModuleFactory<any>>}
     */
    load(path) {
        return super.load(path).then((factory) => {
            return {
                moduleType: factory.moduleType,
                create: (parentInjector) => {
                    const module = factory.create(parentInjector);
                    const getMethod = module.injector.get.bind(module.injector);
                    module.injector['get'] = (token, notFoundValue) => {
                        const getResult = getMethod(token, notFoundValue);
                        if (token === ROUTES) {
                            // translate lazy routes
                            return this.localize.initChildRoutes([].concat(...getResult));
                        }
                        else {
                            return getResult;
                        }
                    };
                    return module;
                }
            };
        });
    }
}
/** @nocollapse */ LocalizeRouterConfigLoader.ngInjectableDef = ɵɵdefineInjectable({ token: LocalizeRouterConfigLoader, factory: function LocalizeRouterConfigLoader_Factory(t) { return new (t || LocalizeRouterConfigLoader)(ɵɵinject(forwardRef(() => LocalizeParser)), ɵɵinject(Compiler), ɵɵinject(SystemJsNgModuleLoaderConfig, 8)); }, providedIn: null });
/*@__PURE__*/ ɵsetClassMetadata(LocalizeRouterConfigLoader, [{
        type: Injectable
    }], function () { return [{ type: LocalizeParser, decorators: [{
                type: Inject,
                args: [forwardRef(() => LocalizeParser)]
            }] }, { type: Compiler }, { type: SystemJsNgModuleLoaderConfig, decorators: [{
                type: Optional
            }] }]; }, null);

class ParserInitializer {
    /**
     * CTOR
     * @param injector
     */
    constructor(injector) {
        this.injector = injector;
    }
    /**
     * @returns {Promise<any>}
     */
    appInitializer() {
        const res = this.parser.load(this.routes);
        res.then(() => {
            const localize = this.injector.get(LocalizeRouterService);
            localize.init();
        });
        return res;
    }
    /**
     * @param parser
     * @param routes
     * @returns {()=>Promise<any>}
     */
    generateInitializer(parser, routes) {
        this.parser = parser;
        this.routes = routes.reduce((a, b) => a.concat(b));
        return this.appInitializer;
    }
}
/** @nocollapse */ ParserInitializer.ngInjectableDef = ɵɵdefineInjectable({ token: ParserInitializer, factory: function ParserInitializer_Factory(t) { return new (t || ParserInitializer)(ɵɵinject(Injector)); }, providedIn: null });
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
class LocalizeRouterModule {
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
/** @nocollapse */ LocalizeRouterModule.ngModuleDef = ɵɵdefineNgModule({ type: LocalizeRouterModule });
/** @nocollapse */ LocalizeRouterModule.ngInjectorDef = ɵɵdefineInjector({ factory: function LocalizeRouterModule_Factory(t) { return new (t || LocalizeRouterModule)(); }, imports: [[CommonModule, RouterModule, TranslateModule]] });
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
        throw new Error(`LocalizeRouterModule.forRoot() called twice. Lazy loaded modules should use LocalizeRouterModule.forChild() instead.`);
    }
    return 'guarded';
}

/**
 * Generated bundle index. Do not edit.
 */

export { ALWAYS_SET_PREFIX, CACHE_MECHANISM, CACHE_NAME, CacheMechanism, DEFAULT_LANG_FUNCTION, DummyLocalizeParser, LOCALIZE_ROUTER_FORROOT_GUARD, LocalizeParser, LocalizeRouterConfigLoader, LocalizeRouterModule, LocalizeRouterPipe, LocalizeRouterService, LocalizeRouterSettings, ManualParserLoader, ParserInitializer, RAW_ROUTES, USE_CACHED_LANG, getAppInitializer, provideForRootGuard };
//# sourceMappingURL=localize-router.js.map
