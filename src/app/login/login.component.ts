import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { UsersService } from '../services/users.service';
import { ViewChild,ElementRef } from '@angular/core'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm:FormGroup;
  showErrorMessage: boolean=false;
  actiontime:number;
  image:string="assets/img/3071357.jpg";
  email:string;
  user:any[]=[];
  newUser = new User();
  code:number;
  num1:number;
  num2:number;
  num3:number;
  num4:number;
  password:string;
  enterCode = false;
  @ViewChild('loginRef', {static: true }) loginElement: ElementRef;
  auth2 : any;
  show : boolean;
  Name : any;
  constructor(private formBuilder:FormBuilder, private router:Router ,private usersservise:UsersService) { }

  ngOnInit(): void {
      this.createaddform();
      this.getUser();
      localStorage.getItem('token');
  }
  getUser(){
    this.usersservise.getUser().subscribe((res)=>{
      this.user = res;
      this.newUser = this.user[0];
    })
  }

  createaddform(){
    this.loginForm=this.formBuilder.group({
    email:['',[Validators.required ]]
  , password:['',[Validators.required ,Validators.minLength(8)]]

  })

}

onSubmitLogin(){
  this.usersservise.loginUser(this.loginForm.value)
  .subscribe(
    res => {
      localStorage.setItem('token',  this.loginForm.value.email);
      this.usersservise.getUser();
      if(this.loginForm.value.email!='admin@gmail.com'){
             this.router.navigate(['home']).then(()=>{
               window.location.reload();
              
             });
      }
      else{
             this.router.navigate(['/sidebar-Admin']);
      }

    },(err)=>{
      console.log(err)
      this.showErrorMessage = true;
      setTimeout(() => this.showErrorMessage = false, 2000);

    })
 }

 sendEmail(){
  if(this.email.length>0){
    this.usersservise.Sendemail(this.email).subscribe((res=>{
      localStorage.setItem('token', this.email);
      this.code=res.rand;
    }))
    this.enterCode = true;
  }
 }

 courrectCode(){
  const code = this.num1+""+this.num2+""+this.num3+""+this.num4;
  return (Number(code));
}

checkCodeAndchangePassword(){
  if(this.courrectCode()==this.code){
    this.newUser.password = this.password;
    this.usersservise.putUser(this.newUser).subscribe(res=>{
      console.log("update");
    })
  }
}
goToSignUp(){
  this.router.navigate(['/signup']);

}

}
