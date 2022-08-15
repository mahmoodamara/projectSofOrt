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
//The function retrieves the 4 vehicles that were rented on the site.
  mostChecked(){
    this.showMostWatched = true;
    this.showCar = false;
    this.carsService.getmaxViewsCar().subscribe((data)=>{
      this.mostWatchedArray=data
  })
  }

//The function initializes the variable that stores the vehicles in Mazda
  mazda(){
    this.showMostWatched = false;
    this.showCar = true;
    this.manufacturer = 'mazda';
    this.getCars();
  }
  //The function initializes the variable that stores the vehicles in Toyota
  toyota(){
    this.showMostWatched = false;
    this.showCar = true;
    this.manufacturer = 'toyota';
    this.getCars();
  }
    //The function initializes the variable that stores the vehicles in Ford

  ford(){
    this.showMostWatched = false;
    this.showCar = true;
    this.manufacturer = 'ford';
    this.getCars();
  }
//The function extracts the vehicles according to the category selected in the previous functions.
  getCars(){
    this.carsService.getCarOfCatgory(this.manufacturer).subscribe((data)=>{
    this.mostWatchedArray=data;
     });
  }
//A function that adds the vehicle chosen by the user to save it in his profile.
  addToProfile(car:Cars){
    this.profileService.addToProfile(car).subscribe((data)=>{
      this.showMassegeSuccses = true;
     setTimeout(() => this.showMassegeSuccses = false, 2000);

    },err=>{

    })



  }



}

