import { Component,OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environments';
import { MetalChoice } from 'src/models/Metals';
import { MetalsService } from 'src/services/metals.service';
@Component({
  selector: 'app-metals',
  templateUrl: './metals.component.html',
  styleUrls: ['./metals.component.css']
})
export class MetalsComponent implements OnInit {
  metalData1:MetalChoice[]=[]

  constructor(private http:HttpClient,private MetalService:MetalsService){

  }
  metalUrl:string=environment.metalsApi;
  ngOnInit(): void {
    this.MetalService.getMetalsList().subscribe({
      next:(data)=>{
        this.metalData1=data;
        console.log(this.metalData1);
      },
      error:err=>{
        console.log(err);
      }
    })
  }

}
