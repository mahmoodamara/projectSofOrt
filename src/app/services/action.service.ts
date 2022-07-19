import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Auction } from '../models/action.model';
import { Email } from '../models/email.model';
import { User } from '../models/user.model';
import { UsersAuction } from '../models/usersAction';

@Injectable({
  providedIn: 'root'
})
export class ActionService {
  email:string=localStorage.getItem('token');
  baseURL: string = 'http://localhost:3000/api/action';
  baseURLUsers: string = 'http://localhost:3000/api/usersaction';
  baseURLAuction: string = 'http://localhost:3000/api/action/id';
  baseURLEmail: string = 'http://localhost:3000/api/sendEmail';
  baseURLEmailWinner: string = 'http://localhost:3000/api/sendEmailWinner';
  baseURLMaxPrice: string = 'http://localhost:3000/api/maxUsersaction';

  date :Date = new Date();




  headers = { 'content-type': 'application/json' };
  constructor(private http : HttpClient) { }

  getactioninfo():Observable<any>{
    return this.http.get(this.baseURL);
  }

  getOneActionInfo(serialNumber):Observable<any>{
    return this.http.get(this.baseURL +`/${serialNumber}`);
  }

  getCodeInfo():Observable<any>{
    return this.http.get(this.baseURLEmail);
  }

  getMxPrice(serialNumber:number):Observable<any>{
    return this.http.get(this.baseURLMaxPrice+`/${serialNumber}`);
  }

  participateInTheAuction(bidValue:number,carNumber:number,Action:Auction):Observable<any>{
    let body = JSON.stringify(new UsersAuction(this.email,bidValue,carNumber,Action));
    return this.http.post(this.baseURLUsers , body,{
    headers: this.headers
    });

  }
  Sendemail():Observable<any>{
    let body = JSON.stringify(new Email(this.email));
    return this.http.post(this.baseURLEmail , body,{
    headers: this.headers
    });
  }

  SendemailWinner():Observable<any>{
    let body = JSON.stringify(new Email(this.email));
    return this.http.post(this.baseURLEmailWinner , body,{
    headers: this.headers
    });
  }

  putAuction(ac: Auction) {
    return this.http.put(this.baseURL + `/${ac._id}`, ac);
  }

  deleteEmail(_id: string) {
    return this.http.delete(this.baseURLEmail + `/${_id}`);
  }
}
