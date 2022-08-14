import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users:any=[];
  showmassege:boolean;
  user=new User();
  collapsed:boolean = false;

  constructor(private userService:UsersService ) { }

  ngOnInit(): void {
    this.refreshUsersList();
  }
// The function retrieves the information of the website users.
 refreshUsersList(){
    this.userService.getUsers().subscribe((res)=>{
      this.users=res;
    })
  }
// A function to request the addition of a new user.
  postUser(){
    this.userService.addUser(this.user).subscribe((res)=>{
      this.refreshUsersList();
      alert("add");
    })
  }

// Function to request user deleted.
  onDelete(_id: string) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.userService.deleteUser(_id).subscribe((res) => {
        this.refreshUsersList();
      });
    }
  }
// A function to start a user for updating.
  editUser(user){
    this.user=user;
  }
 // A function to request an existing user update.
  putUser(){
    this.userService.putUser(this.user).subscribe((res)=>{
      this.refreshUsersList();
      alert("updating");
    })
  }


}
