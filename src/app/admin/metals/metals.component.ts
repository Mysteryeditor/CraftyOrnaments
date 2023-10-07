import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environments';
import { MetalChoice } from 'src/models/Metals';
import { MetalsService } from 'src/services/metals.service';
import { ColDef } from 'ag-grid-community';
import { CrudRenderComponent } from '../crud-render/crud-render.component';
@Component({
  selector: 'app-metals',
  templateUrl: './metals.component.html',
  styleUrls: ['./metals.component.css']
})
export class MetalsComponent implements OnInit {
  metalData: MetalChoice[] = [];

  defaultColumnDef: ColDef = {
    sortable: true,
    filter: true,
    flex: 1,
    minWidth: 250    
  };
  colDef: ColDef[] = [{
    field: "metalId", headerName: "Metal Id"
  },
  { field: "metalName", headerName: "Metal Name" },
  { field: "marketPrice", headerName: "Market Price (Per Gram)" },
  { field: "purityGrade", headerName: "Purity" }, {
    headerName: 'Actions',
    cellRenderer: CrudRenderComponent,
    cellRendererParams: (params: any) => ({
      apiName:'metals',
      dataId: params.data.metalId,
    }),
  }];

 
  


  constructor(private http: HttpClient, private MetalService: MetalsService) {  }
  metalUrl: string = environment.metalsApi;
  ngOnInit(): void {
    this.MetalService.getAllMetals().subscribe({
      next: (data) => {
        this.metalData = data;
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
