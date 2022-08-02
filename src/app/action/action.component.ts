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




  codes:Email[] =[];
  isWinner : string
  isBuyDirectly : boolean = false
  isBuyDirectly2 : boolean = false
  code : number;
  carSerialnumber:any;
  serial:any;
  timeAuction:string=''
  ngOnInit(): void {
    // this.getCodes();
    this.carSerialnumber=this.actRouter.snapshot.params['serialNumber'];

    this.getCarAuction();
    this.getMaxPrice();
     this.timer();


      setInterval(()=>{
        this.serial=this.getCarAuction();
      },1000)
  }

  ngOnDestroy() {
    if (this.serial) {
      clearInterval(this.serial);
    }
  }

getCarAuction(){
    this.acutionservice.getOneActionInfo(this.carSerialnumber).subscribe(data=>{
      this.auctions=data;
      this.timeAuction = this.auctions[0].timeAction;
      this.maxPrice = this.auctions[0].maxPrice;
      this.minPrice = this.auctions[0].minPrice;
      this.carType = this.auctions[0].carType;
    });
}

// getCodes(){
//   this.acutionservice.getCodeInfo().subscribe(data=>{
//     this.codes=data;
//   });
// }
//  maxPrice:number=0;
getMaxPrice(){
  this.acutionservice.getMxPrice(Number(this.carSerialnumber)).subscribe(data=>{
    this.maxPriceArray=data;
    this.bidValue=this.maxPriceArray[0].bidValue;
  });
}


checkPrice(){
        if(this.priceAdd>this.minPrice && this.priceAdd<this.maxPrice && this.priceAdd>this.bidValue){
          return true;
        }
  return false
}


// sendEmail(){
//   this.acutionservice.Sendemail().subscribe((res)=>{
//     console.log("sendEmail");
//     this.getCodes();
//  })
// }
// sendEmailWinner(ac:Auction){
//   if(this.price==ac.maxPrice){
//     this.isBuyDirectly2 = true;
//     this.sendEmail();
// }
// }

addPrice(){
  if(this.checkPrice()){
    this.acutionservice.participateInTheAuction(this.priceAdd,(this.carSerialnumber),this.auctions[0]).subscribe((res) => {
    }
    );
    alert("add")
  }else{
    alert("notadd")
  }
  this.getCarAuction();
  this.getMaxPrice();

}

// checkCode():boolean{
//   for(let code of this.codes){
//     if(this.code == code.rand){
//       this.onCodeDelete(code._id);
//       return true;
//     }
//   }
//   return false;
// }


// clickToBuyDirectly(){
//  this.sendEmail();
//   this.isBuyDirectly = true;
// }

// clickOk(ac:Auction){
//     if(this.checkCode()==true){
//         this.acutionservice.SendemailWinner().subscribe((res)=>{
//           console.log("sendEmail");
//   });

//   ac.isButtonVisible=false;
//   this.acutionservice.putAuction(ac).subscribe((res)=>{
//     this.getCarAuction();
//     console.log("updateing")
//   });
// }
//  }

// onCodeDelete(_id: string) {
//   this.acutionservice.deleteEmail(_id).subscribe((res) => {
//     this.getCodes();
//   });
//  }


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

