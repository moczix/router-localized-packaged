import { InjectionToken, Provider } from '@angular/core';
import { Routes } from '@angular/router';
import { LocalizeRouterModule } from './localize-router.module';
export declare const LOCALIZE_ROUTER_FORROOT_GUARD: InjectionToken<LocalizeRouterModule>;
export declare const RAW_ROUTES: InjectionToken<Routes[]>;
/**
 * Type for Caching of default language
 */
export declare enum CacheMechanismEnum {
    LocalStorage = "LocalStorage",
    Cookie = "Cookie"
}
export declare type CacheMechanism = 'LocalStorage' | 'Cookie';
/**
 * Namespace for fail proof access of CacheMechanism
 */
export declare const USE_CACHED_LANG: InjectionToken<boolean>;
export declare const CACHE_MECHANISM: InjectionToken<CacheMechanism>;
export declare const CACHE_NAME: InjectionToken<string>;
export declare type DefaultLanguageFunction = (languages: string[], cachedLang?: string, browserLang?: string) => string;
export declare const DEFAULT_LANG_FUNCTION: InjectionToken<DefaultLanguageFunction>;
export declare const ALWAYS_SET_PREFIX: InjectionToken<boolean>;
/**
 * Config interface for LocalizeRouter
 */
export interface LocalizeRouterConfig {
    parser?: Provider;
    useCachedLang?: boolean;
    cacheMechanism?: CacheMechanism;
    cacheName?: string;
    defaultLangFunction?: DefaultLanguageFunction;
    alwaysSetPrefix?: boolean;
}
export declare class LocalizeRouterSettings implements LocalizeRouterConfig {
    useCachedLang: boolean;
    alwaysSetPrefix: boolean;
    cacheMechanism: any;
    cacheName: string;
    defaultLangFunction: any;
    constructor(useCachedLang?: boolean, alwaysSetPrefix?: boolean, cacheMechanism?: any, cacheName?: string, defaultLangFunction?: any);
}
