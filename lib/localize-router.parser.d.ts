import { Routes, Route } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { LocalizeRouterSettings } from './localize-router.config';
/**
 * Abstract class for parsing localization
 */
export declare abstract class LocalizeParser {
    private translate;
    private location;
    private settings;
    locales: Array<string>;
    currentLang: string;
    routes: Routes;
    defaultLang: string;
    protected prefix: string;
    private _translationObject;
    private _wildcardRoute;
    private _languageRoute;
    constructor(translate: TranslateService, location: Location, settings: LocalizeRouterSettings);
    abstract load(routes: Routes): Promise<any>;
    protected init(routes: Routes): Promise<any>;
    initChildRoutes(routes: Routes): Route[];
    mutateRouterRootRoute(currentLanguage: string, previousLanguage: string, routes: Routes): void;
    translateRoutes(language: string): Observable<any>;
    private setRootLanguage;
    private _translateRouteTree;
    private _translateProperty;
    readonly urlPrefix: string;
    translateRoute(path: string): string;
    getLocationLang(url?: string): string;
    private _getBrowserLang;
    private _cachedLang;
    private _cacheWithLocalStorage;
    private _cacheWithCookies;
    private _returnIfInLocales;
    private translateText;
}
/**
 * Manually set configuration
 */
export declare class ManualParserLoader extends LocalizeParser {
    constructor(translate: TranslateService, location: Location, settings: LocalizeRouterSettings, locales?: string[], prefix?: string);
    load(routes: Routes): Promise<any>;
}
export declare class DummyLocalizeParser extends LocalizeParser {
    load(routes: Routes): Promise<unknown>;
}
