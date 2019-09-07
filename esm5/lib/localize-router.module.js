/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule, APP_INITIALIZER, Optional, SkipSelf, Injectable, Injector, NgModuleFactoryLoader } from '@angular/core';
import { LocalizeRouterService } from './localize-router.service';
import { DummyLocalizeParser, LocalizeParser } from './localize-router.parser';
import { RouterModule } from '@angular/router';
import { LocalizeRouterPipe } from './localize-router.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ALWAYS_SET_PREFIX, CACHE_MECHANISM, CACHE_NAME, DEFAULT_LANG_FUNCTION, LOCALIZE_ROUTER_FORROOT_GUARD, LocalizeRouterSettings, RAW_ROUTES, USE_CACHED_LANG } from './localize-router.config';
import { LocalizeRouterConfigLoader } from './localize-router-config-loader';
var ParserInitializer = /** @class */ (function () {
    function ParserInitializer(injector) {
        this.injector = injector;
    }
    /**
     * @return {?}
     */
    ParserInitializer.prototype.appInitializer = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var res = this.parser.load(this.routes);
        res.then((/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var localize = _this.injector.get(LocalizeRouterService);
            localize.init();
        }));
        return res;
    };
    /**
     * @param {?} parser
     * @param {?} routes
     * @return {?}
     */
    ParserInitializer.prototype.generateInitializer = /**
     * @param {?} parser
     * @param {?} routes
     * @return {?}
     */
    function (parser, routes) {
        this.parser = parser;
        this.routes = routes.reduce((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        function (a, b) { return a.concat(b); }));
        return this.appInitializer;
    };
    ParserInitializer.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ParserInitializer.ctorParameters = function () { return [
        { type: Injector }
    ]; };
    return ParserInitializer;
}());
export { ParserInitializer };
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
export function getAppInitializer(p, parser, routes) {
    return p.generateInitializer(parser, routes).bind(p);
}
var LocalizeRouterModule = /** @class */ (function () {
    function LocalizeRouterModule() {
    }
    /**
     * @param {?} routes
     * @param {?=} config
     * @return {?}
     */
    LocalizeRouterModule.forRoot = /**
     * @param {?} routes
     * @param {?=} config
     * @return {?}
     */
    function (routes, config) {
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
    /**
     * @param {?} routes
     * @return {?}
     */
    LocalizeRouterModule.forChild = /**
     * @param {?} routes
     * @return {?}
     */
    function (routes) {
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
    LocalizeRouterModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, RouterModule, TranslateModule],
                    declarations: [LocalizeRouterPipe],
                    exports: [LocalizeRouterPipe]
                },] }
    ];
    return LocalizeRouterModule;
}());
export { LocalizeRouterModule };
/**
 * @param {?} localizeRouterModule
 * @return {?}
 */
