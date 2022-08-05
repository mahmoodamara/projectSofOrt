import { Component, OnInit } from '@angular/core';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Auction } from 'src/app/models/action.model';
import { ActionService } from 'src/app/services/action.service';

@Component({
  selector: 'app-admin-action',
  templateUrl: './admin-action.component.html',
  styleUrls: ['./admin-action.component.css']
})
export class AdminActionComponent implements OnInit {
  constructor(private acutionservice:ActionService ) { }
  auctions : Auction[]=[];
  auction = new Auction();
  users:any[]=[];

  ngOnInit(): void {
    this.getCarsAuction();
  }
  getCarsAuction(){
    this.acutionservice.getactioninfo().subscribe(data=>{
      this.auctions=data;
      this.auction.serialNumber=this.auctions[this.auctions.length-1].serialNumber+1
    });
}

getUserInAuction(serialNumber:number){
  this.acutionservice.getUsersInAuction(serialNumber).subscribe(data=>{
    this.users=data
    console.log(this.users);
  })
}

postCarAuction(){
  this.acutionservice.PostCarAuction(this.auction).subscribe((res)=>{
    this.getCarsAuction();
  })
}

editDate(date){
  const d = new Date(date)
 const time = d.getDay() +"/"+(d.getMonth()+1)+"/"+d.getFullYear()+" - " + d.getHours()+":"+d.getMinutes()+":"+d.getSeconds() ;
 return time;
}

editCar(carAuction){
  this.auction = carAuction;
}

putCarAuction(){
  this.acutionservice.putAuction(this.auction).subscribe((res)=>{
    this.getCarsAuction();
    alert("update");
  })
}


deleteCarAuction(_id){
  if (confirm('Are you sure to delete this record ?') == true) {
  this.acutionservice.deleteCarAuction(_id).subscribe(res=>{
    this.getCarsAuction();
    alert("delete");
  })
}
}

}
