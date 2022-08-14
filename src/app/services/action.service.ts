import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auction } from '../models/action.model';
import { UsersAuction } from '../models/usersAction';

@Injectable({
  providedIn: 'root'
})
export class ActionService {
  email:string=localStorage.getItem('token');
  baseURL: string = 'http://localhost:3000/api/action';
  baseURLUsers: string = 'http://localhost:3000/api/usersaction';
  baseURLAuction: string = 'http://localhost:3000/api/action/id';
  baseURLMaxPrice: string = 'http://localhost:3000/api/maxUsersaction';

  date :Date = new Date();




  headers = { 'content-type': 'application/json' };
  constructor(private http : HttpClient) { }
 // A function continues the request to retrieve the Auctions and returns the information we will use.
  getactioninfo():Observable<any>{
    return this.http.get(this.baseURL);
  }
 // A function continues the request to retrieve information for a single Auction according to its SerialNumber, and returns the information we will use.
  getOneActionInfo(serialNumber):Observable<any>{
    return this.http.get(this.baseURL +`/${serialNumber}`);
  }


// A function continues the request to retrieve the highest price for a single auction
  getMxPrice(serialNumber:number):Observable<any>{
    return this.http.get(this.baseURLMaxPrice+`/${serialNumber}`);
  }
// Function continues the request to retrieve the users who participated in the Auction
  getUsersInAuction(serialNumber:number):Observable<any>{
    return this.http.get(this.baseURLUsers +`/${serialNumber}`);
  }
// A function continues the request to add a price to the Auction and transfer all the data to the DB
  participateInTheAuction(bidValue:number,carNumber:number,Action:Auction):Observable<any>{
    const body = JSON.stringify(new UsersAuction(this.email,bidValue,carNumber,Action));
    return this.http.post(this.baseURLUsers , body,{
    headers: this.headers
    });

  }

// Function continues the request to add a new auction to the DB
  PostCarAuction(Auction){
    const body = JSON.stringify(Auction);
    return this.http.post(this.baseURL , body,{
      headers: this.headers
      });


  }
// Function continues the request to updateAuction in DB
  putAuction(ac) {
    return this.http.put(this.baseURL + `/${ac._id}`, ac);
  }

  putUserAuction(user) {
    return this.http.put(this.baseURLUsers + `/${user._id}`, user);
  }
// Function continues the request to delete Auction from DB
  deleteCarAuction(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }
  deleteUserInCarAuction(_id: string) {
    return this.http.delete(this.baseURLUsers + `/${_id}`);
  }

}
