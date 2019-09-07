import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { LocalizeParser } from './localize-router.parser';
import { LocalizeRouterSettings } from './localize-router.config';
/**
 * Localization service
 * modifyRoutes
 */
export declare class LocalizeRouterService {
    parser: LocalizeParser;
    settings: LocalizeRouterSettings;
    private router;
    routerEvents: Subject<string>;
    constructor(parser: LocalizeParser, settings: LocalizeRouterSettings, router: Router);
    /**
     * Start up the service
     */
    init(): void;
    changeLanguage(lang: string): void;
    private traverseSnapshot;
    private parseSegmentValue;
    translateRoute(path: string | any[]): string | any[];
    private _routeChanged;
}
