import { ROUTES } from '@angular/router';
import { SystemJsNgModuleLoader, SystemJsNgModuleLoaderConfig, Optional, Compiler, Injectable, Inject, forwardRef } from '@angular/core';
import { LocalizeParser } from './localize-router.parser';
import * as i0 from "@angular/core";
import * as i1 from "./localize-router.parser";
/**
 * Extension of SystemJsNgModuleLoader to enable localization of route on lazy load
 */
export class LocalizeRouterConfigLoader extends SystemJsNgModuleLoader {
    constructor(localize, _compiler, config) {
        super(_compiler, config);
        this.localize = localize;
    }
    /**
     * Extend load with custom functionality
     * @param {string} path
     * @returns {Promise<NgModuleFactory<any>>}
     */
    load(path) {
        return super.load(path).then((factory) => {
            return {
                moduleType: factory.moduleType,
                create: (parentInjector) => {
                    const module = factory.create(parentInjector);
                    const getMethod = module.injector.get.bind(module.injector);
                    module.injector['get'] = (token, notFoundValue) => {
                        const getResult = getMethod(token, notFoundValue);
                        if (token === ROUTES) {
                            // translate lazy routes
                            return this.localize.initChildRoutes([].concat(...getResult));
                        }
                        else {
                            return getResult;
                        }
                    };
                    return module;
                }
            };
        });
    }
}
/** @nocollapse */ LocalizeRouterConfigLoader.ngInjectableDef = i0.ɵɵdefineInjectable({ token: LocalizeRouterConfigLoader, factory: function LocalizeRouterConfigLoader_Factory(t) { return new (t || LocalizeRouterConfigLoader)(i0.ɵɵinject(forwardRef(() => LocalizeParser)), i0.ɵɵinject(i0.Compiler), i0.ɵɵinject(i0.SystemJsNgModuleLoaderConfig, 8)); }, providedIn: null });
/*@__PURE__*/ i0.ɵsetClassMetadata(LocalizeRouterConfigLoader, [{
        type: Injectable
    }], function () { return [{ type: i1.LocalizeParser, decorators: [{
                type: Inject,
                args: [forwardRef(() => LocalizeParser)]
            }] }, { type: i0.Compiler }, { type: i0.SystemJsNgModuleLoaderConfig, decorators: [{
                type: Optional
            }] }]; }, null);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxpemUtcm91dGVyLWNvbmZpZy1sb2FkZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sb2NhbGl6ZS1yb3V0ZXIvIiwic291cmNlcyI6WyJsaWIvbG9jYWxpemUtcm91dGVyLWNvbmZpZy1sb2FkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFDTCxzQkFBc0IsRUFDdEIsNEJBQTRCLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFDakYsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7QUFFMUQ7O0dBRUc7QUFFSCxNQUFNLE9BQU8sMEJBQTJCLFNBQVEsc0JBQXNCO0lBRXBFLFlBQThELFFBQXdCLEVBQzFFLFNBQW1CLEVBQ1AsTUFBcUM7UUFDM0QsS0FBSyxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUhtQyxhQUFRLEdBQVIsUUFBUSxDQUFnQjtJQUl0RixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILElBQUksQ0FBQyxJQUFZO1FBQ2YsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQTZCLEVBQUUsRUFBRTtZQUM3RCxPQUFPO2dCQUNMLFVBQVUsRUFBRSxPQUFPLENBQUMsVUFBVTtnQkFDOUIsTUFBTSxFQUFFLENBQUMsY0FBd0IsRUFBRSxFQUFFO29CQUNuQyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO29CQUM5QyxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUU1RCxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBVSxFQUFFLGFBQWtCLEVBQUUsRUFBRTt3QkFDMUQsTUFBTSxTQUFTLEdBQUcsU0FBUyxDQUFDLEtBQUssRUFBRSxhQUFhLENBQUMsQ0FBQzt3QkFFbEQsSUFBSSxLQUFLLEtBQUssTUFBTSxFQUFFOzRCQUNwQix3QkFBd0I7NEJBQ3hCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUM7eUJBQy9EOzZCQUFNOzRCQUNMLE9BQU8sU0FBUyxDQUFDO3lCQUNsQjtvQkFDSCxDQUFDLENBQUM7b0JBQ0YsT0FBTyxNQUFNLENBQUM7Z0JBQ2hCLENBQUM7YUFDRixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzs0RUFuQ1UsMEJBQTBCLDZFQUExQiwwQkFBMEIsY0FFakIsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQzttQ0FGekMsMEJBQTBCO2NBRHRDLFVBQVU7O3NCQUdJLE1BQU07dUJBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQzs7c0JBRXZDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBST1VURVMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtcbiAgU3lzdGVtSnNOZ01vZHVsZUxvYWRlciwgTmdNb2R1bGVGYWN0b3J5LCBJbmplY3RvcixcbiAgU3lzdGVtSnNOZ01vZHVsZUxvYWRlckNvbmZpZywgT3B0aW9uYWwsIENvbXBpbGVyLCBJbmplY3RhYmxlLCBJbmplY3QsIGZvcndhcmRSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBMb2NhbGl6ZVBhcnNlciB9IGZyb20gJy4vbG9jYWxpemUtcm91dGVyLnBhcnNlcic7XG5cbi8qKlxuICogRXh0ZW5zaW9uIG9mIFN5c3RlbUpzTmdNb2R1bGVMb2FkZXIgdG8gZW5hYmxlIGxvY2FsaXphdGlvbiBvZiByb3V0ZSBvbiBsYXp5IGxvYWRcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIExvY2FsaXplUm91dGVyQ29uZmlnTG9hZGVyIGV4dGVuZHMgU3lzdGVtSnNOZ01vZHVsZUxvYWRlciB7XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChmb3J3YXJkUmVmKCgpID0+IExvY2FsaXplUGFyc2VyKSkgcHJpdmF0ZSBsb2NhbGl6ZTogTG9jYWxpemVQYXJzZXIsXG4gICAgICAgICAgICAgIF9jb21waWxlcjogQ29tcGlsZXIsXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIGNvbmZpZz86IFN5c3RlbUpzTmdNb2R1bGVMb2FkZXJDb25maWcpIHtcbiAgICBzdXBlcihfY29tcGlsZXIsIGNvbmZpZyk7XG4gIH1cblxuICAvKipcbiAgICogRXh0ZW5kIGxvYWQgd2l0aCBjdXN0b20gZnVuY3Rpb25hbGl0eVxuICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aFxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxOZ01vZHVsZUZhY3Rvcnk8YW55Pj59XG4gICAqL1xuICBsb2FkKHBhdGg6IHN0cmluZyk6IFByb21pc2U8TmdNb2R1bGVGYWN0b3J5PGFueT4+IHtcbiAgICByZXR1cm4gc3VwZXIubG9hZChwYXRoKS50aGVuKChmYWN0b3J5OiBOZ01vZHVsZUZhY3Rvcnk8YW55PikgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbW9kdWxlVHlwZTogZmFjdG9yeS5tb2R1bGVUeXBlLFxuICAgICAgICBjcmVhdGU6IChwYXJlbnRJbmplY3RvcjogSW5qZWN0b3IpID0+IHtcbiAgICAgICAgICBjb25zdCBtb2R1bGUgPSBmYWN0b3J5LmNyZWF0ZShwYXJlbnRJbmplY3Rvcik7XG4gICAgICAgICAgY29uc3QgZ2V0TWV0aG9kID0gbW9kdWxlLmluamVjdG9yLmdldC5iaW5kKG1vZHVsZS5pbmplY3Rvcik7XG5cbiAgICAgICAgICBtb2R1bGUuaW5qZWN0b3JbJ2dldCddID0gKHRva2VuOiBhbnksIG5vdEZvdW5kVmFsdWU6IGFueSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZ2V0UmVzdWx0ID0gZ2V0TWV0aG9kKHRva2VuLCBub3RGb3VuZFZhbHVlKTtcblxuICAgICAgICAgICAgaWYgKHRva2VuID09PSBST1VURVMpIHtcbiAgICAgICAgICAgICAgLy8gdHJhbnNsYXRlIGxhenkgcm91dGVzXG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLmxvY2FsaXplLmluaXRDaGlsZFJvdXRlcyhbXS5jb25jYXQoLi4uZ2V0UmVzdWx0KSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gZ2V0UmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgICAgcmV0dXJuIG1vZHVsZTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KTtcbiAgfVxufVxuIl19