import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user = false;
  constructor(private router : Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("user") == "true"){
      this.user = true;
    }
  }
  logout(){
    localStorage.removeItem("user");
    this.router.navigateByUrl("/");
  }

}
