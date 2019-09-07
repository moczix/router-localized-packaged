/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ROUTES } from '@angular/router';
import { SystemJsNgModuleLoader, SystemJsNgModuleLoaderConfig, Optional, Compiler, Injectable, Inject, forwardRef } from '@angular/core';
import { LocalizeParser } from './localize-router.parser';
/**
 * Extension of SystemJsNgModuleLoader to enable localization of route on lazy load
 */
export class LocalizeRouterConfigLoader extends SystemJsNgModuleLoader {
    /**
     * @param {?} localize
     * @param {?} _compiler
     * @param {?=} config
     */
    constructor(localize, _compiler, config) {
        super(_compiler, config);
        this.localize = localize;
    }
    /**
     * @param {?} path
     * @return {?}
     */
    load(path) {
        return super.load(path).then((/**
         * @param {?} factory
         * @return {?}
         */
        (factory) => {
            return {
                moduleType: factory.moduleType,
                create: (/**
                 * @param {?} parentInjector
                 * @return {?}
                 */
                (parentInjector) => {
                    /** @type {?} */
                    const module = factory.create(parentInjector);
                    /** @type {?} */
                    const getMethod = module.injector.get.bind(module.injector);
                    module.injector['get'] = (/**
                     * @param {?} token
                     * @param {?} notFoundValue
                     * @return {?}
                     */
                    (token, notFoundValue) => {
                        /** @type {?} */
                        const getResult = getMethod(token, notFoundValue);
                        if (token === ROUTES) {
                            // translate lazy routes
                            return this.localize.initChildRoutes([].concat(...getResult));
                        }
                        else {
                            return getResult;
                        }
                    });
                    return module;
                })
            };
        }));
    }
}
LocalizeRouterConfigLoader.decorators = [
    { type: Injectable }
];
/** @nocollapse */
LocalizeRouterConfigLoader.ctorParameters = () => [
    { type: LocalizeParser, decorators: [{ type: Inject, args: [forwardRef((/**
                     * @return {?}
                     */
                    () => LocalizeParser)),] }] },
    { type: Compiler },
    { type: SystemJsNgModuleLoaderConfig, decorators: [{ type: Optional }] }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    LocalizeRouterConfigLoader.prototype.localize;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxpemUtcm91dGVyLWNvbmZpZy1sb2FkZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sb2NhbGl6ZS1yb3V0ZXIvIiwic291cmNlcyI6WyJsaWIvbG9jYWxpemUtcm91dGVyLWNvbmZpZy1sb2FkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQ0wsc0JBQXNCLEVBQ3RCLDRCQUE0QixFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQ2pGLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7OztBQU0xRCxNQUFNLE9BQU8sMEJBQTJCLFNBQVEsc0JBQXNCOzs7Ozs7SUFFcEUsWUFBOEQsUUFBd0IsRUFDMUUsU0FBbUIsRUFDUCxNQUFxQztRQUMzRCxLQUFLLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBSG1DLGFBQVEsR0FBUixRQUFRLENBQWdCO0lBSXRGLENBQUM7Ozs7O0lBR0QsSUFBSSxDQUFDLElBQVk7UUFDZixPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSTs7OztRQUFDLENBQUMsT0FBNkIsRUFBRSxFQUFFO1lBQzdELE9BQU87Z0JBQ0wsVUFBVSxFQUFFLE9BQU8sQ0FBQyxVQUFVO2dCQUM5QixNQUFNOzs7O2dCQUFFLENBQUMsY0FBd0IsRUFBRSxFQUFFOzswQkFDN0IsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDOzswQkFDdkMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO29CQUUzRCxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQzs7Ozs7b0JBQUcsQ0FBQyxLQUFVLEVBQUUsYUFBa0IsRUFBRSxFQUFFOzs4QkFDcEQsU0FBUyxHQUFHLFNBQVMsQ0FBQyxLQUFLLEVBQUUsYUFBYSxDQUFDO3dCQUVqRCxJQUFJLEtBQUssS0FBSyxNQUFNLEVBQUU7NEJBQ3BCLHdCQUF3Qjs0QkFDeEIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQzt5QkFDL0Q7NkJBQU07NEJBQ0wsT0FBTyxTQUFTLENBQUM7eUJBQ2xCO29CQUNILENBQUMsQ0FBQSxDQUFDO29CQUNGLE9BQU8sTUFBTSxDQUFDO2dCQUNoQixDQUFDLENBQUE7YUFDRixDQUFDO1FBQ0osQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7WUFoQ0YsVUFBVTs7OztZQUxGLGNBQWMsdUJBUVIsTUFBTSxTQUFDLFVBQVU7OztvQkFBQyxHQUFHLEVBQUUsQ0FBQyxjQUFjLEVBQUM7WUFWWixRQUFRO1lBQWhELDRCQUE0Qix1QkFZZixRQUFROzs7Ozs7O0lBRlQsOENBQTBFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUk9VVEVTIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7XG4gIFN5c3RlbUpzTmdNb2R1bGVMb2FkZXIsIE5nTW9kdWxlRmFjdG9yeSwgSW5qZWN0b3IsXG4gIFN5c3RlbUpzTmdNb2R1bGVMb2FkZXJDb25maWcsIE9wdGlvbmFsLCBDb21waWxlciwgSW5qZWN0YWJsZSwgSW5qZWN0LCBmb3J3YXJkUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTG9jYWxpemVQYXJzZXIgfSBmcm9tICcuL2xvY2FsaXplLXJvdXRlci5wYXJzZXInO1xuXG4vKipcbiAqIEV4dGVuc2lvbiBvZiBTeXN0ZW1Kc05nTW9kdWxlTG9hZGVyIHRvIGVuYWJsZSBsb2NhbGl6YXRpb24gb2Ygcm91dGUgb24gbGF6eSBsb2FkXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBMb2NhbGl6ZVJvdXRlckNvbmZpZ0xvYWRlciBleHRlbmRzIFN5c3RlbUpzTmdNb2R1bGVMb2FkZXIge1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBMb2NhbGl6ZVBhcnNlcikpIHByaXZhdGUgbG9jYWxpemU6IExvY2FsaXplUGFyc2VyLFxuICAgICAgICAgICAgICBfY29tcGlsZXI6IENvbXBpbGVyLFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBjb25maWc/OiBTeXN0ZW1Kc05nTW9kdWxlTG9hZGVyQ29uZmlnKSB7XG4gICAgc3VwZXIoX2NvbXBpbGVyLCBjb25maWcpO1xuICB9XG5cblxuICBsb2FkKHBhdGg6IHN0cmluZyk6IFByb21pc2U8TmdNb2R1bGVGYWN0b3J5PGFueT4+IHtcbiAgICByZXR1cm4gc3VwZXIubG9hZChwYXRoKS50aGVuKChmYWN0b3J5OiBOZ01vZHVsZUZhY3Rvcnk8YW55PikgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbW9kdWxlVHlwZTogZmFjdG9yeS5tb2R1bGVUeXBlLFxuICAgICAgICBjcmVhdGU6IChwYXJlbnRJbmplY3RvcjogSW5qZWN0b3IpID0+IHtcbiAgICAgICAgICBjb25zdCBtb2R1bGUgPSBmYWN0b3J5LmNyZWF0ZShwYXJlbnRJbmplY3Rvcik7XG4gICAgICAgICAgY29uc3QgZ2V0TWV0aG9kID0gbW9kdWxlLmluamVjdG9yLmdldC5iaW5kKG1vZHVsZS5pbmplY3Rvcik7XG5cbiAgICAgICAgICBtb2R1bGUuaW5qZWN0b3JbJ2dldCddID0gKHRva2VuOiBhbnksIG5vdEZvdW5kVmFsdWU6IGFueSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZ2V0UmVzdWx0ID0gZ2V0TWV0aG9kKHRva2VuLCBub3RGb3VuZFZhbHVlKTtcblxuICAgICAgICAgICAgaWYgKHRva2VuID09PSBST1VURVMpIHtcbiAgICAgICAgICAgICAgLy8gdHJhbnNsYXRlIGxhenkgcm91dGVzXG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLmxvY2FsaXplLmluaXRDaGlsZFJvdXRlcyhbXS5jb25jYXQoLi4uZ2V0UmVzdWx0KSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gZ2V0UmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgICAgcmV0dXJuIG1vZHVsZTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KTtcbiAgfVxufVxuIl19