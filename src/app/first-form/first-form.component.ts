import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirstForm } from "../../services/firstForm.service";
import { FormBuilder, FormGroup, FormControl,Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-first-form',
  templateUrl: './first-form.component.html',
  styleUrls: ['./first-form.component.css']
})
export class FirstFormComponent implements OnInit {
  firstForm: FormGroup;
  responseList:any ;

  questionArray = [["Enter First Name","text"],["Enter Last Name","text"],["Enter Age","number"]];
  statusCheck = false;
  constructor(private router: Router, private formService : FirstForm) { }

  ngOnInit(): void {

    let group={}    
    

    this.formService.firstForm().subscribe((res) => {
      console.log(res[0]["question_instance"]);
      this.questionArray = res[0]["question_instance"];
      console.log(this.firstForm);
      this.questionArray.forEach(input_template=>{
        console.log(input_template["id"]);
        group[input_template["id"]]=new FormControl('');  
      })
      this.firstForm = new FormGroup(group);
      this.statusCheck = true;
      console.log(this.firstForm);


    },(err) =>{
      console.log(err.error);
    })
  }

  submit(){
    if(!this.firstForm.valid){
      Swal.fire({
        text: "Please fill all the fields",
        icon: "warning"
      }) 
    }
    else{

    
    console.log(this.firstForm.value);
    var tempDict;
    this.responseList = [];
    for(let key in this.firstForm.value){
      tempDict = {}
      tempDict["question"] = key
      tempDict["response"] = this.firstForm.value[key];
      this.responseList.push(tempDict);
    }
    console.log(this.responseList)

    this.formService.submitResponse(this.responseList).subscribe((res) => {
      console.log("res");
      Swal.fire({
        text: "Submitted",
        icon: "success"
      })  
      this.router.navigateByUrl("/game");
    },(err) => {
      console.log(err.error);
      Swal.fire({
        text: "Duplicate Response",
        icon: "warning"
      })  
    })

  }
}

}
