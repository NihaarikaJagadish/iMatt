import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirstForm } from "../../services/firstForm.service";

@Component({
  selector: 'app-first-form',
  templateUrl: './first-form.component.html',
  styleUrls: ['./first-form.component.css']
})
export class FirstFormComponent implements OnInit {

  questionArray = [["Enter First Name","text"],["Enter Last Name","text"],["Enter Age","number"]];

  constructor(private router: Router, private formService : FirstForm) { }

  ngOnInit(): void {
    // this.formService.firstForm({"exID" : "EC-001"}).subscribe((res) => {
    //   console.log(res);
    // },(err) =>{
    //   console.log(err);
    // })
  }

  submit(){
    this.router.navigateByUrl("/game");
  }

}
