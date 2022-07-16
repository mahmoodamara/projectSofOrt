import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cars } from '../models/cars.model';
import { Home } from '../models/home.model';
import { CarsService } from '../services/cars.service';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  constructor( private router:Router , private carservice:CarsService ) { }
  allCars:Cars[] =[];

  
  ngOnInit(): void {
  this.getAllCars();
  }
  getAllCars(){
    this.carservice.getCars().subscribe((data)=>{
      this.allCars=data;
    })
  }

  image:any="https://media.ed.edmunds-media.com/mazda/6/2021/oem/2021_mazda_6_sedan_carbon-edition_fq_oem_1_1600.jpg";

  
}
