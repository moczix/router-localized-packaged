import { PipeTransform, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { LocalizeRouterService } from './localize-router.service';
export declare class LocalizeRouterPipe implements PipeTransform, OnDestroy {
    private localize;
    private _ref;
    private value;
    private lastKey;
    private lastLanguage;
    private subscription;
    constructor(localize: LocalizeRouterService, _ref: ChangeDetectorRef);
    ngOnDestroy(): void;
    transform(query: string | any[]): string | any[];
}
