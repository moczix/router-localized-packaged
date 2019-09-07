/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, InjectionToken, Injectable } from '@angular/core';
/** @type {?} */
export var LOCALIZE_ROUTER_FORROOT_GUARD = new InjectionToken('LOCALIZE_ROUTER_FORROOT_GUARD');
/** @type {?} */
export var RAW_ROUTES = new InjectionToken('RAW_ROUTES');
/** @enum {string} */
var CacheMechanismEnum = {
    LocalStorage: 'LocalStorage',
    Cookie: 'Cookie',
};
export { CacheMechanismEnum };
/**
 * Namespace for fail proof access of CacheMechanism
 * @type {?}
 */
export var USE_CACHED_LANG = new InjectionToken('USE_CACHED_LANG');
/** @type {?} */
export var CACHE_MECHANISM = new InjectionToken('CACHE_MECHANISM');
/** @type {?} */
export var CACHE_NAME = new InjectionToken('CACHE_NAME');
/** @type {?} */
export var DEFAULT_LANG_FUNCTION = new InjectionToken('DEFAULT_LANG_FUNCTION');
/** @type {?} */
export var ALWAYS_SET_PREFIX = new InjectionToken('ALWAYS_SET_PREFIX');
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
var LOCALIZE_CACHE_NAME = 'LOCALIZE_DEFAULT_LANGUAGE';
var LocalizeRouterSettings = /** @class */ (function () {
    function LocalizeRouterSettings(useCachedLang, alwaysSetPrefix, cacheMechanism, cacheName, defaultLangFunction) {
        if (useCachedLang === void 0) { useCachedLang = true; }
        if (alwaysSetPrefix === void 0) { alwaysSetPrefix = true; }
        if (cacheMechanism === void 0) { cacheMechanism = CacheMechanismEnum.LocalStorage; }
        if (cacheName === void 0) { cacheName = LOCALIZE_CACHE_NAME; }
        if (defaultLangFunction === void 0) { defaultLangFunction = void 0; }
        this.useCachedLang = useCachedLang;
        this.alwaysSetPrefix = alwaysSetPrefix;
        this.cacheMechanism = cacheMechanism;
        this.cacheName = cacheName;
        this.defaultLangFunction = defaultLangFunction;
    }
    LocalizeRouterSettings.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    LocalizeRouterSettings.ctorParameters = function () { return [
        { type: Boolean, decorators: [{ type: Inject, args: [USE_CACHED_LANG,] }] },
        { type: Boolean, decorators: [{ type: Inject, args: [ALWAYS_SET_PREFIX,] }] },
        { type: undefined, decorators: [{ type: Inject, args: [CACHE_MECHANISM,] }] },
        { type: String, decorators: [{ type: Inject, args: [CACHE_NAME,] }] },
        { type: undefined, decorators: [{ type: Inject, args: [DEFAULT_LANG_FUNCTION,] }] }
    ]; };
    return LocalizeRouterSettings;
}());
export { LocalizeRouterSettings };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxpemUtcm91dGVyLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xvY2FsaXplLXJvdXRlci8iLCJzb3VyY2VzIjpbImxpYi9sb2NhbGl6ZS1yb3V0ZXIuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBWSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBSzdFLE1BQU0sS0FBTyw2QkFBNkIsR0FBRyxJQUFJLGNBQWMsQ0FBdUIsK0JBQStCLENBQUM7O0FBR3RILE1BQU0sS0FBTyxVQUFVLEdBQTZCLElBQUksY0FBYyxDQUFXLFlBQVksQ0FBQzs7O0lBTzVGLGNBQWUsY0FBYztJQUM3QixRQUFTLFFBQVE7Ozs7Ozs7QUFXbkIsTUFBTSxLQUFPLGVBQWUsR0FBRyxJQUFJLGNBQWMsQ0FBVSxpQkFBaUIsQ0FBQzs7QUFFN0UsTUFBTSxLQUFPLGVBQWUsR0FBRyxJQUFJLGNBQWMsQ0FBaUIsaUJBQWlCLENBQUM7O0FBRXBGLE1BQU0sS0FBTyxVQUFVLEdBQUcsSUFBSSxjQUFjLENBQVMsWUFBWSxDQUFDOztBQU1sRSxNQUFNLEtBQU8scUJBQXFCLEdBQUcsSUFBSSxjQUFjLENBQTBCLHVCQUF1QixDQUFDOztBQUd6RyxNQUFNLEtBQU8saUJBQWlCLEdBQUcsSUFBSSxjQUFjLENBQVUsbUJBQW1CLENBQUM7Ozs7O0FBS2pGLDBDQU9DOzs7SUFOQyxzQ0FBa0I7O0lBQ2xCLDZDQUF3Qjs7SUFDeEIsOENBQWdDOztJQUNoQyx5Q0FBbUI7O0lBQ25CLG1EQUE4Qzs7SUFDOUMsK0NBQTBCOzs7SUFHdEIsbUJBQW1CLEdBQUcsMkJBQTJCO0FBRXZEO0lBR0UsZ0NBQ2tDLGFBQTZCLEVBQzNCLGVBQStCLEVBQ2pDLGNBQXFELEVBQzFELFNBQXVDLEVBQzVCLG1CQUFpQztRQUp2Qyw4QkFBQSxFQUFBLG9CQUE2QjtRQUMzQixnQ0FBQSxFQUFBLHNCQUErQjtRQUNqQywrQkFBQSxFQUFBLGlCQUFzQixrQkFBa0IsQ0FBQyxZQUFZO1FBQzFELDBCQUFBLEVBQUEsK0JBQXVDO1FBQzVCLG9DQUFBLEVBQUEsMkJBQWdDLENBQUM7UUFKdkMsa0JBQWEsR0FBYixhQUFhLENBQWdCO1FBQzNCLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQUNqQyxtQkFBYyxHQUFkLGNBQWMsQ0FBdUM7UUFDMUQsY0FBUyxHQUFULFNBQVMsQ0FBOEI7UUFDNUIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFjO0lBRXpFLENBQUM7O2dCQVZGLFVBQVU7Ozs7OENBSU4sTUFBTSxTQUFDLGVBQWU7OENBQ3RCLE1BQU0sU0FBQyxpQkFBaUI7Z0RBQ3hCLE1BQU0sU0FBQyxlQUFlOzZDQUN0QixNQUFNLFNBQUMsVUFBVTtnREFDakIsTUFBTSxTQUFDLHFCQUFxQjs7SUFHakMsNkJBQUM7Q0FBQSxBQVhELElBV0M7U0FWWSxzQkFBc0I7OztJQUcvQiwrQ0FBNkQ7O0lBQzdELGlEQUFpRTs7SUFDakUsZ0RBQXFGOztJQUNyRiwyQ0FBa0U7O0lBQ2xFLHFEQUF1RSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0aW9uVG9rZW4sIFByb3ZpZGVyLCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgTG9jYWxpemVSb3V0ZXJNb2R1bGUgfSBmcm9tICcuL2xvY2FsaXplLXJvdXRlci5tb2R1bGUnO1xuXG5cbmV4cG9ydCBjb25zdCBMT0NBTElaRV9ST1VURVJfRk9SUk9PVF9HVUFSRCA9IG5ldyBJbmplY3Rpb25Ub2tlbjxMb2NhbGl6ZVJvdXRlck1vZHVsZT4oJ0xPQ0FMSVpFX1JPVVRFUl9GT1JST09UX0dVQVJEJyk7XG5cblxuZXhwb3J0IGNvbnN0IFJBV19ST1VURVM6IEluamVjdGlvblRva2VuPFJvdXRlc1tdPiA9IG5ldyBJbmplY3Rpb25Ub2tlbjxSb3V0ZXNbXT4oJ1JBV19ST1VURVMnKTtcblxuLyoqXG4gKiBUeXBlIGZvciBDYWNoaW5nIG9mIGRlZmF1bHQgbGFuZ3VhZ2VcbiAqL1xuXG4gZXhwb3J0IGVudW0gQ2FjaGVNZWNoYW5pc21FbnVtIHtcbiAgTG9jYWxTdG9yYWdlID0gJ0xvY2FsU3RvcmFnZScsXG4gIENvb2tpZSA9ICdDb29raWUnXG4gfVxuXG5cbmV4cG9ydCB0eXBlIENhY2hlTWVjaGFuaXNtID0gJ0xvY2FsU3RvcmFnZScgfCAnQ29va2llJztcblxuLyoqXG4gKiBOYW1lc3BhY2UgZm9yIGZhaWwgcHJvb2YgYWNjZXNzIG9mIENhY2hlTWVjaGFuaXNtXG4gKi9cblxuXG5leHBvcnQgY29uc3QgVVNFX0NBQ0hFRF9MQU5HID0gbmV3IEluamVjdGlvblRva2VuPGJvb2xlYW4+KCdVU0VfQ0FDSEVEX0xBTkcnKTtcblxuZXhwb3J0IGNvbnN0IENBQ0hFX01FQ0hBTklTTSA9IG5ldyBJbmplY3Rpb25Ub2tlbjxDYWNoZU1lY2hhbmlzbT4oJ0NBQ0hFX01FQ0hBTklTTScpO1xuXG5leHBvcnQgY29uc3QgQ0FDSEVfTkFNRSA9IG5ldyBJbmplY3Rpb25Ub2tlbjxzdHJpbmc+KCdDQUNIRV9OQU1FJyk7XG5cblxuZXhwb3J0IHR5cGUgRGVmYXVsdExhbmd1YWdlRnVuY3Rpb24gPSAobGFuZ3VhZ2VzOiBzdHJpbmdbXSwgY2FjaGVkTGFuZz86IHN0cmluZywgYnJvd3Nlckxhbmc/OiBzdHJpbmcpID0+IHN0cmluZztcblxuXG5leHBvcnQgY29uc3QgREVGQVVMVF9MQU5HX0ZVTkNUSU9OID0gbmV3IEluamVjdGlvblRva2VuPERlZmF1bHRMYW5ndWFnZUZ1bmN0aW9uPignREVGQVVMVF9MQU5HX0ZVTkNUSU9OJyk7XG5cblxuZXhwb3J0IGNvbnN0IEFMV0FZU19TRVRfUFJFRklYID0gbmV3IEluamVjdGlvblRva2VuPGJvb2xlYW4+KCdBTFdBWVNfU0VUX1BSRUZJWCcpO1xuXG4vKipcbiAqIENvbmZpZyBpbnRlcmZhY2UgZm9yIExvY2FsaXplUm91dGVyXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTG9jYWxpemVSb3V0ZXJDb25maWcge1xuICBwYXJzZXI/OiBQcm92aWRlcjtcbiAgdXNlQ2FjaGVkTGFuZz86IGJvb2xlYW47XG4gIGNhY2hlTWVjaGFuaXNtPzogQ2FjaGVNZWNoYW5pc207XG4gIGNhY2hlTmFtZT86IHN0cmluZztcbiAgZGVmYXVsdExhbmdGdW5jdGlvbj86IERlZmF1bHRMYW5ndWFnZUZ1bmN0aW9uO1xuICBhbHdheXNTZXRQcmVmaXg/OiBib29sZWFuO1xufVxuXG5jb25zdCBMT0NBTElaRV9DQUNIRV9OQU1FID0gJ0xPQ0FMSVpFX0RFRkFVTFRfTEFOR1VBR0UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTG9jYWxpemVSb3V0ZXJTZXR0aW5ncyBpbXBsZW1lbnRzIExvY2FsaXplUm91dGVyQ29uZmlnIHtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KFVTRV9DQUNIRURfTEFORykgcHVibGljIHVzZUNhY2hlZExhbmc6IGJvb2xlYW4gPSB0cnVlLFxuICAgIEBJbmplY3QoQUxXQVlTX1NFVF9QUkVGSVgpIHB1YmxpYyBhbHdheXNTZXRQcmVmaXg6IGJvb2xlYW4gPSB0cnVlLFxuICAgIEBJbmplY3QoQ0FDSEVfTUVDSEFOSVNNKSBwdWJsaWMgY2FjaGVNZWNoYW5pc206IGFueSA9IENhY2hlTWVjaGFuaXNtRW51bS5Mb2NhbFN0b3JhZ2UsXG4gICAgQEluamVjdChDQUNIRV9OQU1FKSBwdWJsaWMgY2FjaGVOYW1lOiBzdHJpbmcgPSBMT0NBTElaRV9DQUNIRV9OQU1FLFxuICAgIEBJbmplY3QoREVGQVVMVF9MQU5HX0ZVTkNUSU9OKSBwdWJsaWMgZGVmYXVsdExhbmdGdW5jdGlvbjogYW55ID0gdm9pZCAwXG4gICkge1xuICB9XG59XG4iXX0=