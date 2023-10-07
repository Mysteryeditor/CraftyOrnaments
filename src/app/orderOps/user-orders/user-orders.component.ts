import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserData } from 'src/models/UserData';
import { orderInformation } from 'src/models/orderForm';
import { OrderService } from 'src/services/order.service';
import { RazorpayService } from 'src/services/razorpay.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css'],
})
export class UserOrdersComponent implements OnInit {
  constructor(
    private orderService: OrderService,
    private razorpay: RazorpayService,
    private router: Router,
    private messageServ: MessageService
  ) {}
  userOrder: orderInformation[] = [];
  inActiveUserOrder: orderInformation[] = [];
  noOrders: boolean = false;
  activeUserId?: string | null;
  orderFormData: any;
  userService: any;
  activeUserData: UserData = {
    UserId: 0,
    firstName: '',
    LastName: '',
    Gender: '',
    phoneNumber: 0,
    Password: '',
    RoleId: 0,
    IsDeleted: false,
    orderCount: 0,
    email: '',
    Dob: new Date(),
    CreatedDate: new Date(),
    ModifiedDate: new Date(),
    LastLoggedIn: new Date(),
  };
  ngOnInit(): void {
    this.orderService.getUserOrders().subscribe({
      next: (data) => {
        data.forEach((x) => {
          if (x.statusId != 5 && x.statusId > 1) {
            this.userOrder.push(x);
          } else {
            this.inActiveUserOrder.push(x);
          }
        });
        if (data.length == 0) {
          this.noOrders = true;
        }
      },
      error: (error) => {
        alert('Try again Later');
      },
    });

    this.activeUserId = localStorage.getItem('activeUserId');
    if (this.activeUserId != null) {
      this.orderFormData.userId = parseInt(this.activeUserId);
    }

    this.userService.getSingleUser(this.activeUserId).subscribe({
      next: (response: UserData) => {
        console.log(response);
        this.activeUserData = response;
      },
    });
  }
  finalPayment(orderData: orderInformation) {
    console.log(orderData);
    this.razorpay.initializeFinalPayment(orderData).subscribe({
      next: (response) => {
        const order_id = response.id;
        const options = {
          key: 'rzp_test_xPSgWk2BqWWbX5',
          amount: response.advanceAmount,
          name: 'CraftyOrnaments',
          description: 'Happy Ordering',
          image:
            'https://cdn.pixabay.com/photo/2018/08/16/19/56/wedding-rings-3611277_640.jpg',
          order_id: order_id,
          handler: (response: any) => {
            console.log(response);
            const paymentPayload = {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            };
            this.razorpay.confirmFinalPayment(paymentPayload).subscribe({
              next: () => {
                this.messageServ.add({
                  severity: 'success',
                  summary: 'Payment Successfull',
                  detail: 'Happy Ordering',
                });
              },
              error: (error) => {
                console.log(error);
              },
            });
          },
          prefill: {
            name: this.activeUserData.firstName,
            email: this.activeUserData.email,
            contact: this.activeUserData.phoneNumber,
          },
          theme: {
            color: '#F37254',
          },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      },
    });
  }
}
