import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm:FormGroup;
  showErrorMessage: boolean=false;
  actiontime:number;
  image:string="assets/img/3071357.jpg"

  constructor(private formBuilder:FormBuilder, private router:Router ,private usersservise:UsersService) { }

  ngOnInit(): void {
      this.createaddform();
  }

  createaddform(){
    this.loginForm=this.formBuilder.group({
    email:['',[Validators.required ,Validators.email]]
  , password:['',[Validators.required ,Validators.minLength(8)]]
    
  })

}

onSubmit(){
  this.usersservise.loginUser(this.loginForm.value)
  .subscribe(
    res => {
      localStorage.setItem('token', this.loginForm.value.email);
      this.router.navigate(['home']);
    },err => console.log(err))  
    
 }
}
