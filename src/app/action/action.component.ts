  import { Component, OnInit } from '@angular/core';
  import { FormBuilder } from '@angular/forms';
  import { ActivatedRoute } from '@angular/router';
  import { Auction } from '../models/action.model';
  import { Email } from '../models/email.model';
  import { UsersAuction } from '../models/usersAction';
  import { ActionService } from '../services/action.service';
  @Component({
    selector: 'app-action',
    templateUrl: './action.component.html',
    styleUrls: ['./action.component.css']
  })
  export class ActionComponent implements OnInit {

    constructor(private acutionservice:ActionService , private formBuilder:FormBuilder,private actRouter:ActivatedRoute) { }
    auctions : Auction[]=[];
    maxPrice:number;
    minPrice:number;
    carType:string;
    bidValue:number=0;
    maxPriceArray:UsersAuction[]=[];
    priceAdd:number;
    isButtonVisible : boolean;
    carSerialnumber:any;
    serial:any;
    max : any;
    timeAuction:string=''
    showSuccssMessage = false;
    showErrorMessage = false;
    ngOnInit(): void {
      this.carSerialnumber=this.actRouter.snapshot.params['serialNumber'];
      this.getCarAuction();
      this.getMaxPrice();
      this.timer();
        setInterval(()=>{
          this.serial=this.getCarAuction();
          this.max=this.getMaxPrice();
        },500)
    }

    ngOnDestroy() {
      if (this.serial) {
        clearInterval(this.serial);
        clearInterval(this.max);
      }
    }
  // The function retrieves the Auction details according to the SerialNumber that we sent with it by clicking on the Auction button that we selected
  getCarAuction(){
      this.acutionservice.getOneActionInfo(this.carSerialnumber).subscribe(data=>{
        this.auctions=data;
        this.timeAuction = this.auctions[0].timeAction;
        this.maxPrice = this.auctions[0].maxPrice;
        this.minPrice = this.auctions[0].minPrice;
        this.carType = this.auctions[0].carType;
        this.isButtonVisible =this.auctions[0].isButtonVisible;
    });
  }

  // The function retrieves the maximum price added to the Auction
  getMaxPrice(){
    this.acutionservice.getMxPrice(Number(this.carSerialnumber)).subscribe(data=>{
      this.maxPriceArray=data;
      if(this.maxPriceArray.length >0){
      this.bidValue=this.maxPriceArray[0].bidValue;
      }
    });
  }

  // The function checks the price the user wants to add
  checkPrice(){
          if(this.priceAdd>this.minPrice && this.priceAdd<this.maxPrice && this.priceAdd>this.bidValue+50){
            return true;
          }
    return false
  }
  // The function transfers the price and the user's details to the server after the tests
  addPrice(){
    if(this.checkPrice()){
      this.acutionservice.participateInTheAuction(this.priceAdd,(this.carSerialnumber),this.auctions[0]).subscribe((res) => {
      }
      );
      this.showSuccssMessage = true;
      setTimeout(() => this.showSuccssMessage = false, 2000);
    }else{
      this.showErrorMessage = true;
      setTimeout(() => this.showErrorMessage = false, 2000);
    }
    this.getCarAuction();
    this.getMaxPrice();

  }


  days:number=0;
  hours:number=0;
  minutes:number=0;
  seconds:number=0;
  // The function returns the time left for the auction
  timer(){
    const myfunc = setInterval(()=>{
    var countDownDate = new Date(this.timeAuction).getTime();
    var now = new Date().getTime();
    var timeleft = countDownDate - now;
    this.days= Math.floor(timeleft / (1000 * 60 * 60 * 24));
    this.hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    this.seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

    if(timeleft < 0){

      this.days=0;
      this.minutes=0;
      this.hours=0;
      this.seconds=0;
      this.getCarAuction();
    }
    }, 1000)
  }
  }

