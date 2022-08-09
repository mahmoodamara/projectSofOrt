import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cars } from '../models/cars.model';
import { Profile } from '../models/peofile.model';
import { User } from '../models/user.model';
import { CarsService } from '../services/cars.service';
import { ProfileService } from '../services/profile.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private profileService:ProfileService , public userService: UsersService,private carService:CarsService,private router:Router) { }
  Profile:Profile[]=[];
  user:any[]=[];
  putUser = new User();
  showSucessMessage = false;
  ngOnInit(): void {
    this.getUser();
    this.getCars();
    console.log(localStorage.getItem('token'));
  }
  getUser(){
    this.userService.getUser().subscribe((data)=>{
    this.user=data;
    this.putUser = this.user[0];
    });
  }
  getCars(){
    this.profileService.getUserProfile().subscribe((data)=>{
    this.Profile=data;
     });
  }


  putProfile(){
    this.userService.putUserProfile(this.putUser).subscribe(res=>{
      this.showSucessMessage = true;
      setTimeout(() => this.showSucessMessage = false, 2000);
    })
  }

  deleteCar(car:any){
    this.profileService.deleteCar(car.serialNumber).subscribe(res=>{
        this.getCars();
    })
  }

}