export function provideForRootGuard(localizeRouterModule) {
    if (localizeRouterModule) {
        throw new Error("LocalizeRouterModule.forRoot() called twice. Lazy loaded modules should use LocalizeRouterModule.forChild() instead.");
    }
    return 'guarded';
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxpemUtcm91dGVyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xvY2FsaXplLXJvdXRlci8iLCJzb3VyY2VzIjpbImxpYi9sb2NhbGl6ZS1yb3V0ZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsUUFBUSxFQUF1QixlQUFlLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFDbEUsVUFBVSxFQUFFLFFBQVEsRUFBRSxxQkFBcUIsRUFDNUMsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQy9FLE9BQU8sRUFBRSxZQUFZLEVBQVUsTUFBTSxpQkFBaUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsZUFBZSxFQUFFLFVBQVUsRUFBRSxxQkFBcUIsRUFBRSw2QkFBNkIsRUFBd0Isc0JBQXNCLEVBQy9ILFVBQVUsRUFDVixlQUFlLEVBQ2hCLE1BQU0sMEJBQTBCLENBQUM7QUFDbEMsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFFN0U7SUFNRSwyQkFBb0IsUUFBa0I7UUFBbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtJQUN0QyxDQUFDOzs7O0lBR0QsMENBQWM7OztJQUFkO1FBQUEsaUJBUUM7O1lBUE8sR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDekMsR0FBRyxDQUFDLElBQUk7OztRQUFDOztnQkFDRCxR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SUFBSTtvQkFDWCxRQUFRLEVBQUUsTUFBTTtpQkFDakI7YUFDRjtTQUNGLENBQUM7SUFDSixDQUFDOztnQkFwREYsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsZUFBZSxDQUFDO29CQUN0RCxZQUFZLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztvQkFDbEMsT0FBTyxFQUFFLENBQUMsa0JBQWtCLENBQUM7aUJBQzlCOztJQWlERCwyQkFBQztDQUFBLEFBckRELElBcURDO1NBaERZLG9CQUFvQjs7Ozs7QUFtRGpDLE1BQU0sVUFBVSxtQkFBbUIsQ0FBQyxvQkFBMEM7SUFDNUUsSUFBSSxvQkFBb0IsRUFBRTtRQUN4QixNQUFNLElBQUksS0FBSyxDQUNiLHNIQUFzSCxDQUFDLENBQUM7S0FDM0g7SUFDRCxPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMsIEFQUF9JTklUSUFMSVpFUiwgT3B0aW9uYWwsIFNraXBTZWxmLFxuICBJbmplY3RhYmxlLCBJbmplY3RvciwgTmdNb2R1bGVGYWN0b3J5TG9hZGVyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTG9jYWxpemVSb3V0ZXJTZXJ2aWNlIH0gZnJvbSAnLi9sb2NhbGl6ZS1yb3V0ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBEdW1teUxvY2FsaXplUGFyc2VyLCBMb2NhbGl6ZVBhcnNlciB9IGZyb20gJy4vbG9jYWxpemUtcm91dGVyLnBhcnNlcic7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUsIFJvdXRlcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBMb2NhbGl6ZVJvdXRlclBpcGUgfSBmcm9tICcuL2xvY2FsaXplLXJvdXRlci5waXBlJztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIEFMV0FZU19TRVRfUFJFRklYLFxuICBDQUNIRV9NRUNIQU5JU00sIENBQ0hFX05BTUUsIERFRkFVTFRfTEFOR19GVU5DVElPTiwgTE9DQUxJWkVfUk9VVEVSX0ZPUlJPT1RfR1VBUkQsIExvY2FsaXplUm91dGVyQ29uZmlnLCBMb2NhbGl6ZVJvdXRlclNldHRpbmdzLFxuICBSQVdfUk9VVEVTLFxuICBVU0VfQ0FDSEVEX0xBTkdcbn0gZnJvbSAnLi9sb2NhbGl6ZS1yb3V0ZXIuY29uZmlnJztcbmltcG9ydCB7IExvY2FsaXplUm91dGVyQ29uZmlnTG9hZGVyIH0gZnJvbSAnLi9sb2NhbGl6ZS1yb3V0ZXItY29uZmlnLWxvYWRlcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQYXJzZXJJbml0aWFsaXplciB7XG4gIHBhcnNlcjogTG9jYWxpemVQYXJzZXI7XG4gIHJvdXRlczogUm91dGVzO1xuXG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgfVxuXG5cbiAgYXBwSW5pdGlhbGl6ZXIoKTogUHJvbWlzZTxhbnk+IHtcbiAgICBjb25zdCByZXMgPSB0aGlzLnBhcnNlci5sb2FkKHRoaXMucm91dGVzKTtcbiAgICByZXMudGhlbigoKSA9PiB7XG4gICAgICBjb25zdCBsb2NhbGl6ZTogTG9jYWxpemVSb3V0ZXJTZXJ2aWNlID0gdGhpcy5pbmplY3Rvci5nZXQoTG9jYWxpemVSb3V0ZXJTZXJ2aWNlKTtcbiAgICAgIGxvY2FsaXplLmluaXQoKTtcbiAgICB9KTtcblxuICAgIHJldHVybiByZXM7XG4gIH1cblxuXG4gIGdlbmVyYXRlSW5pdGlhbGl6ZXIocGFyc2VyOiBMb2NhbGl6ZVBhcnNlciwgcm91dGVzOiBSb3V0ZXNbXSk6ICgpID0+IFByb21pc2U8YW55PiB7XG4gICAgdGhpcy5wYXJzZXIgPSBwYXJzZXI7XG4gICAgdGhpcy5yb3V0ZXMgPSByb3V0ZXMucmVkdWNlKChhLCBiKSA9PiBhLmNvbmNhdChiKSk7XG4gICAgcmV0dXJuIHRoaXMuYXBwSW5pdGlhbGl6ZXI7XG4gIH1cbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QXBwSW5pdGlhbGl6ZXIocDogUGFyc2VySW5pdGlhbGl6ZXIsIHBhcnNlcjogTG9jYWxpemVQYXJzZXIsIHJvdXRlczogUm91dGVzW10pOiBhbnkge1xuICByZXR1cm4gcC5nZW5lcmF0ZUluaXRpYWxpemVyKHBhcnNlciwgcm91dGVzKS5iaW5kKHApO1xufVxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBSb3V0ZXJNb2R1bGUsIFRyYW5zbGF0ZU1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW0xvY2FsaXplUm91dGVyUGlwZV0sXG4gIGV4cG9ydHM6IFtMb2NhbGl6ZVJvdXRlclBpcGVdXG59KVxuZXhwb3J0IGNsYXNzIExvY2FsaXplUm91dGVyTW9kdWxlIHtcblxuICBzdGF0aWMgZm9yUm9vdChyb3V0ZXM6IFJvdXRlcywgY29uZmlnOiBMb2NhbGl6ZVJvdXRlckNvbmZpZyA9IHt9KTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBMb2NhbGl6ZVJvdXRlck1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogTE9DQUxJWkVfUk9VVEVSX0ZPUlJPT1RfR1VBUkQsXG4gICAgICAgICAgdXNlRmFjdG9yeTogcHJvdmlkZUZvclJvb3RHdWFyZCxcbiAgICAgICAgICBkZXBzOiBbW0xvY2FsaXplUm91dGVyTW9kdWxlLCBuZXcgT3B0aW9uYWwoKSwgbmV3IFNraXBTZWxmKCldXVxuICAgICAgICB9LFxuICAgICAgICB7IHByb3ZpZGU6IFVTRV9DQUNIRURfTEFORywgdXNlVmFsdWU6IGNvbmZpZy51c2VDYWNoZWRMYW5nIH0sXG4gICAgICAgIHsgcHJvdmlkZTogQUxXQVlTX1NFVF9QUkVGSVgsIHVzZVZhbHVlOiBjb25maWcuYWx3YXlzU2V0UHJlZml4IH0sXG4gICAgICAgIHsgcHJvdmlkZTogQ0FDSEVfTkFNRSwgdXNlVmFsdWU6IGNvbmZpZy5jYWNoZU5hbWUgfSxcbiAgICAgICAgeyBwcm92aWRlOiBDQUNIRV9NRUNIQU5JU00sIHVzZVZhbHVlOiBjb25maWcuY2FjaGVNZWNoYW5pc20gfSxcbiAgICAgICAgeyBwcm92aWRlOiBERUZBVUxUX0xBTkdfRlVOQ1RJT04sIHVzZVZhbHVlOiBjb25maWcuZGVmYXVsdExhbmdGdW5jdGlvbiB9LFxuICAgICAgICBMb2NhbGl6ZVJvdXRlclNldHRpbmdzLFxuICAgICAgICBjb25maWcucGFyc2VyIHx8IHsgcHJvdmlkZTogTG9jYWxpemVQYXJzZXIsIHVzZUNsYXNzOiBEdW1teUxvY2FsaXplUGFyc2VyIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBSQVdfUk9VVEVTLFxuICAgICAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgICAgIHVzZVZhbHVlOiByb3V0ZXNcbiAgICAgICAgfSxcbiAgICAgICAgTG9jYWxpemVSb3V0ZXJTZXJ2aWNlLFxuICAgICAgICBQYXJzZXJJbml0aWFsaXplcixcbiAgICAgICAgeyBwcm92aWRlOiBOZ01vZHVsZUZhY3RvcnlMb2FkZXIsIHVzZUNsYXNzOiBMb2NhbGl6ZVJvdXRlckNvbmZpZ0xvYWRlciB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogQVBQX0lOSVRJQUxJWkVSLFxuICAgICAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgICAgIHVzZUZhY3Rvcnk6IGdldEFwcEluaXRpYWxpemVyLFxuICAgICAgICAgIGRlcHM6IFtQYXJzZXJJbml0aWFsaXplciwgTG9jYWxpemVQYXJzZXIsIFJBV19ST1VURVNdXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGZvckNoaWxkKHJvdXRlczogUm91dGVzKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBMb2NhbGl6ZVJvdXRlck1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogUkFXX1JPVVRFUyxcbiAgICAgICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgICAgICB1c2VWYWx1ZTogcm91dGVzXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVGb3JSb290R3VhcmQobG9jYWxpemVSb3V0ZXJNb2R1bGU6IExvY2FsaXplUm91dGVyTW9kdWxlKTogc3RyaW5nIHtcbiAgaWYgKGxvY2FsaXplUm91dGVyTW9kdWxlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgYExvY2FsaXplUm91dGVyTW9kdWxlLmZvclJvb3QoKSBjYWxsZWQgdHdpY2UuIExhenkgbG9hZGVkIG1vZHVsZXMgc2hvdWxkIHVzZSBMb2NhbGl6ZVJvdXRlck1vZHVsZS5mb3JDaGlsZCgpIGluc3RlYWQuYCk7XG4gIH1cbiAgcmV0dXJuICdndWFyZGVkJztcbn1cbiJdfQ==