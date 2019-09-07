/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class LocalizeRouterService {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxpemUtcm91dGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sb2NhbGl6ZS1yb3V0ZXIvIiwic291cmNlcyI6WyJsaWIvbG9jYWxpemUtcm91dGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFDTCxNQUFNLEVBQ04sZUFBZSxFQUdmLGNBQWMsRUFFZixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzFELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7OztBQU9sRSxNQUFNLE9BQU8scUJBQXFCOzs7Ozs7SUFJaEMsWUFDaUMsTUFBc0IsRUFDZCxRQUFnQyxFQUMvQyxNQUFjO1FBRlAsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFDZCxhQUFRLEdBQVIsUUFBUSxDQUF3QjtRQUMvQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBRXRDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQztJQUM1QyxDQUFDOzs7OztJQUtELElBQUk7UUFDRixJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVDLDZCQUE2QjtRQUM3QixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU07YUFDZixJQUFJLENBQ0gsTUFBTTs7OztRQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLFlBQVksZUFBZSxFQUFDLEVBQ25ELFFBQVEsRUFBRSxDQUNYO2FBQ0EsU0FB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LFlBQVksRUFBRTtnQkFDaEMsNkRBQTZEO2dCQUM3RCxJQUFJLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLFdBQVcsRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDakYsSUFBSSxDQUFDLE1BQU07cUJBQ1IsZUFBZSxDQUFDLFdBQVcsQ0FBQztxQkFDNUIsSUFBSTtnQkFDSCxrREFBa0Q7Z0JBQ2xELEdBQUc7OztnQkFBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFDLENBQ3ZEO3FCQUNBLFNBQVM7OztnQkFBQyxHQUFHLEVBQUU7b0JBQ2QsMEJBQTBCO29CQUMxQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDdEMsQ0FBQyxFQUFDLENBQUM7YUFDTjtRQUNILENBQUMsRUFBQztJQUNKLENBQUM7OztZQXhLRixVQUFVOzs7O1lBUEYsY0FBYyx1QkFhbEIsTUFBTSxTQUFDLGNBQWM7WUFaakIsc0JBQXNCLHVCQWExQixNQUFNLFNBQUMsc0JBQXNCO1lBdkJoQyxNQUFNLHVCQXdCSCxNQUFNLFNBQUMsTUFBTTs7OztJQU5oQiw2Q0FBOEI7O0lBSTVCLHVDQUFxRDs7SUFDckQseUNBQXVFOzs7OztJQUN2RSx1Q0FBc0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIFJvdXRlcixcbiAgTmF2aWdhdGlvblN0YXJ0LFxuICBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LFxuICBVcmxTZWdtZW50LFxuICBQUklNQVJZX09VVExFVCxcbiAgTmF2aWdhdGlvbkV4dHJhc1xufSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgcGFpcndpc2UsIGZpbHRlciwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTG9jYWxpemVQYXJzZXIgfSBmcm9tICcuL2xvY2FsaXplLXJvdXRlci5wYXJzZXInO1xuaW1wb3J0IHsgTG9jYWxpemVSb3V0ZXJTZXR0aW5ncyB9IGZyb20gJy4vbG9jYWxpemUtcm91dGVyLmNvbmZpZyc7XG5cbi8qKlxuICogTG9jYWxpemF0aW9uIHNlcnZpY2VcbiAqIG1vZGlmeVJvdXRlc1xuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTG9jYWxpemVSb3V0ZXJTZXJ2aWNlIHtcbiAgcm91dGVyRXZlbnRzOiBTdWJqZWN0PHN0cmluZz47XG5cblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KExvY2FsaXplUGFyc2VyKSBwdWJsaWMgcGFyc2VyOiBMb2NhbGl6ZVBhcnNlcixcbiAgICBASW5qZWN0KExvY2FsaXplUm91dGVyU2V0dGluZ3MpIHB1YmxpYyBzZXR0aW5nczogTG9jYWxpemVSb3V0ZXJTZXR0aW5ncyxcbiAgICBASW5qZWN0KFJvdXRlcikgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlclxuICApIHtcbiAgICB0aGlzLnJvdXRlckV2ZW50cyA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFydCB1cCB0aGUgc2VydmljZVxuICAgKi9cbiAgaW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnJvdXRlci5yZXNldENvbmZpZyh0aGlzLnBhcnNlci5yb3V0ZXMpO1xuICAgIC8vIHN1YnNjcmliZSB0byByb3V0ZXIgZXZlbnRzXG4gICAgdGhpcy5yb3V0ZXIuZXZlbnRzXG4gICAgICAucGlwZShcbiAgICAgICAgZmlsdGVyKChldmVudCkgPT4gZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uU3RhcnQpLFxuICAgICAgICBwYWlyd2lzZSgpXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKHRoaXMuX3JvdXRlQ2hhbmdlZCgpKTtcbiAgfVxuXG5cbiAgY2hhbmdlTGFuZ3VhZ2UobGFuZzogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKGxhbmcgIT09IHRoaXMucGFyc2VyLmN1cnJlbnRMYW5nKSB7XG4gICAgICBjb25zdCByb290U25hcHNob3Q6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QgPSB0aGlzLnJvdXRlci5yb3V0ZXJTdGF0ZS5zbmFwc2hvdC5yb290O1xuXG4gICAgICB0aGlzLnBhcnNlclxuICAgICAgICAudHJhbnNsYXRlUm91dGVzKGxhbmcpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIC8vIHNldCBuZXcgcm91dGVzIHRvIHJvdXRlclxuICAgICAgICAgIHRhcCgoKSA9PiB0aGlzLnJvdXRlci5yZXNldENvbmZpZyh0aGlzLnBhcnNlci5yb3V0ZXMpKVxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHVybFNlZ21lbnRzID0gdGhpcy50cmF2ZXJzZVNuYXBzaG90KHJvb3RTbmFwc2hvdCwgdHJ1ZSkuZmlsdGVyKChwYXRoOiBzdHJpbmcsIGk6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICFpIHx8IHBhdGg7IC8vIGZpbHRlciBvdXQgZW1wdHkgcGF0aHNcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGNvbnN0IG5hdmlnYXRpb25FeHRyYXM6IE5hdmlnYXRpb25FeHRyYXMgPSB7XG4gICAgICAgICAgICAuLi4ocm9vdFNuYXBzaG90LnF1ZXJ5UGFyYW1NYXAua2V5cy5sZW5ndGggPyB7IHF1ZXJ5UGFyYW1zOiByb290U25hcHNob3QucXVlcnlQYXJhbXMgfSA6IHt9KSxcbiAgICAgICAgICAgIC4uLihyb290U25hcHNob3QuZnJhZ21lbnQgPyB7IGZyYWdtZW50OiByb290U25hcHNob3QuZnJhZ21lbnQgfSA6IHt9KVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICAvLyB1c2UgbmF2aWdhdGUgdG8ga2VlcCBleHRyYXMgdW5jaGFuZ2VkXG4gICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUodXJsU2VnbWVudHMsIG5hdmlnYXRpb25FeHRyYXMpO1xuICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHRyYXZlcnNlU25hcHNob3Qoc25hcHNob3Q6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIGlzUm9vdDogYm9vbGVhbiA9IGZhbHNlKTogYW55W10ge1xuICAgIGlmIChpc1Jvb3QpIHtcbiAgICAgIGlmICghc25hcHNob3QuZmlyc3RDaGlsZCkge1xuICAgICAgICByZXR1cm4gWycnXTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnNldHRpbmdzLmFsd2F5c1NldFByZWZpeCB8fCB0aGlzLnBhcnNlci5jdXJyZW50TGFuZyAhPT0gdGhpcy5wYXJzZXIuZGVmYXVsdExhbmcpIHtcbiAgICAgICAgcmV0dXJuIFtgLyR7dGhpcy5wYXJzZXIuY3VycmVudExhbmd9YCwgLi4udGhpcy50cmF2ZXJzZVNuYXBzaG90KHNuYXBzaG90LmZpcnN0Q2hpbGQuZmlyc3RDaGlsZCldO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFsuLi50aGlzLnRyYXZlcnNlU25hcHNob3Qoc25hcHNob3QuZmlyc3RDaGlsZC5maXJzdENoaWxkKV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgdXJsUGFydCA9IHRoaXMucGFyc2VTZWdtZW50VmFsdWUoc25hcHNob3QpO1xuXG4gICAgY29uc3Qgb3V0bGV0Q2hpbGRyZW4gPSBzbmFwc2hvdC5jaGlsZHJlbi5maWx0ZXIoKGNoaWxkKSA9PiBjaGlsZC5vdXRsZXQgIT09IFBSSU1BUllfT1VUTEVUKTtcblxuICAgIGNvbnN0IG91dGxldHMgPSBvdXRsZXRDaGlsZHJlbi5yZWR1Y2UoXG4gICAgICAoYWNjLCBjdXIpID0+ICh7XG4gICAgICAgIG91dGxldHM6IHtcbiAgICAgICAgICAuLi5hY2Mub3V0bGV0cyxcbiAgICAgICAgICBbY3VyLm91dGxldF06IHRoaXMucGFyc2VTZWdtZW50VmFsdWUoY3VyKVxuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIHsgb3V0bGV0czoge30gfVxuICAgICk7XG5cbiAgICBjb25zdCBwcmltYXJ5Q2hpbGQgPSBzbmFwc2hvdC5jaGlsZHJlbi5maW5kKChjaGlsZCkgPT4gY2hpbGQub3V0bGV0ID09PSBQUklNQVJZX09VVExFVCk7XG5cbiAgICByZXR1cm4gW1xuICAgICAgdXJsUGFydCxcbiAgICAgIC4uLihPYmplY3Qua2V5cyhzbmFwc2hvdC5wYXJhbXMpLmxlbmd0aCA/IFtzbmFwc2hvdC5wYXJhbXNdIDogW10pLFxuICAgICAgLi4uKG91dGxldENoaWxkcmVuLmxlbmd0aCA/IFtvdXRsZXRzXSA6IFtdKSxcbiAgICAgIC4uLihwcmltYXJ5Q2hpbGQgPyB0aGlzLnRyYXZlcnNlU25hcHNob3QocHJpbWFyeUNoaWxkKSA6IFtdKVxuICAgIF07XG4gIH1cblxuICBwcml2YXRlIHBhcnNlU2VnbWVudFZhbHVlKHNuYXBzaG90OiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90KTogc3RyaW5nIHtcbiAgICBpZiAoc25hcHNob3Qucm91dGVDb25maWcpIHtcbiAgICAgIGlmIChzbmFwc2hvdC5yb3V0ZUNvbmZpZy5wYXRoID09PSAnKionKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcnNlci50cmFuc2xhdGVSb3V0ZShcbiAgICAgICAgICBzbmFwc2hvdC51cmxcbiAgICAgICAgICAgIC5maWx0ZXIoKHNlZ21lbnQ6IFVybFNlZ21lbnQpID0+IHNlZ21lbnQucGF0aClcbiAgICAgICAgICAgIC5tYXAoKHNlZ21lbnQ6IFVybFNlZ21lbnQpID0+IHNlZ21lbnQucGF0aClcbiAgICAgICAgICAgIC5qb2luKCcvJylcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSBpZiAoc25hcHNob3Qucm91dGVDb25maWcuZGF0YSkge1xuICAgICAgICBjb25zdCBzdWJQYXRoU2VnbWVudHMgPSBzbmFwc2hvdC5yb3V0ZUNvbmZpZy5kYXRhLmxvY2FsaXplUm91dGVyLnBhdGguc3BsaXQoJy8nKTtcbiAgICAgICAgcmV0dXJuIHN1YlBhdGhTZWdtZW50c1xuICAgICAgICAgIC5tYXAoKHM6IHN0cmluZywgaTogbnVtYmVyKSA9PiAocy5pbmRleE9mKCc6JykgPT09IDAgPyBzbmFwc2hvdC51cmxbaV0ucGF0aCA6IHRoaXMucGFyc2VyLnRyYW5zbGF0ZVJvdXRlKHMpKSlcbiAgICAgICAgICAuam9pbignLycpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH1cblxuXG4gIHRyYW5zbGF0ZVJvdXRlKHBhdGg6IHN0cmluZyB8IGFueVtdKTogc3RyaW5nIHwgYW55W10ge1xuICAgIC8vIHBhdGggaXMgbnVsbCAoZS5nLiByZXNldHRpbmcgYXV4aWxpYXJ5IG91dGxldClcbiAgICBpZiAoIXBhdGgpIHtcbiAgICAgIHJldHVybiBwYXRoO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHBhdGggPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb25zdCB1cmwgPSB0aGlzLnBhcnNlci50cmFuc2xhdGVSb3V0ZShwYXRoKTtcbiAgICAgIHJldHVybiAhcGF0aC5pbmRleE9mKCcvJykgPyBgLyR7dGhpcy5wYXJzZXIudXJsUHJlZml4fSR7dXJsfWAgOiB1cmw7XG4gICAgfVxuICAgIC8vIGl0J3MgYW4gYXJyYXlcbiAgICBsZXQgcmVzdWx0OiBhbnlbXSA9IFtdO1xuICAgIChwYXRoIGFzIEFycmF5PGFueT4pLmZvckVhY2goKHNlZ21lbnQ6IGFueSwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBzZWdtZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICBjb25zdCByZXMgPSB0aGlzLnBhcnNlci50cmFuc2xhdGVSb3V0ZShzZWdtZW50KTtcbiAgICAgICAgaWYgKCFpbmRleCAmJiAhc2VnbWVudC5pbmRleE9mKCcvJykpIHtcbiAgICAgICAgICByZXN1bHQucHVzaChgLyR7dGhpcy5wYXJzZXIudXJsUHJlZml4fSR7cmVzfWApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc3VsdC5wdXNoKHJlcyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHRyYW5zbGF0ZSByb3V0ZXIgb3V0bGV0cyBibG9ja1xuICAgICAgICBpZiAoc2VnbWVudCAmJiBzZWdtZW50Lm91dGxldHMpIHtcbiAgICAgICAgICBsZXQgb3V0bGV0czogYW55ID0ge307XG4gICAgICAgICAgZm9yIChsZXQga2V5IGluIHNlZ21lbnQub3V0bGV0cykge1xuICAgICAgICAgICAgaWYgKHNlZ21lbnQub3V0bGV0cy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgIG91dGxldHNba2V5XSA9IHRoaXMudHJhbnNsYXRlUm91dGUoc2VnbWVudC5vdXRsZXRzW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXN1bHQucHVzaCh7IC4uLnNlZ21lbnQsIG91dGxldHM6IG91dGxldHMgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzdWx0LnB1c2goc2VnbWVudCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cblxuICBwcml2YXRlIF9yb3V0ZUNoYW5nZWQoKTogKGV2ZW50UGFpcjogW05hdmlnYXRpb25TdGFydCwgTmF2aWdhdGlvblN0YXJ0XSkgPT4gdm9pZCB7XG4gICAgcmV0dXJuIChbcHJldmlvdXNFdmVudCwgY3VycmVudEV2ZW50XTogW05hdmlnYXRpb25TdGFydCwgTmF2aWdhdGlvblN0YXJ0XSkgPT4ge1xuICAgICAgY29uc3QgcHJldmlvdXNMYW5nID0gdGhpcy5wYXJzZXIuZ2V0TG9jYXRpb25MYW5nKHByZXZpb3VzRXZlbnQudXJsKSB8fCB0aGlzLnBhcnNlci5kZWZhdWx0TGFuZztcbiAgICAgIGNvbnN0IGN1cnJlbnRMYW5nID0gdGhpcy5wYXJzZXIuZ2V0TG9jYXRpb25MYW5nKGN1cnJlbnRFdmVudC51cmwpIHx8IHRoaXMucGFyc2VyLmRlZmF1bHRMYW5nO1xuXG4gICAgICBpZiAoY3VycmVudExhbmcgIT09IHByZXZpb3VzTGFuZykge1xuICAgICAgICAvLyBtdXRhdGUgcm91dGVyIGNvbmZpZyBkaXJlY3RseSB0byBhdm9pZCBnZXR0aW5nIG91dCBvZiBzeW5jXG4gICAgICAgIHRoaXMucGFyc2VyLm11dGF0ZVJvdXRlclJvb3RSb3V0ZShjdXJyZW50TGFuZywgcHJldmlvdXNMYW5nLCB0aGlzLnJvdXRlci5jb25maWcpO1xuICAgICAgICB0aGlzLnBhcnNlclxuICAgICAgICAgIC50cmFuc2xhdGVSb3V0ZXMoY3VycmVudExhbmcpXG4gICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAvLyByZXNldCByb3V0ZXMgYWdhaW4gb25jZSB0aGV5IGFyZSBhbGwgdHJhbnNsYXRlZFxuICAgICAgICAgICAgdGFwKCgpID0+IHRoaXMucm91dGVyLnJlc2V0Q29uZmlnKHRoaXMucGFyc2VyLnJvdXRlcykpXG4gICAgICAgICAgKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgLy8gRmlyZSByb3V0ZSBjaGFuZ2UgZXZlbnRcbiAgICAgICAgICAgIHRoaXMucm91dGVyRXZlbnRzLm5leHQoY3VycmVudExhbmcpO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH1cbn1cbiJdfQ==