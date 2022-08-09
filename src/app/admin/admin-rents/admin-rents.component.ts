import { Component, OnInit } from '@angular/core';
import { Rent } from 'src/app/models/rent.model';
import { RentService } from 'src/app/services/rent.service';

@Component({
  selector: 'app-admin-rents',
  templateUrl: './admin-rents.component.html',
  styleUrls: ['./admin-rents.component.css']
})
export class AdminRentsComponent implements OnInit {

  rents:Rent[]=[];
  oneRent:any[]=[];
serial:number
  rent = new Rent();

  constructor(private rentService:RentService) { }

  ngOnInit(): void {
    this.refreshRentList();
    this.getCarRent(1);
  }

  refreshRentList(){
    this.rentService.getCarRent().subscribe((res)=>{
      this.rents=res;
    })
  }

  getCarRent(serialNumber:number){
    this.rentService.getOneRent(serialNumber).subscribe(data=>{
        this.oneRent=data[0].rent;
        this.serial=serialNumber;
        this.rent=this.oneRent[0];
        console.log(this.oneRent);
    })
  }

  deleteCarRent(id:string){
    if (confirm('Are you sure to delete this record ?') == true) {
      this.rentService.deleteRent(id).subscribe(res=>{
        this.refreshRentList();
        alert("delete");
      })
    }
  }

  deleteOneUserRent(){
    if (confirm('Are you sure to delete this record ?') == true) {
      this.rentService.deleteOneUserRent(this.rent.email,this.serial).subscribe(res=>{
        this.getCarRent(1);
        this.refreshRentList();
      })
    }
  }





}


