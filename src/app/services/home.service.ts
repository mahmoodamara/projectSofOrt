import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  baseURL: string = 'http://localhost:3000/api/home';
  headers = { 'content-type': 'application/json' };
  constructor(private http : HttpClient) { }
// A function continues the request to retrieve the information to the Home page and returns the information we will use
  gethomeinfo():Observable<any>{
    return this.http.get(this.baseURL);
  }
}
