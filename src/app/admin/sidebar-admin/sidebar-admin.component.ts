import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar-admin.component.html',
  styleUrls: ['./sidebar-admin.component.css']
})
export class SidebarAdminComponent implements OnInit {
  dashbord = true;
  users = false;
  auction = false;
  rents = false;

  constructor() { }

  ngOnInit(): void {
  }

  dashbordActive(){
    this.dashbord=true;
  }
  usersActive(){
    this.users=true;
    this.dashbord = false;
    this.auction = false;
  }
  auctionActive(){
    this.auction=true;
    this.dashbord = false;
    this.users=false;
    this.rents=false;
  }

  rentActive(){
    this.rents=true;
    this.dashbord = false;
    this.users=false
    this.auction=false;
  }



}
