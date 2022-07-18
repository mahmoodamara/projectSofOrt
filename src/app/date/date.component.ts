import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Cars } from '../models/cars.model';
import { Rent } from '../models/rent.model';
import { CarsService } from '../services/cars.service';
import { RentService } from '../services/rent.service';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {

  car:Cars[] =[];
  rents:any[]=[];
  carSerialnumber:any;
  currentProduct:any;
  carType:any;
  listDates : any[]=[];
  rent = new Rent();
  showErrorMessage:boolean=false
  showSuccssMessage:boolean=false;

    constructor(private carservice : CarsService , private actRouter:ActivatedRoute,private rentService:RentService  ) { }

    ngOnInit(): void {
      this.carSerialnumber=this.actRouter.snapshot.params['serialNumber'];
      this.refreshCars();
      this.getRents();

    }
    refreshCars(){
      this.carservice.getOneCar(this.carSerialnumber).subscribe((data)=>{
      this.car=data;
      this.listDates=data;
      console.log(this.listDates);
      this.carType = this.car[0].manufacturer;
       });
    }

    getRents(){
      this.rentService.getOneRent(this.carSerialnumber).subscribe(data=>{
        this.rents=data;
       // console.log(this.rents);
      })
    }

    checkRent(){
      let f=0;
      let d = new Date().getDate();
      let dCheckIn =new Date(this.rent.checkIn).getDate();
      let dCheckOt =new Date(this.rent.checkOut).getDate();

    //  console.log(d);
     // console.log(dCheckIn);

      for(let i=0;i<this.rents.length;i++){
        if(this.rent.checkIn >= this.rents[i].rent[i].checkIn && this.rent.checkOut <= this.rents[i].rent[i].checkOut
          ){
          f=1;
        }
        if(dCheckIn < d){
          f=1;
        }
        if(dCheckOt < d){
          f=1;
        }
      }
      if(f==1)
       return false
      else
       return true;
        }




    rentCar(){
      this.rent.email=localStorage.getItem('token');
      this.rent.serialNumber = this.carSerialnumber;
      if(this.checkRent()){
      this.rentService.postRent(this.rent).subscribe(res=>{
        this.getRents();
        this.showSuccssMessage = true;
        setTimeout(() => this.showErrorMessage = false, 2000);
        //console.log("save");
      })
    }
    else{
      this.showErrorMessage = true;
      setTimeout(() => this.showErrorMessage = false, 2000);
    }

    }



}
