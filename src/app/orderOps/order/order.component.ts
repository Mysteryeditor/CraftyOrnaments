import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'jquery';
import { MetalChoice } from 'src/models/Metals';
import { UserData } from 'src/models/UserData';
import { orderForm } from 'src/models/orderForm';
import { ornament, ringSize } from 'src/models/ornaments';
import { MetalsService } from 'src/services/metals.service';
import { OrnamentsService } from 'src/services/ornaments.service';
import { RazorpayService } from 'src/services/razorpay.service';
import { UserServiceService } from 'src/services/user-service.service';

declare var RazorPay: any;
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
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
  activeUserId!: string | null;

  constructor(
    private metalservice: MetalsService,
    private userService: UserServiceService,
    private pay: RazorpayService,
    private ornamentservice: OrnamentsService,
    private http: HttpClient,
    private router: Router
  ) {}
  //main form
  orderForm!: FormGroup;

  metalsList: MetalChoice[] = [];
  metalstep!: FormGroup;
  metal!: FormControl;
  ornamentsList: ornament[] = [];
  weightEntered: number = 0;

  ornamentstep!: FormGroup;
  ornament!: FormControl;

  //dimensions
  dimensionstep!: FormGroup;
  weight!: FormControl;
  length!: FormControl;
  width!: FormControl;
  size!: FormControl;
  quantity!: FormControl;

  //for the receipt
  metalName: string = '';
  ornamentName: string = '';
  makingCharge!: number;
  estimatedCost: number = 0;
  TotalMakingCharge!: number;
  metalMarketPrice!: number;
  ringSizeArray: ringSize[] = [];
  selectedRingSize: string = '';
  orderFormData: orderForm = {
    metalId: 0,
    ornamentId: 0,
    weight: 0,
    length: 0,
    width: 0,
    sizeId: 0,
    advanceAmount: 0,
    remainingAmount: 0,
    TotalAmount: 0,
    quantity: 0,
    userId: 0,
    estimatedAmount: 0,
  };

  isSize: boolean = false;

  ngOnInit(): void {
    this.metal = new FormControl(['', Validators.required]);
    this.ornament = new FormControl(['', Validators.required]);
    this.weight = new FormControl(['', Validators.required, Validators.min]);
    this.length = new FormControl(['', Validators.required]);
    this.width = new FormControl(['', Validators.required]);
    this.size = new FormControl(['', Validators.required]);
    this.quantity = new FormControl(['', Validators.required, Validators.min]);

    this.metalstep = new FormGroup({
      metal: this.metal,
    });
    this.ornamentstep = new FormGroup({
      ornament: this.ornament,
    });
    this.dimensionstep = new FormGroup({
      weight: this.weight,
      length: this.length,
      width: this.width,
      size: this.size,
      quantity: this.quantity,
    });
    this.metalservice.getAllMetals().subscribe({
      next: (response) => {
        this.metalsList = response;
        console.log('Response', response);
      },
    });

    this.ornamentservice.getOrnamentData().subscribe({
      next: (response) => {
        this.ornamentsList = response;
        console.log(this.ornamentsList);
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.ornamentservice.getRingSizes().subscribe({
      next: (data) => {
        this.ringSizeArray = data;
        console.log(data);
      },
      error: (error) => {
        alert(error);
      },
    });

    this.activeUserId = localStorage.getItem('activeUserId');
    if (this.activeUserId != null) {
      this.orderFormData.userId = parseInt(this.activeUserId);
    }

    this.userService.getSingleUser(this.activeUserId).subscribe({
      next: (response) => {
        console.log(response);
        this.activeUserData = response;
      },
    });
  }
  metalFunction(metalPrice: number, metalName: string) {
    this.metalMarketPrice = metalPrice;
    this.metalName = metalName;
  }

  assignRingId(ringSizeId: number) {
    console.log(ringSizeId);
    this.orderFormData.sizeId = ringSizeId;
  }

  ornamentMakingCharge(
    makingCharge: number,
    ornamentName: string,
    ornamentId: number
  ) {
    this.ornamentName = ornamentName;
    this.makingCharge = makingCharge;
    this.TotalMakingCharge = this.makingCharge * 1;

    if (
      ornamentName.toLowerCase() == 'ring' ||
      ornamentName.toLowerCase() == 'bangle'
    ) {
      this.isSize = true;
    } else {
      this.isSize = false;
    }
  }

  calculatePrice() {
    this.TotalMakingCharge = this.orderFormData.weight * this.makingCharge;
    this.estimatedCost =
      (this.orderFormData.weight * this.makingCharge +
        this.orderFormData.weight * this.metalMarketPrice) *
      this.orderFormData.quantity;
    this.orderFormData.advanceAmount = (this.estimatedCost * 60) / 100;
  }

  orderPlace() {
    if (this.isSize) {
      this.orderFormData.length = 0;
      this.orderFormData.width = 0;
    }

    this.orderFormData.metalId = this.metal.value;
    this.orderFormData.ornamentId = this.ornament.value;
    this.orderFormData.estimatedAmount = this.estimatedCost;
    this.pay.initializePayment(this.orderFormData).subscribe({
      next: (response) => {
        console.log(this.activeUserData.firstName);
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
            const paymentPayload = {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            };
            this.pay.confirmPayment(paymentPayload).subscribe({
              next: () => {
                this.router.navigateByUrl('/UserOrders');
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
