import { Component, OnInit } from '@angular/core';
import { ActionService } from 'src/app/services/action.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {
  products:any[]=[];
  constructor(private ActionService:ActionService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.ActionService.getactioninfo().subscribe(res=>{
      this.products=res;
    })
    }

}
