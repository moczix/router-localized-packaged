/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { LocalizeRouterSettings, CacheMechanismEnum } from './localize-router.config';
import { Inject } from '@angular/core';
import { map } from 'rxjs/operators';
/** @type {?} */
const COOKIE_EXPIRY = 30;
// 1 month
/**
 * Abstract class for parsing localization
 * @abstract
 */
export class LocalizeParser {
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
export class ManualParserLoader extends LocalizeParser {
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
export class DummyLocalizeParser extends LocalizeParser {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxpemUtcm91dGVyLnBhcnNlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xvY2FsaXplLXJvdXRlci8iLCJzb3VyY2VzIjpbImxpYi9sb2NhbGl6ZS1yb3V0ZXIucGFyc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUV2RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLHNCQUFzQixFQUFFLGtCQUFrQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDdEYsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O01BRS9CLGFBQWEsR0FBRyxFQUFFOzs7Ozs7QUFLeEIsTUFBTSxPQUFnQixjQUFjOzs7Ozs7SUFhbEMsWUFBOEMsU0FBMkIsRUFDbkMsUUFBa0IsRUFDSixRQUFnQztRQUZ0QyxjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQUNuQyxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ0osYUFBUSxHQUFSLFFBQVEsQ0FBd0I7SUFDcEYsQ0FBQzs7Ozs7O0lBTVMsSUFBSSxDQUFDLE1BQWM7UUFDM0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFFckIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUN6QyxPQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUMxQjs7Ozs7Y0FFSyxZQUFZLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRTs7Y0FDckMsV0FBVyxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUU7UUFFMUMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixFQUFFO1lBQ3JDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFFB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QUE4Qjs7Ozs7SUFHbEIsbUNBQTZEOzs7OztJQUM3RCxrQ0FBNEM7Ozs7O0lBQzVDLGtDQUF3RTs7Ozs7O0lBSXBGLHNEQUE0Qzs7Ozs7QUEyUTlDLE1BQU0sT0FBTyxrQkFBbUIsU0FBUSxjQUFjOzs7Ozs7OztJQUdwRCxZQUFZLFNBQTJCLEVBQUUsUUFBa0IsRUFBRSxRQUFnQyxFQUFFLFVBQW9CLENBQUMsSUFBSSxDQUFDLEVBQUUsU0FBaUIsU0FBUztRQUNuSixLQUFLLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sSUFBSSxFQUFFLENBQUM7SUFDN0IsQ0FBQzs7Ozs7SUFHRCxJQUFJLENBQUMsTUFBYztRQUNqQixPQUFPLElBQUksT0FBTzs7OztRQUFDLENBQUMsT0FBWSxFQUFFLEVBQUU7WUFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbEMsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUFFRCxNQUFNLE9BQU8sbUJBQW9CLFNBQVEsY0FBYzs7Ozs7SUFDckQsSUFBSSxDQUFDLE1BQWM7UUFDakIsT0FBTyxJQUFJLE9BQU87Ozs7UUFBQyxDQUFDLE9BQVksRUFBRSxFQUFFO1lBQ2xDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2xDLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUm91dGVzLCBSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBMb2NhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBMb2NhbGl6ZVJvdXRlclNldHRpbmdzLCBDYWNoZU1lY2hhbmlzbUVudW0gfSBmcm9tICcuL2xvY2FsaXplLXJvdXRlci5jb25maWcnO1xuaW1wb3J0IHsgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmNvbnN0IENPT0tJRV9FWFBJUlkgPSAzMDsgLy8gMSBtb250aFxuXG4vKipcbiAqIEFic3RyYWN0IGNsYXNzIGZvciBwYXJzaW5nIGxvY2FsaXphdGlvblxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTG9jYWxpemVQYXJzZXIge1xuICBsb2NhbGVzOiBBcnJheTxzdHJpbmc+O1xuICBjdXJyZW50TGFuZzogc3RyaW5nO1xuICByb3V0ZXM6IFJvdXRlcztcbiAgZGVmYXVsdExhbmc6IHN0cmluZztcblxuICBwcm90ZWN0ZWQgcHJlZml4OiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBfdHJhbnNsYXRpb25PYmplY3Q6IGFueTtcbiAgcHJpdmF0ZSBfd2lsZGNhcmRSb3V0ZTogUm91dGU7XG4gIHByaXZhdGUgX2xhbmd1YWdlUm91dGU6IFJvdXRlO1xuXG5cbiAgY29uc3RydWN0b3IoQEluamVjdChUcmFuc2xhdGVTZXJ2aWNlKSBwcml2YXRlIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZSxcbiAgICAgICAgICAgICAgQEluamVjdChMb2NhdGlvbikgcHJpdmF0ZSBsb2NhdGlvbjogTG9jYXRpb24sXG4gICAgICAgICAgICAgIEBJbmplY3QoTG9jYWxpemVSb3V0ZXJTZXR0aW5ncykgcHJpdmF0ZSBzZXR0aW5nczogTG9jYWxpemVSb3V0ZXJTZXR0aW5ncykge1xuICB9XG5cblxuICBhYnN0cmFjdCBsb2FkKHJvdXRlczogUm91dGVzKTogUHJvbWlzZTxhbnk+O1xuXG5cbiAgcHJvdGVjdGVkIGluaXQocm91dGVzOiBSb3V0ZXMpOiBQcm9taXNlPGFueT4ge1xuICAgIHRoaXMucm91dGVzID0gcm91dGVzO1xuXG4gICAgaWYgKCF0aGlzLmxvY2FsZXMgfHwgIXRoaXMubG9jYWxlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9XG4gICAgLyoqIGRldGVjdCBjdXJyZW50IGxhbmd1YWdlICovXG4gICAgY29uc3QgbG9jYXRpb25MYW5nID0gdGhpcy5nZXRMb2NhdGlvbkxhbmcoKTtcbiAgICBjb25zdCBicm93c2VyTGFuZyA9IHRoaXMuX2dldEJyb3dzZXJMYW5nKCk7XG5cbiAgICBpZiAodGhpcy5zZXR0aW5ncy5kZWZhdWx0TGFuZ0Z1bmN0aW9uKSB7XG4gICAgICB0aGlzLmRlZmF1bHRMYW5nID0gdGhpcy5zZXR0aW5ncy5kZWZhdWx0TGFuZ0Z1bmN0aW9uKHRoaXMubG9jYWxlcywgdGhpcy5fY2FjaGVkTGFuZywgYnJvd3NlckxhbmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRlZmF1bHRMYW5nID0gdGhpcy5fY2FjaGVkTGFuZyB8fCBicm93c2VyTGFuZyB8fCB0aGlzLmxvY2FsZXNbMF07XG4gICAgfVxuICAgIGNvbnN0IHNlbGVjdGVkTGFuZ3VhZ2UgPSBsb2NhdGlvbkxhbmcgfHwgdGhpcy5kZWZhdWx0TGFuZztcbiAgICB0aGlzLnRyYW5zbGF0ZS5zZXREZWZhdWx0TGFuZyh0aGlzLmRlZmF1bHRMYW5nKTtcblxuICAgIGxldCBjaGlsZHJlbjogUm91dGVzID0gW107XG4gICAgLyoqIGlmIHNldCBwcmVmaXggaXMgZW5mb3JjZWQgKi9cbiAgICBpZiAodGhpcy5zZXR0aW5ncy5hbHdheXNTZXRQcmVmaXgpIHtcbiAgICAgIGNvbnN0IGJhc2VSb3V0ZSA9IHsgcGF0aDogJycsIHJlZGlyZWN0VG86IHRoaXMuZGVmYXVsdExhbmcsIHBhdGhNYXRjaDogJ2Z1bGwnIH07XG5cbiAgICAgIC8qKiBleHRyYWN0IHBvdGVudGlhbCB3aWxkY2FyZCByb3V0ZSAqL1xuICAgICAgY29uc3Qgd2lsZGNhcmRJbmRleCA9IHJvdXRlcy5maW5kSW5kZXgoKHJvdXRlOiBSb3V0ZSkgPT4gcm91dGUucGF0aCA9PT0gJyoqJyk7XG4gICAgICBpZiAod2lsZGNhcmRJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgdGhpcy5fd2lsZGNhcmRSb3V0ZSA9IHJvdXRlcy5zcGxpY2Uod2lsZGNhcmRJbmRleCwgMSlbMF07XG4gICAgICB9XG4gICAgICBjaGlsZHJlbiA9IHRoaXMucm91dGVzLnNwbGljZSgwLCB0aGlzLnJvdXRlcy5sZW5ndGgsIGJhc2VSb3V0ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNoaWxkcmVuID0gdGhpcy5yb3V0ZXMuc3BsaWNlKDAsIHRoaXMucm91dGVzLmxlbmd0aCk7XG4gICAgfVxuXG4gICAgLyoqIGV4Y2x1ZGUgY2VydGFpbiByb3V0ZXMgKi9cbiAgICBmb3IgKGxldCBpID0gY2hpbGRyZW4ubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIGlmIChjaGlsZHJlbltpXS5kYXRhICYmIGNoaWxkcmVuW2ldLmRhdGFbJ3NraXBSb3V0ZUxvY2FsaXphdGlvbiddKSB7XG4gICAgICAgIHRoaXMucm91dGVzLnB1c2goY2hpbGRyZW5baV0pO1xuICAgICAgICBjaGlsZHJlbi5zcGxpY2UoaSwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqIGFwcGVuZCBjaGlsZHJlbiByb3V0ZXMgKi9cbiAgICBpZiAoY2hpbGRyZW4gJiYgY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICBpZiAodGhpcy5sb2NhbGVzLmxlbmd0aCA+IDEgfHwgdGhpcy5zZXR0aW5ncy5hbHdheXNTZXRQcmVmaXgpIHtcbiAgICAgICAgdGhpcy5fbGFuZ3VhZ2VSb3V0ZSA9IHsgY2hpbGRyZW46IGNoaWxkcmVuIH07XG4gICAgICAgIHRoaXMucm91dGVzLnVuc2hpZnQodGhpcy5fbGFuZ3VhZ2VSb3V0ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJvdXRlcy51bnNoaWZ0KC4uLmNoaWxkcmVuKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogLi4uYW5kIHBvdGVudGlhbCB3aWxkY2FyZCByb3V0ZSAqL1xuICAgIGlmICh0aGlzLl93aWxkY2FyZFJvdXRlICYmIHRoaXMuc2V0dGluZ3MuYWx3YXlzU2V0UHJlZml4KSB7XG4gICAgICB0aGlzLnJvdXRlcy5wdXNoKHRoaXMuX3dpbGRjYXJkUm91dGUpO1xuICAgIH1cblxuICAgIC8qKiB0cmFuc2xhdGUgcm91dGVzICovXG4gICAgcmV0dXJuIHRoaXMudHJhbnNsYXRlUm91dGVzKHNlbGVjdGVkTGFuZ3VhZ2UpLnRvUHJvbWlzZSgpO1xuICB9XG5cbiAgaW5pdENoaWxkUm91dGVzKHJvdXRlczogUm91dGVzKSB7XG4gICAgdGhpcy5fdHJhbnNsYXRlUm91dGVUcmVlKHJvdXRlcyk7XG4gICAgcmV0dXJuIHJvdXRlcztcbiAgfVxuXG4gIG11dGF0ZVJvdXRlclJvb3RSb3V0ZShjdXJyZW50TGFuZ3VhZ2U6IHN0cmluZywgcHJldmlvdXNMYW5ndWFnZTogc3RyaW5nLCByb3V0ZXM6IFJvdXRlcykge1xuICAgIGNvbnN0IHByZXZpb3VzVHJhbnNsYXRlZExhbmd1YWdlID0gdGhpcy5zZXR0aW5ncy5hbHdheXNTZXRQcmVmaXggfHwgcHJldmlvdXNMYW5ndWFnZSAhPT0gdGhpcy5kZWZhdWx0TGFuZyA/XG4gICAgICBwcmV2aW91c0xhbmd1YWdlIDogJyc7XG4gICAgY29uc3QgY3VycmVudFRyYW5zbGF0ZWRMYW5ndWFnZSA9IHRoaXMuc2V0dGluZ3MuYWx3YXlzU2V0UHJlZml4IHx8IGN1cnJlbnRMYW5ndWFnZSAhPT0gdGhpcy5kZWZhdWx0TGFuZyA/XG4gICAgICBjdXJyZW50TGFuZ3VhZ2UgOiAnJztcbiAgICBjb25zdCBiYXNlUm91dGUgPSByb3V0ZXMuZmluZChyb3V0ZSA9PiByb3V0ZS5wYXRoID09PSBwcmV2aW91c1RyYW5zbGF0ZWRMYW5ndWFnZSk7XG4gICAgaWYgKGJhc2VSb3V0ZSkge1xuICAgICAgYmFzZVJvdXRlLnBhdGggPSBjdXJyZW50VHJhbnNsYXRlZExhbmd1YWdlO1xuICAgIH1cbiAgfVxuXG5cbiAgdHJhbnNsYXRlUm91dGVzKGxhbmd1YWdlOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHRoaXMuc2V0Um9vdExhbmd1YWdlKGxhbmd1YWdlKTtcblxuICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZS51c2UobGFuZ3VhZ2UpXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKHRyYW5zbGF0aW9ucyA9PiB7XG4gICAgICAgICAgdGhpcy5fdHJhbnNsYXRpb25PYmplY3QgPSB0cmFuc2xhdGlvbnM7XG4gICAgICAgICAgdGhpcy5jdXJyZW50TGFuZyA9IGxhbmd1YWdlO1xuXG4gICAgICAgICAgaWYgKHRoaXMuX2xhbmd1YWdlUm91dGUpIHtcbiAgICAgICAgICAgIHRoaXMuX3RyYW5zbGF0ZVJvdXRlVHJlZSh0aGlzLl9sYW5ndWFnZVJvdXRlLmNoaWxkcmVuKTtcblxuICAgICAgICAgICAgLy8gaWYgdGhlcmUgaXMgd2lsZGNhcmQgcm91dGVcbiAgICAgICAgICAgIGlmICh0aGlzLl93aWxkY2FyZFJvdXRlICYmIHRoaXMuX3dpbGRjYXJkUm91dGUucmVkaXJlY3RUbykge1xuICAgICAgICAgICAgICB0aGlzLl90cmFuc2xhdGVQcm9wZXJ0eSh0aGlzLl93aWxkY2FyZFJvdXRlLCAncmVkaXJlY3RUbycsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl90cmFuc2xhdGVSb3V0ZVRyZWUodGhpcy5yb3V0ZXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICk7XG4gIH1cblxuICBwcml2YXRlIHNldFJvb3RMYW5ndWFnZShsYW5ndWFnZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fY2FjaGVkTGFuZyA9IGxhbmd1YWdlO1xuICAgIGlmICh0aGlzLl9sYW5ndWFnZVJvdXRlKSB7XG4gICAgICB0aGlzLl9sYW5ndWFnZVJvdXRlLnBhdGggPSB0aGlzLnNldHRpbmdzLmFsd2F5c1NldFByZWZpeCB8fCBsYW5ndWFnZSAhPT0gdGhpcy5kZWZhdWx0TGFuZyA/XG4gICAgICAgIGxhbmd1YWdlIDogJyc7XG4gICAgfVxuICB9XG5cblxuICBwcml2YXRlIF90cmFuc2xhdGVSb3V0ZVRyZWUocm91dGVzOiBSb3V0ZXMpOiB2b2lkIHtcbiAgICByb3V0ZXMuZm9yRWFjaCgocm91dGU6IFJvdXRlKSA9PiB7XG4gICAgICBpZiAocm91dGUucGF0aCAmJiByb3V0ZS5wYXRoICE9PSAnKionKSB7XG4gICAgICAgIHRoaXMuX3RyYW5zbGF0ZVByb3BlcnR5KHJvdXRlLCAncGF0aCcpO1xuICAgICAgfVxuICAgICAgaWYgKHJvdXRlLnJlZGlyZWN0VG8pIHtcbiAgICAgICAgdGhpcy5fdHJhbnNsYXRlUHJvcGVydHkocm91dGUsICdyZWRpcmVjdFRvJywgIXJvdXRlLnJlZGlyZWN0VG8uaW5kZXhPZignLycpKTtcbiAgICAgIH1cbiAgICAgIGlmIChyb3V0ZS5jaGlsZHJlbikge1xuICAgICAgICB0aGlzLl90cmFuc2xhdGVSb3V0ZVRyZWUocm91dGUuY2hpbGRyZW4pO1xuICAgICAgfVxuICAgICAgaWYgKHJvdXRlLmxvYWRDaGlsZHJlbiAmJiAoPGFueT5yb3V0ZSkuX2xvYWRlZENvbmZpZykge1xuICAgICAgICB0aGlzLl90cmFuc2xhdGVSb3V0ZVRyZWUoKDxhbnk+cm91dGUpLl9sb2FkZWRDb25maWcucm91dGVzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG5cbiAgcHJpdmF0ZSBfdHJhbnNsYXRlUHJvcGVydHkocm91dGU6IFJvdXRlLCBwcm9wZXJ0eTogc3RyaW5nLCBwcmVmaXhMYW5nPzogYm9vbGVhbik6IHZvaWQge1xuICAgIC8vIHNldCBwcm9wZXJ0eSB0byBkYXRhIGlmIG5vdCB0aGVyZSB5ZXRcbiAgICBjb25zdCByb3V0ZURhdGE6IGFueSA9IHJvdXRlLmRhdGEgPSByb3V0ZS5kYXRhIHx8IHt9O1xuICAgIGlmICghcm91dGVEYXRhLmxvY2FsaXplUm91dGVyKSB7XG4gICAgICByb3V0ZURhdGEubG9jYWxpemVSb3V0ZXIgPSB7fTtcbiAgICB9XG4gICAgaWYgKCFyb3V0ZURhdGEubG9jYWxpemVSb3V0ZXJbcHJvcGVydHldKSB7XG4gICAgICByb3V0ZURhdGEubG9jYWxpemVSb3V0ZXJbcHJvcGVydHldID0gKDxhbnk+cm91dGUpW3Byb3BlcnR5XTtcbiAgICB9XG5cbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLnRyYW5zbGF0ZVJvdXRlKHJvdXRlRGF0YS5sb2NhbGl6ZVJvdXRlcltwcm9wZXJ0eV0pO1xuICAgICg8YW55PnJvdXRlKVtwcm9wZXJ0eV0gPSBwcmVmaXhMYW5nID8gYC8ke3RoaXMudXJsUHJlZml4fSR7cmVzdWx0fWAgOiByZXN1bHQ7XG4gIH1cblxuICBnZXQgdXJsUHJlZml4KCkge1xuICAgIHJldHVybiB0aGlzLnNldHRpbmdzLmFsd2F5c1NldFByZWZpeCB8fCB0aGlzLmN1cnJlbnRMYW5nICE9PSB0aGlzLmRlZmF1bHRMYW5nID8gdGhpcy5jdXJyZW50TGFuZyA6ICcnO1xuICB9XG5cblxuICB0cmFuc2xhdGVSb3V0ZShwYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IHF1ZXJ5UGFydHMgPSBwYXRoLnNwbGl0KCc/Jyk7XG4gICAgaWYgKHF1ZXJ5UGFydHMubGVuZ3RoID4gMikge1xuICAgICAgdGhyb3cgJ1RoZXJlIHNob3VsZCBiZSBvbmx5IG9uZSBxdWVyeSBwYXJhbWV0ZXIgYmxvY2sgaW4gdGhlIFVSTCc7XG4gICAgfVxuICAgIGNvbnN0IHBhdGhTZWdtZW50cyA9IHF1ZXJ5UGFydHNbMF0uc3BsaXQoJy8nKTtcblxuICAgIC8qKiBjb2xsZWN0IG9ic2VydmFibGVzICAqL1xuICAgIHJldHVybiBwYXRoU2VnbWVudHNcbiAgICAgIC5tYXAoKHBhcnQ6IHN0cmluZykgPT4gcGFydC5sZW5ndGggPyB0aGlzLnRyYW5zbGF0ZVRleHQocGFydCkgOiBwYXJ0KVxuICAgICAgLmpvaW4oJy8nKSArXG4gICAgICAocXVlcnlQYXJ0cy5sZW5ndGggPiAxID8gYD8ke3F1ZXJ5UGFydHNbMV19YCA6ICcnKTtcbiAgfVxuXG5cbiAgZ2V0TG9jYXRpb25MYW5nKHVybD86IHN0cmluZyk6IHN0cmluZyB7XG4gICAgY29uc3QgcGF0aFNsaWNlcyA9ICh1cmwgfHwgdGhpcy5sb2NhdGlvbi5wYXRoKCkgfHwgJycpXG4gICAgICAuc3BsaXQoJyMnKVswXVxuICAgICAgLnNwbGl0KCc/JylbMF1cbiAgICAgIC5zcGxpdCgnLycpO1xuICAgIGlmIChwYXRoU2xpY2VzLmxlbmd0aCA+IDEgJiYgdGhpcy5sb2NhbGVzLmluZGV4T2YocGF0aFNsaWNlc1sxXSkgIT09IC0xKSB7XG4gICAgICByZXR1cm4gcGF0aFNsaWNlc1sxXTtcbiAgICB9XG4gICAgaWYgKHBhdGhTbGljZXMubGVuZ3RoICYmIHRoaXMubG9jYWxlcy5pbmRleE9mKHBhdGhTbGljZXNbMF0pICE9PSAtMSkge1xuICAgICAgcmV0dXJuIHBhdGhTbGljZXNbMF07XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cblxuICBwcml2YXRlIF9nZXRCcm93c2VyTGFuZygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9yZXR1cm5JZkluTG9jYWxlcyh0aGlzLnRyYW5zbGF0ZS5nZXRCcm93c2VyTGFuZygpKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IF9jYWNoZWRMYW5nKCk6IHN0cmluZyB7XG4gICAgaWYgKCF0aGlzLnNldHRpbmdzLnVzZUNhY2hlZExhbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuc2V0dGluZ3MuY2FjaGVNZWNoYW5pc20gPT09IENhY2hlTWVjaGFuaXNtRW51bS5Mb2NhbFN0b3JhZ2UpIHtcbiAgICAgIHJldHVybiB0aGlzLl9jYWNoZVdpdGhMb2NhbFN0b3JhZ2UoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuc2V0dGluZ3MuY2FjaGVNZWNoYW5pc20gPT09IENhY2hlTWVjaGFuaXNtRW51bS5Db29raWUpIHtcbiAgICAgIHJldHVybiB0aGlzLl9jYWNoZVdpdGhDb29raWVzKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXQgX2NhY2hlZExhbmcodmFsdWU6IHN0cmluZykge1xuICAgIGlmICghdGhpcy5zZXR0aW5ncy51c2VDYWNoZWRMYW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLnNldHRpbmdzLmNhY2hlTWVjaGFuaXNtID09PSBDYWNoZU1lY2hhbmlzbUVudW0uTG9jYWxTdG9yYWdlKSB7XG4gICAgICB0aGlzLl9jYWNoZVdpdGhMb2NhbFN0b3JhZ2UodmFsdWUpO1xuICAgIH1cbiAgICBpZiAodGhpcy5zZXR0aW5ncy5jYWNoZU1lY2hhbmlzbSA9PT0gQ2FjaGVNZWNoYW5pc21FbnVtLkNvb2tpZSkge1xuICAgICAgdGhpcy5fY2FjaGVXaXRoQ29va2llcyh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY2FjaGVXaXRoTG9jYWxTdG9yYWdlKHZhbHVlPzogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgfHwgdHlwZW9mIHdpbmRvdy5sb2NhbFN0b3JhZ2UgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMuc2V0dGluZ3MuY2FjaGVOYW1lLCB2YWx1ZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLl9yZXR1cm5JZkluTG9jYWxlcyh3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy5zZXR0aW5ncy5jYWNoZU5hbWUpKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyB3ZWlyZCBTYWZhcmkgaXNzdWUgaW4gcHJpdmF0ZSBtb2RlLCB3aGVyZSBMb2NhbFN0b3JhZ2UgaXMgZGVmaW5lZCBidXQgdGhyb3dzIGVycm9yIG9uIGFjY2Vzc1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2NhY2hlV2l0aENvb2tpZXModmFsdWU/OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnIHx8IHR5cGVvZiBkb2N1bWVudC5jb29raWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICBjb25zdCBuYW1lID0gZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuc2V0dGluZ3MuY2FjaGVOYW1lKTtcbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICBjb25zdCBkOiBEYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgZC5zZXRUaW1lKGQuZ2V0VGltZSgpICsgQ09PS0lFX0VYUElSWSAqIDg2NDAwMDAwKTsgLy8gKiBkYXlzXG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGAke25hbWV9PSR7ZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKX07ZXhwaXJlcz0ke2QudG9VVENTdHJpbmcoKX1gO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCByZWdleHAgPSBuZXcgUmVnRXhwKCcoPzpeJyArIG5hbWUgKyAnfDtcXFxccyonICsgbmFtZSArICcpPSguKj8pKD86O3wkKScsICdnJyk7XG4gICAgICBjb25zdCByZXN1bHQgPSByZWdleHAuZXhlYyhkb2N1bWVudC5jb29raWUpO1xuICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChyZXN1bHRbMV0pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybjsgLy8gc2hvdWxkIG5vdCBoYXBwZW4gYnV0IGJldHRlciBzYWZlIHRoYW4gc29ycnlcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9yZXR1cm5JZkluTG9jYWxlcyh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBpZiAodmFsdWUgJiYgdGhpcy5sb2NhbGVzLmluZGV4T2YodmFsdWUpICE9PSAtMSkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgdHJhbnNsYXRlVGV4dChrZXk6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgaWYgKCF0aGlzLl90cmFuc2xhdGlvbk9iamVjdCkge1xuICAgICAgcmV0dXJuIGtleTtcbiAgICB9XG4gICAgY29uc3QgcHJlZml4ZWRLZXkgPSB0aGlzLnByZWZpeCArIGtleTtcbiAgICBjb25zdCByZXMgPSB0aGlzLnRyYW5zbGF0ZS5nZXRQYXJzZWRSZXN1bHQodGhpcy5fdHJhbnNsYXRpb25PYmplY3QsIHByZWZpeGVkS2V5KTtcbiAgICAvLyBpZ25vcmUgbm9uLXRyYW5zbGF0ZWQgdGV4dCBsaWtlICdST1VURVMuaG9tZSdcbiAgICBpZiAocmVzID09PSBwcmVmaXhlZEtleSkge1xuICAgICAgcmV0dXJuIGtleTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcyB8fCBrZXk7XG4gIH1cbn1cblxuLyoqXG4gKiBNYW51YWxseSBzZXQgY29uZmlndXJhdGlvblxuICovXG5leHBvcnQgY2xhc3MgTWFudWFsUGFyc2VyTG9hZGVyIGV4dGVuZHMgTG9jYWxpemVQYXJzZXIge1xuXG5cbiAgY29uc3RydWN0b3IodHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlLCBsb2NhdGlvbjogTG9jYXRpb24sIHNldHRpbmdzOiBMb2NhbGl6ZVJvdXRlclNldHRpbmdzLCBsb2NhbGVzOiBzdHJpbmdbXSA9IFsnZW4nXSwgcHJlZml4OiBzdHJpbmcgPSAnUk9VVEVTLicpIHtcbiAgICBzdXBlcih0cmFuc2xhdGUsIGxvY2F0aW9uLCBzZXR0aW5ncyk7XG4gICAgdGhpcy5sb2NhbGVzID0gbG9jYWxlcztcbiAgICB0aGlzLnByZWZpeCA9IHByZWZpeCB8fCAnJztcbiAgfVxuXG5cbiAgbG9hZChyb3V0ZXM6IFJvdXRlcyk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlOiBhbnkpID0+IHtcbiAgICAgIHRoaXMuaW5pdChyb3V0ZXMpLnRoZW4ocmVzb2x2ZSk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIER1bW15TG9jYWxpemVQYXJzZXIgZXh0ZW5kcyBMb2NhbGl6ZVBhcnNlciB7XG4gIGxvYWQocm91dGVzOiBSb3V0ZXMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmU6IGFueSkgPT4ge1xuICAgICAgdGhpcy5pbml0KHJvdXRlcykudGhlbihyZXNvbHZlKTtcbiAgICB9KTtcbiAgfVxufVxuIl19