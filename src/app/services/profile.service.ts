import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Cars } from '../models/cars.model';
import { Profile } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  baseURL: string = 'http://localhost:3000/api/profile';
  email:string=localStorage.getItem('token');
  headers = { 'content-type': 'application/json' };
  constructor(private http : HttpClient ,  private actRouter:ActivatedRoute ) { }

  //A function continues the request to retrieve details for one user and returns the saved information
  getUserProfile():Observable<any>{
    return this.http.get(this.baseURL+`/${this.email}`);
  }
  // A function continues the request to add a vehicle that the user liked to his profile.
  addToProfile(car: Cars ): Observable<any>{
    let body = JSON.stringify(new Profile(this.email,car,car.serialNumber));
    return this.http.post(this.baseURL, body,{
    headers: this.headers
    });
  }

  deleteCar(serialNumber: string) {
    return this.http.delete(this.baseURL + `/${serialNumber}`);
  }




}
