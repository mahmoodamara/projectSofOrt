import { Component, OnInit } from '@angular/core';
import { TreatmentService } from 'src/app/services/treatment.service';

@Component({
  selector: 'app-cars-service',
  templateUrl: './cars-service.component.html',
  styleUrls: ['./cars-service.component.css']
})
export class CarsServiceComponent implements OnInit {
  treatment:any[]=[]
  constructor(private treatmentService:TreatmentService) { }

  ngOnInit(): void {
    this.refreshtreatmentList();
  }

  refreshtreatmentList(){
    this.treatmentService.getTreatmentList().subscribe((res)=>{
      this.treatment=res;
    })
  }

  deleteCarService(_id){
    if (confirm('Are you sure to delete this record ?') == true) {
    this.treatmentService.deleteCarService(_id).subscribe(res=>{
      this.refreshtreatmentList();
    })
    this.refreshtreatmentList();

  }
}
}
