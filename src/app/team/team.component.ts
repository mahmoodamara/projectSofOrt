import { Component, OnInit } from '@angular/core';
import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  imageteam1="assets/img/team-1.jpg";
  team:any=[];

  constructor(private teamservice : TeamService) { }

  ngOnInit(): void {
    this.refreshTeamList();
  }

  refreshTeamList(){
    this.teamservice.getteamtList().subscribe((res)=>{
      this.team=res;
    })
   }

}
