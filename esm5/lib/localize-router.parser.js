/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { LocalizeRouterSettings, CacheMechanismEnum } from './localize-router.config';
import { Inject } from '@angular/core';
import { map } from 'rxjs/operators';
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
                (_a = this.routes).unshift.apply(_a, tslib_1.__spread(children));
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
export { LocalizeParser };
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
var /**
 * Manually set configuration
 */
ManualParserLoader = /** @class */ (function (_super) {
    tslib_1.__extends(ManualParserLoader, _super);
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
/**
 * Manually set configuration
 */
export { ManualParserLoader };
var DummyLocalizeParser = /** @class */ (function (_super) {
    tslib_1.__extends(DummyLocalizeParser, _super);
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
export { DummyLocalizeParser };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxpemUtcm91dGVyLnBhcnNlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xvY2FsaXplLXJvdXRlci8iLCJzb3VyY2VzIjpbImxpYi9sb2NhbGl6ZS1yb3V0ZXIucGFyc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFdkQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3RGLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztJQUUvQixhQUFhLEdBQUcsRUFBRTs7Ozs7O0FBS3hCO0lBYUUsd0JBQThDLFNBQTJCLEVBQ25DLFFBQWtCLEVBQ0osUUFBZ0M7UUFGdEMsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFDbkMsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNKLGFBQVEsR0FBUixRQUFRLENBQXdCO0lBQ3BGLENBQUM7Ozs7OztJQU1TLDZCQUFJOzs7OztJQUFkLFVBQWUsTUFBYzs7UUFDM0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFFckIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUN6QyxPQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUMxQjs7Ozs7WUFFSyxZQUFZLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRTs7WUFDckMsV0FBVyxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUU7UUFFMUMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixFQUFFO1lBQ3JDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxt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SUM7UUFIQyxPQUFPLElBQUksT0FBTzs7OztRQUFDLFVBQUMsT0FBWTtZQUM5QixLQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNsQyxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7SUFDSCwwQkFBQztBQUFELENBQUMsQUFORCxDQUF5QyxjQUFjLEdBTXREIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUm91dGVzLCBSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBMb2NhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBMb2NhbGl6ZVJvdXRlclNldHRpbmdzLCBDYWNoZU1lY2hhbmlzbUVudW0gfSBmcm9tICcuL2xvY2FsaXplLXJvdXRlci5jb25maWcnO1xuaW1wb3J0IHsgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmNvbnN0IENPT0tJRV9FWFBJUlkgPSAzMDsgLy8gMSBtb250aFxuXG4vKipcbiAqIEFic3RyYWN0IGNsYXNzIGZvciBwYXJzaW5nIGxvY2FsaXphdGlvblxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTG9jYWxpemVQYXJzZXIge1xuICBsb2NhbGVzOiBBcnJheTxzdHJpbmc+O1xuICBjdXJyZW50TGFuZzogc3RyaW5nO1xuICByb3V0ZXM6IFJvdXRlcztcbiAgZGVmYXVsdExhbmc6IHN0cmluZztcblxuICBwcm90ZWN0ZWQgcHJlZml4OiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBfdHJhbnNsYXRpb25PYmplY3Q6IGFueTtcbiAgcHJpdmF0ZSBfd2lsZGNhcmRSb3V0ZTogUm91dGU7XG4gIHByaXZhdGUgX2xhbmd1YWdlUm91dGU6IFJvdXRlO1xuXG5cbiAgY29uc3RydWN0b3IoQEluamVjdChUcmFuc2xhdGVTZXJ2aWNlKSBwcml2YXRlIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZSxcbiAgICAgICAgICAgICAgQEluamVjdChMb2NhdGlvbikgcHJpdmF0ZSBsb2NhdGlvbjogTG9jYXRpb24sXG4gICAgICAgICAgICAgIEBJbmplY3QoTG9jYWxpemVSb3V0ZXJTZXR0aW5ncykgcHJpdmF0ZSBzZXR0aW5nczogTG9jYWxpemVSb3V0ZXJTZXR0aW5ncykge1xuICB9XG5cblxuICBhYnN0cmFjdCBsb2FkKHJvdXRlczogUm91dGVzKTogUHJvbWlzZTxhbnk+O1xuXG5cbiAgcHJvdGVjdGVkIGluaXQocm91dGVzOiBSb3V0ZXMpOiBQcm9taXNlPGFueT4ge1xuICAgIHRoaXMucm91dGVzID0gcm91dGVzO1xuXG4gICAgaWYgKCF0aGlzLmxvY2FsZXMgfHwgIXRoaXMubG9jYWxlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9XG4gICAgLyoqIGRldGVjdCBjdXJyZW50IGxhbmd1YWdlICovXG4gICAgY29uc3QgbG9jYXRpb25MYW5nID0gdGhpcy5nZXRMb2NhdGlvbkxhbmcoKTtcbiAgICBjb25zdCBicm93c2VyTGFuZyA9IHRoaXMuX2dldEJyb3dzZXJMYW5nKCk7XG5cbiAgICBpZiAodGhpcy5zZXR0aW5ncy5kZWZhdWx0TGFuZ0Z1bmN0aW9uKSB7XG4gICAgICB0aGlzLmRlZmF1bHRMYW5nID0gdGhpcy5zZXR0aW5ncy5kZWZhdWx0TGFuZ0Z1bmN0aW9uKHRoaXMubG9jYWxlcywgdGhpcy5fY2FjaGVkTGFuZywgYnJvd3NlckxhbmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRlZmF1bHRMYW5nID0gdGhpcy5fY2FjaGVkTGFuZyB8fCBicm93c2VyTGFuZyB8fCB0aGlzLmxvY2FsZXNbMF07XG4gICAgfVxuICAgIGNvbnN0IHNlbGVjdGVkTGFuZ3VhZ2UgPSBsb2NhdGlvbkxhbmcgfHwgdGhpcy5kZWZhdWx0TGFuZztcbiAgICB0aGlzLnRyYW5zbGF0ZS5zZXREZWZhdWx0TGFuZyh0aGlzLmRlZmF1bHRMYW5nKTtcblxuICAgIGxldCBjaGlsZHJlbjogUm91dGVzID0gW107XG4gICAgLyoqIGlmIHNldCBwcmVmaXggaXMgZW5mb3JjZWQgKi9cbiAgICBpZiAodGhpcy5zZXR0aW5ncy5hbHdheXNTZXRQcmVmaXgpIHtcbiAgICAgIGNvbnN0IGJhc2VSb3V0ZSA9IHsgcGF0aDogJycsIHJlZGlyZWN0VG86IHRoaXMuZGVmYXVsdExhbmcsIHBhdGhNYXRjaDogJ2Z1bGwnIH07XG5cbiAgICAgIC8qKiBleHRyYWN0IHBvdGVudGlhbCB3aWxkY2FyZCByb3V0ZSAqL1xuICAgICAgY29uc3Qgd2lsZGNhcmRJbmRleCA9IHJvdXRlcy5maW5kSW5kZXgoKHJvdXRlOiBSb3V0ZSkgPT4gcm91dGUucGF0aCA9PT0gJyoqJyk7XG4gICAgICBpZiAod2lsZGNhcmRJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgdGhpcy5fd2lsZGNhcmRSb3V0ZSA9IHJvdXRlcy5zcGxpY2Uod2lsZGNhcmRJbmRleCwgMSlbMF07XG4gICAgICB9XG4gICAgICBjaGlsZHJlbiA9IHRoaXMucm91dGVzLnNwbGljZSgwLCB0aGlzLnJvdXRlcy5sZW5ndGgsIGJhc2VSb3V0ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNoaWxkcmVuID0gdGhpcy5yb3V0ZXMuc3BsaWNlKDAsIHRoaXMucm91dGVzLmxlbmd0aCk7XG4gICAgfVxuXG4gICAgLyoqIGV4Y2x1ZGUgY2VydGFpbiByb3V0ZXMgKi9cbiAgICBmb3IgKGxldCBpID0gY2hpbGRyZW4ubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIGlmIChjaGlsZHJlbltpXS5kYXRhICYmIGNoaWxkcmVuW2ldLmRhdGFbJ3NraXBSb3V0ZUxvY2FsaXphdGlvbiddKSB7XG4gICAgICAgIHRoaXMucm91dGVzLnB1c2goY2hpbGRyZW5baV0pO1xuICAgICAgICBjaGlsZHJlbi5zcGxpY2UoaSwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqIGFwcGVuZCBjaGlsZHJlbiByb3V0ZXMgKi9cbiAgICBpZiAoY2hpbGRyZW4gJiYgY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICBpZiAodGhpcy5sb2NhbGVzLmxlbmd0aCA+IDEgfHwgdGhpcy5zZXR0aW5ncy5hbHdheXNTZXRQcmVmaXgpIHtcbiAgICAgICAgdGhpcy5fbGFuZ3VhZ2VSb3V0ZSA9IHsgY2hpbGRyZW46IGNoaWxkcmVuIH07XG4gICAgICAgIHRoaXMucm91dGVzLnVuc2hpZnQodGhpcy5fbGFuZ3VhZ2VSb3V0ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJvdXRlcy51bnNoaWZ0KC4uLmNoaWxkcmVuKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogLi4uYW5kIHBvdGVudGlhbCB3aWxkY2FyZCByb3V0ZSAqL1xuICAgIGlmICh0aGlzLl93aWxkY2FyZFJvdXRlICYmIHRoaXMuc2V0dGluZ3MuYWx3YXlzU2V0UHJlZml4KSB7XG4gICAgICB0aGlzLnJvdXRlcy5wdXNoKHRoaXMuX3dpbGRjYXJkUm91dGUpO1xuICAgIH1cblxuICAgIC8qKiB0cmFuc2xhdGUgcm91dGVzICovXG4gICAgcmV0dXJuIHRoaXMudHJhbnNsYXRlUm91dGVzKHNlbGVjdGVkTGFuZ3VhZ2UpLnRvUHJvbWlzZSgpO1xuICB9XG5cbiAgaW5pdENoaWxkUm91dGVzKHJvdXRlczogUm91dGVzKSB7XG4gICAgdGhpcy5fdHJhbnNsYXRlUm91dGVUcmVlKHJvdXRlcyk7XG4gICAgcmV0dXJuIHJvdXRlcztcbiAgfVxuXG4gIG11dGF0ZVJvdXRlclJvb3RSb3V0ZShjdXJyZW50TGFuZ3VhZ2U6IHN0cmluZywgcHJldmlvdXNMYW5ndWFnZTogc3RyaW5nLCByb3V0ZXM6IFJvdXRlcykge1xuICAgIGNvbnN0IHByZXZpb3VzVHJhbnNsYXRlZExhbmd1YWdlID0gdGhpcy5zZXR0aW5ncy5hbHdheXNTZXRQcmVmaXggfHwgcHJldmlvdXNMYW5ndWFnZSAhPT0gdGhpcy5kZWZhdWx0TGFuZyA/XG4gICAgICBwcmV2aW91c0xhbmd1YWdlIDogJyc7XG4gICAgY29uc3QgY3VycmVudFRyYW5zbGF0ZWRMYW5ndWFnZSA9IHRoaXMuc2V0dGluZ3MuYWx3YXlzU2V0UHJlZml4IHx8IGN1cnJlbnRMYW5ndWFnZSAhPT0gdGhpcy5kZWZhdWx0TGFuZyA/XG4gICAgICBjdXJyZW50TGFuZ3VhZ2UgOiAnJztcbiAgICBjb25zdCBiYXNlUm91dGUgPSByb3V0ZXMuZmluZChyb3V0ZSA9PiByb3V0ZS5wYXRoID09PSBwcmV2aW91c1RyYW5zbGF0ZWRMYW5ndWFnZSk7XG4gICAgaWYgKGJhc2VSb3V0ZSkge1xuICAgICAgYmFzZVJvdXRlLnBhdGggPSBjdXJyZW50VHJhbnNsYXRlZExhbmd1YWdlO1xuICAgIH1cbiAgfVxuXG5cbiAgdHJhbnNsYXRlUm91dGVzKGxhbmd1YWdlOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHRoaXMuc2V0Um9vdExhbmd1YWdlKGxhbmd1YWdlKTtcblxuICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZS51c2UobGFuZ3VhZ2UpXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKHRyYW5zbGF0aW9ucyA9PiB7XG4gICAgICAgICAgdGhpcy5fdHJhbnNsYXRpb25PYmplY3QgPSB0cmFuc2xhdGlvbnM7XG4gICAgICAgICAgdGhpcy5jdXJyZW50TGFuZyA9IGxhbmd1YWdlO1xuXG4gICAgICAgICAgaWYgKHRoaXMuX2xhbmd1YWdlUm91dGUpIHtcbiAgICAgICAgICAgIHRoaXMuX3RyYW5zbGF0ZVJvdXRlVHJlZSh0aGlzLl9sYW5ndWFnZVJvdXRlLmNoaWxkcmVuKTtcblxuICAgICAgICAgICAgLy8gaWYgdGhlcmUgaXMgd2lsZGNhcmQgcm91dGVcbiAgICAgICAgICAgIGlmICh0aGlzLl93aWxkY2FyZFJvdXRlICYmIHRoaXMuX3dpbGRjYXJkUm91dGUucmVkaXJlY3RUbykge1xuICAgICAgICAgICAgICB0aGlzLl90cmFuc2xhdGVQcm9wZXJ0eSh0aGlzLl93aWxkY2FyZFJvdXRlLCAncmVkaXJlY3RUbycsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl90cmFuc2xhdGVSb3V0ZVRyZWUodGhpcy5yb3V0ZXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICk7XG4gIH1cblxuICBwcml2YXRlIHNldFJvb3RMYW5ndWFnZShsYW5ndWFnZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fY2FjaGVkTGFuZyA9IGxhbmd1YWdlO1xuICAgIGlmICh0aGlzLl9sYW5ndWFnZVJvdXRlKSB7XG4gICAgICB0aGlzLl9sYW5ndWFnZVJvdXRlLnBhdGggPSB0aGlzLnNldHRpbmdzLmFsd2F5c1NldFByZWZpeCB8fCBsYW5ndWFnZSAhPT0gdGhpcy5kZWZhdWx0TGFuZyA/XG4gICAgICAgIGxhbmd1YWdlIDogJyc7XG4gICAgfVxuICB9XG5cblxuICBwcml2YXRlIF90cmFuc2xhdGVSb3V0ZVRyZWUocm91dGVzOiBSb3V0ZXMpOiB2b2lkIHtcbiAgICByb3V0ZXMuZm9yRWFjaCgocm91dGU6IFJvdXRlKSA9PiB7XG4gICAgICBpZiAocm91dGUucGF0aCAmJiByb3V0ZS5wYXRoICE9PSAnKionKSB7XG4gICAgICAgIHRoaXMuX3RyYW5zbGF0ZVByb3BlcnR5KHJvdXRlLCAncGF0aCcpO1xuICAgICAgfVxuICAgICAgaWYgKHJvdXRlLnJlZGlyZWN0VG8pIHtcbiAgICAgICAgdGhpcy5fdHJhbnNsYXRlUHJvcGVydHkocm91dGUsICdyZWRpcmVjdFRvJywgIXJvdXRlLnJlZGlyZWN0VG8uaW5kZXhPZignLycpKTtcbiAgICAgIH1cbiAgICAgIGlmIChyb3V0ZS5jaGlsZHJlbikge1xuICAgICAgICB0aGlzLl90cmFuc2xhdGVSb3V0ZVRyZWUocm91dGUuY2hpbGRyZW4pO1xuICAgICAgfVxuICAgICAgaWYgKHJvdXRlLmxvYWRDaGlsZHJlbiAmJiAoPGFueT5yb3V0ZSkuX2xvYWRlZENvbmZpZykge1xuICAgICAgICB0aGlzLl90cmFuc2xhdGVSb3V0ZVRyZWUoKDxhbnk+cm91dGUpLl9sb2FkZWRDb25maWcucm91dGVzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG5cbiAgcHJpdmF0ZSBfdHJhbnNsYXRlUHJvcGVydHkocm91dGU6IFJvdXRlLCBwcm9wZXJ0eTogc3RyaW5nLCBwcmVmaXhMYW5nPzogYm9vbGVhbik6IHZvaWQge1xuICAgIC8vIHNldCBwcm9wZXJ0eSB0byBkYXRhIGlmIG5vdCB0aGVyZSB5ZXRcbiAgICBjb25zdCByb3V0ZURhdGE6IGFueSA9IHJvdXRlLmRhdGEgPSByb3V0ZS5kYXRhIHx8IHt9O1xuICAgIGlmICghcm91dGVEYXRhLmxvY2FsaXplUm91dGVyKSB7XG4gICAgICByb3V0ZURhdGEubG9jYWxpemVSb3V0ZXIgPSB7fTtcbiAgICB9XG4gICAgaWYgKCFyb3V0ZURhdGEubG9jYWxpemVSb3V0ZXJbcHJvcGVydHldKSB7XG4gICAgICByb3V0ZURhdGEubG9jYWxpemVSb3V0ZXJbcHJvcGVydHldID0gKDxhbnk+cm91dGUpW3Byb3BlcnR5XTtcbiAgICB9XG5cbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLnRyYW5zbGF0ZVJvdXRlKHJvdXRlRGF0YS5sb2NhbGl6ZVJvdXRlcltwcm9wZXJ0eV0pO1xuICAgICg8YW55PnJvdXRlKVtwcm9wZXJ0eV0gPSBwcmVmaXhMYW5nID8gYC8ke3RoaXMudXJsUHJlZml4fSR7cmVzdWx0fWAgOiByZXN1bHQ7XG4gIH1cblxuICBnZXQgdXJsUHJlZml4KCkge1xuICAgIHJldHVybiB0aGlzLnNldHRpbmdzLmFsd2F5c1NldFByZWZpeCB8fCB0aGlzLmN1cnJlbnRMYW5nICE9PSB0aGlzLmRlZmF1bHRMYW5nID8gdGhpcy5jdXJyZW50TGFuZyA6ICcnO1xuICB9XG5cblxuICB0cmFuc2xhdGVSb3V0ZShwYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IHF1ZXJ5UGFydHMgPSBwYXRoLnNwbGl0KCc/Jyk7XG4gICAgaWYgKHF1ZXJ5UGFydHMubGVuZ3RoID4gMikge1xuICAgICAgdGhyb3cgJ1RoZXJlIHNob3VsZCBiZSBvbmx5IG9uZSBxdWVyeSBwYXJhbWV0ZXIgYmxvY2sgaW4gdGhlIFVSTCc7XG4gICAgfVxuICAgIGNvbnN0IHBhdGhTZWdtZW50cyA9IHF1ZXJ5UGFydHNbMF0uc3BsaXQoJy8nKTtcblxuICAgIC8qKiBjb2xsZWN0IG9ic2VydmFibGVzICAqL1xuICAgIHJldHVybiBwYXRoU2VnbWVudHNcbiAgICAgIC5tYXAoKHBhcnQ6IHN0cmluZykgPT4gcGFydC5sZW5ndGggPyB0aGlzLnRyYW5zbGF0ZVRleHQocGFydCkgOiBwYXJ0KVxuICAgICAgLmpvaW4oJy8nKSArXG4gICAgICAocXVlcnlQYXJ0cy5sZW5ndGggPiAxID8gYD8ke3F1ZXJ5UGFydHNbMV19YCA6ICcnKTtcbiAgfVxuXG5cbiAgZ2V0TG9jYXRpb25MYW5nKHVybD86IHN0cmluZyk6IHN0cmluZyB7XG4gICAgY29uc3QgcGF0aFNsaWNlcyA9ICh1cmwgfHwgdGhpcy5sb2NhdGlvbi5wYXRoKCkgfHwgJycpXG4gICAgICAuc3BsaXQoJyMnKVswXVxuICAgICAgLnNwbGl0KCc/JylbMF1cbiAgICAgIC5zcGxpdCgnLycpO1xuICAgIGlmIChwYXRoU2xpY2VzLmxlbmd0aCA+IDEgJiYgdGhpcy5sb2NhbGVzLmluZGV4T2YocGF0aFNsaWNlc1sxXSkgIT09IC0xKSB7XG4gICAgICByZXR1cm4gcGF0aFNsaWNlc1sxXTtcbiAgICB9XG4gICAgaWYgKHBhdGhTbGljZXMubGVuZ3RoICYmIHRoaXMubG9jYWxlcy5pbmRleE9mKHBhdGhTbGljZXNbMF0pICE9PSAtMSkge1xuICAgICAgcmV0dXJuIHBhdGhTbGljZXNbMF07XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cblxuICBwcml2YXRlIF9nZXRCcm93c2VyTGFuZygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9yZXR1cm5JZkluTG9jYWxlcyh0aGlzLnRyYW5zbGF0ZS5nZXRCcm93c2VyTGFuZygpKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IF9jYWNoZWRMYW5nKCk6IHN0cmluZyB7XG4gICAgaWYgKCF0aGlzLnNldHRpbmdzLnVzZUNhY2hlZExhbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuc2V0dGluZ3MuY2FjaGVNZWNoYW5pc20gPT09IENhY2hlTWVjaGFuaXNtRW51bS5Mb2NhbFN0b3JhZ2UpIHtcbiAgICAgIHJldHVybiB0aGlzLl9jYWNoZVdpdGhMb2NhbFN0b3JhZ2UoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuc2V0dGluZ3MuY2FjaGVNZWNoYW5pc20gPT09IENhY2hlTWVjaGFuaXNtRW51bS5Db29raWUpIHtcbiAgICAgIHJldHVybiB0aGlzLl9jYWNoZVdpdGhDb29raWVzKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXQgX2NhY2hlZExhbmcodmFsdWU6IHN0cmluZykge1xuICAgIGlmICghdGhpcy5zZXR0aW5ncy51c2VDYWNoZWRMYW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLnNldHRpbmdzLmNhY2hlTWVjaGFuaXNtID09PSBDYWNoZU1lY2hhbmlzbUVudW0uTG9jYWxTdG9yYWdlKSB7XG4gICAgICB0aGlzLl9jYWNoZVdpdGhMb2NhbFN0b3JhZ2UodmFsdWUpO1xuICAgIH1cbiAgICBpZiAodGhpcy5zZXR0aW5ncy5jYWNoZU1lY2hhbmlzbSA9PT0gQ2FjaGVNZWNoYW5pc21FbnVtLkNvb2tpZSkge1xuICAgICAgdGhpcy5fY2FjaGVXaXRoQ29va2llcyh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY2FjaGVXaXRoTG9jYWxTdG9yYWdlKHZhbHVlPzogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgfHwgdHlwZW9mIHdpbmRvdy5sb2NhbFN0b3JhZ2UgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMuc2V0dGluZ3MuY2FjaGVOYW1lLCB2YWx1ZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLl9yZXR1cm5JZkluTG9jYWxlcyh3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy5zZXR0aW5ncy5jYWNoZU5hbWUpKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyB3ZWlyZCBTYWZhcmkgaXNzdWUgaW4gcHJpdmF0ZSBtb2RlLCB3aGVyZSBMb2NhbFN0b3JhZ2UgaXMgZGVmaW5lZCBidXQgdGhyb3dzIGVycm9yIG9uIGFjY2Vzc1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2NhY2hlV2l0aENvb2tpZXModmFsdWU/OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnIHx8IHR5cGVvZiBkb2N1bWVudC5jb29raWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICBjb25zdCBuYW1lID0gZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuc2V0dGluZ3MuY2FjaGVOYW1lKTtcbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICBjb25zdCBkOiBEYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgZC5zZXRUaW1lKGQuZ2V0VGltZSgpICsgQ09PS0lFX0VYUElSWSAqIDg2NDAwMDAwKTsgLy8gKiBkYXlzXG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGAke25hbWV9PSR7ZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKX07ZXhwaXJlcz0ke2QudG9VVENTdHJpbmcoKX1gO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCByZWdleHAgPSBuZXcgUmVnRXhwKCcoPzpeJyArIG5hbWUgKyAnfDtcXFxccyonICsgbmFtZSArICcpPSguKj8pKD86O3wkKScsICdnJyk7XG4gICAgICBjb25zdCByZXN1bHQgPSByZWdleHAuZXhlYyhkb2N1bWVudC5jb29raWUpO1xuICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChyZXN1bHRbMV0pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybjsgLy8gc2hvdWxkIG5vdCBoYXBwZW4gYnV0IGJldHRlciBzYWZlIHRoYW4gc29ycnlcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9yZXR1cm5JZkluTG9jYWxlcyh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBpZiAodmFsdWUgJiYgdGhpcy5sb2NhbGVzLmluZGV4T2YodmFsdWUpICE9PSAtMSkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgdHJhbnNsYXRlVGV4dChrZXk6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgaWYgKCF0aGlzLl90cmFuc2xhdGlvbk9iamVjdCkge1xuICAgICAgcmV0dXJuIGtleTtcbiAgICB9XG4gICAgY29uc3QgcHJlZml4ZWRLZXkgPSB0aGlzLnByZWZpeCArIGtleTtcbiAgICBjb25zdCByZXMgPSB0aGlzLnRyYW5zbGF0ZS5nZXRQYXJzZWRSZXN1bHQodGhpcy5fdHJhbnNsYXRpb25PYmplY3QsIHByZWZpeGVkS2V5KTtcbiAgICAvLyBpZ25vcmUgbm9uLXRyYW5zbGF0ZWQgdGV4dCBsaWtlICdST1VURVMuaG9tZSdcbiAgICBpZiAocmVzID09PSBwcmVmaXhlZEtleSkge1xuICAgICAgcmV0dXJuIGtleTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcyB8fCBrZXk7XG4gIH1cbn1cblxuLyoqXG4gKiBNYW51YWxseSBzZXQgY29uZmlndXJhdGlvblxuICovXG5leHBvcnQgY2xhc3MgTWFudWFsUGFyc2VyTG9hZGVyIGV4dGVuZHMgTG9jYWxpemVQYXJzZXIge1xuXG5cbiAgY29uc3RydWN0b3IodHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlLCBsb2NhdGlvbjogTG9jYXRpb24sIHNldHRpbmdzOiBMb2NhbGl6ZVJvdXRlclNldHRpbmdzLCBsb2NhbGVzOiBzdHJpbmdbXSA9IFsnZW4nXSwgcHJlZml4OiBzdHJpbmcgPSAnUk9VVEVTLicpIHtcbiAgICBzdXBlcih0cmFuc2xhdGUsIGxvY2F0aW9uLCBzZXR0aW5ncyk7XG4gICAgdGhpcy5sb2NhbGVzID0gbG9jYWxlcztcbiAgICB0aGlzLnByZWZpeCA9IHByZWZpeCB8fCAnJztcbiAgfVxuXG5cbiAgbG9hZChyb3V0ZXM6IFJvdXRlcyk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlOiBhbnkpID0+IHtcbiAgICAgIHRoaXMuaW5pdChyb3V0ZXMpLnRoZW4ocmVzb2x2ZSk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIER1bW15TG9jYWxpemVQYXJzZXIgZXh0ZW5kcyBMb2NhbGl6ZVBhcnNlciB7XG4gIGxvYWQocm91dGVzOiBSb3V0ZXMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmU6IGFueSkgPT4ge1xuICAgICAgdGhpcy5pbml0KHJvdXRlcykudGhlbihyZXNvbHZlKTtcbiAgICB9KTtcbiAgfVxufVxuIl19