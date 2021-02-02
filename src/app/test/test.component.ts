import { Component, OnInit, AfterViewInit } from '@angular/core';
import { OverlayServiceService } from '../../services/overlay-service.service';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements AfterViewInit {
  
  isActive1 = true;
   isActive2 = false;

  constructor(private service: OverlayServiceService) {
  }

  ngAfterViewInit() {
    this.service.showOverlay(1);
  }

  restartOnboarding() {
    this.service.showOverlay(1);
  }

}
