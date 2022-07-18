import { Component, OnInit } from '@angular/core';
import { Profile } from '../models/peofile.model';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private profileService:ProfileService) { }
  Profile:Profile[]=[];
  ngOnInit(): void {
    this.getCars();
  }
  getCars(){
    this.profileService.getUserProfile().subscribe((data)=>{
    this.Profile=data;
     });
  }
}
