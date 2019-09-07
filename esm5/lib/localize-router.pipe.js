import { Pipe, ChangeDetectorRef } from '@angular/core';
import { LocalizeRouterService } from './localize-router.service';
import { equals } from './util';
import * as i0 from "@angular/core";
import * as i1 from "./localize-router.service";
var VIEW_DESTROYED_STATE = 128;
var LocalizeRouterPipe = /** @class */ (function () {
    /**
     * CTOR
     * @param localize
     * @param _ref
     */
    function LocalizeRouterPipe(localize, _ref) {
        var _this = this;
        this.localize = localize;
        this._ref = _ref;
        this.value = '';
        this.subscription = this.localize.routerEvents.subscribe(function () {
            _this.transform(_this.lastKey);
        });
    }
    LocalizeRouterPipe.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    /**
     * Transform current url to localized one
     * @param query
     * @returns {string | any[]}
     */
    LocalizeRouterPipe.prototype.transform = function (query) {
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
        if (this._ref._view.state & VIEW_DESTROYED_STATE) {
            return this.value;
        }
        this._ref.detectChanges();
        return this.value;
    };
    /** @nocollapse */ LocalizeRouterPipe.ngPipeDef = i0.ɵɵdefinePipe({ name: "localize", type: LocalizeRouterPipe, factory: function LocalizeRouterPipe_Factory(t) { return new (t || LocalizeRouterPipe)(i0.ɵɵdirectiveInject(i1.LocalizeRouterService), i0.ɵɵinjectPipeChangeDetectorRef()); }, pure: false });
    return LocalizeRouterPipe;
}());
export { LocalizeRouterPipe };
/*@__PURE__*/ i0.ɵsetClassMetadata(LocalizeRouterPipe, [{
        type: Pipe,
        args: [{
                name: 'localize',
                pure: false // required to update the value when the promise is resolved
            }]
    }], function () { return [{ type: i1.LocalizeRouterService }, { type: i0.ChangeDetectorRef }]; }, null);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxpemUtcm91dGVyLnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sb2NhbGl6ZS1yb3V0ZXIvIiwic291cmNlcyI6WyJsaWIvbG9jYWxpemUtcm91dGVyLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFpQixJQUFJLEVBQUUsaUJBQWlCLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDbEYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFbEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFFBQVEsQ0FBQzs7O0FBRWhDLElBQU0sb0JBQW9CLEdBQUcsR0FBRyxDQUFDO0FBRWpDO0lBVUU7Ozs7T0FJRztJQUNILDRCQUFvQixRQUErQixFQUFVLElBQXVCO1FBQXBGLGlCQUlDO1FBSm1CLGFBQVEsR0FBUixRQUFRLENBQXVCO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBbUI7UUFWNUUsVUFBSyxHQUFtQixFQUFFLENBQUM7UUFXakMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUM7WUFDdkQsS0FBSSxDQUFDLFNBQVMsQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDL0IsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsd0NBQVcsR0FBWDtRQUNFLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ2pDO0lBQ0gsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxzQ0FBUyxHQUFULFVBQVUsS0FBcUI7UUFDN0IsSUFBSSxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRTtZQUNyRSxPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsSUFBSSxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUM5RixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7U0FDbkI7UUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztRQUVyRCxzQ0FBc0M7UUFDdEMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQiwrREFBK0Q7UUFDL0QsSUFBVyxJQUFJLENBQUMsSUFBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsb0JBQW9CLEVBQUU7WUFDeEQsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQ25CO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUMxQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQzs2RUEvQ1Usa0JBQWtCLHFFQUFsQixrQkFBa0I7NkJBWC9CO0NBMkRDLEFBcERELElBb0RDO1NBaERZLGtCQUFrQjttQ0FBbEIsa0JBQWtCO2NBSjlCLElBQUk7ZUFBQztnQkFDSixJQUFJLEVBQUUsVUFBVTtnQkFDaEIsSUFBSSxFQUFFLEtBQUssQ0FBQyw0REFBNEQ7YUFDekUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlVHJhbnNmb3JtLCBQaXBlLCBDaGFuZ2VEZXRlY3RvclJlZiwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBMb2NhbGl6ZVJvdXRlclNlcnZpY2UgfSBmcm9tICcuL2xvY2FsaXplLXJvdXRlci5zZXJ2aWNlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZXF1YWxzIH0gZnJvbSAnLi91dGlsJztcblxuY29uc3QgVklFV19ERVNUUk9ZRURfU1RBVEUgPSAxMjg7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ2xvY2FsaXplJyxcbiAgcHVyZTogZmFsc2UgLy8gcmVxdWlyZWQgdG8gdXBkYXRlIHRoZSB2YWx1ZSB3aGVuIHRoZSBwcm9taXNlIGlzIHJlc29sdmVkXG59KVxuZXhwb3J0IGNsYXNzIExvY2FsaXplUm91dGVyUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0sIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgdmFsdWU6IHN0cmluZyB8IGFueVtdID0gJyc7XG4gIHByaXZhdGUgbGFzdEtleTogc3RyaW5nIHwgYW55W107XG4gIHByaXZhdGUgbGFzdExhbmd1YWdlOiBzdHJpbmc7XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgLyoqXG4gICAqIENUT1JcbiAgICogQHBhcmFtIGxvY2FsaXplXG4gICAqIEBwYXJhbSBfcmVmXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGxvY2FsaXplOiBMb2NhbGl6ZVJvdXRlclNlcnZpY2UsIHByaXZhdGUgX3JlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMubG9jYWxpemUucm91dGVyRXZlbnRzLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLnRyYW5zZm9ybSh0aGlzLmxhc3RLZXkpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUcmFuc2Zvcm0gY3VycmVudCB1cmwgdG8gbG9jYWxpemVkIG9uZVxuICAgKiBAcGFyYW0gcXVlcnlcbiAgICogQHJldHVybnMge3N0cmluZyB8IGFueVtdfVxuICAgKi9cbiAgdHJhbnNmb3JtKHF1ZXJ5OiBzdHJpbmcgfCBhbnlbXSk6IHN0cmluZyB8IGFueVtdIHtcbiAgICBpZiAoIXF1ZXJ5IHx8IHF1ZXJ5Lmxlbmd0aCA9PT0gMCB8fCAhdGhpcy5sb2NhbGl6ZS5wYXJzZXIuY3VycmVudExhbmcpIHtcbiAgICAgIHJldHVybiBxdWVyeTtcbiAgICB9XG4gICAgaWYgKGVxdWFscyhxdWVyeSwgdGhpcy5sYXN0S2V5KSAmJiBlcXVhbHModGhpcy5sYXN0TGFuZ3VhZ2UsIHRoaXMubG9jYWxpemUucGFyc2VyLmN1cnJlbnRMYW5nKSkge1xuICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgfVxuICAgIHRoaXMubGFzdEtleSA9IHF1ZXJ5O1xuICAgIHRoaXMubGFzdExhbmd1YWdlID0gdGhpcy5sb2NhbGl6ZS5wYXJzZXIuY3VycmVudExhbmc7XG5cbiAgICAvKiogdHJhbnNsYXRlIGtleSBhbmQgdXBkYXRlIHZhbHVlcyAqL1xuICAgIHRoaXMudmFsdWUgPSB0aGlzLmxvY2FsaXplLnRyYW5zbGF0ZVJvdXRlKHF1ZXJ5KTtcbiAgICB0aGlzLmxhc3RLZXkgPSBxdWVyeTtcbiAgICAvLyBpZiB2aWV3IGlzIGFscmVhZHkgZGVzdHJveWVkLCBpZ25vcmUgZmlyaW5nIGNoYW5nZSBkZXRlY3Rpb25cbiAgICBpZiAoKDxhbnk+IHRoaXMuX3JlZikuX3ZpZXcuc3RhdGUgJiBWSUVXX0RFU1RST1lFRF9TVEFURSkge1xuICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgfVxuICAgIHRoaXMuX3JlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gIH1cbn1cbiJdfQ==