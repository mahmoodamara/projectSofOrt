import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cars } from '../models/cars.model';
import { Rent } from '../models/rent.model';

@Injectable({
  providedIn: 'root'
})
export class RentService {

  car:Cars[]=[];
  baseURLRentCars: string = 'http://localhost:3000/api/rent';
  constructor(private http : HttpClient ) { }

  getCarRent():Observable<any>{
    return this.http.get(this.baseURLRentCars);
  }

  postRent(rent:any): Observable<any>{
    return this.http.post(this.baseURLRentCars ,rent);
  }



  getOneRent(carSerialnumber:number):Observable<any>{
    //this.baseURLRentCars = `${this.baseURLRentCars}`
    return this.http.get(this.baseURLRentCars + `/serialNumber?serialNumber=${carSerialnumber}`);
  }

  deleteCarRent(_id: string,serialNumber:number) {
    return this.http.delete(this.baseURLRentCars + `/${_id}/${serialNumber}`);
  }
  deleteRent(_id: string){
    return this.http.delete(this.baseURLRentCars + `/${_id}`);
  }

  deleteOneUserRent(email,serialNumber){
    return this.http.get(this.baseURLRentCars + `/${serialNumber}/${email}`);
  }

}
