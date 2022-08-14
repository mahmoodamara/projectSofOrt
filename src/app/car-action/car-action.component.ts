import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Auction } from '../models/action.model';
import { ActionService } from '../services/action.service';

@Component({
  selector: 'app-car-action',
  templateUrl: './car-action.component.html',
  styleUrls: ['./car-action.component.css']
})
export class CarActionComponent implements OnInit {
  constructor(private acutionservice:ActionService , private formBuilder:FormBuilder) { }
  auctions : Auction[]=[];

  ngOnInit(): void {
    this.getCarsAuction();
  }
  //The function retrieves the vehicles that have an auction.
  getCarsAuction(){
    this.acutionservice.getactioninfo().subscribe(data=>{
      this.auctions=data;
    });
  }

}
