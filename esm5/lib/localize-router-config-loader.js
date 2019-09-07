/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ROUTES } from '@angular/router';
import { SystemJsNgModuleLoader, SystemJsNgModuleLoaderConfig, Optional, Compiler, Injectable, Inject, forwardRef } from '@angular/core';
import { LocalizeParser } from './localize-router.parser';
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
     * @param {?} path
     * @return {?}
     */
    LocalizeRouterConfigLoader.prototype.load = /**
     * @param {?} path
     * @return {?}
     */
    function (path) {
        var _this = this;
        return _super.prototype.load.call(this, path).then((/**
         * @param {?} factory
         * @return {?}
         */
        function (factory) {
            return {
                moduleType: factory.moduleType,
                create: (/**
                 * @param {?} parentInjector
                 * @return {?}
                 */
                function (parentInjector) {
                    /** @type {?} */
                    var module = factory.create(parentInjector);
                    /** @type {?} */
                    var getMethod = module.injector.get.bind(module.injector);
                    module.injector['get'] = (/**
                     * @param {?} token
                     * @param {?} notFoundValue
                     * @return {?}
                     */
                    function (token, notFoundValue) {
                        /** @type {?} */
                        var getResult = getMethod(token, notFoundValue);
                        if (token === ROUTES) {
                            // translate lazy routes
                            return _this.localize.initChildRoutes([].concat.apply([], tslib_1.__spread(getResult)));
                        }
                        else {
                            return getResult;
                        }
                    });
                    return module;
                })
            };
        }));
    };
    LocalizeRouterConfigLoader.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    LocalizeRouterConfigLoader.ctorParameters = function () { return [
        { type: LocalizeParser, decorators: [{ type: Inject, args: [forwardRef((/**
                         * @return {?}
                         */
                        function () { return LocalizeParser; })),] }] },
        { type: Compiler },
        { type: SystemJsNgModuleLoaderConfig, decorators: [{ type: Optional }] }
    ]; };
    return LocalizeRouterConfigLoader;
}(SystemJsNgModuleLoader));
export { LocalizeRouterConfigLoader };
if (false) {
    /**
     * @type {?}
     * @private
     */
    LocalizeRouterConfigLoader.prototype.localize;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxpemUtcm91dGVyLWNvbmZpZy1sb2FkZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sb2NhbGl6ZS1yb3V0ZXIvIiwic291cmNlcyI6WyJsaWIvbG9jYWxpemUtcm91dGVyLWNvbmZpZy1sb2FkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUNMLHNCQUFzQixFQUN0Qiw0QkFBNEIsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUNqRixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7Ozs7QUFLMUQ7SUFDZ0Qsc0RBQXNCO0lBRXBFLG9DQUE4RCxRQUF3QixFQUMxRSxTQUFtQixFQUNQLE1BQXFDO1FBRjdELFlBR0Usa0JBQU0sU0FBUyxFQUFFLE1BQU0sQ0FBQyxTQUN6QjtRQUo2RCxjQUFRLEdBQVIsUUFBUSxDQUFnQjs7SUFJdEYsQ0FBQzs7Ozs7SUFHRCx5Q0FBSTs7OztJQUFKLFVBQUssSUFBWTtRQUFqQixpQkFzQkM7UUFyQkMsT0FBTyxpQkFBTSxJQUFJLFlBQUMsSUFBSSxDQUFDLENBQUMsSUFBSTs7OztRQUFDLFVBQUMsT0FBNkI7WUFDekQsT0FBTztnQkFDTCxVQUFVLEVBQUUsT0FBTyxDQUFDLFVBQVU7Z0JBQzlCLE1BQU07Ozs7Z0JBQUUsVUFBQyxjQUF3Qjs7d0JBQ3pCLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQzs7d0JBQ3ZDLFNBQVMsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztvQkFFM0QsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7Ozs7O29CQUFHLFVBQUMsS0FBVSxFQUFFLGFBQWtCOzs0QkFDaEQsU0FBUyxHQUFHLFNBQVMsQ0FBQyxLQUFLLEVBQUUsYUFBYSxDQUFDO3dCQUVqRCxJQUFJLEtBQUssS0FBSyxNQUFNLEVBQUU7NEJBQ3BCLHdCQUF3Qjs0QkFDeEIsT0FBTyxLQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsTUFBTSxPQUFULEVBQUUsbUJBQVcsU0FBUyxHQUFFLENBQUM7eUJBQy9EOzZCQUFNOzRCQUNMLE9BQU8sU0FBUyxDQUFDO3lCQUNsQjtvQkFDSCxDQUFDLENBQUEsQ0FBQztvQkFDRixPQUFPLE1BQU0sQ0FBQztnQkFDaEIsQ0FBQyxDQUFBO2FBQ0YsQ0FBQztRQUNKLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Z0JBaENGLFVBQVU7Ozs7Z0JBTEYsY0FBYyx1QkFRUixNQUFNLFNBQUMsVUFBVTs7O3dCQUFDLGNBQU0sT0FBQSxjQUFjLEVBQWQsQ0FBYyxFQUFDO2dCQVZaLFFBQVE7Z0JBQWhELDRCQUE0Qix1QkFZZixRQUFROztJQTRCdkIsaUNBQUM7Q0FBQSxBQWpDRCxDQUNnRCxzQkFBc0IsR0FnQ3JFO1NBaENZLDBCQUEwQjs7Ozs7O0lBRXpCLDhDQUEwRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJPVVRFUyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge1xuICBTeXN0ZW1Kc05nTW9kdWxlTG9hZGVyLCBOZ01vZHVsZUZhY3RvcnksIEluamVjdG9yLFxuICBTeXN0ZW1Kc05nTW9kdWxlTG9hZGVyQ29uZmlnLCBPcHRpb25hbCwgQ29tcGlsZXIsIEluamVjdGFibGUsIEluamVjdCwgZm9yd2FyZFJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExvY2FsaXplUGFyc2VyIH0gZnJvbSAnLi9sb2NhbGl6ZS1yb3V0ZXIucGFyc2VyJztcblxuLyoqXG4gKiBFeHRlbnNpb24gb2YgU3lzdGVtSnNOZ01vZHVsZUxvYWRlciB0byBlbmFibGUgbG9jYWxpemF0aW9uIG9mIHJvdXRlIG9uIGxhenkgbG9hZFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTG9jYWxpemVSb3V0ZXJDb25maWdMb2FkZXIgZXh0ZW5kcyBTeXN0ZW1Kc05nTW9kdWxlTG9hZGVyIHtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTG9jYWxpemVQYXJzZXIpKSBwcml2YXRlIGxvY2FsaXplOiBMb2NhbGl6ZVBhcnNlcixcbiAgICAgICAgICAgICAgX2NvbXBpbGVyOiBDb21waWxlcixcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgY29uZmlnPzogU3lzdGVtSnNOZ01vZHVsZUxvYWRlckNvbmZpZykge1xuICAgIHN1cGVyKF9jb21waWxlciwgY29uZmlnKTtcbiAgfVxuXG5cbiAgbG9hZChwYXRoOiBzdHJpbmcpOiBQcm9taXNlPE5nTW9kdWxlRmFjdG9yeTxhbnk+PiB7XG4gICAgcmV0dXJuIHN1cGVyLmxvYWQocGF0aCkudGhlbigoZmFjdG9yeTogTmdNb2R1bGVGYWN0b3J5PGFueT4pID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG1vZHVsZVR5cGU6IGZhY3RvcnkubW9kdWxlVHlwZSxcbiAgICAgICAgY3JlYXRlOiAocGFyZW50SW5qZWN0b3I6IEluamVjdG9yKSA9PiB7XG4gICAgICAgICAgY29uc3QgbW9kdWxlID0gZmFjdG9yeS5jcmVhdGUocGFyZW50SW5qZWN0b3IpO1xuICAgICAgICAgIGNvbnN0IGdldE1ldGhvZCA9IG1vZHVsZS5pbmplY3Rvci5nZXQuYmluZChtb2R1bGUuaW5qZWN0b3IpO1xuXG4gICAgICAgICAgbW9kdWxlLmluamVjdG9yWydnZXQnXSA9ICh0b2tlbjogYW55LCBub3RGb3VuZFZhbHVlOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGdldFJlc3VsdCA9IGdldE1ldGhvZCh0b2tlbiwgbm90Rm91bmRWYWx1ZSk7XG5cbiAgICAgICAgICAgIGlmICh0b2tlbiA9PT0gUk9VVEVTKSB7XG4gICAgICAgICAgICAgIC8vIHRyYW5zbGF0ZSBsYXp5IHJvdXRlc1xuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGl6ZS5pbml0Q2hpbGRSb3V0ZXMoW10uY29uY2F0KC4uLmdldFJlc3VsdCkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGdldFJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICAgIHJldHVybiBtb2R1bGU7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==