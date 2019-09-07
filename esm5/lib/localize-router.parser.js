import * as tslib_1 from "tslib";
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { CacheMechanism, LocalizeRouterSettings } from './localize-router.config';
import { Inject } from '@angular/core';
import { map } from 'rxjs/operators';
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
    LocalizeParser = tslib_1.__decorate([
        tslib_1.__param(0, Inject(TranslateService)),
        tslib_1.__param(1, Inject(Location)),
        tslib_1.__param(2, Inject(LocalizeRouterSettings)),
        tslib_1.__metadata("design:paramtypes", [TranslateService,
            Location,
            LocalizeRouterSettings])
    ], LocalizeParser);
    return LocalizeParser;
}());
export { LocalizeParser };
/**
 * Manually set configuration
 */
var ManualParserLoader = /** @class */ (function (_super) {
    tslib_1.__extends(ManualParserLoader, _super);
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
export { ManualParserLoader };
var DummyLocalizeParser = /** @class */ (function (_super) {
    tslib_1.__extends(DummyLocalizeParser, _super);
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
export { DummyLocalizeParser };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxpemUtcm91dGVyLnBhcnNlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xvY2FsaXplLXJvdXRlci8iLCJzb3VyY2VzIjpbImxpYi9sb2NhbGl6ZS1yb3V0ZXIucGFyc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUV2RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2xGLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJDLElBQU0sYUFBYSxHQUFHLEVBQUUsQ0FBQyxDQUFDLFVBQVU7QUFFcEM7O0dBRUc7QUFDSDtJQVlFOzs7OztPQUtHO0lBQ0gsd0JBQThDLFNBQTJCLEVBQ25DLFFBQWtCLEVBQ0osUUFBZ0M7UUFGdEMsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFDbkMsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNKLGFBQVEsR0FBUixRQUFRLENBQXdCO0lBQ3BGLENBQUM7SUFTRDs7OztPQUlHO0lBQ08sNkJBQUksR0FBZCxVQUFlLE1BQWM7O1FBQzNCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBRXJCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7WUFDekMsT0FBTyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDMUI7UUFDRCw4QkFBOEI7UUFDOUIsSUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQzVDLElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUUzQyxJQUFJLElBQUksQ0FBQyxRQUFR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QUF5QywrQ0FBYztJQUF2RDs7SUFNQSxDQUFDO0lBTEMsa0NBQUksR0FBSixVQUFLLE1BQWM7UUFBbkIsaUJBSUM7UUFIQyxPQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBWTtZQUM5QixLQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNsQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDSCwwQkFBQztBQUFELENBQUMsQUFORCxDQUF5QyxjQUFjLEdBTXREIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUm91dGVzLCBSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBMb2NhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDYWNoZU1lY2hhbmlzbSwgTG9jYWxpemVSb3V0ZXJTZXR0aW5ncyB9IGZyb20gJy4vbG9jYWxpemUtcm91dGVyLmNvbmZpZyc7XG5pbXBvcnQgeyBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuY29uc3QgQ09PS0lFX0VYUElSWSA9IDMwOyAvLyAxIG1vbnRoXG5cbi8qKlxuICogQWJzdHJhY3QgY2xhc3MgZm9yIHBhcnNpbmcgbG9jYWxpemF0aW9uXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBMb2NhbGl6ZVBhcnNlciB7XG4gIGxvY2FsZXM6IEFycmF5PHN0cmluZz47XG4gIGN1cnJlbnRMYW5nOiBzdHJpbmc7XG4gIHJvdXRlczogUm91dGVzO1xuICBkZWZhdWx0TGFuZzogc3RyaW5nO1xuXG4gIHByb3RlY3RlZCBwcmVmaXg6IHN0cmluZztcblxuICBwcml2YXRlIF90cmFuc2xhdGlvbk9iamVjdDogYW55O1xuICBwcml2YXRlIF93aWxkY2FyZFJvdXRlOiBSb3V0ZTtcbiAgcHJpdmF0ZSBfbGFuZ3VhZ2VSb3V0ZTogUm91dGU7XG5cbiAgLyoqXG4gICAqIExvYWRlciBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gdHJhbnNsYXRlXG4gICAqIEBwYXJhbSBsb2NhdGlvblxuICAgKiBAcGFyYW0gc2V0dGluZ3NcbiAgICovXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoVHJhbnNsYXRlU2VydmljZSkgcHJpdmF0ZSB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2UsXG4gICAgICAgICAgICAgIEBJbmplY3QoTG9jYXRpb24pIHByaXZhdGUgbG9jYXRpb246IExvY2F0aW9uLFxuICAgICAgICAgICAgICBASW5qZWN0KExvY2FsaXplUm91dGVyU2V0dGluZ3MpIHByaXZhdGUgc2V0dGluZ3M6IExvY2FsaXplUm91dGVyU2V0dGluZ3MpIHtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2FkIHJvdXRlcyBhbmQgZmV0Y2ggbmVjZXNzYXJ5IGRhdGFcbiAgICogQHBhcmFtIHJvdXRlc1xuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxuICAgKi9cbiAgYWJzdHJhY3QgbG9hZChyb3V0ZXM6IFJvdXRlcyk6IFByb21pc2U8YW55PjtcblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSBsYW5ndWFnZSBhbmQgcm91dGVzXG4gICAqIEBwYXJhbSByb3V0ZXNcbiAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cbiAgICovXG4gIHByb3RlY3RlZCBpbml0KHJvdXRlczogUm91dGVzKTogUHJvbWlzZTxhbnk+IHtcbiAgICB0aGlzLnJvdXRlcyA9IHJvdXRlcztcblxuICAgIGlmICghdGhpcy5sb2NhbGVzIHx8ICF0aGlzLmxvY2FsZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfVxuICAgIC8qKiBkZXRlY3QgY3VycmVudCBsYW5ndWFnZSAqL1xuICAgIGNvbnN0IGxvY2F0aW9uTGFuZyA9IHRoaXMuZ2V0TG9jYXRpb25MYW5nKCk7XG4gICAgY29uc3QgYnJvd3NlckxhbmcgPSB0aGlzLl9nZXRCcm93c2VyTGFuZygpO1xuXG4gICAgaWYgKHRoaXMuc2V0dGluZ3MuZGVmYXVsdExhbmdGdW5jdGlvbikge1xuICAgICAgdGhpcy5kZWZhdWx0TGFuZyA9IHRoaXMuc2V0dGluZ3MuZGVmYXVsdExhbmdGdW5jdGlvbih0aGlzLmxvY2FsZXMsIHRoaXMuX2NhY2hlZExhbmcsIGJyb3dzZXJMYW5nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kZWZhdWx0TGFuZyA9IHRoaXMuX2NhY2hlZExhbmcgfHwgYnJvd3NlckxhbmcgfHwgdGhpcy5sb2NhbGVzWzBdO1xuICAgIH1cbiAgICBjb25zdCBzZWxlY3RlZExhbmd1YWdlID0gbG9jYXRpb25MYW5nIHx8IHRoaXMuZGVmYXVsdExhbmc7XG4gICAgdGhpcy50cmFuc2xhdGUuc2V0RGVmYXVsdExhbmcodGhpcy5kZWZhdWx0TGFuZyk7XG5cbiAgICBsZXQgY2hpbGRyZW46IFJvdXRlcyA9IFtdO1xuICAgIC8qKiBpZiBzZXQgcHJlZml4IGlzIGVuZm9yY2VkICovXG4gICAgaWYgKHRoaXMuc2V0dGluZ3MuYWx3YXlzU2V0UHJlZml4KSB7XG4gICAgICBjb25zdCBiYXNlUm91dGUgPSB7IHBhdGg6ICcnLCByZWRpcmVjdFRvOiB0aGlzLmRlZmF1bHRMYW5nLCBwYXRoTWF0Y2g6ICdmdWxsJyB9O1xuXG4gICAgICAvKiogZXh0cmFjdCBwb3RlbnRpYWwgd2lsZGNhcmQgcm91dGUgKi9cbiAgICAgIGNvbnN0IHdpbGRjYXJkSW5kZXggPSByb3V0ZXMuZmluZEluZGV4KChyb3V0ZTogUm91dGUpID0+IHJvdXRlLnBhdGggPT09ICcqKicpO1xuICAgICAgaWYgKHdpbGRjYXJkSW5kZXggIT09IC0xKSB7XG4gICAgICAgIHRoaXMuX3dpbGRjYXJkUm91dGUgPSByb3V0ZXMuc3BsaWNlKHdpbGRjYXJkSW5kZXgsIDEpWzBdO1xuICAgICAgfVxuICAgICAgY2hpbGRyZW4gPSB0aGlzLnJvdXRlcy5zcGxpY2UoMCwgdGhpcy5yb3V0ZXMubGVuZ3RoLCBiYXNlUm91dGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjaGlsZHJlbiA9IHRoaXMucm91dGVzLnNwbGljZSgwLCB0aGlzLnJvdXRlcy5sZW5ndGgpO1xuICAgIH1cblxuICAgIC8qKiBleGNsdWRlIGNlcnRhaW4gcm91dGVzICovXG4gICAgZm9yIChsZXQgaSA9IGNoaWxkcmVuLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICBpZiAoY2hpbGRyZW5baV0uZGF0YSAmJiBjaGlsZHJlbltpXS5kYXRhWydza2lwUm91dGVMb2NhbGl6YXRpb24nXSkge1xuICAgICAgICB0aGlzLnJvdXRlcy5wdXNoKGNoaWxkcmVuW2ldKTtcbiAgICAgICAgY2hpbGRyZW4uc3BsaWNlKGksIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBhcHBlbmQgY2hpbGRyZW4gcm91dGVzICovXG4gICAgaWYgKGNoaWxkcmVuICYmIGNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgaWYgKHRoaXMubG9jYWxlcy5sZW5ndGggPiAxIHx8IHRoaXMuc2V0dGluZ3MuYWx3YXlzU2V0UHJlZml4KSB7XG4gICAgICAgIHRoaXMuX2xhbmd1YWdlUm91dGUgPSB7IGNoaWxkcmVuOiBjaGlsZHJlbiB9O1xuICAgICAgICB0aGlzLnJvdXRlcy51bnNoaWZ0KHRoaXMuX2xhbmd1YWdlUm91dGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yb3V0ZXMudW5zaGlmdCguLi5jaGlsZHJlbik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqIC4uLmFuZCBwb3RlbnRpYWwgd2lsZGNhcmQgcm91dGUgKi9cbiAgICBpZiAodGhpcy5fd2lsZGNhcmRSb3V0ZSAmJiB0aGlzLnNldHRpbmdzLmFsd2F5c1NldFByZWZpeCkge1xuICAgICAgdGhpcy5yb3V0ZXMucHVzaCh0aGlzLl93aWxkY2FyZFJvdXRlKTtcbiAgICB9XG5cbiAgICAvKiogdHJhbnNsYXRlIHJvdXRlcyAqL1xuICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZVJvdXRlcyhzZWxlY3RlZExhbmd1YWdlKS50b1Byb21pc2UoKTtcbiAgfVxuXG4gIGluaXRDaGlsZFJvdXRlcyhyb3V0ZXM6IFJvdXRlcykge1xuICAgIHRoaXMuX3RyYW5zbGF0ZVJvdXRlVHJlZShyb3V0ZXMpO1xuICAgIHJldHVybiByb3V0ZXM7XG4gIH1cblxuICBtdXRhdGVSb3V0ZXJSb290Um91dGUoY3VycmVudExhbmd1YWdlOiBzdHJpbmcsIHByZXZpb3VzTGFuZ3VhZ2U6IHN0cmluZywgcm91dGVzOiBSb3V0ZXMpIHtcbiAgICBjb25zdCBwcmV2aW91c1RyYW5zbGF0ZWRMYW5ndWFnZSA9IHRoaXMuc2V0dGluZ3MuYWx3YXlzU2V0UHJlZml4IHx8IHByZXZpb3VzTGFuZ3VhZ2UgIT09IHRoaXMuZGVmYXVsdExhbmcgP1xuICAgICAgcHJldmlvdXNMYW5ndWFnZSA6ICcnO1xuICAgIGNvbnN0IGN1cnJlbnRUcmFuc2xhdGVkTGFuZ3VhZ2UgPSB0aGlzLnNldHRpbmdzLmFsd2F5c1NldFByZWZpeCB8fCBjdXJyZW50TGFuZ3VhZ2UgIT09IHRoaXMuZGVmYXVsdExhbmcgP1xuICAgICAgY3VycmVudExhbmd1YWdlIDogJyc7XG4gICAgY29uc3QgYmFzZVJvdXRlID0gcm91dGVzLmZpbmQocm91dGUgPT4gcm91dGUucGF0aCA9PT0gcHJldmlvdXNUcmFuc2xhdGVkTGFuZ3VhZ2UpO1xuICAgIGlmIChiYXNlUm91dGUpIHtcbiAgICAgIGJhc2VSb3V0ZS5wYXRoID0gY3VycmVudFRyYW5zbGF0ZWRMYW5ndWFnZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVHJhbnNsYXRlIHJvdXRlcyB0byBzZWxlY3RlZCBsYW5ndWFnZVxuICAgKiBAcGFyYW0gbGFuZ3VhZ2VcbiAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cbiAgICovXG4gIHRyYW5zbGF0ZVJvdXRlcyhsYW5ndWFnZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICB0aGlzLnNldFJvb3RMYW5ndWFnZShsYW5ndWFnZSk7XG5cbiAgICByZXR1cm4gdGhpcy50cmFuc2xhdGUudXNlKGxhbmd1YWdlKVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCh0cmFuc2xhdGlvbnMgPT4ge1xuICAgICAgICAgIHRoaXMuX3RyYW5zbGF0aW9uT2JqZWN0ID0gdHJhbnNsYXRpb25zO1xuICAgICAgICAgIHRoaXMuY3VycmVudExhbmcgPSBsYW5ndWFnZTtcblxuICAgICAgICAgIGlmICh0aGlzLl9sYW5ndWFnZVJvdXRlKSB7XG4gICAgICAgICAgICB0aGlzLl90cmFuc2xhdGVSb3V0ZVRyZWUodGhpcy5fbGFuZ3VhZ2VSb3V0ZS5jaGlsZHJlbik7XG5cbiAgICAgICAgICAgIC8vIGlmIHRoZXJlIGlzIHdpbGRjYXJkIHJvdXRlXG4gICAgICAgICAgICBpZiAodGhpcy5fd2lsZGNhcmRSb3V0ZSAmJiB0aGlzLl93aWxkY2FyZFJvdXRlLnJlZGlyZWN0VG8pIHtcbiAgICAgICAgICAgICAgdGhpcy5fdHJhbnNsYXRlUHJvcGVydHkodGhpcy5fd2lsZGNhcmRSb3V0ZSwgJ3JlZGlyZWN0VG8nLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fdHJhbnNsYXRlUm91dGVUcmVlKHRoaXMucm91dGVzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRSb290TGFuZ3VhZ2UobGFuZ3VhZ2U6IHN0cmluZykge1xuICAgIHRoaXMuX2NhY2hlZExhbmcgPSBsYW5ndWFnZTtcbiAgICBpZiAodGhpcy5fbGFuZ3VhZ2VSb3V0ZSkge1xuICAgICAgdGhpcy5fbGFuZ3VhZ2VSb3V0ZS5wYXRoID0gdGhpcy5zZXR0aW5ncy5hbHdheXNTZXRQcmVmaXggfHwgbGFuZ3VhZ2UgIT09IHRoaXMuZGVmYXVsdExhbmcgP1xuICAgICAgICBsYW5ndWFnZSA6ICcnO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUcmFuc2xhdGUgdGhlIHJvdXRlIG5vZGUgYW5kIHJlY3Vyc2l2ZWx5IGNhbGwgZm9yIGFsbCBpdCdzIGNoaWxkcmVuXG4gICAqIEBwYXJhbSByb3V0ZXNcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgX3RyYW5zbGF0ZVJvdXRlVHJlZShyb3V0ZXM6IFJvdXRlcyk6IHZvaWQge1xuICAgIHJvdXRlcy5mb3JFYWNoKChyb3V0ZTogUm91dGUpID0+IHtcbiAgICAgIGlmIChyb3V0ZS5wYXRoICYmIHJvdXRlLnBhdGggIT09ICcqKicpIHtcbiAgICAgICAgdGhpcy5fdHJhbnNsYXRlUHJvcGVydHkocm91dGUsICdwYXRoJyk7XG4gICAgICB9XG4gICAgICBpZiAocm91dGUucmVkaXJlY3RUbykge1xuICAgICAgICB0aGlzLl90cmFuc2xhdGVQcm9wZXJ0eShyb3V0ZSwgJ3JlZGlyZWN0VG8nLCAhcm91dGUucmVkaXJlY3RUby5pbmRleE9mKCcvJykpO1xuICAgICAgfVxuICAgICAgaWYgKHJvdXRlLmNoaWxkcmVuKSB7XG4gICAgICAgIHRoaXMuX3RyYW5zbGF0ZVJvdXRlVHJlZShyb3V0ZS5jaGlsZHJlbik7XG4gICAgICB9XG4gICAgICBpZiAocm91dGUubG9hZENoaWxkcmVuICYmICg8YW55PnJvdXRlKS5fbG9hZGVkQ29uZmlnKSB7XG4gICAgICAgIHRoaXMuX3RyYW5zbGF0ZVJvdXRlVHJlZSgoPGFueT5yb3V0ZSkuX2xvYWRlZENvbmZpZy5yb3V0ZXMpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFRyYW5zbGF0ZSBwcm9wZXJ0eVxuICAgKiBJZiBmaXJzdCB0aW1lIHRyYW5zbGF0aW9uIHRoZW4gYWRkIG9yaWdpbmFsIHRvIHJvdXRlIGRhdGEgb2JqZWN0XG4gICAqIEBwYXJhbSByb3V0ZVxuICAgKiBAcGFyYW0gcHJvcGVydHlcbiAgICogQHBhcmFtIHByZWZpeExhbmdcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgX3RyYW5zbGF0ZVByb3BlcnR5KHJvdXRlOiBSb3V0ZSwgcHJvcGVydHk6IHN0cmluZywgcHJlZml4TGFuZz86IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAvLyBzZXQgcHJvcGVydHkgdG8gZGF0YSBpZiBub3QgdGhlcmUgeWV0XG4gICAgY29uc3Qgcm91dGVEYXRhOiBhbnkgPSByb3V0ZS5kYXRhID0gcm91dGUuZGF0YSB8fCB7fTtcbiAgICBpZiAoIXJvdXRlRGF0YS5sb2NhbGl6ZVJvdXRlcikge1xuICAgICAgcm91dGVEYXRhLmxvY2FsaXplUm91dGVyID0ge307XG4gICAgfVxuICAgIGlmICghcm91dGVEYXRhLmxvY2FsaXplUm91dGVyW3Byb3BlcnR5XSkge1xuICAgICAgcm91dGVEYXRhLmxvY2FsaXplUm91dGVyW3Byb3BlcnR5XSA9ICg8YW55PnJvdXRlKVtwcm9wZXJ0eV07XG4gICAgfVxuXG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy50cmFuc2xhdGVSb3V0ZShyb3V0ZURhdGEubG9jYWxpemVSb3V0ZXJbcHJvcGVydHldKTtcbiAgICAoPGFueT5yb3V0ZSlbcHJvcGVydHldID0gcHJlZml4TGFuZyA/IGAvJHt0aGlzLnVybFByZWZpeH0ke3Jlc3VsdH1gIDogcmVzdWx0O1xuICB9XG5cbiAgZ2V0IHVybFByZWZpeCgpIHtcbiAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy5hbHdheXNTZXRQcmVmaXggfHwgdGhpcy5jdXJyZW50TGFuZyAhPT0gdGhpcy5kZWZhdWx0TGFuZyA/IHRoaXMuY3VycmVudExhbmcgOiAnJztcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmFuc2xhdGUgcm91dGUgYW5kIHJldHVybiBvYnNlcnZhYmxlXG4gICAqIEBwYXJhbSBwYXRoXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICB0cmFuc2xhdGVSb3V0ZShwYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IHF1ZXJ5UGFydHMgPSBwYXRoLnNwbGl0KCc/Jyk7XG4gICAgaWYgKHF1ZXJ5UGFydHMubGVuZ3RoID4gMikge1xuICAgICAgdGhyb3cgJ1RoZXJlIHNob3VsZCBiZSBvbmx5IG9uZSBxdWVyeSBwYXJhbWV0ZXIgYmxvY2sgaW4gdGhlIFVSTCc7XG4gICAgfVxuICAgIGNvbnN0IHBhdGhTZWdtZW50cyA9IHF1ZXJ5UGFydHNbMF0uc3BsaXQoJy8nKTtcblxuICAgIC8qKiBjb2xsZWN0IG9ic2VydmFibGVzICAqL1xuICAgIHJldHVybiBwYXRoU2VnbWVudHNcbiAgICAgIC5tYXAoKHBhcnQ6IHN0cmluZykgPT4gcGFydC5sZW5ndGggPyB0aGlzLnRyYW5zbGF0ZVRleHQocGFydCkgOiBwYXJ0KVxuICAgICAgLmpvaW4oJy8nKSArXG4gICAgICAocXVlcnlQYXJ0cy5sZW5ndGggPiAxID8gYD8ke3F1ZXJ5UGFydHNbMV19YCA6ICcnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgbGFuZ3VhZ2UgZnJvbSB1cmxcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGdldExvY2F0aW9uTGFuZyh1cmw/OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IHBhdGhTbGljZXMgPSAodXJsIHx8IHRoaXMubG9jYXRpb24ucGF0aCgpIHx8ICcnKVxuICAgICAgLnNwbGl0KCcjJylbMF1cbiAgICAgIC5zcGxpdCgnPycpWzBdXG4gICAgICAuc3BsaXQoJy8nKTtcbiAgICBpZiAocGF0aFNsaWNlcy5sZW5ndGggPiAxICYmIHRoaXMubG9jYWxlcy5pbmRleE9mKHBhdGhTbGljZXNbMV0pICE9PSAtMSkge1xuICAgICAgcmV0dXJuIHBhdGhTbGljZXNbMV07XG4gICAgfVxuICAgIGlmIChwYXRoU2xpY2VzLmxlbmd0aCAmJiB0aGlzLmxvY2FsZXMuaW5kZXhPZihwYXRoU2xpY2VzWzBdKSAhPT0gLTEpIHtcbiAgICAgIHJldHVybiBwYXRoU2xpY2VzWzBdO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdXNlcidzIGxhbmd1YWdlIHNldCBpbiB0aGUgYnJvd3NlclxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJpdmF0ZSBfZ2V0QnJvd3NlckxhbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fcmV0dXJuSWZJbkxvY2FsZXModGhpcy50cmFuc2xhdGUuZ2V0QnJvd3NlckxhbmcoKSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGxhbmd1YWdlIGZyb20gbG9jYWwgc3RvcmFnZSBvciBjb29raWVcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgZ2V0IF9jYWNoZWRMYW5nKCk6IHN0cmluZyB7XG4gICAgaWYgKCF0aGlzLnNldHRpbmdzLnVzZUNhY2hlZExhbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuc2V0dGluZ3MuY2FjaGVNZWNoYW5pc20gPT09IENhY2hlTWVjaGFuaXNtLkxvY2FsU3RvcmFnZSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2NhY2hlV2l0aExvY2FsU3RvcmFnZSgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5zZXR0aW5ncy5jYWNoZU1lY2hhbmlzbSA9PT0gQ2FjaGVNZWNoYW5pc20uQ29va2llKSB7XG4gICAgICByZXR1cm4gdGhpcy5fY2FjaGVXaXRoQ29va2llcygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTYXZlIGxhbmd1YWdlIHRvIGxvY2FsIHN0b3JhZ2Ugb3IgY29va2llXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJpdmF0ZSBzZXQgX2NhY2hlZExhbmcodmFsdWU6IHN0cmluZykge1xuICAgIGlmICghdGhpcy5zZXR0aW5ncy51c2VDYWNoZWRMYW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLnNldHRpbmdzLmNhY2hlTWVjaGFuaXNtID09PSBDYWNoZU1lY2hhbmlzbS5Mb2NhbFN0b3JhZ2UpIHtcbiAgICAgIHRoaXMuX2NhY2hlV2l0aExvY2FsU3RvcmFnZSh2YWx1ZSk7XG4gICAgfVxuICAgIGlmICh0aGlzLnNldHRpbmdzLmNhY2hlTWVjaGFuaXNtID09PSBDYWNoZU1lY2hhbmlzbS5Db29raWUpIHtcbiAgICAgIHRoaXMuX2NhY2hlV2l0aENvb2tpZXModmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDYWNoZSB2YWx1ZSB0byBsb2NhbCBzdG9yYWdlXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJpdmF0ZSBfY2FjaGVXaXRoTG9jYWxTdG9yYWdlKHZhbHVlPzogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgfHwgdHlwZW9mIHdpbmRvdy5sb2NhbFN0b3JhZ2UgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMuc2V0dGluZ3MuY2FjaGVOYW1lLCB2YWx1ZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLl9yZXR1cm5JZkluTG9jYWxlcyh3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy5zZXR0aW5ncy5jYWNoZU5hbWUpKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyB3ZWlyZCBTYWZhcmkgaXNzdWUgaW4gcHJpdmF0ZSBtb2RlLCB3aGVyZSBMb2NhbFN0b3JhZ2UgaXMgZGVmaW5lZCBidXQgdGhyb3dzIGVycm9yIG9uIGFjY2Vzc1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDYWNoZSB2YWx1ZSB2aWEgY29va2llc1xuICAgKiBAcGFyYW0gdmFsdWVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgX2NhY2hlV2l0aENvb2tpZXModmFsdWU/OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnIHx8IHR5cGVvZiBkb2N1bWVudC5jb29raWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICBjb25zdCBuYW1lID0gZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuc2V0dGluZ3MuY2FjaGVOYW1lKTtcbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICBjb25zdCBkOiBEYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgZC5zZXRUaW1lKGQuZ2V0VGltZSgpICsgQ09PS0lFX0VYUElSWSAqIDg2NDAwMDAwKTsgLy8gKiBkYXlzXG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGAke25hbWV9PSR7ZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKX07ZXhwaXJlcz0ke2QudG9VVENTdHJpbmcoKX1gO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCByZWdleHAgPSBuZXcgUmVnRXhwKCcoPzpeJyArIG5hbWUgKyAnfDtcXFxccyonICsgbmFtZSArICcpPSguKj8pKD86O3wkKScsICdnJyk7XG4gICAgICBjb25zdCByZXN1bHQgPSByZWdleHAuZXhlYyhkb2N1bWVudC5jb29raWUpO1xuICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChyZXN1bHRbMV0pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybjsgLy8gc2hvdWxkIG5vdCBoYXBwZW4gYnV0IGJldHRlciBzYWZlIHRoYW4gc29ycnlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgdmFsdWUgZXhpc3RzIGluIGxvY2FsZXMgbGlzdFxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICogQHJldHVybnMge2FueX1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgX3JldHVybklmSW5Mb2NhbGVzKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmICh2YWx1ZSAmJiB0aGlzLmxvY2FsZXMuaW5kZXhPZih2YWx1ZSkgIT09IC0xKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0cmFuc2xhdGVkIHZhbHVlXG4gICAqIEBwYXJhbSBrZXlcbiAgICogQHJldHVybnMge2FueX1cbiAgICovXG4gIHByaXZhdGUgdHJhbnNsYXRlVGV4dChrZXk6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgaWYgKCF0aGlzLl90cmFuc2xhdGlvbk9iamVjdCkge1xuICAgICAgcmV0dXJuIGtleTtcbiAgICB9XG4gICAgY29uc3QgcHJlZml4ZWRLZXkgPSB0aGlzLnByZWZpeCArIGtleTtcbiAgICBjb25zdCByZXMgPSB0aGlzLnRyYW5zbGF0ZS5nZXRQYXJzZWRSZXN1bHQodGhpcy5fdHJhbnNsYXRpb25PYmplY3QsIHByZWZpeGVkS2V5KTtcbiAgICAvLyBpZ25vcmUgbm9uLXRyYW5zbGF0ZWQgdGV4dCBsaWtlICdST1VURVMuaG9tZSdcbiAgICBpZiAocmVzID09PSBwcmVmaXhlZEtleSkge1xuICAgICAgcmV0dXJuIGtleTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcyB8fCBrZXk7XG4gIH1cbn1cblxuLyoqXG4gKiBNYW51YWxseSBzZXQgY29uZmlndXJhdGlvblxuICovXG5leHBvcnQgY2xhc3MgTWFudWFsUGFyc2VyTG9hZGVyIGV4dGVuZHMgTG9jYWxpemVQYXJzZXIge1xuXG4gIC8qKlxuICAgKiBDVE9SXG4gICAqIEBwYXJhbSB0cmFuc2xhdGVcbiAgICogQHBhcmFtIGxvY2F0aW9uXG4gICAqIEBwYXJhbSBzZXR0aW5nc1xuICAgKiBAcGFyYW0gbG9jYWxlc1xuICAgKiBAcGFyYW0gcHJlZml4XG4gICAqL1xuICBjb25zdHJ1Y3Rvcih0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2UsIGxvY2F0aW9uOiBMb2NhdGlvbiwgc2V0dGluZ3M6IExvY2FsaXplUm91dGVyU2V0dGluZ3MsIGxvY2FsZXM6IHN0cmluZ1tdID0gWydlbiddLCBwcmVmaXg6IHN0cmluZyA9ICdST1VURVMuJykge1xuICAgIHN1cGVyKHRyYW5zbGF0ZSwgbG9jYXRpb24sIHNldHRpbmdzKTtcbiAgICB0aGlzLmxvY2FsZXMgPSBsb2NhbGVzO1xuICAgIHRoaXMucHJlZml4ID0gcHJlZml4IHx8ICcnO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgb3IgYXBwZW5kIHJvdXRlc1xuICAgKiBAcGFyYW0gcm91dGVzXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XG4gICAqL1xuICBsb2FkKHJvdXRlczogUm91dGVzKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmU6IGFueSkgPT4ge1xuICAgICAgdGhpcy5pbml0KHJvdXRlcykudGhlbihyZXNvbHZlKTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgRHVtbXlMb2NhbGl6ZVBhcnNlciBleHRlbmRzIExvY2FsaXplUGFyc2VyIHtcbiAgbG9hZChyb3V0ZXM6IFJvdXRlcyk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlOiBhbnkpID0+IHtcbiAgICAgIHRoaXMuaW5pdChyb3V0ZXMpLnRoZW4ocmVzb2x2ZSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==