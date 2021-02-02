import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, Input, OnDestroy, Renderer2, Output, EventEmitter } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';
import { OverlayServiceService } from '../../../services/overlay-service.service';
@Component({
  selector: 'app-my-overlay',
  templateUrl: './my-overlay.component.html',
  styleUrls: ['./my-overlay.component.css']
})
export class MyOverlayComponent implements OnInit, OnDestroy {

  @Input() connectedTo: any;
  @Input() text: string;
  @Input() get id(): number {
    return this._id;
  };
  set id(id: number) {
    if (typeof id === 'string') {
      this._id = parseInt(id);
    } else {
      this._id = id;
    }
  }
  private _id: number;
  @Output() closed = new EventEmitter<any>();
  @ViewChild(CdkPortal) portal: ElementRef;
  overlayRef: OverlayRef;
  private nativeElement;

  constructor(private overlay: Overlay,
    private renderer: Renderer2,
    private overlayService: OverlayServiceService) {
  }

  ngOnInit() {
    this.overlayService.registerOverlay(this);
    console.log(this.connectedTo);
    if (this.connectedTo.getBoundingClientRect) {
      this.nativeElement = this.connectedTo;
    } else {
      this.nativeElement = this.connectedTo._elementRef.nativeElement;
    }
  }

  public showOverlay() {
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(this.nativeElement)
      .withPositions([
        { originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center', offsetX: -10 },
        { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center', offsetX: 10 },
        { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top', offsetY: 10 },
      ])
      .withGrowAfterOpen();
    const scrollStrategy = this.overlay.scrollStrategies.reposition();
    const overlayRef = this.overlay.create({ positionStrategy, scrollStrategy, hasBackdrop: true, backdropClass: 'my-backdrop' });
    this.overlayRef = overlayRef;
    overlayRef.detachments().subscribe(() => {
      this.renderer.removeClass(this.nativeElement, 'elevate');
    this.renderer.removeAttribute(this.nativeElement, 'id');
    });
    overlayRef.attach(this.portal);
    this.renderer.addClass(this.nativeElement, 'elevate');
    this.renderer.setAttribute(this.nativeElement, 'id', 'onboarding-active');
    overlayRef.backdropClick().subscribe(() => this.hideOverlay())
  }

  public hideOverlay() {
    if (this.overlayRef && this.overlayRef.hasAttached) {
      this.overlayService.wasClosed(this._id);
      this.overlayRef.dispose();
      this.closed.emit();
    }
  }

  ngOnDestroy() {
    this.hideOverlay();
    this.overlayService.destroyOverlay(this);
  }

}