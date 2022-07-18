import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private acutionservice:ActionService , private formBuilder:FormBuilder) { }
  auctions : Auction[]=[];
  codes:Email[] =[];
  maxPriceArray:UsersAuction[]=[];
  price:number;
  isWinner : string
  isBuyDirectly : boolean = false
  isBuyDirectly2 : boolean = false
  code : number;
  ngOnInit(): void {
    this.getCarsAuction();
    this.getCodes();
    this.getMaxPrice();
    this.timer();
  }

getCarsAuction(){
    this.acutionservice.getactioninfo().subscribe(data=>{
      this.auctions=data;
    });
}

getCodes(){
  this.acutionservice.getCodeInfo().subscribe(data=>{
    this.codes=data;
  });
}
 maxPrice:number=0;
checkPrice(auctionId:string,price:number){
  for (let action of this.auctions) {
      if(auctionId===action._id)
      {
        if(price>action.minPrice && price<action.maxPrice && price>this.maxPrice){

          return true;
        }
      }
  }
  return false
}
getMaxPrice(){
  this.acutionservice.getMxPrice().subscribe(data=>{
    this.maxPriceArray=data;
  });
}

sendEmail(){
  this.acutionservice.Sendemail().subscribe((res)=>{
    console.log("sendEmail");
    this.getCodes();
 })
}
sendEmailWinner(ac:Auction){
  if(this.price==ac.maxPrice){
    this.isBuyDirectly2 = true;
    this.sendEmail();
}
}

addPrice(action:Auction){
  if (this.checkPrice(action._id,this.price)) {
    this.acutionservice.participateInTheAuction(this.price,action).subscribe((res) => {
      this.getCarsAuction();
      this.getMaxPrice();
    });
  }
  this.sendEmailWinner(action);
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


clickToBuyDirectly(){
 this.sendEmail();
  this.isBuyDirectly = true;
}

clickOk(ac:Auction){
    if(this.checkCode()==true){
        this.acutionservice.SendemailWinner().subscribe((res)=>{
          console.log("sendEmail");
  });

  ac.isButtonVisible=false;
  this.acutionservice.putAuction(ac).subscribe((res)=>{
    this.getCarsAuction();
    console.log("updateing")
  });
}
 }

onCodeDelete(_id: string) {
  this.acutionservice.deleteEmail(_id).subscribe((res) => {
    this.getCodes();
  });
 }

 days:number=0;
 hours:number=0;
 minutes:number=0;
 seconds:number=0;

timer(){
  const myfunc = setInterval(()=>{
   var countDownDate = new Date('2022-07-19T17:53:00').getTime();
   var now = new Date().getTime();
   var timeleft = countDownDate - now;
   this.days= Math.floor(timeleft / (1000 * 60 * 60 * 24));
   this.hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
   this.minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
   this.seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

   if(timeleft < 0){
     clearInterval(myfunc);
     this.days=0;
     this.minutes=0;
     this.hours=0;
     this.seconds=0;
     for(let ac of this.auctions){
       ac.isButtonVisible=false;
       this.acutionservice.putAuction(ac).subscribe((res)=>{
        this.getCarsAuction();
        console.log("updateing")
      });
     }
  }
   }, 1000)
 }


 carViews(ac:Auction){
   ac.views++;
   this.acutionservice.putAuction(ac).subscribe((res)=>{
     console.log("update");
     this.getCarsAuction();
   });
 }
}

