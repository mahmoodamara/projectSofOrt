import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  baseURL: string = 'http://localhost:3000/api/team';
  constructor(private http:HttpClient) { }
// A function continues the request to retrieve the information to the AboutUs page and returns the information we will use
  getteamtList():Observable<any>{
    return this.http.get(this.baseURL);
  }
}
