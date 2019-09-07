import { SystemJsNgModuleLoader, NgModuleFactory, SystemJsNgModuleLoaderConfig, Compiler } from '@angular/core';
import { LocalizeParser } from './localize-router.parser';
import * as i0 from "@angular/core";
/**
 * Extension of SystemJsNgModuleLoader to enable localization of route on lazy load
 */
export declare class LocalizeRouterConfigLoader extends SystemJsNgModuleLoader {
    private localize;
    constructor(localize: LocalizeParser, _compiler: Compiler, config?: SystemJsNgModuleLoaderConfig);
    /**
     * Extend load with custom functionality
     * @param {string} path
     * @returns {Promise<NgModuleFactory<any>>}
     */
    load(path: string): Promise<NgModuleFactory<any>>;
    static ngInjectableDef: i0.ɵɵInjectableDef<LocalizeRouterConfigLoader>;
}
