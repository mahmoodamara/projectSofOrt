import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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




  codes:Email[] =[];
  isWinner : string
  carSerialnumber:any;
  serial:any;
  max : any;
  timeAuction:string=''
  showSuccssMessage = false;
  showErrorMessage = false;
  ngOnInit(): void {
    // this.getCodes();
    this.carSerialnumber=this.actRouter.snapshot.params['serialNumber'];

    this.getCarAuction();
    this.getMaxPrice();
     this.timer();


      setInterval(()=>{
        this.serial=this.getCarAuction();
        this.max=this.getMaxPrice();
      },1000)
  }

  ngOnDestroy() {
    if (this.serial) {
      clearInterval(this.serial);
      clearInterval(this.max);
    }
  }

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


getMaxPrice(){
  this.acutionservice.getMxPrice(Number(this.carSerialnumber)).subscribe(data=>{
    this.maxPriceArray=data;
    this.bidValue=this.maxPriceArray[0].bidValue;
  });
}


checkPrice(){
        if(this.priceAdd>this.minPrice && this.priceAdd<this.maxPrice && this.priceAdd>this.bidValue+50){
          return true;
        }
  return false
}

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




//  carViews(ac:Auction){
//    ac.views++;
//    this.acutionservice.putAuction(ac).subscribe((res)=>{
//      console.log("update");
//      this.getCarAuction();
//    });
//  }
}

