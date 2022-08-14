import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Email } from '../models/email.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseURL: string = 'http://localhost:3000/api/users';

  email:string= localStorage.getItem('token');
  url:string = `/shearchofemail?email=${this.email}`;

  headers = { 'content-type': 'application/json' };
  constructor(private http : HttpClient,private router:Router) { }
// Function continues the request to add a new user
PostUser(user){
    return this.http.post<any>(this.baseURL+'/signup',user,{
      headers: this.headers
    });
  }
// Function continues the request from Admin to add a new user
  addUser(user){
    return this.http.post<any>(this.baseURL,user,{
      headers: this.headers
    });
  }

// A function continues the request from the user to check the data and confirm to enter the website
loginUser(user){
    return this.http.post<any>(this.baseURL+'/login',user,{
      headers: this.headers
    });
  }
  // A function continues the request to retrieve the information of a single user
  getUser():Observable<any>{
    return this.http.get(this.baseURL+this.url);
  }
  // A function returns the user's token
  getToken() {
    return localStorage.getItem('token');
  }
  // A function continues a request to retrieve the information of all users and returns saved
  getUsers(){
    return this.http.get(this.baseURL);
  }
  // Function continues the request to update a user in the DB
  putUser(user: User) {
    return this.http.put(this.baseURL + `/newPassword/${user._id}`, user);
  }
  putUserProfile(user: User){
    return this.http.put(this.baseURL + `/${user._id}`, user);
  }

  //Function continues the request to delete a user from DB
  deleteUser(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }
  Sendemail(email):Observable<any>{
    let body = JSON.stringify(new Email(email));
    return this.http.post(`${this.baseURL}/sendEmail` , body,{
    headers: this.headers
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.clear();
    this.router.navigate(['login']);
  }

}
