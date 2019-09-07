/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, InjectionToken, Injectable } from '@angular/core';
/** @type {?} */
export const LOCALIZE_ROUTER_FORROOT_GUARD = new InjectionToken('LOCALIZE_ROUTER_FORROOT_GUARD');
/** @type {?} */
export const RAW_ROUTES = new InjectionToken('RAW_ROUTES');
/** @enum {string} */
const CacheMechanismEnum = {
    LocalStorage: 'LocalStorage',
    Cookie: 'Cookie',
};
export { CacheMechanismEnum };
/**
 * Namespace for fail proof access of CacheMechanism
 * @type {?}
 */
export const USE_CACHED_LANG = new InjectionToken('USE_CACHED_LANG');
/** @type {?} */
export const CACHE_MECHANISM = new InjectionToken('CACHE_MECHANISM');
/** @type {?} */
export const CACHE_NAME = new InjectionToken('CACHE_NAME');
/** @type {?} */
export const DEFAULT_LANG_FUNCTION = new InjectionToken('DEFAULT_LANG_FUNCTION');
/** @type {?} */
export const ALWAYS_SET_PREFIX = new InjectionToken('ALWAYS_SET_PREFIX');
/**
 * Config interface for LocalizeRouter
 * @record
 */
export function LocalizeRouterConfig() { }
if (false) {
    /** @type {?|undefined} */
    LocalizeRouterConfig.prototype.parser;
    /** @type {?|undefined} */
    LocalizeRouterConfig.prototype.useCachedLang;
    /** @type {?|undefined} */
    LocalizeRouterConfig.prototype.cacheMechanism;
    /** @type {?|undefined} */
    LocalizeRouterConfig.prototype.cacheName;
    /** @type {?|undefined} */
    LocalizeRouterConfig.prototype.defaultLangFunction;
    /** @type {?|undefined} */
    LocalizeRouterConfig.prototype.alwaysSetPrefix;
}
/** @type {?} */
const LOCALIZE_CACHE_NAME = 'LOCALIZE_DEFAULT_LANGUAGE';
export class LocalizeRouterSettings {
    /**
     * @param {?=} useCachedLang
     * @param {?=} alwaysSetPrefix
     * @param {?=} cacheMechanism
     * @param {?=} cacheName
     * @param {?=} defaultLangFunction
     */
    constructor(useCachedLang = true, alwaysSetPrefix = true, cacheMechanism = CacheMechanismEnum.LocalStorage, cacheName = LOCALIZE_CACHE_NAME, defaultLangFunction = void 0) {
        this.useCachedLang = useCachedLang;
        this.alwaysSetPrefix = alwaysSetPrefix;
        this.cacheMechanism = cacheMechanism;
        this.cacheName = cacheName;
        this.defaultLangFunction = defaultLangFunction;
    }
}
LocalizeRouterSettings.decorators = [
    { type: Injectable }
];
/** @nocollapse */
LocalizeRouterSettings.ctorParameters = () => [
    { type: Boolean, decorators: [{ type: Inject, args: [USE_CACHED_LANG,] }] },
    { type: Boolean, decorators: [{ type: Inject, args: [ALWAYS_SET_PREFIX,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [CACHE_MECHANISM,] }] },
    { type: String, decorators: [{ type: Inject, args: [CACHE_NAME,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [DEFAULT_LANG_FUNCTION,] }] }
];
if (false) {
    /** @type {?} */
    LocalizeRouterSettings.prototype.useCachedLang;
    /** @type {?} */
    LocalizeRouterSettings.prototype.alwaysSetPrefix;
    /** @type {?} */
    LocalizeRouterSettings.prototype.cacheMechanism;
    /** @type {?} */
    LocalizeRouterSettings.prototype.cacheName;
    /** @type {?} */
    LocalizeRouterSettings.prototype.defaultLangFunction;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxpemUtcm91dGVyLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xvY2FsaXplLXJvdXRlci8iLCJzb3VyY2VzIjpbImxpYi9sb2NhbGl6ZS1yb3V0ZXIuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBWSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBSzdFLE1BQU0sT0FBTyw2QkFBNkIsR0FBRyxJQUFJLGNBQWMsQ0FBdUIsK0JBQStCLENBQUM7O0FBR3RILE1BQU0sT0FBTyxVQUFVLEdBQTZCLElBQUksY0FBYyxDQUFXLFlBQVksQ0FBQzs7O0lBTzVGLGNBQWUsY0FBYztJQUM3QixRQUFTLFFBQVE7Ozs7Ozs7QUFXbkIsTUFBTSxPQUFPLGVBQWUsR0FBRyxJQUFJLGNBQWMsQ0FBVSxpQkFBaUIsQ0FBQzs7QUFFN0UsTUFBTSxPQUFPLGVBQWUsR0FBRyxJQUFJLGNBQWMsQ0FBaUIsaUJBQWlCLENBQUM7O0FBRXBGLE1BQU0sT0FBTyxVQUFVLEdBQUcsSUFBSSxjQUFjLENBQVMsWUFBWSxDQUFDOztBQU1sRSxNQUFNLE9BQU8scUJBQXFCLEdBQUcsSUFBSSxjQUFjLENBQTBCLHVCQUF1QixDQUFDOztBQUd6RyxNQUFNLE9BQU8saUJBQWlCLEdBQUcsSUFBSSxjQUFjLENBQVUsbUJBQW1CLENBQUM7Ozs7O0FBS2pGLDBDQU9DOzs7SUFOQyxzQ0FBa0I7O0lBQ2xCLDZDQUF3Qjs7SUFDeEIsOENBQWdDOztJQUNoQyx5Q0FBbUI7O0lBQ25CLG1EQUE4Qzs7SUFDOUMsK0NBQTBCOzs7TUFHdEIsbUJBQW1CLEdBQUcsMkJBQTJCO0FBR3ZELE1BQU0sT0FBTyxzQkFBc0I7Ozs7Ozs7O0lBRWpDLFlBQ2tDLGdCQUF5QixJQUFJLEVBQzNCLGtCQUEyQixJQUFJLEVBQ2pDLGlCQUFzQixrQkFBa0IsQ0FBQyxZQUFZLEVBQzFELFlBQW9CLG1CQUFtQixFQUM1QixzQkFBMkIsS0FBSyxDQUFDO1FBSnZDLGtCQUFhLEdBQWIsYUFBYSxDQUFnQjtRQUMzQixvQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7UUFDakMsbUJBQWMsR0FBZCxjQUFjLENBQXVDO1FBQzFELGNBQVMsR0FBVCxTQUFTLENBQThCO1FBQzVCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBYztJQUV6RSxDQUFDOzs7WUFWRixVQUFVOzs7OzBDQUlOLE1BQU0sU0FBQyxlQUFlOzBDQUN0QixNQUFNLFNBQUMsaUJBQWlCOzRDQUN4QixNQUFNLFNBQUMsZUFBZTt5Q0FDdEIsTUFBTSxTQUFDLFVBQVU7NENBQ2pCLE1BQU0sU0FBQyxxQkFBcUI7Ozs7SUFKN0IsK0NBQTZEOztJQUM3RCxpREFBaUU7O0lBQ2pFLGdEQUFxRjs7SUFDckYsMkNBQWtFOztJQUNsRSxxREFBdUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGlvblRva2VuLCBQcm92aWRlciwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVzIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IExvY2FsaXplUm91dGVyTW9kdWxlIH0gZnJvbSAnLi9sb2NhbGl6ZS1yb3V0ZXIubW9kdWxlJztcblxuXG5leHBvcnQgY29uc3QgTE9DQUxJWkVfUk9VVEVSX0ZPUlJPT1RfR1VBUkQgPSBuZXcgSW5qZWN0aW9uVG9rZW48TG9jYWxpemVSb3V0ZXJNb2R1bGU+KCdMT0NBTElaRV9ST1VURVJfRk9SUk9PVF9HVUFSRCcpO1xuXG5cbmV4cG9ydCBjb25zdCBSQVdfUk9VVEVTOiBJbmplY3Rpb25Ub2tlbjxSb3V0ZXNbXT4gPSBuZXcgSW5qZWN0aW9uVG9rZW48Um91dGVzW10+KCdSQVdfUk9VVEVTJyk7XG5cbi8qKlxuICogVHlwZSBmb3IgQ2FjaGluZyBvZiBkZWZhdWx0IGxhbmd1YWdlXG4gKi9cblxuIGV4cG9ydCBlbnVtIENhY2hlTWVjaGFuaXNtRW51bSB7XG4gIExvY2FsU3RvcmFnZSA9ICdMb2NhbFN0b3JhZ2UnLFxuICBDb29raWUgPSAnQ29va2llJ1xuIH1cblxuXG5leHBvcnQgdHlwZSBDYWNoZU1lY2hhbmlzbSA9ICdMb2NhbFN0b3JhZ2UnIHwgJ0Nvb2tpZSc7XG5cbi8qKlxuICogTmFtZXNwYWNlIGZvciBmYWlsIHByb29mIGFjY2VzcyBvZiBDYWNoZU1lY2hhbmlzbVxuICovXG5cblxuZXhwb3J0IGNvbnN0IFVTRV9DQUNIRURfTEFORyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxib29sZWFuPignVVNFX0NBQ0hFRF9MQU5HJyk7XG5cbmV4cG9ydCBjb25zdCBDQUNIRV9NRUNIQU5JU00gPSBuZXcgSW5qZWN0aW9uVG9rZW48Q2FjaGVNZWNoYW5pc20+KCdDQUNIRV9NRUNIQU5JU00nKTtcblxuZXhwb3J0IGNvbnN0IENBQ0hFX05BTUUgPSBuZXcgSW5qZWN0aW9uVG9rZW48c3RyaW5nPignQ0FDSEVfTkFNRScpO1xuXG5cbmV4cG9ydCB0eXBlIERlZmF1bHRMYW5ndWFnZUZ1bmN0aW9uID0gKGxhbmd1YWdlczogc3RyaW5nW10sIGNhY2hlZExhbmc/OiBzdHJpbmcsIGJyb3dzZXJMYW5nPzogc3RyaW5nKSA9PiBzdHJpbmc7XG5cblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfTEFOR19GVU5DVElPTiA9IG5ldyBJbmplY3Rpb25Ub2tlbjxEZWZhdWx0TGFuZ3VhZ2VGdW5jdGlvbj4oJ0RFRkFVTFRfTEFOR19GVU5DVElPTicpO1xuXG5cbmV4cG9ydCBjb25zdCBBTFdBWVNfU0VUX1BSRUZJWCA9IG5ldyBJbmplY3Rpb25Ub2tlbjxib29sZWFuPignQUxXQVlTX1NFVF9QUkVGSVgnKTtcblxuLyoqXG4gKiBDb25maWcgaW50ZXJmYWNlIGZvciBMb2NhbGl6ZVJvdXRlclxuICovXG5leHBvcnQgaW50ZXJmYWNlIExvY2FsaXplUm91dGVyQ29uZmlnIHtcbiAgcGFyc2VyPzogUHJvdmlkZXI7XG4gIHVzZUNhY2hlZExhbmc/OiBib29sZWFuO1xuICBjYWNoZU1lY2hhbmlzbT86IENhY2hlTWVjaGFuaXNtO1xuICBjYWNoZU5hbWU/OiBzdHJpbmc7XG4gIGRlZmF1bHRMYW5nRnVuY3Rpb24/OiBEZWZhdWx0TGFuZ3VhZ2VGdW5jdGlvbjtcbiAgYWx3YXlzU2V0UHJlZml4PzogYm9vbGVhbjtcbn1cblxuY29uc3QgTE9DQUxJWkVfQ0FDSEVfTkFNRSA9ICdMT0NBTElaRV9ERUZBVUxUX0xBTkdVQUdFJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIExvY2FsaXplUm91dGVyU2V0dGluZ3MgaW1wbGVtZW50cyBMb2NhbGl6ZVJvdXRlckNvbmZpZyB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChVU0VfQ0FDSEVEX0xBTkcpIHB1YmxpYyB1c2VDYWNoZWRMYW5nOiBib29sZWFuID0gdHJ1ZSxcbiAgICBASW5qZWN0KEFMV0FZU19TRVRfUFJFRklYKSBwdWJsaWMgYWx3YXlzU2V0UHJlZml4OiBib29sZWFuID0gdHJ1ZSxcbiAgICBASW5qZWN0KENBQ0hFX01FQ0hBTklTTSkgcHVibGljIGNhY2hlTWVjaGFuaXNtOiBhbnkgPSBDYWNoZU1lY2hhbmlzbUVudW0uTG9jYWxTdG9yYWdlLFxuICAgIEBJbmplY3QoQ0FDSEVfTkFNRSkgcHVibGljIGNhY2hlTmFtZTogc3RyaW5nID0gTE9DQUxJWkVfQ0FDSEVfTkFNRSxcbiAgICBASW5qZWN0KERFRkFVTFRfTEFOR19GVU5DVElPTikgcHVibGljIGRlZmF1bHRMYW5nRnVuY3Rpb246IGFueSA9IHZvaWQgMFxuICApIHtcbiAgfVxufVxuIl19