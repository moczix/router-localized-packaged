/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe, ChangeDetectorRef } from '@angular/core';
import { LocalizeRouterService } from './localize-router.service';
import { equals } from './util';
/** @type {?} */
var VIEW_DESTROYED_STATE = 128;
var LocalizeRouterPipe = /** @class */ (function () {
    function LocalizeRouterPipe(localize, _ref) {
        var _this = this;
        this.localize = localize;
        this._ref = _ref;
        this.value = '';
        this.subscription = this.localize.routerEvents.subscribe((/**
         * @return {?}
         */
        function () {
            _this.transform(_this.lastKey);
        }));
    }
    /**
     * @return {?}
     */
    LocalizeRouterPipe.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    /**
     * @param {?} query
     * @return {?}
     */
    LocalizeRouterPipe.prototype.transform = /**
     * @param {?} query
     * @return {?}
     */
    function (query) {
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
    };
    LocalizeRouterPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'localize',
                    pure: false // required to update the value when the promise is resolved
                },] }
    ];
    /** @nocollapse */
    LocalizeRouterPipe.ctorParameters = function () { return [
        { type: LocalizeRouterService },
        { type: ChangeDetectorRef }
    ]; };
    return LocalizeRouterPipe;
}());
export { LocalizeRouterPipe };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxpemUtcm91dGVyLnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sb2NhbGl6ZS1yb3V0ZXIvIiwic291cmNlcyI6WyJsaWIvbG9jYWxpemUtcm91dGVyLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBaUIsSUFBSSxFQUFFLGlCQUFpQixFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRWxFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxRQUFRLENBQUM7O0lBRTFCLG9CQUFvQixHQUFHLEdBQUc7QUFFaEM7SUFXRSw0QkFBb0IsUUFBK0IsRUFBVSxJQUF1QjtRQUFwRixpQkFJQztRQUptQixhQUFRLEdBQVIsUUFBUSxDQUF1QjtRQUFVLFNBQUksR0FBSixJQUFJLENBQW1CO1FBTjVFLFVBQUssR0FBbUIsRUFBRSxDQUFDO1FBT2pDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsU0FBUzs7O1FBQUM7WUFDdkQsS0FBSSxDQUFDLFNBQVMsQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDL0IsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7O0lBRUQsd0NBQVc7OztJQUFYO1FBQ0UsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDakM7SUFDSCxDQUFDOzs7OztJQUdELHNDQUFTOzs7O0lBQVQsVUFBVSxLQUFxQjtRQUM3QixJQUFJLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFO1lBQ3JFLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFDRCxJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQzlGLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztTQUNuQjtRQUNELElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDO1FBRXJELHNDQUFzQztRQUN0QyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLCtEQUErRDtRQUMvRCxJQUFJLENBQUMsbUJBQU0sSUFBSSxDQUFDLElBQUksRUFBQSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxvQkFBb0IsRUFBRTtZQUN4RCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7U0FDbkI7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQzFCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDOztnQkEzQ0YsSUFBSSxTQUFDO29CQUNKLElBQUksRUFBRSxVQUFVO29CQUNoQixJQUFJLEVBQUUsS0FBSyxDQUFDLDREQUE0RDtpQkFDekU7Ozs7Z0JBVFEscUJBQXFCO2dCQURBLGlCQUFpQjs7SUFtRC9DLHlCQUFDO0NBQUEsQUE1Q0QsSUE0Q0M7U0F4Q1ksa0JBQWtCOzs7Ozs7SUFDN0IsbUNBQW1DOzs7OztJQUNuQyxxQ0FBZ0M7Ozs7O0lBQ2hDLDBDQUE2Qjs7Ozs7SUFDN0IsMENBQW1DOzs7OztJQUd2QixzQ0FBdUM7Ozs7O0lBQUUsa0NBQStCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZVRyYW5zZm9ybSwgUGlwZSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTG9jYWxpemVSb3V0ZXJTZXJ2aWNlIH0gZnJvbSAnLi9sb2NhbGl6ZS1yb3V0ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGVxdWFscyB9IGZyb20gJy4vdXRpbCc7XG5cbmNvbnN0IFZJRVdfREVTVFJPWUVEX1NUQVRFID0gMTI4O1xuXG5AUGlwZSh7XG4gIG5hbWU6ICdsb2NhbGl6ZScsXG4gIHB1cmU6IGZhbHNlIC8vIHJlcXVpcmVkIHRvIHVwZGF0ZSB0aGUgdmFsdWUgd2hlbiB0aGUgcHJvbWlzZSBpcyByZXNvbHZlZFxufSlcbmV4cG9ydCBjbGFzcyBMb2NhbGl6ZVJvdXRlclBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtLCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIHZhbHVlOiBzdHJpbmcgfCBhbnlbXSA9ICcnO1xuICBwcml2YXRlIGxhc3RLZXk6IHN0cmluZyB8IGFueVtdO1xuICBwcml2YXRlIGxhc3RMYW5ndWFnZTogc3RyaW5nO1xuICBwcml2YXRlIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBsb2NhbGl6ZTogTG9jYWxpemVSb3V0ZXJTZXJ2aWNlLCBwcml2YXRlIF9yZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLmxvY2FsaXplLnJvdXRlckV2ZW50cy5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy50cmFuc2Zvcm0odGhpcy5sYXN0S2V5KTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuXG4gIHRyYW5zZm9ybShxdWVyeTogc3RyaW5nIHwgYW55W10pOiBzdHJpbmcgfCBhbnlbXSB7XG4gICAgaWYgKCFxdWVyeSB8fCBxdWVyeS5sZW5ndGggPT09IDAgfHwgIXRoaXMubG9jYWxpemUucGFyc2VyLmN1cnJlbnRMYW5nKSB7XG4gICAgICByZXR1cm4gcXVlcnk7XG4gICAgfVxuICAgIGlmIChlcXVhbHMocXVlcnksIHRoaXMubGFzdEtleSkgJiYgZXF1YWxzKHRoaXMubGFzdExhbmd1YWdlLCB0aGlzLmxvY2FsaXplLnBhcnNlci5jdXJyZW50TGFuZykpIHtcbiAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgIH1cbiAgICB0aGlzLmxhc3RLZXkgPSBxdWVyeTtcbiAgICB0aGlzLmxhc3RMYW5ndWFnZSA9IHRoaXMubG9jYWxpemUucGFyc2VyLmN1cnJlbnRMYW5nO1xuXG4gICAgLyoqIHRyYW5zbGF0ZSBrZXkgYW5kIHVwZGF0ZSB2YWx1ZXMgKi9cbiAgICB0aGlzLnZhbHVlID0gdGhpcy5sb2NhbGl6ZS50cmFuc2xhdGVSb3V0ZShxdWVyeSk7XG4gICAgdGhpcy5sYXN0S2V5ID0gcXVlcnk7XG4gICAgLy8gaWYgdmlldyBpcyBhbHJlYWR5IGRlc3Ryb3llZCwgaWdub3JlIGZpcmluZyBjaGFuZ2UgZGV0ZWN0aW9uXG4gICAgaWYgKCg8YW55PiB0aGlzLl9yZWYpLl92aWV3LnN0YXRlICYgVklFV19ERVNUUk9ZRURfU1RBVEUpIHtcbiAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgIH1cbiAgICB0aGlzLl9yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICB9XG59XG4iXX0=