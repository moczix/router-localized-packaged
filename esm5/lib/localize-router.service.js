import * as tslib_1 from "tslib";
import { Inject, Injectable } from '@angular/core';
import { Router, NavigationStart, PRIMARY_OUTLET } from '@angular/router';
import { Subject } from 'rxjs';
import { pairwise, filter, tap } from 'rxjs/operators';
import { LocalizeParser } from './localize-router.parser';
import { LocalizeRouterSettings } from './localize-router.config';
import * as i0 from "@angular/core";
import * as i1 from "./localize-router.parser";
import * as i2 from "./localize-router.config";
import * as i3 from "@angular/router";
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
                var navigationExtras = tslib_1.__assign({}, (rootSnapshot_1.queryParamMap.keys.length ? { queryParams: rootSnapshot_1.queryParams } : {}), (rootSnapshot_1.fragment ? { fragment: rootSnapshot_1.fragment } : {}));
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
                return tslib_1.__spread(["/" + this.parser.currentLang], this.traverseSnapshot(snapshot.firstChild.firstChild));
            }
            else {
                return tslib_1.__spread(this.traverseSnapshot(snapshot.firstChild.firstChild));
            }
        }
        var urlPart = this.parseSegmentValue(snapshot);
        var outletChildren = snapshot.children.filter(function (child) { return child.outlet !== PRIMARY_OUTLET; });
        var outlets = outletChildren.reduce(function (acc, cur) {
            var _a;
            return ({
                outlets: tslib_1.__assign({}, acc.outlets, (_a = {}, _a[cur.outlet] = _this.parseSegmentValue(cur), _a))
            });
        }, { outlets: {} });
        var primaryChild = snapshot.children.find(function (child) { return child.outlet === PRIMARY_OUTLET; });
        return tslib_1.__spread([
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
                    result.push(tslib_1.__assign({}, segment, { outlets: outlets }));
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
            var _b = tslib_1.__read(_a, 2), previousEvent = _b[0], currentEvent = _b[1];
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
    /** @nocollapse */ LocalizeRouterService.ngInjectableDef = i0.ɵɵdefineInjectable({ token: LocalizeRouterService, factory: function LocalizeRouterService_Factory(t) { return new (t || LocalizeRouterService)(i0.ɵɵinject(LocalizeParser), i0.ɵɵinject(LocalizeRouterSettings), i0.ɵɵinject(Router)); }, providedIn: null });
    return LocalizeRouterService;
}());
export { LocalizeRouterService };
/*@__PURE__*/ i0.ɵsetClassMetadata(LocalizeRouterService, [{
        type: Injectable
    }], function () { return [{ type: i1.LocalizeParser, decorators: [{
                type: Inject,
                args: [LocalizeParser]
            }] }, { type: i2.LocalizeRouterSettings, decorators: [{
                type: Inject,
                args: [LocalizeRouterSettings]
            }] }, { type: i3.Router, decorators: [{
                type: Inject,
                args: [Router]
            }] }]; }, null);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxpemUtcm91dGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sb2NhbGl6ZS1yb3V0ZXIvIiwic291cmNlcyI6WyJsaWIvbG9jYWxpemUtcm91dGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFDTCxNQUFNLEVBQ04sZUFBZSxFQUdmLGNBQWMsRUFFZixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzFELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7OztBQUVsRTs7O0dBR0c7QUFDSDtJQUlFOzs7OztPQUtHO0lBQ0gsK0JBQ2lDLE1BQXNCLEVBQ2QsUUFBZ0MsRUFDL0MsTUFBYztRQUZQLFdBQU0sR0FBTixNQUFNLENBQWdCO1FBQ2QsYUFBUSxHQUFSLFFBQVEsQ0FBd0I7UUFDL0MsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUV0QyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksT0FBTyxFQUFVLENBQUM7SUFDNUMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsb0NBQUksR0FBSjtRQUNFLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUMsNkJBQTZCO1FBQzdCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTTthQUNmLElBQUksQ0FDSCxNQUFNLENBQUMsVUFBQyxLQUFLLElBQUssT0FBQSxLQUFLLFlBQVksZUFBZSxFQUFoQyxDQUFnQyxDQUFDLEVBQ25ELFFBQVEs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O1xuaW1wb3J0IHtcbiAgUm91dGVyLFxuICBOYXZpZ2F0aW9uU3RhcnQsXG4gIEFjdGl2YXRlZFJvdXRlU25hcHNob3QsXG4gIFVybFNlZ21lbnQsXG4gIFBSSU1BUllfT1VUTEVULFxuICBOYXZpZ2F0aW9uRXh0cmFzXG59IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBwYWlyd2lzZSwgZmlsdGVyLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBMb2NhbGl6ZVBhcnNlciB9IGZyb20gJy4vbG9jYWxpemUtcm91dGVyLnBhcnNlcic7XG5pbXBvcnQgeyBMb2NhbGl6ZVJvdXRlclNldHRpbmdzIH0gZnJvbSAnLi9sb2NhbGl6ZS1yb3V0ZXIuY29uZmlnJztcblxuLyoqXG4gKiBMb2NhbGl6YXRpb24gc2VydmljZVxuICogbW9kaWZ5Um91dGVzXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBMb2NhbGl6ZVJvdXRlclNlcnZpY2Uge1xuICByb3V0ZXJFdmVudHM6IFN1YmplY3Q8c3RyaW5nPjtcblxuICAvKipcbiAgICogQ1RPUlxuICAgKiBAcGFyYW0gcGFyc2VyXG4gICAqIEBwYXJhbSBzZXR0aW5nc1xuICAgKiBAcGFyYW0gcm91dGVyXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KExvY2FsaXplUGFyc2VyKSBwdWJsaWMgcGFyc2VyOiBMb2NhbGl6ZVBhcnNlcixcbiAgICBASW5qZWN0KExvY2FsaXplUm91dGVyU2V0dGluZ3MpIHB1YmxpYyBzZXR0aW5nczogTG9jYWxpemVSb3V0ZXJTZXR0aW5ncyxcbiAgICBASW5qZWN0KFJvdXRlcikgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlclxuICApIHtcbiAgICB0aGlzLnJvdXRlckV2ZW50cyA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFydCB1cCB0aGUgc2VydmljZVxuICAgKi9cbiAgaW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnJvdXRlci5yZXNldENvbmZpZyh0aGlzLnBhcnNlci5yb3V0ZXMpO1xuICAgIC8vIHN1YnNjcmliZSB0byByb3V0ZXIgZXZlbnRzXG4gICAgdGhpcy5yb3V0ZXIuZXZlbnRzXG4gICAgICAucGlwZShcbiAgICAgICAgZmlsdGVyKChldmVudCkgPT4gZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uU3RhcnQpLFxuICAgICAgICBwYWlyd2lzZSgpXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKHRoaXMuX3JvdXRlQ2hhbmdlZCgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGFuZ2UgbGFuZ3VhZ2UgYW5kIG5hdmlnYXRlIHRvIHRyYW5zbGF0ZWQgcm91dGVcbiAgICogQHBhcmFtIGxhbmdcbiAgICovXG4gIGNoYW5nZUxhbmd1YWdlKGxhbmc6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmIChsYW5nICE9PSB0aGlzLnBhcnNlci5jdXJyZW50TGFuZykge1xuICAgICAgY29uc3Qgcm9vdFNuYXBzaG90OiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90ID0gdGhpcy5yb3V0ZXIucm91dGVyU3RhdGUuc25hcHNob3Qucm9vdDtcblxuICAgICAgdGhpcy5wYXJzZXJcbiAgICAgICAgLnRyYW5zbGF0ZVJvdXRlcyhsYW5nKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICAvLyBzZXQgbmV3IHJvdXRlcyB0byByb3V0ZXJcbiAgICAgICAgICB0YXAoKCkgPT4gdGhpcy5yb3V0ZXIucmVzZXRDb25maWcodGhpcy5wYXJzZXIucm91dGVzKSlcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICBjb25zdCB1cmxTZWdtZW50cyA9IHRoaXMudHJhdmVyc2VTbmFwc2hvdChyb290U25hcHNob3QsIHRydWUpLmZpbHRlcigocGF0aDogc3RyaW5nLCBpOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAhaSB8fCBwYXRoOyAvLyBmaWx0ZXIgb3V0IGVtcHR5IHBhdGhzXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBjb25zdCBuYXZpZ2F0aW9uRXh0cmFzOiBOYXZpZ2F0aW9uRXh0cmFzID0ge1xuICAgICAgICAgICAgLi4uKHJvb3RTbmFwc2hvdC5xdWVyeVBhcmFtTWFwLmtleXMubGVuZ3RoID8geyBxdWVyeVBhcmFtczogcm9vdFNuYXBzaG90LnF1ZXJ5UGFyYW1zIH0gOiB7fSksXG4gICAgICAgICAgICAuLi4ocm9vdFNuYXBzaG90LmZyYWdtZW50ID8geyBmcmFnbWVudDogcm9vdFNuYXBzaG90LmZyYWdtZW50IH0gOiB7fSlcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgLy8gdXNlIG5hdmlnYXRlIHRvIGtlZXAgZXh0cmFzIHVuY2hhbmdlZFxuICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKHVybFNlZ21lbnRzLCBuYXZpZ2F0aW9uRXh0cmFzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRyYXZlcnNlcyB0aHJvdWdoIHRoZSB0cmVlIHRvIGFzc2VtYmxlIG5ldyB0cmFuc2xhdGVkIHVybFxuICAgKiBAcGFyYW0gc25hcHNob3RcbiAgICogQHBhcmFtIGlzUm9vdFxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgcHJpdmF0ZSB0cmF2ZXJzZVNuYXBzaG90KHNuYXBzaG90OiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBpc1Jvb3Q6IGJvb2xlYW4gPSBmYWxzZSk6IGFueVtdIHtcbiAgICBpZiAoaXNSb290KSB7XG4gICAgICBpZiAoIXNuYXBzaG90LmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgcmV0dXJuIFsnJ107XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5zZXR0aW5ncy5hbHdheXNTZXRQcmVmaXggfHwgdGhpcy5wYXJzZXIuY3VycmVudExhbmcgIT09IHRoaXMucGFyc2VyLmRlZmF1bHRMYW5nKSB7XG4gICAgICAgIHJldHVybiBbYC8ke3RoaXMucGFyc2VyLmN1cnJlbnRMYW5nfWAsIC4uLnRoaXMudHJhdmVyc2VTbmFwc2hvdChzbmFwc2hvdC5maXJzdENoaWxkLmZpcnN0Q2hpbGQpXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBbLi4udGhpcy50cmF2ZXJzZVNuYXBzaG90KHNuYXBzaG90LmZpcnN0Q2hpbGQuZmlyc3RDaGlsZCldO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHVybFBhcnQgPSB0aGlzLnBhcnNlU2VnbWVudFZhbHVlKHNuYXBzaG90KTtcblxuICAgIGNvbnN0IG91dGxldENoaWxkcmVuID0gc25hcHNob3QuY2hpbGRyZW4uZmlsdGVyKChjaGlsZCkgPT4gY2hpbGQub3V0bGV0ICE9PSBQUklNQVJZX09VVExFVCk7XG5cbiAgICBjb25zdCBvdXRsZXRzID0gb3V0bGV0Q2hpbGRyZW4ucmVkdWNlKFxuICAgICAgKGFjYywgY3VyKSA9PiAoe1xuICAgICAgICBvdXRsZXRzOiB7XG4gICAgICAgICAgLi4uYWNjLm91dGxldHMsXG4gICAgICAgICAgW2N1ci5vdXRsZXRdOiB0aGlzLnBhcnNlU2VnbWVudFZhbHVlKGN1cilcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICB7IG91dGxldHM6IHt9IH1cbiAgICApO1xuXG4gICAgY29uc3QgcHJpbWFyeUNoaWxkID0gc25hcHNob3QuY2hpbGRyZW4uZmluZCgoY2hpbGQpID0+IGNoaWxkLm91dGxldCA9PT0gUFJJTUFSWV9PVVRMRVQpO1xuXG4gICAgcmV0dXJuIFtcbiAgICAgIHVybFBhcnQsXG4gICAgICAuLi4oT2JqZWN0LmtleXMoc25hcHNob3QucGFyYW1zKS5sZW5ndGggPyBbc25hcHNob3QucGFyYW1zXSA6IFtdKSxcbiAgICAgIC4uLihvdXRsZXRDaGlsZHJlbi5sZW5ndGggPyBbb3V0bGV0c10gOiBbXSksXG4gICAgICAuLi4ocHJpbWFyeUNoaWxkID8gdGhpcy50cmF2ZXJzZVNuYXBzaG90KHByaW1hcnlDaGlsZCkgOiBbXSlcbiAgICBdO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4dHJhY3RzIG5ldyBzZWdtZW50IHZhbHVlIGJhc2VkIG9uIHJvdXRlQ29uZmlnIGFuZCB1cmxcbiAgICogQHBhcmFtIHNuYXBzaG90XG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBwcml2YXRlIHBhcnNlU2VnbWVudFZhbHVlKHNuYXBzaG90OiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90KTogc3RyaW5nIHtcbiAgICBpZiAoc25hcHNob3Qucm91dGVDb25maWcpIHtcbiAgICAgIGlmIChzbmFwc2hvdC5yb3V0ZUNvbmZpZy5wYXRoID09PSAnKionKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcnNlci50cmFuc2xhdGVSb3V0ZShcbiAgICAgICAgICBzbmFwc2hvdC51cmxcbiAgICAgICAgICAgIC5maWx0ZXIoKHNlZ21lbnQ6IFVybFNlZ21lbnQpID0+IHNlZ21lbnQucGF0aClcbiAgICAgICAgICAgIC5tYXAoKHNlZ21lbnQ6IFVybFNlZ21lbnQpID0+IHNlZ21lbnQucGF0aClcbiAgICAgICAgICAgIC5qb2luKCcvJylcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSBpZiAoc25hcHNob3Qucm91dGVDb25maWcuZGF0YSkge1xuICAgICAgICBjb25zdCBzdWJQYXRoU2VnbWVudHMgPSBzbmFwc2hvdC5yb3V0ZUNvbmZpZy5kYXRhLmxvY2FsaXplUm91dGVyLnBhdGguc3BsaXQoJy8nKTtcbiAgICAgICAgcmV0dXJuIHN1YlBhdGhTZWdtZW50c1xuICAgICAgICAgIC5tYXAoKHM6IHN0cmluZywgaTogbnVtYmVyKSA9PiAocy5pbmRleE9mKCc6JykgPT09IDAgPyBzbmFwc2hvdC51cmxbaV0ucGF0aCA6IHRoaXMucGFyc2VyLnRyYW5zbGF0ZVJvdXRlKHMpKSlcbiAgICAgICAgICAuam9pbignLycpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICAvKipcbiAgICogVHJhbnNsYXRlIHJvdXRlIHRvIGN1cnJlbnQgbGFuZ3VhZ2VcbiAgICogSWYgbmV3IGxhbmd1YWdlIGlzIGV4cGxpY2l0bHkgcHJvdmlkZWQgdGhlbiByZXBsYWNlIGxhbmd1YWdlIHBhcnQgaW4gdXJsIHdpdGggbmV3IGxhbmd1YWdlXG4gICAqIEBwYXJhbSBwYXRoXG4gICAqIEByZXR1cm5zIHtzdHJpbmcgfCBhbnlbXX1cbiAgICovXG4gIHRyYW5zbGF0ZVJvdXRlKHBhdGg6IHN0cmluZyB8IGFueVtdKTogc3RyaW5nIHwgYW55W10ge1xuICAgIC8vIHBhdGggaXMgbnVsbCAoZS5nLiByZXNldHRpbmcgYXV4aWxpYXJ5IG91dGxldClcbiAgICBpZiAoIXBhdGgpIHtcbiAgICAgIHJldHVybiBwYXRoO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHBhdGggPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb25zdCB1cmwgPSB0aGlzLnBhcnNlci50cmFuc2xhdGVSb3V0ZShwYXRoKTtcbiAgICAgIHJldHVybiAhcGF0aC5pbmRleE9mKCcvJykgPyBgLyR7dGhpcy5wYXJzZXIudXJsUHJlZml4fSR7dXJsfWAgOiB1cmw7XG4gICAgfVxuICAgIC8vIGl0J3MgYW4gYXJyYXlcbiAgICBsZXQgcmVzdWx0OiBhbnlbXSA9IFtdO1xuICAgIChwYXRoIGFzIEFycmF5PGFueT4pLmZvckVhY2goKHNlZ21lbnQ6IGFueSwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBzZWdtZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICBjb25zdCByZXMgPSB0aGlzLnBhcnNlci50cmFuc2xhdGVSb3V0ZShzZWdtZW50KTtcbiAgICAgICAgaWYgKCFpbmRleCAmJiAhc2VnbWVudC5pbmRleE9mKCcvJykpIHtcbiAgICAgICAgICByZXN1bHQucHVzaChgLyR7dGhpcy5wYXJzZXIudXJsUHJlZml4fSR7cmVzfWApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc3VsdC5wdXNoKHJlcyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHRyYW5zbGF0ZSByb3V0ZXIgb3V0bGV0cyBibG9ja1xuICAgICAgICBpZiAoc2VnbWVudCAmJiBzZWdtZW50Lm91dGxldHMpIHtcbiAgICAgICAgICBsZXQgb3V0bGV0czogYW55ID0ge307XG4gICAgICAgICAgZm9yIChsZXQga2V5IGluIHNlZ21lbnQub3V0bGV0cykge1xuICAgICAgICAgICAgaWYgKHNlZ21lbnQub3V0bGV0cy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgIG91dGxldHNba2V5XSA9IHRoaXMudHJhbnNsYXRlUm91dGUoc2VnbWVudC5vdXRsZXRzW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXN1bHQucHVzaCh7IC4uLnNlZ21lbnQsIG91dGxldHM6IG91dGxldHMgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzdWx0LnB1c2goc2VnbWVudCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIEV2ZW50IGhhbmRsZXIgdG8gcmVhY3Qgb24gcm91dGUgY2hhbmdlXG4gICAqIEByZXR1cm5zIHsoZXZlbnQ6YW55KT0+dm9pZH1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgX3JvdXRlQ2hhbmdlZCgpOiAoZXZlbnRQYWlyOiBbTmF2aWdhdGlvblN0YXJ0LCBOYXZpZ2F0aW9uU3RhcnRdKSA9PiB2b2lkIHtcbiAgICByZXR1cm4gKFtwcmV2aW91c0V2ZW50LCBjdXJyZW50RXZlbnRdOiBbTmF2aWdhdGlvblN0YXJ0LCBOYXZpZ2F0aW9uU3RhcnRdKSA9PiB7XG4gICAgICBjb25zdCBwcmV2aW91c0xhbmcgPSB0aGlzLnBhcnNlci5nZXRMb2NhdGlvbkxhbmcocHJldmlvdXNFdmVudC51cmwpIHx8IHRoaXMucGFyc2VyLmRlZmF1bHRMYW5nO1xuICAgICAgY29uc3QgY3VycmVudExhbmcgPSB0aGlzLnBhcnNlci5nZXRMb2NhdGlvbkxhbmcoY3VycmVudEV2ZW50LnVybCkgfHwgdGhpcy5wYXJzZXIuZGVmYXVsdExhbmc7XG5cbiAgICAgIGlmIChjdXJyZW50TGFuZyAhPT0gcHJldmlvdXNMYW5nKSB7XG4gICAgICAgIC8vIG11dGF0ZSByb3V0ZXIgY29uZmlnIGRpcmVjdGx5IHRvIGF2b2lkIGdldHRpbmcgb3V0IG9mIHN5bmNcbiAgICAgICAgdGhpcy5wYXJzZXIubXV0YXRlUm91dGVyUm9vdFJvdXRlKGN1cnJlbnRMYW5nLCBwcmV2aW91c0xhbmcsIHRoaXMucm91dGVyLmNvbmZpZyk7XG4gICAgICAgIHRoaXMucGFyc2VyXG4gICAgICAgICAgLnRyYW5zbGF0ZVJvdXRlcyhjdXJyZW50TGFuZylcbiAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgIC8vIHJlc2V0IHJvdXRlcyBhZ2FpbiBvbmNlIHRoZXkgYXJlIGFsbCB0cmFuc2xhdGVkXG4gICAgICAgICAgICB0YXAoKCkgPT4gdGhpcy5yb3V0ZXIucmVzZXRDb25maWcodGhpcy5wYXJzZXIucm91dGVzKSlcbiAgICAgICAgICApXG4gICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAvLyBGaXJlIHJvdXRlIGNoYW5nZSBldmVudFxuICAgICAgICAgICAgdGhpcy5yb3V0ZXJFdmVudHMubmV4dChjdXJyZW50TGFuZyk7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxufVxuIl19