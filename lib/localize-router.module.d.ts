import { ModuleWithProviders, Injector } from '@angular/core';
import { LocalizeParser } from './localize-router.parser';
import { Routes } from '@angular/router';
import { LocalizeRouterConfig } from './localize-router.config';
import * as i0 from "@angular/core";
import * as i1 from "./localize-router.pipe";
import * as i2 from "@angular/common";
import * as i3 from "@angular/router";
import * as i4 from "@ngx-translate/core";
export declare class ParserInitializer {
    private injector;
    parser: LocalizeParser;
    routes: Routes;
    /**
     * CTOR
     * @param injector
     */
    constructor(injector: Injector);
    /**
     * @returns {Promise<any>}
     */
    appInitializer(): Promise<any>;
    /**
     * @param parser
     * @param routes
     * @returns {()=>Promise<any>}
     */
    generateInitializer(parser: LocalizeParser, routes: Routes[]): () => Promise<any>;
    static ngInjectableDef: i0.ɵɵInjectableDef<ParserInitializer>;
}
/**
 * @param p
 * @param parser
 * @param routes
 * @returns {any}
 */
export declare function getAppInitializer(p: ParserInitializer, parser: LocalizeParser, routes: Routes[]): any;
export declare class LocalizeRouterModule {
    static forRoot(routes: Routes, config?: LocalizeRouterConfig): ModuleWithProviders;
    static forChild(routes: Routes): ModuleWithProviders;
    static ngModuleDef: i0.ɵɵNgModuleDefWithMeta<LocalizeRouterModule, [typeof i1.LocalizeRouterPipe], [typeof i2.CommonModule, typeof i3.RouterModule, typeof i4.TranslateModule], [typeof i1.LocalizeRouterPipe]>;
    static ngInjectorDef: i0.ɵɵInjectorDef<LocalizeRouterModule>;
}
/**
 * @param localizeRouterModule
 * @returns {string}
 */
export declare function provideForRootGuard(localizeRouterModule: LocalizeRouterModule): string;
