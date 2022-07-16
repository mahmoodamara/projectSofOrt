import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarsService } from '../services/cars.service';

@Component({
  selector: 'app-cardetails',
  templateUrl: './cardetails.component.html',
  styleUrls: ['./cardetails.component.css']
})
export class CardetailsComponent implements OnInit {

  products:any =[];
  carSerialnumber:any;
  currentProduct:any;
    constructor(private carservice : CarsService , private actRouter:ActivatedRoute  ) { }
  
    ngOnInit(): void {
      this.carSerialnumber=this.actRouter.snapshot.params['serialNumber'];
      this.refreshproducts();
    }
    refreshproducts(){
      this.carservice.getOneCar(this.carSerialnumber).subscribe((data)=>{
      this.products=data;
       });
    }


}
