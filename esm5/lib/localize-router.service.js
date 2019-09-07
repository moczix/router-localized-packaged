/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Inject, Injectable } from '@angular/core';
import { Router, NavigationStart, PRIMARY_OUTLET } from '@angular/router';
import { Subject } from 'rxjs';
import { pairwise, filter, tap } from 'rxjs/operators';
import { LocalizeParser } from './localize-router.parser';
import { LocalizeRouterSettings } from './localize-router.config';
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
                var navigationExtras = tslib_1.__assign({}, (rootSnapshot_1.queryParamMap.keys.length ? { queryParams: rootSnapshot_1.queryParams } : {}), (rootSnapshot_1.fragment ? { fragment: rootSnapshot_1.fragment } : {}));
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
                return tslib_1.__spread(["/" + this.parser.currentLang], this.traverseSnapshot(snapshot.firstChild.firstChild));
            }
            else {
                return tslib_1.__spread(this.traverseSnapshot(snapshot.firstChild.firstChild));
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
                outlets: tslib_1.__assign({}, acc.outlets, (_a = {}, _a[cur.outlet] = _this.parseSegmentValue(cur), _a))
            });
        }), { outlets: {} });
        /** @type {?} */
        var primaryChild = snapshot.children.find((/**
         * @param {?} child
         * @return {?}
         */
        function (child) { return child.outlet === PRIMARY_OUTLET; }));
        return tslib_1.__spread([
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
                    result.push(tslib_1.__assign({}, segment, { outlets: outlets }));
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
            var _b = tslib_1.__read(_a, 2), previousEvent = _b[0], currentEvent = _b[1];
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
export { LocalizeRouterService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxpemUtcm91dGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sb2NhbGl6ZS1yb3V0ZXIvIiwic291cmNlcyI6WyJsaWIvbG9jYWxpemUtcm91dGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQ0wsTUFBTSxFQUNOLGVBQWUsRUFHZixjQUFjLEVBRWYsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7Ozs7QUFNbEU7SUFLRSwrQkFDaUMsTUFBc0IsRUFDZCxRQUFnQyxFQUMvQyxNQUFjO1FBRlAsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFDZCxhQUFRLEdBQVIsUUFBUSxDQUF3QjtRQUMvQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBRXRDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQztJQUM1QyxDQUFDO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsb0NBQUk7Ozs7SUFBSjtRQUNFLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUMsNkJBQTZCO1FBQzdCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTTthQUNmLElBQUksQ0FDSCxNQUFNOzs7O1FBQUMsVUFBQyxLQUFLLElBQUssT0FBQSxLQUFLLFlBQVksZUFBZSxFQUFoQyxDQUFnQyxFQUFDLEVBQ25ELFFBQVEsRUFBRSxDQUNYO2FB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QUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksS0FBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXO1lBRTVGLElBQUksV0FBVyxLQUFLLFlBQVksRUFBRTtnQkFDaEMsNkRBQTZEO2dCQUM3RCxLQUFJLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLFdBQVcsRUFBRSxZQUFZLEVBQUUsS0FBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDakYsS0FBSSxDQUFDLE1BQU07cUJBQ1IsZUFBZSxDQUFDLFdBQVcsQ0FBQztxQkFDNUIsSUFBSTtnQkFDSCxrREFBa0Q7Z0JBQ2xELEdBQUc7OztnQkFBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBM0MsQ0FBMkMsRUFBQyxDQUN2RDtxQkFDQSxTQUFTOzs7Z0JBQUM7b0JBQ1QsMEJBQTBCO29CQUMxQixLQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDdEMsQ0FBQyxFQUFDLENBQUM7YUFDTjtRQUNILENBQUMsRUFBQztJQUNKLENBQUM7O2dCQXhLRixVQUFVOzs7O2dCQVBGLGNBQWMsdUJBYWxCLE1BQU0sU0FBQyxjQUFjO2dCQVpqQixzQkFBc0IsdUJBYTFCLE1BQU0sU0FBQyxzQkFBc0I7Z0JBdkJoQyxNQUFNLHVCQXdCSCxNQUFNLFNBQUMsTUFBTTs7SUFpS2xCLDRCQUFDO0NBQUEsQUF6S0QsSUF5S0M7U0F4S1kscUJBQXFCOzs7SUFDaEMsNkNBQThCOztJQUk1Qix1Q0FBcUQ7O0lBQ3JELHlDQUF1RTs7Ozs7SUFDdkUsdUNBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBSb3V0ZXIsXG4gIE5hdmlnYXRpb25TdGFydCxcbiAgQWN0aXZhdGVkUm91dGVTbmFwc2hvdCxcbiAgVXJsU2VnbWVudCxcbiAgUFJJTUFSWV9PVVRMRVQsXG4gIE5hdmlnYXRpb25FeHRyYXNcbn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHBhaXJ3aXNlLCBmaWx0ZXIsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IExvY2FsaXplUGFyc2VyIH0gZnJvbSAnLi9sb2NhbGl6ZS1yb3V0ZXIucGFyc2VyJztcbmltcG9ydCB7IExvY2FsaXplUm91dGVyU2V0dGluZ3MgfSBmcm9tICcuL2xvY2FsaXplLXJvdXRlci5jb25maWcnO1xuXG4vKipcbiAqIExvY2FsaXphdGlvbiBzZXJ2aWNlXG4gKiBtb2RpZnlSb3V0ZXNcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIExvY2FsaXplUm91dGVyU2VydmljZSB7XG4gIHJvdXRlckV2ZW50czogU3ViamVjdDxzdHJpbmc+O1xuXG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChMb2NhbGl6ZVBhcnNlcikgcHVibGljIHBhcnNlcjogTG9jYWxpemVQYXJzZXIsXG4gICAgQEluamVjdChMb2NhbGl6ZVJvdXRlclNldHRpbmdzKSBwdWJsaWMgc2V0dGluZ3M6IExvY2FsaXplUm91dGVyU2V0dGluZ3MsXG4gICAgQEluamVjdChSb3V0ZXIpIHByaXZhdGUgcm91dGVyOiBSb3V0ZXJcbiAgKSB7XG4gICAgdGhpcy5yb3V0ZXJFdmVudHMgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG4gIH1cblxuICAvKipcbiAgICogU3RhcnQgdXAgdGhlIHNlcnZpY2VcbiAgICovXG4gIGluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5yb3V0ZXIucmVzZXRDb25maWcodGhpcy5wYXJzZXIucm91dGVzKTtcbiAgICAvLyBzdWJzY3JpYmUgdG8gcm91dGVyIGV2ZW50c1xuICAgIHRoaXMucm91dGVyLmV2ZW50c1xuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbHRlcigoZXZlbnQpID0+IGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvblN0YXJ0KSxcbiAgICAgICAgcGFpcndpc2UoKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSh0aGlzLl9yb3V0ZUNoYW5nZWQoKSk7XG4gIH1cblxuXG4gIGNoYW5nZUxhbmd1YWdlKGxhbmc6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmIChsYW5nICE9PSB0aGlzLnBhcnNlci5jdXJyZW50TGFuZykge1xuICAgICAgY29uc3Qgcm9vdFNuYXBzaG90OiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90ID0gdGhpcy5yb3V0ZXIucm91dGVyU3RhdGUuc25hcHNob3Qucm9vdDtcblxuICAgICAgdGhpcy5wYXJzZXJcbiAgICAgICAgLnRyYW5zbGF0ZVJvdXRlcyhsYW5nKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICAvLyBzZXQgbmV3IHJvdXRlcyB0byByb3V0ZXJcbiAgICAgICAgICB0YXAoKCkgPT4gdGhpcy5yb3V0ZXIucmVzZXRDb25maWcodGhpcy5wYXJzZXIucm91dGVzKSlcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICBjb25zdCB1cmxTZWdtZW50cyA9IHRoaXMudHJhdmVyc2VTbmFwc2hvdChyb290U25hcHNob3QsIHRydWUpLmZpbHRlcigocGF0aDogc3RyaW5nLCBpOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAhaSB8fCBwYXRoOyAvLyBmaWx0ZXIgb3V0IGVtcHR5IHBhdGhzXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBjb25zdCBuYXZpZ2F0aW9uRXh0cmFzOiBOYXZpZ2F0aW9uRXh0cmFzID0ge1xuICAgICAgICAgICAgLi4uKHJvb3RTbmFwc2hvdC5xdWVyeVBhcmFtTWFwLmtleXMubGVuZ3RoID8geyBxdWVyeVBhcmFtczogcm9vdFNuYXBzaG90LnF1ZXJ5UGFyYW1zIH0gOiB7fSksXG4gICAgICAgICAgICAuLi4ocm9vdFNuYXBzaG90LmZyYWdtZW50ID8geyBmcmFnbWVudDogcm9vdFNuYXBzaG90LmZyYWdtZW50IH0gOiB7fSlcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgLy8gdXNlIG5hdmlnYXRlIHRvIGtlZXAgZXh0cmFzIHVuY2hhbmdlZFxuICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKHVybFNlZ21lbnRzLCBuYXZpZ2F0aW9uRXh0cmFzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB0cmF2ZXJzZVNuYXBzaG90KHNuYXBzaG90OiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBpc1Jvb3Q6IGJvb2xlYW4gPSBmYWxzZSk6IGFueVtdIHtcbiAgICBpZiAoaXNSb290KSB7XG4gICAgICBpZiAoIXNuYXBzaG90LmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgcmV0dXJuIFsnJ107XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5zZXR0aW5ncy5hbHdheXNTZXRQcmVmaXggfHwgdGhpcy5wYXJzZXIuY3VycmVudExhbmcgIT09IHRoaXMucGFyc2VyLmRlZmF1bHRMYW5nKSB7XG4gICAgICAgIHJldHVybiBbYC8ke3RoaXMucGFyc2VyLmN1cnJlbnRMYW5nfWAsIC4uLnRoaXMudHJhdmVyc2VTbmFwc2hvdChzbmFwc2hvdC5maXJzdENoaWxkLmZpcnN0Q2hpbGQpXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBbLi4udGhpcy50cmF2ZXJzZVNuYXBzaG90KHNuYXBzaG90LmZpcnN0Q2hpbGQuZmlyc3RDaGlsZCldO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHVybFBhcnQgPSB0aGlzLnBhcnNlU2VnbWVudFZhbHVlKHNuYXBzaG90KTtcblxuICAgIGNvbnN0IG91dGxldENoaWxkcmVuID0gc25hcHNob3QuY2hpbGRyZW4uZmlsdGVyKChjaGlsZCkgPT4gY2hpbGQub3V0bGV0ICE9PSBQUklNQVJZX09VVExFVCk7XG5cbiAgICBjb25zdCBvdXRsZXRzID0gb3V0bGV0Q2hpbGRyZW4ucmVkdWNlKFxuICAgICAgKGFjYywgY3VyKSA9PiAoe1xuICAgICAgICBvdXRsZXRzOiB7XG4gICAgICAgICAgLi4uYWNjLm91dGxldHMsXG4gICAgICAgICAgW2N1ci5vdXRsZXRdOiB0aGlzLnBhcnNlU2VnbWVudFZhbHVlKGN1cilcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICB7IG91dGxldHM6IHt9IH1cbiAgICApO1xuXG4gICAgY29uc3QgcHJpbWFyeUNoaWxkID0gc25hcHNob3QuY2hpbGRyZW4uZmluZCgoY2hpbGQpID0+IGNoaWxkLm91dGxldCA9PT0gUFJJTUFSWV9PVVRMRVQpO1xuXG4gICAgcmV0dXJuIFtcbiAgICAgIHVybFBhcnQsXG4gICAgICAuLi4oT2JqZWN0LmtleXMoc25hcHNob3QucGFyYW1zKS5sZW5ndGggPyBbc25hcHNob3QucGFyYW1zXSA6IFtdKSxcbiAgICAgIC4uLihvdXRsZXRDaGlsZHJlbi5sZW5ndGggPyBbb3V0bGV0c10gOiBbXSksXG4gICAgICAuLi4ocHJpbWFyeUNoaWxkID8gdGhpcy50cmF2ZXJzZVNuYXBzaG90KHByaW1hcnlDaGlsZCkgOiBbXSlcbiAgICBdO1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZVNlZ21lbnRWYWx1ZShzbmFwc2hvdDogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCk6IHN0cmluZyB7XG4gICAgaWYgKHNuYXBzaG90LnJvdXRlQ29uZmlnKSB7XG4gICAgICBpZiAoc25hcHNob3Qucm91dGVDb25maWcucGF0aCA9PT0gJyoqJykge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJzZXIudHJhbnNsYXRlUm91dGUoXG4gICAgICAgICAgc25hcHNob3QudXJsXG4gICAgICAgICAgICAuZmlsdGVyKChzZWdtZW50OiBVcmxTZWdtZW50KSA9PiBzZWdtZW50LnBhdGgpXG4gICAgICAgICAgICAubWFwKChzZWdtZW50OiBVcmxTZWdtZW50KSA9PiBzZWdtZW50LnBhdGgpXG4gICAgICAgICAgICAuam9pbignLycpXG4gICAgICAgICk7XG4gICAgICB9IGVsc2UgaWYgKHNuYXBzaG90LnJvdXRlQ29uZmlnLmRhdGEpIHtcbiAgICAgICAgY29uc3Qgc3ViUGF0aFNlZ21lbnRzID0gc25hcHNob3Qucm91dGVDb25maWcuZGF0YS5sb2NhbGl6ZVJvdXRlci5wYXRoLnNwbGl0KCcvJyk7XG4gICAgICAgIHJldHVybiBzdWJQYXRoU2VnbWVudHNcbiAgICAgICAgICAubWFwKChzOiBzdHJpbmcsIGk6IG51bWJlcikgPT4gKHMuaW5kZXhPZignOicpID09PSAwID8gc25hcHNob3QudXJsW2ldLnBhdGggOiB0aGlzLnBhcnNlci50cmFuc2xhdGVSb3V0ZShzKSkpXG4gICAgICAgICAgLmpvaW4oJy8nKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuICcnO1xuICB9XG5cblxuICB0cmFuc2xhdGVSb3V0ZShwYXRoOiBzdHJpbmcgfCBhbnlbXSk6IHN0cmluZyB8IGFueVtdIHtcbiAgICAvLyBwYXRoIGlzIG51bGwgKGUuZy4gcmVzZXR0aW5nIGF1eGlsaWFyeSBvdXRsZXQpXG4gICAgaWYgKCFwYXRoKSB7XG4gICAgICByZXR1cm4gcGF0aDtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBwYXRoID09PSAnc3RyaW5nJykge1xuICAgICAgY29uc3QgdXJsID0gdGhpcy5wYXJzZXIudHJhbnNsYXRlUm91dGUocGF0aCk7XG4gICAgICByZXR1cm4gIXBhdGguaW5kZXhPZignLycpID8gYC8ke3RoaXMucGFyc2VyLnVybFByZWZpeH0ke3VybH1gIDogdXJsO1xuICAgIH1cbiAgICAvLyBpdCdzIGFuIGFycmF5XG4gICAgbGV0IHJlc3VsdDogYW55W10gPSBbXTtcbiAgICAocGF0aCBhcyBBcnJheTxhbnk+KS5mb3JFYWNoKChzZWdtZW50OiBhbnksIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgIGlmICh0eXBlb2Ygc2VnbWVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgY29uc3QgcmVzID0gdGhpcy5wYXJzZXIudHJhbnNsYXRlUm91dGUoc2VnbWVudCk7XG4gICAgICAgIGlmICghaW5kZXggJiYgIXNlZ21lbnQuaW5kZXhPZignLycpKSB7XG4gICAgICAgICAgcmVzdWx0LnB1c2goYC8ke3RoaXMucGFyc2VyLnVybFByZWZpeH0ke3Jlc31gKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXN1bHQucHVzaChyZXMpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyB0cmFuc2xhdGUgcm91dGVyIG91dGxldHMgYmxvY2tcbiAgICAgICAgaWYgKHNlZ21lbnQgJiYgc2VnbWVudC5vdXRsZXRzKSB7XG4gICAgICAgICAgbGV0IG91dGxldHM6IGFueSA9IHt9O1xuICAgICAgICAgIGZvciAobGV0IGtleSBpbiBzZWdtZW50Lm91dGxldHMpIHtcbiAgICAgICAgICAgIGlmIChzZWdtZW50Lm91dGxldHMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICBvdXRsZXRzW2tleV0gPSB0aGlzLnRyYW5zbGF0ZVJvdXRlKHNlZ21lbnQub3V0bGV0c1trZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmVzdWx0LnB1c2goeyAuLi5zZWdtZW50LCBvdXRsZXRzOiBvdXRsZXRzIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc3VsdC5wdXNoKHNlZ21lbnQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG5cbiAgcHJpdmF0ZSBfcm91dGVDaGFuZ2VkKCk6IChldmVudFBhaXI6IFtOYXZpZ2F0aW9uU3RhcnQsIE5hdmlnYXRpb25TdGFydF0pID0+IHZvaWQge1xuICAgIHJldHVybiAoW3ByZXZpb3VzRXZlbnQsIGN1cnJlbnRFdmVudF06IFtOYXZpZ2F0aW9uU3RhcnQsIE5hdmlnYXRpb25TdGFydF0pID0+IHtcbiAgICAgIGNvbnN0IHByZXZpb3VzTGFuZyA9IHRoaXMucGFyc2VyLmdldExvY2F0aW9uTGFuZyhwcmV2aW91c0V2ZW50LnVybCkgfHwgdGhpcy5wYXJzZXIuZGVmYXVsdExhbmc7XG4gICAgICBjb25zdCBjdXJyZW50TGFuZyA9IHRoaXMucGFyc2VyLmdldExvY2F0aW9uTGFuZyhjdXJyZW50RXZlbnQudXJsKSB8fCB0aGlzLnBhcnNlci5kZWZhdWx0TGFuZztcblxuICAgICAgaWYgKGN1cnJlbnRMYW5nICE9PSBwcmV2aW91c0xhbmcpIHtcbiAgICAgICAgLy8gbXV0YXRlIHJvdXRlciBjb25maWcgZGlyZWN0bHkgdG8gYXZvaWQgZ2V0dGluZyBvdXQgb2Ygc3luY1xuICAgICAgICB0aGlzLnBhcnNlci5tdXRhdGVSb3V0ZXJSb290Um91dGUoY3VycmVudExhbmcsIHByZXZpb3VzTGFuZywgdGhpcy5yb3V0ZXIuY29uZmlnKTtcbiAgICAgICAgdGhpcy5wYXJzZXJcbiAgICAgICAgICAudHJhbnNsYXRlUm91dGVzKGN1cnJlbnRMYW5nKVxuICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgLy8gcmVzZXQgcm91dGVzIGFnYWluIG9uY2UgdGhleSBhcmUgYWxsIHRyYW5zbGF0ZWRcbiAgICAgICAgICAgIHRhcCgoKSA9PiB0aGlzLnJvdXRlci5yZXNldENvbmZpZyh0aGlzLnBhcnNlci5yb3V0ZXMpKVxuICAgICAgICAgIClcbiAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIC8vIEZpcmUgcm91dGUgY2hhbmdlIGV2ZW50XG4gICAgICAgICAgICB0aGlzLnJvdXRlckV2ZW50cy5uZXh0KGN1cnJlbnRMYW5nKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG59XG4iXX0=