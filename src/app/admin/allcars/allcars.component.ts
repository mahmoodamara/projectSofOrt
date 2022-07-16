import { Component, OnInit } from '@angular/core';
import { Cars } from 'src/app/models/cars.model';
import { CarsService } from 'src/app/services/cars.service';

@Component({
  selector: 'app-allcars',
  templateUrl: './allcars.component.html',
  styleUrls: ['./allcars.component.css']
})
export class AllcarsComponent implements OnInit {
  allCars:Cars[] =[];

  constructor(private carservice:CarsService) { }

  ngOnInit(): void {
    this.getAllCars();
  }
  getAllCars(){
    this.carservice.getCars().subscribe((data)=>{
      this.allCars=data;
      this.timer();
    })
  }
  year : number;
  month1 : number;
  day : number;
  hour : number;
  minutes : number;
  sec
  timer(){
    let d = new Date();
    this.year=d.getFullYear();
    this.month1=d.getMonth()+1;
    this.day=d.getDate();
    this.hour=d.getHours();
    this.minutes=d.getMinutes();
    this.sec=d.getSeconds();
  }



 updatecarInspectionDate(car:Cars){
   let d = new Date(car.carInspectionDate).getDate();
   let m = new Date(car.carInspectionDate).getMonth()+1;
   let y = new Date(car.carInspectionDate).getFullYear();
   let h = new Date(car.carInspectionDate).getHours();
   let mi = new Date(car.carInspectionDate).getMinutes();

   if(this.day==d && this.month1==m && this.year==y && this.hour==h && this.minutes==mi){
      if(h<10 && mi>9){
      car.carInspectionDate = `${y}-${m+6}-${d}T0${h}:${mi}`;
      }
      if(h==11 && mi<10){
        car.carInspectionDate = `${y}-${m+6}-${d}T${h}:0${mi}`;
      }
      if(h>=0 && h<10 && mi<10){
        car.carInspectionDate = `${y}-${m+6}-${d}T0${h}:0${mi}`;
      }
      this.carservice.putCar(car).subscribe((res)=>{
        console.log("update");
      })
   }
   
}



 inteval =setInterval(this.timer,(1000));

}
