import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Home } from '../models/home.model';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private router:Router , private homeservice:HomeService ) { }
  homes :Home[]=[]
  ngOnInit(): void {
    this.refreshHomeList();
  }

  refreshHomeList(){
    this.homeservice.gethomeinfo().subscribe((res)=>{
      this.homes=res;
    })
   
   
   }


}
