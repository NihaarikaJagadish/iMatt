import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consent-form',
  templateUrl: './consent-form.component.html',
  styleUrls: ['./consent-form.component.css']
})
export class ConsentFormComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit(): void {
  }

  agree(){
    this.router.navigateByUrl("/firstForm");
  }
  disagree(){
    this.router.navigateByUrl("/");
    localStorage.removeItem("user");
  }

}
