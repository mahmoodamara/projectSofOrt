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
// A function continues the request to retrieve all rental vehicles and returns the saved information
  getCarRent():Observable<any>{
    return this.http.get(this.baseURLRentCars);
  }
// Function continues the request to add a car rental queue
  postRent(rent:any): Observable<any>{
    return this.http.post(this.baseURLRentCars ,rent);
  }

// A function continues the request to retrieve information of one vehicle and returns the saved information

  getOneRent(carSerialnumber:number):Observable<any>{
    return this.http.get(this.baseURLRentCars + `/serialNumber?serialNumber=${carSerialnumber}`);
  }
// Function continues the request to delete a car that is rented.
  deleteCarRent(_id: string,serialNumber:number) {
    return this.http.delete(this.baseURLRentCars + `/${_id}/${serialNumber}`);
  }
  deleteRent(_id: string){
    return this.http.delete(this.baseURLRentCars + `/${_id}`);
  }
// Function continues the request to delete a user from a rented vehicle.
  deleteOneUserRent(email,serialNumber){
    return this.http.get(this.baseURLRentCars + `/${serialNumber}/${email}`);
  }

  putUserAuction(user) {
    return this.http.put(this.baseURLRentCars + `/${user.email}`, user);
  }

}
