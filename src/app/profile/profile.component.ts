import { Component, OnInit } from '@angular/core';
import { Profile } from '../models/peofile.model';
import { User } from '../models/user.model';
import { ProfileService } from '../services/profile.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private profileService:ProfileService , private userService: UsersService) { }
  Profile:Profile[]=[];
  user:any[]=[]
  ngOnInit(): void {

    this.getCars();
    this.getUser();
  }
  getCars(){
    this.profileService.getUserProfile().subscribe((data)=>{
    this.Profile=data;
     });
  }
  getUser(){
    this.userService.getUser().subscribe((data)=>{
    this.user=data;  
    // console.log(this.user);
    });
  }
}
