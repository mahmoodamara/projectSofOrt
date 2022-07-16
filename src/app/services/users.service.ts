import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseURL: string = 'http://localhost:3000/api/users';

  email:string=localStorage.getItem('token');
  url:string = `/shearchofemail?email=${this.email}`;

  headers = { 'content-type': 'application/json' };
  constructor(private http : HttpClient) { }

PostUser(user){
    return this.http.post<any>(this.baseURL+'/signup',user,{
      headers: this.headers
    });
  }
loginUser(user){
    return this.http.post<any>(this.baseURL+'/login',user,{
      headers: this.headers
    });
  }
  getUser():Observable<any>{
    return this.http.get(this.baseURL+this.url);
  }
  getToken() {
    return localStorage.getItem('token');
  }
}
