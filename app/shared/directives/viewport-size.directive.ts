import { Directive, TemplateRef, ViewContainerRef, Input, OnDestroy } from '@angular/core';
import { LayoutService } from '../services/layout.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[ifViewportSize]'
})
export class ViewportSizeDirective implements OnDestroy {
  private _layoutSubcription: Subscription;
  private _layout: string;

  @Input('ifViewportSize')
  set layout(layout: string) {
    this._layout = layout;
    this.checkLarge(this.layoutService.getLayoutValue());
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private layoutService: LayoutService
  ) {
    this.viewContainer.clear();
    this._layoutSubcription = this.layoutService.getLayout$().subscribe(item => {
        this.checkLarge(item);
    });
  }

  private checkLarge(layout): void {
    this.viewContainer.clear();
    if (layout === this._layout) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

  ngOnDestroy() {
    this._layoutSubcription.unsubscribe();
  }
}
