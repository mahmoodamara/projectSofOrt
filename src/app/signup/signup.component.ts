import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  arr : any[]=[];
  signupForm:FormGroup;
  showSucessMessage: boolean=false;
  actiontime:number;
  image:string="assets/img/3071357.jpg"

  constructor(private formBuilder:FormBuilder, private usersservise:UsersService,private router:Router) { }

  ngOnInit(): void {
      this.createaddformSignUp();
  }

  createaddformSignUp(){
    this.signupForm=this.formBuilder.group({
     username:['',[Validators.required ,Validators.minLength(3)]]
    , email:['',[Validators.required ,Validators.email]]
    , password:['',[Validators.required ,Validators.minLength(8)]]
    , phone:['',[Validators.required ,Validators.minLength(9)]],

  })

}
onSubmitSignUp(){
  this.usersservise.PostUser(this.signupForm.value)
 .subscribe((data)=>{
  console.log(typeof(this.signupForm.value.phone));
  localStorage.setItem('token', data.token);
  this.showSucessMessage = true;
  setTimeout(() => this.showSucessMessage = false, 2000);
   this.signupForm.reset();
 },()=>{
   alert("Somthing went wrong");

  });
 }

 goToLogIn(){
  this.router.navigate(['/login']);
 }

}
