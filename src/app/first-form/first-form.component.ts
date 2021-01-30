import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-first-form',
  templateUrl: './first-form.component.html',
  styleUrls: ['./first-form.component.css']
})
export class FirstFormComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  submit(){
    this.router.navigateByUrl("/game");
  }

}
