import { Component, OnInit } from '@angular/core';
import { Cars } from '../models/cars.model';
import { Email } from '../models/email.model';
import { Rent } from '../models/rent.model';
import { ActionService } from '../services/action.service';
import { CarsService } from '../services/cars.service';
import { ProfileService } from '../services/profile.service';
import { RentService } from '../services/rent.service';

@Component({
  selector: 'app-showcars',
  templateUrl: './showcars.component.html',
  styleUrls: ['./showcars.component.css']
})
export class ShowcarsComponent implements OnInit {
   cars:Cars[]=[];
   codes:Email[] =[];
   checkIn:any;
   checkOut:any;
   code : number;
   serialNumber:any;
   showMassegeSuccses:boolean = false;
   showMassegeError:boolean = false;
   mostWatchedArray:Cars[]=[];

   manufacturer:any;
   showMostWatched : boolean = true;
   showCar : boolean = true;



  car = new Cars();
  constructor(private carsService:CarsService , private acutionservice:ActionService,private rentService:RentService,private profileService:ProfileService) { }

  ngOnInit(): void {

    this.getCars();
    this.mostChecked();
    // this.getCodes();
    // this.timer();

  }

  mostChecked(){
    this.showMostWatched = true;
    this.showCar = false;
    this.carsService.getmaxViewsCar().subscribe((data)=>{
      this.mostWatchedArray=data
  })
  }


  mazda(){
    this.showMostWatched = false;
    this.showCar = true;
    this.manufacturer = 'mazda';
    this.getCars();
  }
  toyota(){
    this.showMostWatched = false;
    this.showCar = true;
    this.manufacturer = 'toyota';
    this.getCars();
  }
  ford(){
    this.showMostWatched = false;
    this.showCar = true;
    this.manufacturer = 'ford';
    this.getCars();
  }

  getCars(){
    this.carsService.getCarOfCatgory(this.manufacturer).subscribe((data)=>{
    this.mostWatchedArray=data;
     });
  }

  addToProfile(car:Cars){

    this.profileService.addToProfile(car).subscribe((data)=>{
      this.showMassegeSuccses = true;
     setTimeout(() => this.showMassegeSuccses = false, 2000);

    },err=>{

    })


    
  }




/*
  getCars():void{
    this.carsService.getCars().subscribe((data)=>{
      this.cars=data;
      this.updatecarInspectionDate();
    })
  }
  */

//   getCodes():void{
//     this.acutionservice.getCodeInfo().subscribe(data=>{
//       this.codes=data;
//     });
//   }



//   sendEmail():void{
//     this.acutionservice.Sendemail().subscribe((res)=>{
//       console.log("sendEmail");
//       this.getCodes();
//    })
//   }

//    editCar(car:Cars):void{
//     this.car=car;
//     this.sendEmail();
//   }

//   checkRent(car:Cars):boolean{
//     let checkInRent = new Date (car.checkIn).getTime();
//     let checkOutRent = new Date (car.checkOut).getTime();
//     let checkInNow = new Date (this.checkIn).getTime();
//     let checkOutNow = new Date (this.checkOut).getTime();

//     let now = new Date().getTime();
//     if(checkInNow >= now && this.checkCode()==true){
//     if(checkInNow < checkInRent &&  checkInNow < checkOutRent && checkOutNow < checkInRent   || checkInNow > checkOutRent ||
//       car.checkIn=="" && car.checkOut=="" ){
//         this.showMassegeSuccses = true;
//         setTimeout(()=>{
//           this.showMassegeSuccses = false;
//       }, 3000);
//       return true;
//     }
//     else{
//       this.showMassegeError = true;
//       setTimeout(()=>{
//         this.showMassegeError = false;
//     }, 3000);
//     }

//     }
//     else{
//       this.showMassegeError = true;
//     setTimeout(()=>{
//       this.showMassegeError = false;
//   }, 3000);
//     }
//     return false;
//   }

//    checkCode():boolean{
//     for(let code of this.codes){
//       if(this.code == code.rand){
//         return true;
//       }
//     }
//     return false;
//   }

//    rentCar():void{
//    if(this.checkRent(this.car) && this.checkCode()==true){
//     this.car.checkIn = this.checkIn;
//     this.car.checkOut = this.checkOut;
//     this.carsService.rentCar(this.car).subscribe((res)=>{
//       this.getCars();
//       console.log("update")
//     })
//    }
//   }

//   year : number;
//   month : number;
//   day : number;
//   timer(){
//     let d = new Date();
//     this.year=d.getFullYear();
//     this.month=d.getMonth()+1;
//     this.day=d.getDate();
//   }

//  updatecarInspectionDate():void{
//   for(let car of this.cars){
//    let d = new Date(car.carInspectionDate).getDate();
//    if(this.day==d){
//    this.carsService.sendEmail(car).subscribe((res)=>{
//      console.log("send email");
//    })
//   }
//   else{
//     console.log(false);
//   }
// }
// }



//  inteval =setInterval(this.timer,(1000));






}

