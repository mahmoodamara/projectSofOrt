import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cars } from '../models/cars.model';
import { Email } from '../models/email.model';
import { Rent } from '../models/rent.model';
import { ActionService } from '../services/action.service';
import { CarsService } from '../services/cars.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  cars:any =[];
  allCars:Cars[] =[];
  rents : Rent []=[];

  mostWatchedArray:Cars[]=[];
  manufacturer:any;
  showMostWatched : boolean = true;
  showCar : boolean = true;

  codes:Email[] =[];
  checkIn:any;
  checkOut:any;
  code : number;
  serialNumber:any;
  showMassegeSuccses:boolean = false;
  showMassegeError:boolean = false;
  car = new Cars("","","");

    constructor(private carservice : CarsService , private actRouter:ActivatedRoute  , private acutionservice:ActionService ) { }
  
    ngOnInit(): void {
      this.mostWatched();
      this.getCodes();
      this.getAllCars();
      this.getRentCar();
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

    mostWatched(){
      this.showMostWatched = true;
      this.showCar = false;
      this.carservice.getmaxViewsCar().subscribe((data)=>{
        this.mostWatchedArray=data
    })
    }

    getCars(){
      this.carservice.getCarOfCatgory(this.manufacturer).subscribe((data)=>{
      this.cars=data;
       });
    }

    getAllCars(){
      this.carservice.getCars().subscribe((data)=>{
        this.allCars=data;
      })
    }
     getCodes():void{
      this.acutionservice.getCodeInfo().subscribe(data=>{
        this.codes=data;
      });
    }

    getRentCar(){
      this.carservice.getCarRent().subscribe((data)=>{
        this.rents = data;
      })
    }
  
    carViews(car:Cars):void{
      car.views++;
      this.carservice.putCar(car).subscribe((data)=>{
        this.getCars();
      })
    }
  
    sendEmail():void{
      this.acutionservice.Sendemail().subscribe((res)=>{
        console.log("sendEmail");
        this.getCodes();
     })
    }


     editCar(car:Cars):void{
      this.car=car;
      this.sendEmail();
    }

    postCar(){
      this.car.checkIn=`${this.checkIn}T10:00`;
      this.car.checkOut=`${this.checkOut}T18:00`;
      if(this.checkRent(this.car) && this.checkCode()==true){
      this.carservice.postRent(this.car).subscribe((res)=>{
        console.log("post");
        this.getRentCar();
      })
    }
    }
  
    checkRent(car:Cars):boolean{
      let now = new Date().getTime();
      for(let rent of this.rents){
        if(car.serialNumber==rent.serialNumber){
      
      let checkInRent = new Date (rent.checkIn).getTime();
      let checkOutRent = new Date (rent.checkOut).getTime();
      let checkInNow = new Date (this.checkIn).getTime();
      let checkOutNow = new Date (this.checkOut).getTime();

      
    
      if(checkInNow >= now && this.checkCode()==true){
      if(checkInNow < checkInRent &&  checkInNow < checkOutRent && checkOutNow < checkInRent   || checkInNow > checkOutRent && checkOutNow> checkOutRent||
        car.checkIn=="" && car.checkOut=="" ){
          this.showMassegeSuccses = true;
          setTimeout(()=>{                         
            this.showMassegeSuccses = false;
        }, 3000);
        return true;
      }
      else{
        this.showMassegeError = true;
        setTimeout(()=>{                         
          this.showMassegeError = false;
      }, 3000);
      }
      
      }
      else{
        this.showMassegeError = true;
      setTimeout(()=>{                         
        this.showMassegeError = false;
    }, 3000);
      }
    }
    else{
    
        if(this.checkCode()==true && this.checkIn>=now && this.checkOut>this.checkIn ){
          this.showMassegeSuccses = true;
          setTimeout(()=>{                         
            this.showMassegeSuccses = false;
        }, 3000);
        }
        else{
          this.showMassegeError = true;
        setTimeout(()=>{                         
        this.showMassegeError = false;
        }, 3000);
        }
     
       return true;
    }
  }
      return false;
    } 
  
     checkCode():boolean{
      for(let code of this.codes){
        if(this.code == code.rand){
          this.onCodeDelete(code._id);
          return true;
        }
      }
      return false;
    }

    onCodeDelete(_id: string) {
      this.acutionservice.deleteEmail(_id).subscribe((res) => {
        this.getCodes();
      });
     }
    
    rentCar():void{
     if(this.checkRent(this.car) && this.checkCode()==true){
      this.car.checkIn = `${this.checkIn}T10:00`;
      this.car.checkOut = `${this.checkOut}T18:00`;
      this.carservice.rentCar(this.car).subscribe((res)=>{
        this.getCars();
        console.log("update")
      })
     } 
    }
  


    
}
