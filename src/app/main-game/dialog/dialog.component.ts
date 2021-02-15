import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  items = [{ title: 'Slide 1' }, { title: 'Slide 2' }, { title: 'Slide 3' },{ title: 'Slide 4' }];
  selectedIndex = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

  prevButton(){
    this.selectedIndex = this.selectedIndex - 1;
    if(this.selectedIndex <0){
      this.selectedIndex = 0;
    }

  }

  nextButton(){
    this.selectedIndex = this.selectedIndex + 1;
    if(this.selectedIndex >2){
      this.selectedIndex = 2;
    }
  }
}
