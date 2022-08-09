import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarServiceService {
  baseURL: string = 'http://localhost:3000/api/treatment';
  constructor(private http:HttpClient) { }

  getTreatmentList():Observable<any>{
    return this.http.get(this.baseURL);
  }
}
