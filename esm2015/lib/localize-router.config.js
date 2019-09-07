import { Inject, InjectionToken, Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Guard to make sure we have single initialization of forRoot
 * @type {InjectionToken<LocalizeRouterModule>}
 */
export const LOCALIZE_ROUTER_FORROOT_GUARD = new InjectionToken('LOCALIZE_ROUTER_FORROOT_GUARD');
/**
 * Static provider for keeping track of routes
 * @type {InjectionToken<Routes[]>}
 */
export const RAW_ROUTES = new InjectionToken('RAW_ROUTES');
/**
 * Namespace for fail proof access of CacheMechanism
 */
export var CacheMechanism;
(function (CacheMechanism) {
    CacheMechanism.LocalStorage = 'LocalStorage';
    CacheMechanism.Cookie = 'Cookie';
})(CacheMechanism || (CacheMechanism = {}));
/**
 * Boolean to indicate whether to use cached language value
 * @type {InjectionToken<boolean>}
 */
export const USE_CACHED_LANG = new InjectionToken('USE_CACHED_LANG');
/**
 * Cache mechanism type
 * @type {InjectionToken<CacheMechanism>}
 */
export const CACHE_MECHANISM = new InjectionToken('CACHE_MECHANISM');
/**
 * Cache name
 * @type {InjectionToken<string>}
 */
export const CACHE_NAME = new InjectionToken('CACHE_NAME');
/**
 * Function for calculating default language
 * @type {InjectionToken<DefaultLanguageFunction>}
 */
export const DEFAULT_LANG_FUNCTION = new InjectionToken('DEFAULT_LANG_FUNCTION');
/**
 * Boolean to indicate whether prefix should be set for single language scenarios
 * @type {InjectionToken<boolean>}
 */
export const ALWAYS_SET_PREFIX = new InjectionToken('ALWAYS_SET_PREFIX');
const LOCALIZE_CACHE_NAME = 'LOCALIZE_DEFAULT_LANGUAGE';
export class LocalizeRouterSettings {
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
/** @nocollapse */ LocalizeRouterSettings.ngInjectableDef = i0.ɵɵdefineInjectable({ token: LocalizeRouterSettings, factory: function LocalizeRouterSettings_Factory(t) { return new (t || LocalizeRouterSettings)(i0.ɵɵinject(USE_CACHED_LANG), i0.ɵɵinject(ALWAYS_SET_PREFIX), i0.ɵɵinject(CACHE_MECHANISM), i0.ɵɵinject(CACHE_NAME), i0.ɵɵinject(DEFAULT_LANG_FUNCTION)); }, providedIn: null });
/*@__PURE__*/ i0.ɵsetClassMetadata(LocalizeRouterSettings, [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxpemUtcm91dGVyLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xvY2FsaXplLXJvdXRlci8iLCJzb3VyY2VzIjpbImxpYi9sb2NhbGl6ZS1yb3V0ZXIuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFZLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFJN0U7OztHQUdHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sNkJBQTZCLEdBQUcsSUFBSSxjQUFjLENBQXVCLCtCQUErQixDQUFDLENBQUM7QUFFdkg7OztHQUdHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sVUFBVSxHQUE2QixJQUFJLGNBQWMsQ0FBVyxZQUFZLENBQUMsQ0FBQztBQU8vRjs7R0FFRztBQUNILE1BQU0sS0FBVyxjQUFjLENBRzlCO0FBSEQsV0FBaUIsY0FBYztJQUNoQiwyQkFBWSxHQUFtQixjQUFjLENBQUM7SUFDOUMscUJBQU0sR0FBbUIsUUFBUSxDQUFDO0FBQ2pELENBQUMsRUFIZ0IsY0FBYyxLQUFkLGNBQWMsUUFHOUI7QUFFRDs7O0dBR0c7QUFDSCxNQUFNLENBQUMsTUFBTSxlQUFlLEdBQUcsSUFBSSxjQUFjLENBQVUsaUJBQWlCLENBQUMsQ0FBQztBQUM5RTs7O0dBR0c7QUFDSCxNQUFNLENBQUMsTUFBTSxlQUFlLEdBQUcsSUFBSSxjQUFjLENBQWlCLGlCQUFpQixDQUFDLENBQUM7QUFDckY7OztHQUdHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sVUFBVSxHQUFHLElBQUksY0FBYyxDQUFTLFlBQVksQ0FBQyxDQUFDO0FBUW5FOzs7R0FHRztBQUNILE1BQU0sQ0FBQyxNQUFNLHFCQUFxQixHQUFHLElBQUksY0FBYyxDQUEwQix1QkFBdUIsQ0FBQyxDQUFDO0FBRTFHOzs7R0FHRztBQUNILE1BQU0sQ0FBQyxNQUFNLGlCQUFpQixHQUFHLElBQUksY0FBYyxDQUFVLG1CQUFtQixDQUFDLENBQUM7QUFjbEYsTUFBTSxtQkFBbUIsR0FBRywyQkFBMkIsQ0FBQztBQUd4RCxNQUFNLE9BQU8sc0JBQXNCO0lBQ2pDOzs7Ozs7O09BT0c7SUFDSCxZQUNrQyxnQkFBeUIsSUFBSSxFQUMzQixrQkFBMkIsSUFBSSxFQUNqQyxpQkFBaUMsY0FBYyxDQUFDLFlBQVksRUFDakUsWUFBb0IsbUJBQW1CLEVBQzVCLHNCQUErQyxLQUFLLENBQUM7UUFKM0Qsa0JBQWEsR0FBYixhQUFhLENBQWdCO1FBQzNCLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQUNqQyxtQkFBYyxHQUFkLGNBQWMsQ0FBOEM7UUFDakUsY0FBUyxHQUFULFNBQVMsQ0FBOEI7UUFDNUIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFrQztJQUU3RixDQUFDOzt3RUFoQlUsc0JBQXNCLHlFQUF0QixzQkFBc0IsY0FVdkIsZUFBZSxlQUNmLGlCQUFpQixlQUNqQixlQUFlLGVBQ2YsVUFBVSxlQUNWLHFCQUFxQjttQ0FkcEIsc0JBQXNCO2NBRGxDLFVBQVU7O3NCQVdOLE1BQU07dUJBQUMsZUFBZTs7c0JBQ3RCLE1BQU07dUJBQUMsaUJBQWlCOzBCQUN1QixjQUFjO3NCQUE3RCxNQUFNO3VCQUFDLGVBQWU7O3NCQUN0QixNQUFNO3VCQUFDLFVBQVU7O3NCQUNqQixNQUFNO3VCQUFDLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0aW9uVG9rZW4sIFByb3ZpZGVyLCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgTG9jYWxpemVSb3V0ZXJNb2R1bGUgfSBmcm9tICcuL2xvY2FsaXplLXJvdXRlci5tb2R1bGUnO1xuXG4vKipcbiAqIEd1YXJkIHRvIG1ha2Ugc3VyZSB3ZSBoYXZlIHNpbmdsZSBpbml0aWFsaXphdGlvbiBvZiBmb3JSb290XG4gKiBAdHlwZSB7SW5qZWN0aW9uVG9rZW48TG9jYWxpemVSb3V0ZXJNb2R1bGU+fVxuICovXG5leHBvcnQgY29uc3QgTE9DQUxJWkVfUk9VVEVSX0ZPUlJPT1RfR1VBUkQgPSBuZXcgSW5qZWN0aW9uVG9rZW48TG9jYWxpemVSb3V0ZXJNb2R1bGU+KCdMT0NBTElaRV9ST1VURVJfRk9SUk9PVF9HVUFSRCcpO1xuXG4vKipcbiAqIFN0YXRpYyBwcm92aWRlciBmb3Iga2VlcGluZyB0cmFjayBvZiByb3V0ZXNcbiAqIEB0eXBlIHtJbmplY3Rpb25Ub2tlbjxSb3V0ZXNbXT59XG4gKi9cbmV4cG9ydCBjb25zdCBSQVdfUk9VVEVTOiBJbmplY3Rpb25Ub2tlbjxSb3V0ZXNbXT4gPSBuZXcgSW5qZWN0aW9uVG9rZW48Um91dGVzW10+KCdSQVdfUk9VVEVTJyk7XG5cbi8qKlxuICogVHlwZSBmb3IgQ2FjaGluZyBvZiBkZWZhdWx0IGxhbmd1YWdlXG4gKi9cbmV4cG9ydCB0eXBlIENhY2hlTWVjaGFuaXNtID0gJ0xvY2FsU3RvcmFnZScgfCAnQ29va2llJztcblxuLyoqXG4gKiBOYW1lc3BhY2UgZm9yIGZhaWwgcHJvb2YgYWNjZXNzIG9mIENhY2hlTWVjaGFuaXNtXG4gKi9cbmV4cG9ydCBuYW1lc3BhY2UgQ2FjaGVNZWNoYW5pc20ge1xuICBleHBvcnQgY29uc3QgTG9jYWxTdG9yYWdlOiBDYWNoZU1lY2hhbmlzbSA9ICdMb2NhbFN0b3JhZ2UnO1xuICBleHBvcnQgY29uc3QgQ29va2llOiBDYWNoZU1lY2hhbmlzbSA9ICdDb29raWUnO1xufVxuXG4vKipcbiAqIEJvb2xlYW4gdG8gaW5kaWNhdGUgd2hldGhlciB0byB1c2UgY2FjaGVkIGxhbmd1YWdlIHZhbHVlXG4gKiBAdHlwZSB7SW5qZWN0aW9uVG9rZW48Ym9vbGVhbj59XG4gKi9cbmV4cG9ydCBjb25zdCBVU0VfQ0FDSEVEX0xBTkcgPSBuZXcgSW5qZWN0aW9uVG9rZW48Ym9vbGVhbj4oJ1VTRV9DQUNIRURfTEFORycpO1xuLyoqXG4gKiBDYWNoZSBtZWNoYW5pc20gdHlwZVxuICogQHR5cGUge0luamVjdGlvblRva2VuPENhY2hlTWVjaGFuaXNtPn1cbiAqL1xuZXhwb3J0IGNvbnN0IENBQ0hFX01FQ0hBTklTTSA9IG5ldyBJbmplY3Rpb25Ub2tlbjxDYWNoZU1lY2hhbmlzbT4oJ0NBQ0hFX01FQ0hBTklTTScpO1xuLyoqXG4gKiBDYWNoZSBuYW1lXG4gKiBAdHlwZSB7SW5qZWN0aW9uVG9rZW48c3RyaW5nPn1cbiAqL1xuZXhwb3J0IGNvbnN0IENBQ0hFX05BTUUgPSBuZXcgSW5qZWN0aW9uVG9rZW48c3RyaW5nPignQ0FDSEVfTkFNRScpO1xuXG4vKipcbiAqIFR5cGUgZm9yIGRlZmF1bHQgbGFuZ3VhZ2UgZnVuY3Rpb25cbiAqIFVzZWQgdG8gb3ZlcnJpZGUgYmFzaWMgYmVoYXZpb3VyXG4gKi9cbmV4cG9ydCB0eXBlIERlZmF1bHRMYW5ndWFnZUZ1bmN0aW9uID0gKGxhbmd1YWdlczogc3RyaW5nW10sIGNhY2hlZExhbmc/OiBzdHJpbmcsIGJyb3dzZXJMYW5nPzogc3RyaW5nKSA9PiBzdHJpbmc7XG5cbi8qKlxuICogRnVuY3Rpb24gZm9yIGNhbGN1bGF0aW5nIGRlZmF1bHQgbGFuZ3VhZ2VcbiAqIEB0eXBlIHtJbmplY3Rpb25Ub2tlbjxEZWZhdWx0TGFuZ3VhZ2VGdW5jdGlvbj59XG4gKi9cbmV4cG9ydCBjb25zdCBERUZBVUxUX0xBTkdfRlVOQ1RJT04gPSBuZXcgSW5qZWN0aW9uVG9rZW48RGVmYXVsdExhbmd1YWdlRnVuY3Rpb24+KCdERUZBVUxUX0xBTkdfRlVOQ1RJT04nKTtcblxuLyoqXG4gKiBCb29sZWFuIHRvIGluZGljYXRlIHdoZXRoZXIgcHJlZml4IHNob3VsZCBiZSBzZXQgZm9yIHNpbmdsZSBsYW5ndWFnZSBzY2VuYXJpb3NcbiAqIEB0eXBlIHtJbmplY3Rpb25Ub2tlbjxib29sZWFuPn1cbiAqL1xuZXhwb3J0IGNvbnN0IEFMV0FZU19TRVRfUFJFRklYID0gbmV3IEluamVjdGlvblRva2VuPGJvb2xlYW4+KCdBTFdBWVNfU0VUX1BSRUZJWCcpO1xuXG4vKipcbiAqIENvbmZpZyBpbnRlcmZhY2UgZm9yIExvY2FsaXplUm91dGVyXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTG9jYWxpemVSb3V0ZXJDb25maWcge1xuICBwYXJzZXI/OiBQcm92aWRlcjtcbiAgdXNlQ2FjaGVkTGFuZz86IGJvb2xlYW47XG4gIGNhY2hlTWVjaGFuaXNtPzogQ2FjaGVNZWNoYW5pc207XG4gIGNhY2hlTmFtZT86IHN0cmluZztcbiAgZGVmYXVsdExhbmdGdW5jdGlvbj86IERlZmF1bHRMYW5ndWFnZUZ1bmN0aW9uO1xuICBhbHdheXNTZXRQcmVmaXg/OiBib29sZWFuO1xufVxuXG5jb25zdCBMT0NBTElaRV9DQUNIRV9OQU1FID0gJ0xPQ0FMSVpFX0RFRkFVTFRfTEFOR1VBR0UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTG9jYWxpemVSb3V0ZXJTZXR0aW5ncyBpbXBsZW1lbnRzIExvY2FsaXplUm91dGVyQ29uZmlnIHtcbiAgLyoqXG4gICAqIFNldHRpbmdzIGZvciBsb2NhbGl6ZSByb3V0ZXJcbiAgICogQHBhcmFtIHtib29sZWFufSB1c2VDYWNoZWRMYW5nXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gYWx3YXlzU2V0UHJlZml4XG4gICAqIEBwYXJhbSB7Q2FjaGVNZWNoYW5pc219IGNhY2hlTWVjaGFuaXNtXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjYWNoZU5hbWVcbiAgICogQHBhcmFtIHtEZWZhdWx0TGFuZ3VhZ2VGdW5jdGlvbn0gZGVmYXVsdExhbmdGdW5jdGlvblxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChVU0VfQ0FDSEVEX0xBTkcpIHB1YmxpYyB1c2VDYWNoZWRMYW5nOiBib29sZWFuID0gdHJ1ZSxcbiAgICBASW5qZWN0KEFMV0FZU19TRVRfUFJFRklYKSBwdWJsaWMgYWx3YXlzU2V0UHJlZml4OiBib29sZWFuID0gdHJ1ZSxcbiAgICBASW5qZWN0KENBQ0hFX01FQ0hBTklTTSkgcHVibGljIGNhY2hlTWVjaGFuaXNtOiBDYWNoZU1lY2hhbmlzbSA9IENhY2hlTWVjaGFuaXNtLkxvY2FsU3RvcmFnZSxcbiAgICBASW5qZWN0KENBQ0hFX05BTUUpIHB1YmxpYyBjYWNoZU5hbWU6IHN0cmluZyA9IExPQ0FMSVpFX0NBQ0hFX05BTUUsXG4gICAgQEluamVjdChERUZBVUxUX0xBTkdfRlVOQ1RJT04pIHB1YmxpYyBkZWZhdWx0TGFuZ0Z1bmN0aW9uOiBEZWZhdWx0TGFuZ3VhZ2VGdW5jdGlvbiA9IHZvaWQgMFxuICApIHtcbiAgfVxufVxuIl19