import { Component, OnInit } from '@angular/core';
import { Cars } from 'src/app/models/cars.model';
import { CarsService } from 'src/app/services/cars.service';

@Component({
  selector: 'app-allcars',
  templateUrl: './allcars.component.html',
  styleUrls: ['../admin-action/admin-action.component.css']
})
export class AllcarsComponent implements OnInit {
  allCars:Cars[] =[];

  car = new Cars();
  showSuccssMessage = false;

  constructor(private carservice:CarsService) { }

  ngOnInit(): void {
    this.getAllCars();
  }
  getAllCars(){
    this.carservice.getCars().subscribe((data)=>{
      this.allCars=data;
      console.log(this.allCars)
    })
  }

  editCar(car){
    this.car = car;
  }
  postCar(){
    this.carservice.postCar(this.car).subscribe((res)=>{
      this.getAllCars();
      this.showSuccssMessage = true;
      setTimeout(() => this.showSuccssMessage = false, 2000);
    })
  }
  putCar(){
    this.carservice.putCar(this.car).subscribe(res=>{
      this.showSuccssMessage = true;
      setTimeout(() => this.showSuccssMessage = false, 2000);
    })
  }

  deleteCar(_id:string){
    if (confirm('Are you sure to delete this record ?') == true) {
    this.carservice.deleteCar(_id).subscribe(res =>{
      this.getAllCars();
    })

  }
  }

}
