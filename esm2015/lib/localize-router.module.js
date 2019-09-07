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
export class ParserInitializer {
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
export function getAppInitializer(p, parser, routes) {
    return p.generateInitializer(parser, routes).bind(p);
}
export class LocalizeRouterModule {
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
export function provideForRootGuard(localizeRouterModule) {
    if (localizeRouterModule) {
        throw new Error(`LocalizeRouterModule.forRoot() called twice. Lazy loaded modules should use LocalizeRouterModule.forChild() instead.`);
    }
    return 'guarded';
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxpemUtcm91dGVyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xvY2FsaXplLXJvdXRlci8iLCJzb3VyY2VzIjpbImxpYi9sb2NhbGl6ZS1yb3V0ZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsUUFBUSxFQUF1QixlQUFlLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFDbEUsVUFBVSxFQUFFLFFBQVEsRUFBRSxxQkFBcUIsRUFDNUMsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQy9FLE9BQU8sRUFBRSxZQUFZLEVBQVUsTUFBTSxpQkFBaUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsZUFBZSxFQUFFLFVBQVUsRUFBRSxxQkFBcUIsRUFBRSw2QkFBNkIsRUFBd0Isc0JBQXNCLEVBQy9ILFVBQVUsRUFDVixlQUFlLEVBQ2hCLE1BQU0sMEJBQTBCLENBQUM7QUFDbEMsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFHN0UsTUFBTSxPQUFPLGlCQUFpQjs7OztJQUs1QixZQUFvQixRQUFrQjtRQUFsQixhQUFRLEdBQVIsUUFBUSxDQUFVO0lBQ3RDLENBQUM7Ozs7SUFHRCxjQUFjOztjQUNOLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3pDLEdBQUcsQ0FBQyxJQUFJOzs7UUFBQyxHQUFHLEVB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LFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLGVBQWUsQ0FBQztnQkFDdEQsWUFBWSxFQUFFLENBQUMsa0JBQWtCLENBQUM7Z0JBQ2xDLE9BQU8sRUFBRSxDQUFDLGtCQUFrQixDQUFDO2FBQzlCOzs7Ozs7QUFvREQsTUFBTSxVQUFVLG1CQUFtQixDQUFDLG9CQUEwQztJQUM1RSxJQUFJLG9CQUFvQixFQUFFO1FBQ3hCLE1BQU0sSUFBSSxLQUFLLENBQ2Isc0hBQXNILENBQUMsQ0FBQztLQUMzSDtJQUNELE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycywgQVBQX0lOSVRJQUxJWkVSLCBPcHRpb25hbCwgU2tpcFNlbGYsXG4gIEluamVjdGFibGUsIEluamVjdG9yLCBOZ01vZHVsZUZhY3RvcnlMb2FkZXJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBMb2NhbGl6ZVJvdXRlclNlcnZpY2UgfSBmcm9tICcuL2xvY2FsaXplLXJvdXRlci5zZXJ2aWNlJztcbmltcG9ydCB7IER1bW15TG9jYWxpemVQYXJzZXIsIExvY2FsaXplUGFyc2VyIH0gZnJvbSAnLi9sb2NhbGl6ZS1yb3V0ZXIucGFyc2VyJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSwgUm91dGVzIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IExvY2FsaXplUm91dGVyUGlwZSB9IGZyb20gJy4vbG9jYWxpemUtcm91dGVyLnBpcGUnO1xuaW1wb3J0IHsgVHJhbnNsYXRlTW9kdWxlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQUxXQVlTX1NFVF9QUkVGSVgsXG4gIENBQ0hFX01FQ0hBTklTTSwgQ0FDSEVfTkFNRSwgREVGQVVMVF9MQU5HX0ZVTkNUSU9OLCBMT0NBTElaRV9ST1VURVJfRk9SUk9PVF9HVUFSRCwgTG9jYWxpemVSb3V0ZXJDb25maWcsIExvY2FsaXplUm91dGVyU2V0dGluZ3MsXG4gIFJBV19ST1VURVMsXG4gIFVTRV9DQUNIRURfTEFOR1xufSBmcm9tICcuL2xvY2FsaXplLXJvdXRlci5jb25maWcnO1xuaW1wb3J0IHsgTG9jYWxpemVSb3V0ZXJDb25maWdMb2FkZXIgfSBmcm9tICcuL2xvY2FsaXplLXJvdXRlci1jb25maWctbG9hZGVyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFBhcnNlckluaXRpYWxpemVyIHtcbiAgcGFyc2VyOiBMb2NhbGl6ZVBhcnNlcjtcbiAgcm91dGVzOiBSb3V0ZXM7XG5cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGluamVjdG9yOiBJbmplY3Rvcikge1xuICB9XG5cblxuICBhcHBJbml0aWFsaXplcigpOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IHJlcyA9IHRoaXMucGFyc2VyLmxvYWQodGhpcy5yb3V0ZXMpO1xuICAgIHJlcy50aGVuKCgpID0+IHtcbiAgICAgIGNvbnN0IGxvY2FsaXplOiBMb2NhbGl6ZVJvdXRlclNlcnZpY2UgPSB0aGlzLmluamVjdG9yLmdldChMb2NhbGl6ZVJvdXRlclNlcnZpY2UpO1xuICAgICAgbG9jYWxpemUuaW5pdCgpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG5cbiAgZ2VuZXJhdGVJbml0aWFsaXplcihwYXJzZXI6IExvY2FsaXplUGFyc2VyLCByb3V0ZXM6IFJvdXRlc1tdKTogKCkgPT4gUHJvbWlzZTxhbnk+IHtcbiAgICB0aGlzLnBhcnNlciA9IHBhcnNlcjtcbiAgICB0aGlzLnJvdXRlcyA9IHJvdXRlcy5yZWR1Y2UoKGEsIGIpID0+IGEuY29uY2F0KGIpKTtcbiAgICByZXR1cm4gdGhpcy5hcHBJbml0aWFsaXplcjtcbiAgfVxufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBcHBJbml0aWFsaXplcihwOiBQYXJzZXJJbml0aWFsaXplciwgcGFyc2VyOiBMb2NhbGl6ZVBhcnNlciwgcm91dGVzOiBSb3V0ZXNbXSk6IGFueSB7XG4gIHJldHVybiBwLmdlbmVyYXRlSW5pdGlhbGl6ZXIocGFyc2VyLCByb3V0ZXMpLmJpbmQocCk7XG59XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIFJvdXRlck1vZHVsZSwgVHJhbnNsYXRlTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbTG9jYWxpemVSb3V0ZXJQaXBlXSxcbiAgZXhwb3J0czogW0xvY2FsaXplUm91dGVyUGlwZV1cbn0pXG5leHBvcnQgY2xhc3MgTG9jYWxpemVSb3V0ZXJNb2R1bGUge1xuXG4gIHN0YXRpYyBmb3JSb290KHJvdXRlczogUm91dGVzLCBjb25maWc6IExvY2FsaXplUm91dGVyQ29uZmlnID0ge30pOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IExvY2FsaXplUm91dGVyTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBMT0NBTElaRV9ST1VURVJfRk9SUk9PVF9HVUFSRCxcbiAgICAgICAgICB1c2VGYWN0b3J5OiBwcm92aWRlRm9yUm9vdEd1YXJkLFxuICAgICAgICAgIGRlcHM6IFtbTG9jYWxpemVSb3V0ZXJNb2R1bGUsIG5ldyBPcHRpb25hbCgpLCBuZXcgU2tpcFNlbGYoKV1dXG4gICAgICAgIH0sXG4gICAgICAgIHsgcHJvdmlkZTogVVNFX0NBQ0hFRF9MQU5HLCB1c2VWYWx1ZTogY29uZmlnLnVzZUNhY2hlZExhbmcgfSxcbiAgICAgICAgeyBwcm92aWRlOiBBTFdBWVNfU0VUX1BSRUZJWCwgdXNlVmFsdWU6IGNvbmZpZy5hbHdheXNTZXRQcmVmaXggfSxcbiAgICAgICAgeyBwcm92aWRlOiBDQUNIRV9OQU1FLCB1c2VWYWx1ZTogY29uZmlnLmNhY2hlTmFtZSB9LFxuICAgICAgICB7IHByb3ZpZGU6IENBQ0hFX01FQ0hBTklTTSwgdXNlVmFsdWU6IGNvbmZpZy5jYWNoZU1lY2hhbmlzbSB9LFxuICAgICAgICB7IHByb3ZpZGU6IERFRkFVTFRfTEFOR19GVU5DVElPTiwgdXNlVmFsdWU6IGNvbmZpZy5kZWZhdWx0TGFuZ0Z1bmN0aW9uIH0sXG4gICAgICAgIExvY2FsaXplUm91dGVyU2V0dGluZ3MsXG4gICAgICAgIGNvbmZpZy5wYXJzZXIgfHwgeyBwcm92aWRlOiBMb2NhbGl6ZVBhcnNlciwgdXNlQ2xhc3M6IER1bW15TG9jYWxpemVQYXJzZXIgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IFJBV19ST1VURVMsXG4gICAgICAgICAgbXVsdGk6IHRydWUsXG4gICAgICAgICAgdXNlVmFsdWU6IHJvdXRlc1xuICAgICAgICB9LFxuICAgICAgICBMb2NhbGl6ZVJvdXRlclNlcnZpY2UsXG4gICAgICAgIFBhcnNlckluaXRpYWxpemVyLFxuICAgICAgICB7IHByb3ZpZGU6IE5nTW9kdWxlRmFjdG9yeUxvYWRlciwgdXNlQ2xhc3M6IExvY2FsaXplUm91dGVyQ29uZmlnTG9hZGVyIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBBUFBfSU5JVElBTElaRVIsXG4gICAgICAgICAgbXVsdGk6IHRydWUsXG4gICAgICAgICAgdXNlRmFjdG9yeTogZ2V0QXBwSW5pdGlhbGl6ZXIsXG4gICAgICAgICAgZGVwczogW1BhcnNlckluaXRpYWxpemVyLCBMb2NhbGl6ZVBhcnNlciwgUkFXX1JPVVRFU11cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZm9yQ2hpbGQocm91dGVzOiBSb3V0ZXMpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IExvY2FsaXplUm91dGVyTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBSQVdfUk9VVEVTLFxuICAgICAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgICAgIHVzZVZhbHVlOiByb3V0ZXNcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH07XG4gIH1cbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZUZvclJvb3RHdWFyZChsb2NhbGl6ZVJvdXRlck1vZHVsZTogTG9jYWxpemVSb3V0ZXJNb2R1bGUpOiBzdHJpbmcge1xuICBpZiAobG9jYWxpemVSb3V0ZXJNb2R1bGUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgTG9jYWxpemVSb3V0ZXJNb2R1bGUuZm9yUm9vdCgpIGNhbGxlZCB0d2ljZS4gTGF6eSBsb2FkZWQgbW9kdWxlcyBzaG91bGQgdXNlIExvY2FsaXplUm91dGVyTW9kdWxlLmZvckNoaWxkKCkgaW5zdGVhZC5gKTtcbiAgfVxuICByZXR1cm4gJ2d1YXJkZWQnO1xufVxuIl19