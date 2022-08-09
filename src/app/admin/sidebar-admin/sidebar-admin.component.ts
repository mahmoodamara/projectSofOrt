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
  service = false;
  cars = false;

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
    this.service = false;
    this.rents=false;
    this.cars = false;

  }
  auctionActive(){
    this.auction=true;
    this.dashbord = false;
    this.users=false;
    this.rents=false;
    this.service = false;
    this.cars = false;

  }

  rentActive(){
    this.rents=true;
    this.dashbord = false;
    this.users=false
    this.auction=false;
    this.service = false;
    this.cars = false;

  }

  carService(){
    this.rents=false;
    this.dashbord = false;
    this.users=false
    this.auction=false;
    this.service = true;
    this.cars = false;
  }

  AllCars(){
    this.rents=false;
    this.dashbord = false;
    this.users=false
    this.auction=false;
    this.service = false;
    this.cars = true;

  }



}
