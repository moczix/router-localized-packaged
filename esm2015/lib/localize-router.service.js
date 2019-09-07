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
export class LocalizeRouterService {
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
/** @nocollapse */ LocalizeRouterService.ngInjectableDef = i0.ɵɵdefineInjectable({ token: LocalizeRouterService, factory: function LocalizeRouterService_Factory(t) { return new (t || LocalizeRouterService)(i0.ɵɵinject(LocalizeParser), i0.ɵɵinject(LocalizeRouterSettings), i0.ɵɵinject(Router)); }, providedIn: null });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxpemUtcm91dGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sb2NhbGl6ZS1yb3V0ZXIvIiwic291cmNlcyI6WyJsaWIvbG9jYWxpemUtcm91dGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUNMLE1BQU0sRUFDTixlQUFlLEVBR2YsY0FBYyxFQUVmLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDMUQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7Ozs7O0FBRWxFOzs7R0FHRztBQUVILE1BQU0sT0FBTyxxQkFBcUI7SUFHaEM7Ozs7O09BS0c7SUFDSCxZQUNpQyxNQUFzQixFQUNkLFFBQWdDLEVBQy9DLE1BQWM7UUFGUCxXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQUNkLGFBQVEsR0FBUixRQUFRLENBQXdCO1FBQy9DLFdBQU0sR0FBTixNQUFNLENBQVE7UUFFdEMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFDO0lBQzVDLENBQUM7SUFFRDs7T0FFRztJQUNILElBQUk7UUFDRixJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVDLDZCQUE2QjtRQUM3QixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU07YUFDZixJQUFJLENBQ0gsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLFlBQVksZUFBZSxDQUFDLEVBQ25ELFFB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QUMsV0FBVyxDQUFDO1lBQy9GLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztZQUU3RixJQUFJLFdBQVcsS0FBSyxZQUFZLEVBQUU7Z0JBQ2hDLDZEQUE2RDtnQkFDN0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ2pGLElBQUksQ0FBQyxNQUFNO3FCQUNSLGVBQWUsQ0FBQyxXQUFXLENBQUM7cUJBQzVCLElBQUk7Z0JBQ0gsa0RBQWtEO2dCQUNsRCxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUN2RDtxQkFDQSxTQUFTLENBQUMsR0FBRyxFQUFFO29CQUNkLDBCQUEwQjtvQkFDMUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ3RDLENBQUMsQ0FBQyxDQUFDO2FBQ047UUFDSCxDQUFDLENBQUM7SUFDSixDQUFDOzt1RUFuTVUscUJBQXFCLHdFQUFyQixxQkFBcUIsY0FVdEIsY0FBYyxlQUNkLHNCQUFzQixlQUN0QixNQUFNO21DQVpMLHFCQUFxQjtjQURqQyxVQUFVOztzQkFXTixNQUFNO3VCQUFDLGNBQWM7O3NCQUNyQixNQUFNO3VCQUFDLHNCQUFzQjs7c0JBQzdCLE1BQU07dUJBQUMsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgUm91dGVyLFxuICBOYXZpZ2F0aW9uU3RhcnQsXG4gIEFjdGl2YXRlZFJvdXRlU25hcHNob3QsXG4gIFVybFNlZ21lbnQsXG4gIFBSSU1BUllfT1VUTEVULFxuICBOYXZpZ2F0aW9uRXh0cmFzXG59IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBwYWlyd2lzZSwgZmlsdGVyLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBMb2NhbGl6ZVBhcnNlciB9IGZyb20gJy4vbG9jYWxpemUtcm91dGVyLnBhcnNlcic7XG5pbXBvcnQgeyBMb2NhbGl6ZVJvdXRlclNldHRpbmdzIH0gZnJvbSAnLi9sb2NhbGl6ZS1yb3V0ZXIuY29uZmlnJztcblxuLyoqXG4gKiBMb2NhbGl6YXRpb24gc2VydmljZVxuICogbW9kaWZ5Um91dGVzXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBMb2NhbGl6ZVJvdXRlclNlcnZpY2Uge1xuICByb3V0ZXJFdmVudHM6IFN1YmplY3Q8c3RyaW5nPjtcblxuICAvKipcbiAgICogQ1RPUlxuICAgKiBAcGFyYW0gcGFyc2VyXG4gICAqIEBwYXJhbSBzZXR0aW5nc1xuICAgKiBAcGFyYW0gcm91dGVyXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KExvY2FsaXplUGFyc2VyKSBwdWJsaWMgcGFyc2VyOiBMb2NhbGl6ZVBhcnNlcixcbiAgICBASW5qZWN0KExvY2FsaXplUm91dGVyU2V0dGluZ3MpIHB1YmxpYyBzZXR0aW5nczogTG9jYWxpemVSb3V0ZXJTZXR0aW5ncyxcbiAgICBASW5qZWN0KFJvdXRlcikgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlclxuICApIHtcbiAgICB0aGlzLnJvdXRlckV2ZW50cyA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFydCB1cCB0aGUgc2VydmljZVxuICAgKi9cbiAgaW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnJvdXRlci5yZXNldENvbmZpZyh0aGlzLnBhcnNlci5yb3V0ZXMpO1xuICAgIC8vIHN1YnNjcmliZSB0byByb3V0ZXIgZXZlbnRzXG4gICAgdGhpcy5yb3V0ZXIuZXZlbnRzXG4gICAgICAucGlwZShcbiAgICAgICAgZmlsdGVyKChldmVudCkgPT4gZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uU3RhcnQpLFxuICAgICAgICBwYWlyd2lzZSgpXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKHRoaXMuX3JvdXRlQ2hhbmdlZCgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGFuZ2UgbGFuZ3VhZ2UgYW5kIG5hdmlnYXRlIHRvIHRyYW5zbGF0ZWQgcm91dGVcbiAgICogQHBhcmFtIGxhbmdcbiAgICovXG4gIGNoYW5nZUxhbmd1YWdlKGxhbmc6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmIChsYW5nICE9PSB0aGlzLnBhcnNlci5jdXJyZW50TGFuZykge1xuICAgICAgY29uc3Qgcm9vdFNuYXBzaG90OiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90ID0gdGhpcy5yb3V0ZXIucm91dGVyU3RhdGUuc25hcHNob3Qucm9vdDtcblxuICAgICAgdGhpcy5wYXJzZXJcbiAgICAgICAgLnRyYW5zbGF0ZVJvdXRlcyhsYW5nKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICAvLyBzZXQgbmV3IHJvdXRlcyB0byByb3V0ZXJcbiAgICAgICAgICB0YXAoKCkgPT4gdGhpcy5yb3V0ZXIucmVzZXRDb25maWcodGhpcy5wYXJzZXIucm91dGVzKSlcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICBjb25zdCB1cmxTZWdtZW50cyA9IHRoaXMudHJhdmVyc2VTbmFwc2hvdChyb290U25hcHNob3QsIHRydWUpLmZpbHRlcigocGF0aDogc3RyaW5nLCBpOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAhaSB8fCBwYXRoOyAvLyBmaWx0ZXIgb3V0IGVtcHR5IHBhdGhzXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBjb25zdCBuYXZpZ2F0aW9uRXh0cmFzOiBOYXZpZ2F0aW9uRXh0cmFzID0ge1xuICAgICAgICAgICAgLi4uKHJvb3RTbmFwc2hvdC5xdWVyeVBhcmFtTWFwLmtleXMubGVuZ3RoID8geyBxdWVyeVBhcmFtczogcm9vdFNuYXBzaG90LnF1ZXJ5UGFyYW1zIH0gOiB7fSksXG4gICAgICAgICAgICAuLi4ocm9vdFNuYXBzaG90LmZyYWdtZW50ID8geyBmcmFnbWVudDogcm9vdFNuYXBzaG90LmZyYWdtZW50IH0gOiB7fSlcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgLy8gdXNlIG5hdmlnYXRlIHRvIGtlZXAgZXh0cmFzIHVuY2hhbmdlZFxuICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKHVybFNlZ21lbnRzLCBuYXZpZ2F0aW9uRXh0cmFzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRyYXZlcnNlcyB0aHJvdWdoIHRoZSB0cmVlIHRvIGFzc2VtYmxlIG5ldyB0cmFuc2xhdGVkIHVybFxuICAgKiBAcGFyYW0gc25hcHNob3RcbiAgICogQHBhcmFtIGlzUm9vdFxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgcHJpdmF0ZSB0cmF2ZXJzZVNuYXBzaG90KHNuYXBzaG90OiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBpc1Jvb3Q6IGJvb2xlYW4gPSBmYWxzZSk6IGFueVtdIHtcbiAgICBpZiAoaXNSb290KSB7XG4gICAgICBpZiAoIXNuYXBzaG90LmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgcmV0dXJuIFsnJ107XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5zZXR0aW5ncy5hbHdheXNTZXRQcmVmaXggfHwgdGhpcy5wYXJzZXIuY3VycmVudExhbmcgIT09IHRoaXMucGFyc2VyLmRlZmF1bHRMYW5nKSB7XG4gICAgICAgIHJldHVybiBbYC8ke3RoaXMucGFyc2VyLmN1cnJlbnRMYW5nfWAsIC4uLnRoaXMudHJhdmVyc2VTbmFwc2hvdChzbmFwc2hvdC5maXJzdENoaWxkLmZpcnN0Q2hpbGQpXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBbLi4udGhpcy50cmF2ZXJzZVNuYXBzaG90KHNuYXBzaG90LmZpcnN0Q2hpbGQuZmlyc3RDaGlsZCldO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHVybFBhcnQgPSB0aGlzLnBhcnNlU2VnbWVudFZhbHVlKHNuYXBzaG90KTtcblxuICAgIGNvbnN0IG91dGxldENoaWxkcmVuID0gc25hcHNob3QuY2hpbGRyZW4uZmlsdGVyKChjaGlsZCkgPT4gY2hpbGQub3V0bGV0ICE9PSBQUklNQVJZX09VVExFVCk7XG5cbiAgICBjb25zdCBvdXRsZXRzID0gb3V0bGV0Q2hpbGRyZW4ucmVkdWNlKFxuICAgICAgKGFjYywgY3VyKSA9PiAoe1xuICAgICAgICBvdXRsZXRzOiB7XG4gICAgICAgICAgLi4uYWNjLm91dGxldHMsXG4gICAgICAgICAgW2N1ci5vdXRsZXRdOiB0aGlzLnBhcnNlU2VnbWVudFZhbHVlKGN1cilcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICB7IG91dGxldHM6IHt9IH1cbiAgICApO1xuXG4gICAgY29uc3QgcHJpbWFyeUNoaWxkID0gc25hcHNob3QuY2hpbGRyZW4uZmluZCgoY2hpbGQpID0+IGNoaWxkLm91dGxldCA9PT0gUFJJTUFSWV9PVVRMRVQpO1xuXG4gICAgcmV0dXJuIFtcbiAgICAgIHVybFBhcnQsXG4gICAgICAuLi4oT2JqZWN0LmtleXMoc25hcHNob3QucGFyYW1zKS5sZW5ndGggPyBbc25hcHNob3QucGFyYW1zXSA6IFtdKSxcbiAgICAgIC4uLihvdXRsZXRDaGlsZHJlbi5sZW5ndGggPyBbb3V0bGV0c10gOiBbXSksXG4gICAgICAuLi4ocHJpbWFyeUNoaWxkID8gdGhpcy50cmF2ZXJzZVNuYXBzaG90KHByaW1hcnlDaGlsZCkgOiBbXSlcbiAgICBdO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4dHJhY3RzIG5ldyBzZWdtZW50IHZhbHVlIGJhc2VkIG9uIHJvdXRlQ29uZmlnIGFuZCB1cmxcbiAgICogQHBhcmFtIHNuYXBzaG90XG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBwcml2YXRlIHBhcnNlU2VnbWVudFZhbHVlKHNuYXBzaG90OiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90KTogc3RyaW5nIHtcbiAgICBpZiAoc25hcHNob3Qucm91dGVDb25maWcpIHtcbiAgICAgIGlmIChzbmFwc2hvdC5yb3V0ZUNvbmZpZy5wYXRoID09PSAnKionKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcnNlci50cmFuc2xhdGVSb3V0ZShcbiAgICAgICAgICBzbmFwc2hvdC51cmxcbiAgICAgICAgICAgIC5maWx0ZXIoKHNlZ21lbnQ6IFVybFNlZ21lbnQpID0+IHNlZ21lbnQucGF0aClcbiAgICAgICAgICAgIC5tYXAoKHNlZ21lbnQ6IFVybFNlZ21lbnQpID0+IHNlZ21lbnQucGF0aClcbiAgICAgICAgICAgIC5qb2luKCcvJylcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSBpZiAoc25hcHNob3Qucm91dGVDb25maWcuZGF0YSkge1xuICAgICAgICBjb25zdCBzdWJQYXRoU2VnbWVudHMgPSBzbmFwc2hvdC5yb3V0ZUNvbmZpZy5kYXRhLmxvY2FsaXplUm91dGVyLnBhdGguc3BsaXQoJy8nKTtcbiAgICAgICAgcmV0dXJuIHN1YlBhdGhTZWdtZW50c1xuICAgICAgICAgIC5tYXAoKHM6IHN0cmluZywgaTogbnVtYmVyKSA9PiAocy5pbmRleE9mKCc6JykgPT09IDAgPyBzbmFwc2hvdC51cmxbaV0ucGF0aCA6IHRoaXMucGFyc2VyLnRyYW5zbGF0ZVJvdXRlKHMpKSlcbiAgICAgICAgICAuam9pbignLycpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICAvKipcbiAgICogVHJhbnNsYXRlIHJvdXRlIHRvIGN1cnJlbnQgbGFuZ3VhZ2VcbiAgICogSWYgbmV3IGxhbmd1YWdlIGlzIGV4cGxpY2l0bHkgcHJvdmlkZWQgdGhlbiByZXBsYWNlIGxhbmd1YWdlIHBhcnQgaW4gdXJsIHdpdGggbmV3IGxhbmd1YWdlXG4gICAqIEBwYXJhbSBwYXRoXG4gICAqIEByZXR1cm5zIHtzdHJpbmcgfCBhbnlbXX1cbiAgICovXG4gIHRyYW5zbGF0ZVJvdXRlKHBhdGg6IHN0cmluZyB8IGFueVtdKTogc3RyaW5nIHwgYW55W10ge1xuICAgIC8vIHBhdGggaXMgbnVsbCAoZS5nLiByZXNldHRpbmcgYXV4aWxpYXJ5IG91dGxldClcbiAgICBpZiAoIXBhdGgpIHtcbiAgICAgIHJldHVybiBwYXRoO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHBhdGggPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb25zdCB1cmwgPSB0aGlzLnBhcnNlci50cmFuc2xhdGVSb3V0ZShwYXRoKTtcbiAgICAgIHJldHVybiAhcGF0aC5pbmRleE9mKCcvJykgPyBgLyR7dGhpcy5wYXJzZXIudXJsUHJlZml4fSR7dXJsfWAgOiB1cmw7XG4gICAgfVxuICAgIC8vIGl0J3MgYW4gYXJyYXlcbiAgICBsZXQgcmVzdWx0OiBhbnlbXSA9IFtdO1xuICAgIChwYXRoIGFzIEFycmF5PGFueT4pLmZvckVhY2goKHNlZ21lbnQ6IGFueSwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBzZWdtZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICBjb25zdCByZXMgPSB0aGlzLnBhcnNlci50cmFuc2xhdGVSb3V0ZShzZWdtZW50KTtcbiAgICAgICAgaWYgKCFpbmRleCAmJiAhc2VnbWVudC5pbmRleE9mKCcvJykpIHtcbiAgICAgICAgICByZXN1bHQucHVzaChgLyR7dGhpcy5wYXJzZXIudXJsUHJlZml4fSR7cmVzfWApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc3VsdC5wdXNoKHJlcyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHRyYW5zbGF0ZSByb3V0ZXIgb3V0bGV0cyBibG9ja1xuICAgICAgICBpZiAoc2VnbWVudCAmJiBzZWdtZW50Lm91dGxldHMpIHtcbiAgICAgICAgICBsZXQgb3V0bGV0czogYW55ID0ge307XG4gICAgICAgICAgZm9yIChsZXQga2V5IGluIHNlZ21lbnQub3V0bGV0cykge1xuICAgICAgICAgICAgaWYgKHNlZ21lbnQub3V0bGV0cy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgIG91dGxldHNba2V5XSA9IHRoaXMudHJhbnNsYXRlUm91dGUoc2VnbWVudC5vdXRsZXRzW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXN1bHQucHVzaCh7IC4uLnNlZ21lbnQsIG91dGxldHM6IG91dGxldHMgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzdWx0LnB1c2goc2VnbWVudCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIEV2ZW50IGhhbmRsZXIgdG8gcmVhY3Qgb24gcm91dGUgY2hhbmdlXG4gICAqIEByZXR1cm5zIHsoZXZlbnQ6YW55KT0+dm9pZH1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgX3JvdXRlQ2hhbmdlZCgpOiAoZXZlbnRQYWlyOiBbTmF2aWdhdGlvblN0YXJ0LCBOYXZpZ2F0aW9uU3RhcnRdKSA9PiB2b2lkIHtcbiAgICByZXR1cm4gKFtwcmV2aW91c0V2ZW50LCBjdXJyZW50RXZlbnRdOiBbTmF2aWdhdGlvblN0YXJ0LCBOYXZpZ2F0aW9uU3RhcnRdKSA9PiB7XG4gICAgICBjb25zdCBwcmV2aW91c0xhbmcgPSB0aGlzLnBhcnNlci5nZXRMb2NhdGlvbkxhbmcocHJldmlvdXNFdmVudC51cmwpIHx8IHRoaXMucGFyc2VyLmRlZmF1bHRMYW5nO1xuICAgICAgY29uc3QgY3VycmVudExhbmcgPSB0aGlzLnBhcnNlci5nZXRMb2NhdGlvbkxhbmcoY3VycmVudEV2ZW50LnVybCkgfHwgdGhpcy5wYXJzZXIuZGVmYXVsdExhbmc7XG5cbiAgICAgIGlmIChjdXJyZW50TGFuZyAhPT0gcHJldmlvdXNMYW5nKSB7XG4gICAgICAgIC8vIG11dGF0ZSByb3V0ZXIgY29uZmlnIGRpcmVjdGx5IHRvIGF2b2lkIGdldHRpbmcgb3V0IG9mIHN5bmNcbiAgICAgICAgdGhpcy5wYXJzZXIubXV0YXRlUm91dGVyUm9vdFJvdXRlKGN1cnJlbnRMYW5nLCBwcmV2aW91c0xhbmcsIHRoaXMucm91dGVyLmNvbmZpZyk7XG4gICAgICAgIHRoaXMucGFyc2VyXG4gICAgICAgICAgLnRyYW5zbGF0ZVJvdXRlcyhjdXJyZW50TGFuZylcbiAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgIC8vIHJlc2V0IHJvdXRlcyBhZ2FpbiBvbmNlIHRoZXkgYXJlIGFsbCB0cmFuc2xhdGVkXG4gICAgICAgICAgICB0YXAoKCkgPT4gdGhpcy5yb3V0ZXIucmVzZXRDb25maWcodGhpcy5wYXJzZXIucm91dGVzKSlcbiAgICAgICAgICApXG4gICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAvLyBGaXJlIHJvdXRlIGNoYW5nZSBldmVudFxuICAgICAgICAgICAgdGhpcy5yb3V0ZXJFdmVudHMubmV4dChjdXJyZW50TGFuZyk7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxufVxuIl19