import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cars } from '../models/cars.model';
import { Profile } from '../models/profile.model';
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
  // A function that retrieves the information of the logged in user
  getUser(){
    this.userService.getUser().subscribe((data)=>{
    this.user=data;
    this.putUser = this.user[0];
    });
  }
  // A function that retrieves the vehicles saved by the logged in user
  getCars(){
    this.profileService.getUserProfile().subscribe((data)=>{
    this.Profile=data;
     });
  }

// A function allows updating the details of a logged in user
  putProfile(){
    this.userService.putUserProfile(this.putUser).subscribe(res=>{
      this.showSucessMessage = true;
      setTimeout(() => this.showSucessMessage = false, 2000);
    })
  }
// A function that allows for the deletion of vehicles that have been saved by a logged in user
  deleteCar(car:any){
    this.profileService.deleteCar(car.serialNumber).subscribe(res=>{
        this.getCars();
    })
  }

}
