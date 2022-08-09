import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Cars } from '../models/cars.model';
import { EmailCarInspectionDate } from '../models/EmailCarInspectionDate.model';
import { Rent } from '../models/rent.model';
import { Treatment } from '../models/treatment.model';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  baseURL: string = 'http://localhost:3000/api/cars';
  baseURLMaxViews: string = 'http://localhost:3000/api/maxViewsCar';
  baseURLRentCar: string = 'http://localhost:3000/api/rentSort';
  baseURLRentCars: string = 'http://localhost:3000/api/rent';
  baseURLsendEmailCarInspectionDate: string = 'http://localhost:3000/api/sendEmailCarInspectionDate';
  baseURLtreatment:string ='http://localhost:3000/api/treatment'
  serialNumber:any
  baseURLOneCar : string ='';
  baseURLcatgory : string ='';

  email:string= localStorage.getItem('token');
  emailM:string="testamara144141@gmail.com"
  headers = { 'content-type': 'application/json' };
  constructor(private http : HttpClient ,  private actRouter:ActivatedRoute ) { }

  getCars():Observable<any>{
    return this.http.get(this.baseURL);
  }
  getmaxViewsCar():Observable<any>{
    return this.http.get(this.baseURLMaxViews);
  }
  getOneCar(carSerialnumber:number):Observable<any>{
    this.baseURLOneCar = `${this.baseURL}/serialNumber?serialNumber=${carSerialnumber}`
    return this.http.get(this.baseURLOneCar);
  }

  getCarOfCatgory(manufacturer:any):Observable<any>{
    this.baseURLcatgory = `${this.baseURL}/manufacturer?manufacturer=${manufacturer}`
    return this.http.get(this.baseURLcatgory);
  }


  putCar(car:Cars){
    return this.http.put(this.baseURL + `/${car._id}`, car);
  }

  postCartreatment(car:any):Observable<any>{
      let body = JSON.stringify(new Treatment(car));
      return this.http.post(this.baseURLtreatment, body);
  }

  postCar(car:any):Observable<any>{
    return this.http.post<any>(this.baseURL,car,{
      headers: this.headers
    });
}

  deleteCar(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }





}
