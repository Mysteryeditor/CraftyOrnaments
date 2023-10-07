import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { data } from 'jquery';
import { UserData } from 'src/models/UserData';
import { orderForm, orderInformation } from 'src/models/orderForm';
import { AuthenticationService } from 'src/services/authentication.service';
import { OrderService } from 'src/services/order.service';
import { UserServiceService } from 'src/services/user-service.service';
import Chart from 'chart.js/auto';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  activeUserId = 0;
  userLoggedIn = false;
  isAdmin = false;
  newUser: boolean = true;
  chart: any;
  orderData:orderInformation[]=[];
  constructor(private authservice: AuthenticationService, private orderService: OrderService, private userService: UserServiceService,private messageService:MessageService) { }

  ngOnInit(): void {
    this.authservice.authSubject.subscribe({
      next: (boolvalue) => {
        this.userLoggedIn = boolvalue;
      }
    });

    this.authservice.roleSubject.subscribe({
      next: (isAdminCheck) => {
        this.isAdmin = isAdminCheck;
      }
    });

    this.orderService.getOrders().subscribe({
      next:(value)=>{
        for(let i=0;i<2;i++){
          this.orderData.push(value[i]);
        }
        this.orderData.sort(x=>x.statusId);
      },
      error:(err)=>console.log("Error in getting orders"),
      complete:()=>{
        console.log('complete')
      }
    })
    const activeUserId = localStorage.getItem('activeUserId');
    const role = localStorage.getItem('role');
    const orders = localStorage.getItem('orderCount');
    console.log(orders);
    if (orders !== null) {
      const orderCount = parseInt(orders, 10); 
      if (!isNaN(orderCount) && orderCount > 0) {
        this.newUser = false;
      }
    } else {
      console.log('Orders are null or not found in localStorage');
    }
    if (activeUserId) {
      this.userLoggedIn = true;
    }

    if (role && role.toLowerCase() == 'admin') {
      this.isAdmin = true;
    }

    
  }


}
