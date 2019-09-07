import * as tslib_1 from "tslib";
import { ROUTES } from '@angular/router';
import { SystemJsNgModuleLoader, SystemJsNgModuleLoaderConfig, Optional, Compiler, Injectable, Inject, forwardRef } from '@angular/core';
import { LocalizeParser } from './localize-router.parser';
import * as i0 from "@angular/core";
import * as i1 from "./localize-router.parser";
/**
 * Extension of SystemJsNgModuleLoader to enable localization of route on lazy load
 */
var LocalizeRouterConfigLoader = /** @class */ (function (_super) {
    tslib_1.__extends(LocalizeRouterConfigLoader, _super);
    function LocalizeRouterConfigLoader(localize, _compiler, config) {
        var _this = _super.call(this, _compiler, config) || this;
        _this.localize = localize;
        return _this;
    }
    /**
     * Extend load with custom functionality
     * @param {string} path
     * @returns {Promise<NgModuleFactory<any>>}
     */
    LocalizeRouterConfigLoader.prototype.load = function (path) {
        var _this = this;
        return _super.prototype.load.call(this, path).then(function (factory) {
            return {
                moduleType: factory.moduleType,
                create: function (parentInjector) {
                    var module = factory.create(parentInjector);
                    var getMethod = module.injector.get.bind(module.injector);
                    module.injector['get'] = function (token, notFoundValue) {
                        var getResult = getMethod(token, notFoundValue);
                        if (token === ROUTES) {
                            // translate lazy routes
                            return _this.localize.initChildRoutes([].concat.apply([], tslib_1.__spread(getResult)));
                        }
                        else {
                            return getResult;
                        }
                    };
                    return module;
                }
            };
        });
    };
    /** @nocollapse */ LocalizeRouterConfigLoader.ngInjectableDef = i0.ɵɵdefineInjectable({ token: LocalizeRouterConfigLoader, factory: function LocalizeRouterConfigLoader_Factory(t) { return new (t || LocalizeRouterConfigLoader)(i0.ɵɵinject(forwardRef(function () { return LocalizeParser; })), i0.ɵɵinject(i0.Compiler), i0.ɵɵinject(i0.SystemJsNgModuleLoaderConfig, 8)); }, providedIn: null });
    return LocalizeRouterConfigLoader;
}(SystemJsNgModuleLoader));
export { LocalizeRouterConfigLoader };
/*@__PURE__*/ i0.ɵsetClassMetadata(LocalizeRouterConfigLoader, [{
        type: Injectable
    }], function () { return [{ type: i1.LocalizeParser, decorators: [{
                type: Inject,
                args: [forwardRef(function () { return LocalizeParser; })]
            }] }, { type: i0.Compiler }, { type: i0.SystemJsNgModuleLoaderConfig, decorators: [{
                type: Optional
            }] }]; }, null);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxpemUtcm91dGVyLWNvbmZpZy1sb2FkZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sb2NhbGl6ZS1yb3V0ZXIvIiwic291cmNlcyI6WyJsaWIvbG9jYWxpemUtcm91dGVyLWNvbmZpZy1sb2FkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQ0wsc0JBQXNCLEVBQ3RCLDRCQUE0QixFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQ2pGLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7O0FBRTFEOztHQUVHO0FBQ0g7SUFDZ0Qsc0RBQXNCO0lBRXBFLG9DQUE4RCxRQUF3QixFQUMxRSxTQUFtQixFQUNQLE1BQXFDO1FBRjdELFlBR0Usa0JBQU0sU0FBUyxFQUFFLE1BQU0sQ0FBQyxTQUN6QjtRQUo2RCxjQUFRLEdBQVIsUUFBUSxDQUFnQjs7SUFJdEYsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCx5Q0FBSSxHQUFKLFVBQUssSUFBWTtRQUFqQixpQkFzQkM7UUFyQkMsT0FBTyxpQkFBTSxJQUFJLFlBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsT0FBNkI7WUFDekQsT0FBTztnQkFDTCxVQUFVLEVBQUUsT0FBTyxDQUFDLFVBQVU7Z0JBQzlCLE1BQU0sRUFBRSxVQUFDLGNBQXdCO29CQUMvQixJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO29CQUM5QyxJQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUU1RCxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLFVBQUMsS0FBVSxFQUFFLGFBQWtCO3dCQUN0RCxJQUFNLFNBQVMsR0FBRyxTQUFTLENBQUMsS0FBSyxFQUFFLGFBQWEsQ0FBQyxDQUFDO3dCQUVsRCxJQUFJLEtBQUssS0FBSyxNQUFNLEVBQUU7NEJBQ3BCLHdCQUF3Qjs0QkFDeEIsT0FBTyxLQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsTUFBTSxPQUFULEVBQUUsbUJBQVcsU0FBUyxHQUFFLENBQUM7eUJBQy9EOzZCQUFNOzRCQUNMLE9BQU8sU0FBUyxDQUFDO3lCQUNsQjtvQkFDSCxDQUFDLENBQUM7b0JBQ0YsT0FBTyxNQUFNLENBQUM7Z0JBQ2hCLENBQUM7YUFDRixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO2dGQW5DVSwwQkFBMEIsNkVBQTFCLDBCQUEwQixjQUVqQixVQUFVLENBQUMsY0FBTSxPQUFBLGNBQWMsRUFBZCxDQUFjLENBQUM7cUNBYnREO0NBK0NDLEFBckNELENBQ2dELHNCQUFzQixHQW9DckU7U0FwQ1ksMEJBQTBCO21DQUExQiwwQkFBMEI7Y0FEdEMsVUFBVTs7c0JBR0ksTUFBTTt1QkFBQyxVQUFVLENBQUMsY0FBTSxPQUFBLGNBQWMsRUFBZCxDQUFjLENBQUM7O3NCQUV2QyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUk9VVEVTIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7XG4gIFN5c3RlbUpzTmdNb2R1bGVMb2FkZXIsIE5nTW9kdWxlRmFjdG9yeSwgSW5qZWN0b3IsXG4gIFN5c3RlbUpzTmdNb2R1bGVMb2FkZXJDb25maWcsIE9wdGlvbmFsLCBDb21waWxlciwgSW5qZWN0YWJsZSwgSW5qZWN0LCBmb3J3YXJkUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTG9jYWxpemVQYXJzZXIgfSBmcm9tICcuL2xvY2FsaXplLXJvdXRlci5wYXJzZXInO1xuXG4vKipcbiAqIEV4dGVuc2lvbiBvZiBTeXN0ZW1Kc05nTW9kdWxlTG9hZGVyIHRvIGVuYWJsZSBsb2NhbGl6YXRpb24gb2Ygcm91dGUgb24gbGF6eSBsb2FkXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBMb2NhbGl6ZVJvdXRlckNvbmZpZ0xvYWRlciBleHRlbmRzIFN5c3RlbUpzTmdNb2R1bGVMb2FkZXIge1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBMb2NhbGl6ZVBhcnNlcikpIHByaXZhdGUgbG9jYWxpemU6IExvY2FsaXplUGFyc2VyLFxuICAgICAgICAgICAgICBfY29tcGlsZXI6IENvbXBpbGVyLFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBjb25maWc/OiBTeXN0ZW1Kc05nTW9kdWxlTG9hZGVyQ29uZmlnKSB7XG4gICAgc3VwZXIoX2NvbXBpbGVyLCBjb25maWcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4dGVuZCBsb2FkIHdpdGggY3VzdG9tIGZ1bmN0aW9uYWxpdHlcbiAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGhcbiAgICogQHJldHVybnMge1Byb21pc2U8TmdNb2R1bGVGYWN0b3J5PGFueT4+fVxuICAgKi9cbiAgbG9hZChwYXRoOiBzdHJpbmcpOiBQcm9taXNlPE5nTW9kdWxlRmFjdG9yeTxhbnk+PiB7XG4gICAgcmV0dXJuIHN1cGVyLmxvYWQocGF0aCkudGhlbigoZmFjdG9yeTogTmdNb2R1bGVGYWN0b3J5PGFueT4pID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG1vZHVsZVR5cGU6IGZhY3RvcnkubW9kdWxlVHlwZSxcbiAgICAgICAgY3JlYXRlOiAocGFyZW50SW5qZWN0b3I6IEluamVjdG9yKSA9PiB7XG4gICAgICAgICAgY29uc3QgbW9kdWxlID0gZmFjdG9yeS5jcmVhdGUocGFyZW50SW5qZWN0b3IpO1xuICAgICAgICAgIGNvbnN0IGdldE1ldGhvZCA9IG1vZHVsZS5pbmplY3Rvci5nZXQuYmluZChtb2R1bGUuaW5qZWN0b3IpO1xuXG4gICAgICAgICAgbW9kdWxlLmluamVjdG9yWydnZXQnXSA9ICh0b2tlbjogYW55LCBub3RGb3VuZFZhbHVlOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGdldFJlc3VsdCA9IGdldE1ldGhvZCh0b2tlbiwgbm90Rm91bmRWYWx1ZSk7XG5cbiAgICAgICAgICAgIGlmICh0b2tlbiA9PT0gUk9VVEVTKSB7XG4gICAgICAgICAgICAgIC8vIHRyYW5zbGF0ZSBsYXp5IHJvdXRlc1xuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGl6ZS5pbml0Q2hpbGRSb3V0ZXMoW10uY29uY2F0KC4uLmdldFJlc3VsdCkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGdldFJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICAgIHJldHVybiBtb2R1bGU7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==