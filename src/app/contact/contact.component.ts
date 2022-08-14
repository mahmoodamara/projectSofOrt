import { Component, OnInit } from '@angular/core';
import { Message } from '../models/message.model';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contact:any=[];

  message = new Message();
  showmassege:boolean=false;
  showMassegeError:boolean = false;
  constructor(private contactservice:ContactService) { }

  ngOnInit(): void {
    this.refreshcontactList();
  }

  // The function retrieves the details of the Contact page.
  refreshcontactList(){
    this.contactservice.getcontactinfo().subscribe((res)=>{
      this.contact=res;
    })
   }
   // A function checks if the user has successfully entered the details of the message he wants to send, if so, then move on to the next function.
   checkMessage(message:Message){
     if(message.name.length>2 && message.email.endsWith('m')){
       return true;
     }
     return false;
   }

   // Sending a message to the site administrator, the function continues what the previous function did and sends the message to the server for testing.
   addMessage(){
     this.message.email = localStorage.getItem('token');
     if(this.checkMessage(this.message)==true){
    this.contactservice.postMessage(this.message).subscribe((res) => {
      this.refreshcontactList();
      this.showmassege = true;

      setTimeout(()=>{
        this.showmassege = false;
    }, 3000);
    });
  }
  else{
    this.showMassegeError = true;

      setTimeout(()=>{
        this.showMassegeError = false;
    }, 3000);
  }
}

}
