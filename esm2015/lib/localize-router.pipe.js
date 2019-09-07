/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe, ChangeDetectorRef } from '@angular/core';
import { LocalizeRouterService } from './localize-router.service';
import { equals } from './util';
/** @type {?} */
const VIEW_DESTROYED_STATE = 128;
export class LocalizeRouterPipe {
    /**
     * @param {?} localize
     * @param {?} _ref
     */
    constructor(localize, _ref) {
        this.localize = localize;
        this._ref = _ref;
        this.value = '';
        this.subscription = this.localize.routerEvents.subscribe((/**
         * @return {?}
         */
        () => {
            this.transform(this.lastKey);
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    /**
     * @param {?} query
     * @return {?}
     */
    transform(query) {
        if (!query || query.length === 0 || !this.localize.parser.currentLang) {
            return query;
        }
        if (equals(query, this.lastKey) && equals(this.lastLanguage, this.localize.parser.currentLang)) {
            return this.value;
        }
        this.lastKey = query;
        this.lastLanguage = this.localize.parser.currentLang;
        /** translate key and update values */
        this.value = this.localize.translateRoute(query);
        this.lastKey = query;
        // if view is already destroyed, ignore firing change detection
        if (((/** @type {?} */ (this._ref)))._view.state & VIEW_DESTROYED_STATE) {
            return this.value;
        }
        this._ref.detectChanges();
        return this.value;
    }
}
LocalizeRouterPipe.decorators = [
    { type: Pipe, args: [{
                name: 'localize',
                pure: false // required to update the value when the promise is resolved
            },] }
];
/** @nocollapse */
LocalizeRouterPipe.ctorParameters = () => [
    { type: LocalizeRouterService },
    { type: ChangeDetectorRef }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    LocalizeRouterPipe.prototype.value;
    /**
     * @type {?}
     * @private
     */
    LocalizeRouterPipe.prototype.lastKey;
    /**
     * @type {?}
     * @private
     */
    LocalizeRouterPipe.prototype.lastLanguage;
    /**
     * @type {?}
     * @private
     */
    LocalizeRouterPipe.prototype.subscription;
    /**
     * @type {?}
     * @private
     */
    LocalizeRouterPipe.prototype.localize;
    /**
     * @type {?}
     * @private
     */
    LocalizeRouterPipe.prototype._ref;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxpemUtcm91dGVyLnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sb2NhbGl6ZS1yb3V0ZXIvIiwic291cmNlcyI6WyJsaWIvbG9jYWxpemUtcm91dGVyLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBaUIsSUFBSSxFQUFFLGlCQUFpQixFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRWxFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxRQUFRLENBQUM7O01BRTFCLG9CQUFvQixHQUFHLEdBQUc7QUFNaEMsTUFBTSxPQUFPLGtCQUFrQjs7Ozs7SUFPN0IsWUFBb0IsUUFBK0IsRUFBVSxJQUF1QjtRQUFoRSxhQUFRLEdBQVIsUUFBUSxDQUF1QjtRQUFVLFNBQUksR0FBSixJQUFJLENBQW1CO1FBTjVFLFVBQUssR0FBbUIsRUFBRSxDQUFDO1FBT2pDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsU0FBUzs7O1FBQUMsR0FBRyxFQUFFO1lBQzVELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQy9CLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7OztJQUVELFdBQVc7UUFDVCxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNqQztJQUNILENBQUM7Ozs7O0lBR0QsU0FBUyxDQUFDLEtBQXFCO1FBQzdCLElBQUksQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUU7WUFDckUsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELElBQUksTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDOUYsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQ25CO1FBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUM7UUFFckQsc0NBQXNDO1FBQ3RDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsK0RBQStEO1FBQy9ELElBQUksQ0FBQyxtQkFBTSxJQUFJLENBQUMsSUFBSSxFQUFBLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLG9CQUFvQixFQUFFO1lBQ3hELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztTQUNuQjtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDMUIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7OztZQTNDRixJQUFJLFNBQUM7Z0JBQ0osSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLElBQUksRUFBRSxLQUFLLENBQUMsNERBQTREO2FBQ3pFOzs7O1lBVFEscUJBQXFCO1lBREEsaUJBQWlCOzs7Ozs7O0lBWTdDLG1DQUFtQzs7Ozs7SUFDbkMscUNBQWdDOzs7OztJQUNoQywwQ0FBNkI7Ozs7O0lBQzdCLDBDQUFtQzs7Ozs7SUFHdkIsc0NBQXVDOzs7OztJQUFFLGtDQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGVUcmFuc2Zvcm0sIFBpcGUsIENoYW5nZURldGVjdG9yUmVmLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExvY2FsaXplUm91dGVyU2VydmljZSB9IGZyb20gJy4vbG9jYWxpemUtcm91dGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBlcXVhbHMgfSBmcm9tICcuL3V0aWwnO1xuXG5jb25zdCBWSUVXX0RFU1RST1lFRF9TVEFURSA9IDEyODtcblxuQFBpcGUoe1xuICBuYW1lOiAnbG9jYWxpemUnLFxuICBwdXJlOiBmYWxzZSAvLyByZXF1aXJlZCB0byB1cGRhdGUgdGhlIHZhbHVlIHdoZW4gdGhlIHByb21pc2UgaXMgcmVzb2x2ZWRcbn0pXG5leHBvcnQgY2xhc3MgTG9jYWxpemVSb3V0ZXJQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSwgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSB2YWx1ZTogc3RyaW5nIHwgYW55W10gPSAnJztcbiAgcHJpdmF0ZSBsYXN0S2V5OiBzdHJpbmcgfCBhbnlbXTtcbiAgcHJpdmF0ZSBsYXN0TGFuZ3VhZ2U6IHN0cmluZztcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbG9jYWxpemU6IExvY2FsaXplUm91dGVyU2VydmljZSwgcHJpdmF0ZSBfcmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5sb2NhbGl6ZS5yb3V0ZXJFdmVudHMuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMudHJhbnNmb3JtKHRoaXMubGFzdEtleSk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cblxuICB0cmFuc2Zvcm0ocXVlcnk6IHN0cmluZyB8IGFueVtdKTogc3RyaW5nIHwgYW55W10ge1xuICAgIGlmICghcXVlcnkgfHwgcXVlcnkubGVuZ3RoID09PSAwIHx8ICF0aGlzLmxvY2FsaXplLnBhcnNlci5jdXJyZW50TGFuZykge1xuICAgICAgcmV0dXJuIHF1ZXJ5O1xuICAgIH1cbiAgICBpZiAoZXF1YWxzKHF1ZXJ5LCB0aGlzLmxhc3RLZXkpICYmIGVxdWFscyh0aGlzLmxhc3RMYW5ndWFnZSwgdGhpcy5sb2NhbGl6ZS5wYXJzZXIuY3VycmVudExhbmcpKSB7XG4gICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICB9XG4gICAgdGhpcy5sYXN0S2V5ID0gcXVlcnk7XG4gICAgdGhpcy5sYXN0TGFuZ3VhZ2UgPSB0aGlzLmxvY2FsaXplLnBhcnNlci5jdXJyZW50TGFuZztcblxuICAgIC8qKiB0cmFuc2xhdGUga2V5IGFuZCB1cGRhdGUgdmFsdWVzICovXG4gICAgdGhpcy52YWx1ZSA9IHRoaXMubG9jYWxpemUudHJhbnNsYXRlUm91dGUocXVlcnkpO1xuICAgIHRoaXMubGFzdEtleSA9IHF1ZXJ5O1xuICAgIC8vIGlmIHZpZXcgaXMgYWxyZWFkeSBkZXN0cm95ZWQsIGlnbm9yZSBmaXJpbmcgY2hhbmdlIGRldGVjdGlvblxuICAgIGlmICgoPGFueT4gdGhpcy5fcmVmKS5fdmlldy5zdGF0ZSAmIFZJRVdfREVTVFJPWUVEX1NUQVRFKSB7XG4gICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICB9XG4gICAgdGhpcy5fcmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgfVxufVxuIl19