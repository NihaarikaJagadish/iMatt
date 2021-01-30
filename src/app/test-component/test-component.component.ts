import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.css']
})
export class TestComponentComponent implements OnInit {
  hide = true;
  time = 5;
  constructor() { }

  ngOnInit(): void {
  }
  handleEvent(e){
    console.log(e);
    console.log(e["action"]);
  }

}
