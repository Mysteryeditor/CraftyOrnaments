import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { param } from 'jquery';
import { OrderService } from 'src/services/order.service';

@Component({
  selector: 'app-crud-render',
  templateUrl: './crud-render.component.html',
  styleUrls: ['./crud-render.component.css'],
})
export class CrudRenderComponent implements ICellRendererAngularComp {
  apiName: string = '';
  params!: ICellRendererParams;
  dataId!: number;
  isOrder: boolean = false;
  orderStatusId: number = 0;
  orderCompleted: boolean = false;

  agInit(params: any): void {
    this.apiName = params.apiName;
    this.dataId = params.dataId;
    this.orderStatusId = params.orderStatus;
console.log(    this.orderStatusId);
    if (this.apiName == 'orders') {
      this.isOrder = true;
    }
    if (this.orderStatusId > 4) {
      this.orderCompleted = true;
    }
    else{
      this.orderCompleted=false;
    }
    console.log(this.orderCompleted)
  }

  constructor(private router: Router, private orderService: OrderService) {}

  onEditClick(event: any): void {
    this.router.navigate(['/edit', this.apiName, this.dataId]);
  }
  refresh(params: ICellRendererParams<any, any, any>): boolean {
    return false;
  }
}
