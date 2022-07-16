import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  baseURLContacts: string = 'http://localhost:3000/api/contacts';
  baseURLMessage: string = 'http://localhost:3000/api/messages';

  headers = { 'content-type': 'application/json' };
  constructor(private http : HttpClient) { }

  getcontactinfo():Observable<any>{
    return this.http.get(this.baseURLContacts);
  }

  postMessage(message:any): Observable<any>{
    return this.http.post(this.baseURLMessage ,message);
  }
}
