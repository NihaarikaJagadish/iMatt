import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Login } from '../../services/login.sevice';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;
  constructor(private fb: FormBuilder, private router: Router, private loginService : Login) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:["",[Validators.required]],
      password:["",[Validators.required]]
    })
  }

  getEmailError(){
    if(this.loginForm.controls.email.hasError('required')){
      return 'Required'
    }else{
      return ''
    }
  }

  getPasswordError(){
    if(this.loginForm.controls.password.hasError('required')){
      return 'Required'
    }else{
      return ''
    }
  }

  
  login(){ 
    localStorage.setItem("user","true");
    console.log(this.loginForm.controls.email.value);
    Swal.fire({
      text: "Login Successful",
      icon: "success"
    }).then(result =>{
      this.router.navigateByUrl("/consent");
    });

    // this.loginService.login(this.loginForm.value).subscribe((res) => {
    //   console.log(res);
    //   Swal.fire({
    //     text: "Login Successful",
    //     icon: "success"
    //   })  
    //   this.router.navigateByUrl("/consent");
    //   localStorage.setItem("user","true");
    //   localStorage.setItem("exID","EC-001")
    // },(err) => {
    //   Swal.fire({
    //     text: err.error["message"],
    //     icon: "error"
    //   });
    // })
    
  }

}
