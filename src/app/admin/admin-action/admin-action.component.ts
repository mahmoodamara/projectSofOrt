import { Component, OnInit } from '@angular/core';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Auction } from 'src/app/models/action.model';
import { UsersAuction } from 'src/app/models/usersAction';

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
  userAuction = new UsersAuction("",0,0,this.auction);
  users:any[]=[];
  showSuccssMessage = false;
  ngOnInit(): void {
    this.getCarsAuction();
  }
  // The function retrieves the vehicles that have an auction.
getCarsAuction(){
    this.acutionservice.getactioninfo().subscribe(data=>{
      this.auctions=data;
      this.auction.serialNumber=this.auctions[this.auctions.length-1].serialNumber+1
    });
}
// The function pulls out the users who were tempted by the Auction that we selected according to the SerialNumber.
getUserInAuction(serialNumber:number){
  this.acutionservice.getUsersInAuction(serialNumber).subscribe(data=>{
    this.users=data
    console.log(this.users);
  })
}
// A function for adding a car to the auction.
postCarAuction(){
  this.auction.timeAction = this.editDateAdd(this.auction.timeAction);
  this.acutionservice.PostCarAuction(this.auction).subscribe((res)=>{
    this.getCarsAuction();
  })
}
// A function receives a time and returns it in a different form.
editDate(date){
  const d = new Date(date)
 const time = d.getDate() +"/"+(d.getMonth()+1)+"/"+d.getFullYear()+" - " + d.getHours()+":"+d.getMinutes()+":"+d.getSeconds() ;
 return time;
}
// A function receives an Auction to start its update
editCar(carAuction){
  this.auction = carAuction;
}
editUserAuction(user){
  this.userAuction = user;
}
// A function that sends a request to the Server to update the Auction
putCarAuction(){
  this.acutionservice.putAuction(this.auction).subscribe((res)=>{
    this.getCarsAuction();
    alert("update");
  })
}


putUserAuction(){
  this.acutionservice.putUserAuction(this.userAuction).subscribe(res=>{
    console.log("update");
    this.showSuccssMessage = true;
    setTimeout(() => this.showSuccssMessage = false, 2000);
    this.getUserInAuction(this.userAuction.carNumber);

  })

}
// A function that sends a request to the server to delete an auction
deleteCarAuction(_id){
  if (confirm('Are you sure to delete this record ?') == true) {
  this.acutionservice.deleteCarAuction(_id).subscribe(res=>{
    this.getCarsAuction();
    alert("delete");
  })
}
}

deleteUserInCarAuction(_id,carNumber){
  if (confirm('Are you sure to delete this record ?') == true) {
    this.acutionservice.deleteUserInCarAuction(_id).subscribe(res=>{
      this.getCarsAuction();
      this.getUserInAuction(carNumber)
    })
  }
}

editDateAdd(date){
  //8 13,2022 16:48:10
  const d = new Date(date);
  let time = `${d.getMonth()+1} ${d.getDate()},${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:10`;
  return time;
}

}
