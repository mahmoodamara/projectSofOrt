import { Component, OnInit } from '@angular/core';
import { Rent } from 'src/app/models/rent.model';
import { RentService } from 'src/app/services/rent.service';

@Component({
  selector: 'app-admin-rents',
  templateUrl: './admin-rents.component.html',
  styleUrls: ['../admin-action/admin-action.component.css']
})
export class AdminRentsComponent implements OnInit {

  rents:Rent[]=[];
  oneRent:any[]=[];
serial:number
  rent = new Rent();
  userRent = new Rent();

  constructor(private rentService:RentService) { }

  ngOnInit(): void {
    this.refreshRentList();
    this.getCarRent(1);
  }
// A function that retrieves details on rental cars.
  refreshRentList(){
    this.rentService.getCarRent().subscribe((res)=>{
      this.rents=res;
    })
  }
// The function retrieves the trainings of the selected vehicle.
  getCarRent(serialNumber:number){
    this.rentService.getOneRent(serialNumber).subscribe(data=>{
        this.oneRent=data[0].rent;
        this.serial=serialNumber;
        this.rent=this.oneRent[0];
        console.log(this.oneRent);
    })
  }
// A function that sends a request to the server to delete a rental car
  deleteCarRent(id:string){
    if (confirm('Are you sure to delete this record ?') == true) {
      this.rentService.deleteRent(id).subscribe(res=>{
        this.refreshRentList();
        alert("delete");
      })
    }
  }
// A function that sends a request to the server to delete a rental car user.
  deleteOneUserRent(){
    if (confirm('Are you sure to delete this record ?') == true) {
      this.rentService.deleteOneUserRent(this.rent.email,this.serial).subscribe(res=>{
        this.getCarRent(1);
        this.refreshRentList();
      })
    }
  }

  editUser(user){
    this.rent = user;
  }

  putUserAuction(){
    this.rentService.putUserAuction(this.rent).subscribe(res=>{
      this.getCarRent(this.rent.serialNumber);
    })
  }



}


