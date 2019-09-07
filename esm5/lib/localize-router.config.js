import { Inject, InjectionToken, Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Guard to make sure we have single initialization of forRoot
 * @type {InjectionToken<LocalizeRouterModule>}
 */
export var LOCALIZE_ROUTER_FORROOT_GUARD = new InjectionToken('LOCALIZE_ROUTER_FORROOT_GUARD');
/**
 * Static provider for keeping track of routes
 * @type {InjectionToken<Routes[]>}
 */
export var RAW_ROUTES = new InjectionToken('RAW_ROUTES');
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
export var USE_CACHED_LANG = new InjectionToken('USE_CACHED_LANG');
/**
 * Cache mechanism type
 * @type {InjectionToken<CacheMechanism>}
 */
export var CACHE_MECHANISM = new InjectionToken('CACHE_MECHANISM');
/**
 * Cache name
 * @type {InjectionToken<string>}
 */
export var CACHE_NAME = new InjectionToken('CACHE_NAME');
/**
 * Function for calculating default language
 * @type {InjectionToken<DefaultLanguageFunction>}
 */
export var DEFAULT_LANG_FUNCTION = new InjectionToken('DEFAULT_LANG_FUNCTION');
/**
 * Boolean to indicate whether prefix should be set for single language scenarios
 * @type {InjectionToken<boolean>}
 */
export var ALWAYS_SET_PREFIX = new InjectionToken('ALWAYS_SET_PREFIX');
var LOCALIZE_CACHE_NAME = 'LOCALIZE_DEFAULT_LANGUAGE';
var LocalizeRouterSettings = /** @class */ (function () {
    /**
     * Settings for localize router
     * @param {boolean} useCachedLang
     * @param {boolean} alwaysSetPrefix
     * @param {CacheMechanism} cacheMechanism
     * @param {string} cacheName
     * @param {DefaultLanguageFunction} defaultLangFunction
     */
    function LocalizeRouterSettings(useCachedLang, alwaysSetPrefix, cacheMechanism, cacheName, defaultLangFunction) {
        if (useCachedLang === void 0) { useCachedLang = true; }
        if (alwaysSetPrefix === void 0) { alwaysSetPrefix = true; }
        if (cacheMechanism === void 0) { cacheMechanism = CacheMechanism.LocalStorage; }
        if (cacheName === void 0) { cacheName = LOCALIZE_CACHE_NAME; }
        if (defaultLangFunction === void 0) { defaultLangFunction = void 0; }
        this.useCachedLang = useCachedLang;
        this.alwaysSetPrefix = alwaysSetPrefix;
        this.cacheMechanism = cacheMechanism;
        this.cacheName = cacheName;
        this.defaultLangFunction = defaultLangFunction;
    }
    /** @nocollapse */ LocalizeRouterSettings.ngInjectableDef = i0.ɵɵdefineInjectable({ token: LocalizeRouterSettings, factory: function LocalizeRouterSettings_Factory(t) { return new (t || LocalizeRouterSettings)(i0.ɵɵinject(USE_CACHED_LANG), i0.ɵɵinject(ALWAYS_SET_PREFIX), i0.ɵɵinject(CACHE_MECHANISM), i0.ɵɵinject(CACHE_NAME), i0.ɵɵinject(DEFAULT_LANG_FUNCTION)); }, providedIn: null });
    return LocalizeRouterSettings;
}());
export { LocalizeRouterSettings };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxpemUtcm91dGVyLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xvY2FsaXplLXJvdXRlci8iLCJzb3VyY2VzIjpbImxpYi9sb2NhbGl6ZS1yb3V0ZXIuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFZLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFJN0U7OztHQUdHO0FBQ0gsTUFBTSxDQUFDLElBQU0sNkJBQTZCLEdBQUcsSUFBSSxjQUFjLENBQXVCLCtCQUErQixDQUFDLENBQUM7QUFFdkg7OztHQUdHO0FBQ0gsTUFBTSxDQUFDLElBQU0sVUFBVSxHQUE2QixJQUFJLGNBQWMsQ0FBVyxZQUFZLENBQUMsQ0FBQztBQU8vRjs7R0FFRztBQUNILE1BQU0sS0FBVyxjQUFjLENBRzlCO0FBSEQsV0FBaUIsY0FBYztJQUNoQiwyQkFBWSxHQUFtQixjQUFjLENBQUM7SUFDOUMscUJBQU0sR0FBbUIsUUFBUSxDQUFDO0FBQ2pELENBQUMsRUFIZ0IsY0FBYyxLQUFkLGNBQWMsUUFHOUI7QUFFRDs7O0dBR0c7QUFDSCxNQUFNLENBQUMsSUFBTSxlQUFlLEdBQUcsSUFBSSxjQUFjLENBQVUsaUJBQWlCLENBQUMsQ0FBQztBQUM5RTs7O0dBR0c7QUFDSCxNQUFNLENBQUMsSUFBTSxlQUFlLEdBQUcsSUFBSSxjQUFjLENBQWlCLGlCQUFpQixDQUFDLENBQUM7QUFDckY7OztHQUdHO0FBQ0gsTUFBTSxDQUFDLElBQU0sVUFBVSxHQUFHLElBQUksY0FBYyxDQUFTLFlBQVksQ0FBQyxDQUFDO0FBUW5FOzs7R0FHRztBQUNILE1BQU0sQ0FBQyxJQUFNLHFCQUFxQixHQUFHLElBQUksY0FBYyxDQUEwQix1QkFBdUIsQ0FBQyxDQUFDO0FBRTFHOzs7R0FHRztBQUNILE1BQU0sQ0FBQyxJQUFNLGlCQUFpQixHQUFHLElBQUksY0FBYyxDQUFVLG1CQUFtQixDQUFDLENBQUM7QUFjbEYsSUFBTSxtQkFBbUIsR0FBRywyQkFBMkIsQ0FBQztBQUV4RDtJQUVFOzs7Ozs7O09BT0c7SUFDSCxnQ0FDa0MsYUFBNkIsRUFDM0IsZUFBK0IsRUFDakMsY0FBNEQsRUFDakUsU0FBdUMsRUFDNUIsbUJBQXFEO1FBSjNELDhCQUFBLEVBQUEsb0JBQTZCO1FBQzNCLGdDQUFBLEVBQUEsc0JBQStCO1FBQ2pDLCtCQUFBLEVBQUEsaUJBQWlDLGNBQWMsQ0FBQyxZQUFZO1FBQ2pFLDBCQUFBLEVBQUEsK0JBQXVDO1FBQzVCLG9DQUFBLEVBQUEsMkJBQW9ELENBQUM7UUFKM0Qsa0JBQWEsR0FBYixhQUFhLENBQWdCO1FBQzNCLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQUNqQyxtQkFBYyxHQUFkLGNBQWMsQ0FBOEM7UUFDakUsY0FBUyxHQUFULFNBQVMsQ0FBOEI7UUFDNUIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFrQztJQUU3RixDQUFDOzRFQWhCVSxzQkFBc0IseUVBQXRCLHNCQUFzQixjQVV2QixlQUFlLGVBQ2YsaUJBQWlCLGVBQ2pCLGVBQWUsZUFDZixVQUFVLGVBQ1YscUJBQXFCO2lDQTVGakM7Q0ErRkMsQUFsQkQsSUFrQkM7U0FqQlksc0JBQXNCO21DQUF0QixzQkFBc0I7Y0FEbEMsVUFBVTs7c0JBV04sTUFBTTt1QkFBQyxlQUFlOztzQkFDdEIsTUFBTTt1QkFBQyxpQkFBaUI7MEJBQ3VCLGNBQWM7c0JBQTdELE1BQU07dUJBQUMsZUFBZTs7c0JBQ3RCLE1BQU07dUJBQUMsVUFBVTs7c0JBQ2pCLE1BQU07dUJBQUMscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3Rpb25Ub2tlbiwgUHJvdmlkZXIsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBMb2NhbGl6ZVJvdXRlck1vZHVsZSB9IGZyb20gJy4vbG9jYWxpemUtcm91dGVyLm1vZHVsZSc7XG5cbi8qKlxuICogR3VhcmQgdG8gbWFrZSBzdXJlIHdlIGhhdmUgc2luZ2xlIGluaXRpYWxpemF0aW9uIG9mIGZvclJvb3RcbiAqIEB0eXBlIHtJbmplY3Rpb25Ub2tlbjxMb2NhbGl6ZVJvdXRlck1vZHVsZT59XG4gKi9cbmV4cG9ydCBjb25zdCBMT0NBTElaRV9ST1VURVJfRk9SUk9PVF9HVUFSRCA9IG5ldyBJbmplY3Rpb25Ub2tlbjxMb2NhbGl6ZVJvdXRlck1vZHVsZT4oJ0xPQ0FMSVpFX1JPVVRFUl9GT1JST09UX0dVQVJEJyk7XG5cbi8qKlxuICogU3RhdGljIHByb3ZpZGVyIGZvciBrZWVwaW5nIHRyYWNrIG9mIHJvdXRlc1xuICogQHR5cGUge0luamVjdGlvblRva2VuPFJvdXRlc1tdPn1cbiAqL1xuZXhwb3J0IGNvbnN0IFJBV19ST1VURVM6IEluamVjdGlvblRva2VuPFJvdXRlc1tdPiA9IG5ldyBJbmplY3Rpb25Ub2tlbjxSb3V0ZXNbXT4oJ1JBV19ST1VURVMnKTtcblxuLyoqXG4gKiBUeXBlIGZvciBDYWNoaW5nIG9mIGRlZmF1bHQgbGFuZ3VhZ2VcbiAqL1xuZXhwb3J0IHR5cGUgQ2FjaGVNZWNoYW5pc20gPSAnTG9jYWxTdG9yYWdlJyB8ICdDb29raWUnO1xuXG4vKipcbiAqIE5hbWVzcGFjZSBmb3IgZmFpbCBwcm9vZiBhY2Nlc3Mgb2YgQ2FjaGVNZWNoYW5pc21cbiAqL1xuZXhwb3J0IG5hbWVzcGFjZSBDYWNoZU1lY2hhbmlzbSB7XG4gIGV4cG9ydCBjb25zdCBMb2NhbFN0b3JhZ2U6IENhY2hlTWVjaGFuaXNtID0gJ0xvY2FsU3RvcmFnZSc7XG4gIGV4cG9ydCBjb25zdCBDb29raWU6IENhY2hlTWVjaGFuaXNtID0gJ0Nvb2tpZSc7XG59XG5cbi8qKlxuICogQm9vbGVhbiB0byBpbmRpY2F0ZSB3aGV0aGVyIHRvIHVzZSBjYWNoZWQgbGFuZ3VhZ2UgdmFsdWVcbiAqIEB0eXBlIHtJbmplY3Rpb25Ub2tlbjxib29sZWFuPn1cbiAqL1xuZXhwb3J0IGNvbnN0IFVTRV9DQUNIRURfTEFORyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxib29sZWFuPignVVNFX0NBQ0hFRF9MQU5HJyk7XG4vKipcbiAqIENhY2hlIG1lY2hhbmlzbSB0eXBlXG4gKiBAdHlwZSB7SW5qZWN0aW9uVG9rZW48Q2FjaGVNZWNoYW5pc20+fVxuICovXG5leHBvcnQgY29uc3QgQ0FDSEVfTUVDSEFOSVNNID0gbmV3IEluamVjdGlvblRva2VuPENhY2hlTWVjaGFuaXNtPignQ0FDSEVfTUVDSEFOSVNNJyk7XG4vKipcbiAqIENhY2hlIG5hbWVcbiAqIEB0eXBlIHtJbmplY3Rpb25Ub2tlbjxzdHJpbmc+fVxuICovXG5leHBvcnQgY29uc3QgQ0FDSEVfTkFNRSA9IG5ldyBJbmplY3Rpb25Ub2tlbjxzdHJpbmc+KCdDQUNIRV9OQU1FJyk7XG5cbi8qKlxuICogVHlwZSBmb3IgZGVmYXVsdCBsYW5ndWFnZSBmdW5jdGlvblxuICogVXNlZCB0byBvdmVycmlkZSBiYXNpYyBiZWhhdmlvdXJcbiAqL1xuZXhwb3J0IHR5cGUgRGVmYXVsdExhbmd1YWdlRnVuY3Rpb24gPSAobGFuZ3VhZ2VzOiBzdHJpbmdbXSwgY2FjaGVkTGFuZz86IHN0cmluZywgYnJvd3Nlckxhbmc/OiBzdHJpbmcpID0+IHN0cmluZztcblxuLyoqXG4gKiBGdW5jdGlvbiBmb3IgY2FsY3VsYXRpbmcgZGVmYXVsdCBsYW5ndWFnZVxuICogQHR5cGUge0luamVjdGlvblRva2VuPERlZmF1bHRMYW5ndWFnZUZ1bmN0aW9uPn1cbiAqL1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfTEFOR19GVU5DVElPTiA9IG5ldyBJbmplY3Rpb25Ub2tlbjxEZWZhdWx0TGFuZ3VhZ2VGdW5jdGlvbj4oJ0RFRkFVTFRfTEFOR19GVU5DVElPTicpO1xuXG4vKipcbiAqIEJvb2xlYW4gdG8gaW5kaWNhdGUgd2hldGhlciBwcmVmaXggc2hvdWxkIGJlIHNldCBmb3Igc2luZ2xlIGxhbmd1YWdlIHNjZW5hcmlvc1xuICogQHR5cGUge0luamVjdGlvblRva2VuPGJvb2xlYW4+fVxuICovXG5leHBvcnQgY29uc3QgQUxXQVlTX1NFVF9QUkVGSVggPSBuZXcgSW5qZWN0aW9uVG9rZW48Ym9vbGVhbj4oJ0FMV0FZU19TRVRfUFJFRklYJyk7XG5cbi8qKlxuICogQ29uZmlnIGludGVyZmFjZSBmb3IgTG9jYWxpemVSb3V0ZXJcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBMb2NhbGl6ZVJvdXRlckNvbmZpZyB7XG4gIHBhcnNlcj86IFByb3ZpZGVyO1xuICB1c2VDYWNoZWRMYW5nPzogYm9vbGVhbjtcbiAgY2FjaGVNZWNoYW5pc20/OiBDYWNoZU1lY2hhbmlzbTtcbiAgY2FjaGVOYW1lPzogc3RyaW5nO1xuICBkZWZhdWx0TGFuZ0Z1bmN0aW9uPzogRGVmYXVsdExhbmd1YWdlRnVuY3Rpb247XG4gIGFsd2F5c1NldFByZWZpeD86IGJvb2xlYW47XG59XG5cbmNvbnN0IExPQ0FMSVpFX0NBQ0hFX05BTUUgPSAnTE9DQUxJWkVfREVGQVVMVF9MQU5HVUFHRSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBMb2NhbGl6ZVJvdXRlclNldHRpbmdzIGltcGxlbWVudHMgTG9jYWxpemVSb3V0ZXJDb25maWcge1xuICAvKipcbiAgICogU2V0dGluZ3MgZm9yIGxvY2FsaXplIHJvdXRlclxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHVzZUNhY2hlZExhbmdcbiAgICogQHBhcmFtIHtib29sZWFufSBhbHdheXNTZXRQcmVmaXhcbiAgICogQHBhcmFtIHtDYWNoZU1lY2hhbmlzbX0gY2FjaGVNZWNoYW5pc21cbiAgICogQHBhcmFtIHtzdHJpbmd9IGNhY2hlTmFtZVxuICAgKiBAcGFyYW0ge0RlZmF1bHRMYW5ndWFnZUZ1bmN0aW9ufSBkZWZhdWx0TGFuZ0Z1bmN0aW9uXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KFVTRV9DQUNIRURfTEFORykgcHVibGljIHVzZUNhY2hlZExhbmc6IGJvb2xlYW4gPSB0cnVlLFxuICAgIEBJbmplY3QoQUxXQVlTX1NFVF9QUkVGSVgpIHB1YmxpYyBhbHdheXNTZXRQcmVmaXg6IGJvb2xlYW4gPSB0cnVlLFxuICAgIEBJbmplY3QoQ0FDSEVfTUVDSEFOSVNNKSBwdWJsaWMgY2FjaGVNZWNoYW5pc206IENhY2hlTWVjaGFuaXNtID0gQ2FjaGVNZWNoYW5pc20uTG9jYWxTdG9yYWdlLFxuICAgIEBJbmplY3QoQ0FDSEVfTkFNRSkgcHVibGljIGNhY2hlTmFtZTogc3RyaW5nID0gTE9DQUxJWkVfQ0FDSEVfTkFNRSxcbiAgICBASW5qZWN0KERFRkFVTFRfTEFOR19GVU5DVElPTikgcHVibGljIGRlZmF1bHRMYW5nRnVuY3Rpb246IERlZmF1bHRMYW5ndWFnZUZ1bmN0aW9uID0gdm9pZCAwXG4gICkge1xuICB9XG59XG4iXX0=