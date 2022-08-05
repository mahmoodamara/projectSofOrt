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

 refreshUsersList(){
    this.userService.getUsers().subscribe((res)=>{
      this.users=res;
    })
  }
  toggleColapse(){
    this.collapsed = !this.collapsed;
   // this.onToggleSideNav.emit({collapsed:this.collapsed,screenWidth:this.screenWidth})
  }

  postUser(){
    this.userService.addUser(this.user).subscribe((res)=>{
      this.refreshUsersList();
      alert("add");
    })
  }


  onDelete(_id: string) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.userService.deleteUser(_id).subscribe((res) => {
        this.refreshUsersList();
      });
    }
  }

  editUser(user){
    this.user=user;
  }

  putUser(){
    this.userService.putUser(this.user).subscribe((res)=>{
      this.refreshUsersList();
      alert("updating");
    })
  }


}
