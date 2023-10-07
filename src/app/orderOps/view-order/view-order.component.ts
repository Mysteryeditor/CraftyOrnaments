import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ColDef, DomLayoutType, GridApi, ICellRendererParams } from 'ag-grid-community';
import { CrudRenderComponent } from 'src/app/admin/crud-render/crud-render.component';
import { orderInformation, orderStatus } from 'src/models/orderForm';
import { AuthenticationService } from 'src/services/authentication.service';
import { OrderService } from 'src/services/order.service';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css'],
})
export class ViewOrderComponent implements OnInit {
  constructor(
    private orderService: OrderService,
    private datePipe: DatePipe,
  ) {}
  public domLayout: DomLayoutType = 'autoHeight';
  private gridApi!: GridApi;
  colDefs: ColDef[] = [
    { field: 'ornamentName' },
    { field: 'metalName' },
    { field: 'userName' },
    {
      field: 'statusName',
      headerName: 'Status',
    },
    {
      field:'weight',
      headerName:'Weight',
    },
    {
      field: 'createdDate',
      cellRenderer: (params: ICellRendererParams) => {
        return `<p>${this.datePipe.transform(params.value)}</p>`;
      },
    },
    {
      field: 'dueDate',
      cellRenderer: (params: ICellRendererParams) => {
        return `<p>${this.datePipe.transform(params.value)}</p>`;
      },
    },
    {
      cellRenderer: CrudRenderComponent,
      cellRendererParams: (params: any) => ({
        apiName: 'orders',
        dataId: params.data.orderId,
        orderStatus:params.data.statusId
      }),
    },
  ];

  defaultColumnDef: ColDef = {
    sortable: true,
    filter: true,
resizable:true,
flex: 1,
minWidth: 100    
  };
  
  orderData: orderInformation[] = [];
  orderStatus: orderStatus[] = [];
  chosenOrder: orderInformation = {
    userId: 0,
    userName: null,
    orderId: 0,
    ornamentName: '',
    statusName: '',
    totalamount: 0,
    statusId: 0,
    finalamount: 0,
    weight: 0,
    finalWeight: 0,
  };
  chosenId!: number;
  wastagePercent: number = 0;

  setAutoHeight() {
    this.gridApi.setDomLayout('autoHeight');
    (document.querySelector<HTMLElement>('#myGrid')! as any).style.height = '';
  }
 
  ngOnInit() {
    this.orderService.getOrders().subscribe({
      next: (data) => {
        this.orderData = data;
        console.log(data);
      },
      error: (error) => {
        alert('Error in getting orders');
        console.log(error);
      },
      complete() {
        console.log(`Completed`);
      },
    });

    this.orderService.getOrderStatus().subscribe({
      next: (statuses) => {
        this.orderStatus = statuses;
      },
    });
  }
  onRowClicked(event: any) {
    this.chosenOrder = event.data;
  }

  onWastageChange(event: any) {
    const totalamount = this.chosenOrder.totalamount;
    const weight = this.chosenOrder.weight;
    var percent = event.target.value;
    if (percent) {
      this.chosenOrder.finalWeight = weight + (percent * weight) / 100;
      this.chosenOrder.finalamount =
        totalamount + (percent * totalamount) / 100;
      console.log(this.chosenOrder.totalamount + percent / 100);
      console.log(this.chosenOrder.finalamount);
    }
  }
  updateStatus() {
    this.orderService
      .updateOrder(this.chosenOrder.orderId, this.chosenOrder)
      .subscribe({
        next: (response) => {
          this.ngOnInit();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
