import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'jquery';
import { MetalChoice } from 'src/models/Metals';
import { orderResponse } from 'src/models/orderForm';
import { MetalsService } from 'src/services/metals.service';
import { OrderService } from 'src/services/order.service';
import { OrnamentsService } from 'src/services/ornaments.service';

@Component({
  selector: 'app-edit-component',
  templateUrl: './edit-component.component.html',
  styleUrls: ['./edit-component.component.css'],
})
export class EditComponentComponent implements OnInit {
  constructor(
    private actRoute: ActivatedRoute,
    private metalService: MetalsService,
    private ornamentService: OrnamentsService,
    private orderService: OrderService,
    private router: Router
  ) {}
  apiName!: string | null;
  Id!: string | null;
  metalData: MetalChoice = {
    metalId: 0,
    metalName: '',
    marketPrice: 0,
    purityGrade: '',
    metalImage: '',
  };

  //for metals
  metalGroup!: FormGroup;
  metalId!: FormControl;
  metalName!: FormControl;
  purityGrade!: FormControl;
  marketPrice!: FormControl;
  metalImage!: FormControl;

  //for orders
  order: orderResponse = {
    orderId: 0,
    metalId: 0,
    ornamentId: 0,
    weight: 0,
    length: 0,
    width: 0,
    sizeId: 0,
    statusId: 0,
    estimatedAmount: 0,
    advanceAmount: 0,
    remainingAmount: 0,
    wastage: 0,
    TotalAmount: 0,
    quantity: 0,
    userId: 0,
    createdDate: new Date(),
    dueDate: new Date(),
    isCustomised: false,
  };
  orderGroup!: FormGroup;
  firstName!: FormControl;

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe((params) => {
      this.apiName = params.get('apiName');
      this.Id = params.get('id');
    });

    if (this.apiName?.toLowerCase() == 'metals') {
      console.log(this.Id);
      this.metalService.getSingleMetal(this.Id).subscribe({
        next: (singleData) => {
          this.metalData = singleData;
          console.log('data', singleData);
        },
        error: (error) => {
          alert('Please Try Again Later');
          this.router.navigateByUrl('/metals');
        },
      });
      this.metalId = new FormControl('');
      this.metalName = new FormControl('', [Validators.required]);
      this.marketPrice = new FormControl('', [Validators.required]);
      this.purityGrade = new FormControl('', [Validators.required]);
      this.metalImage = new FormControl('');

      this.metalGroup = new FormGroup({
        metalId: this.metalId,
        metalName: this.metalName,
        marketPrice: this.marketPrice,
        purityGrade: this.purityGrade,
        metalImage: this.metalImage,
      });
    }

    //for order edit
    if (this.apiName?.toLowerCase() == 'orders') {
      this.firstName = new FormControl();
      this.orderGroup = new FormGroup({
        firstName: this.firstName,
      });

      this.orderService.getSingleOrder(this.Id).subscribe({
        next: (response) => {
          this.order = response;
          console.log(response);
        },
        error: (error) => {
          alert('Something Went Wrong Try Later');
          console.log(error);
          this.router.navigateByUrl('/ViewOrders');
        },
        complete:()=>{
console.log('over')
        }
      });
   
    }
  }

  OnSubmit(): void {
    if (this.apiName?.toLowerCase() == 'metals') {
      console.log(this.metalGroup.value);
      this.metalService
        .putMetalData(this.metalId.value, this.metalGroup.value)
        .subscribe({
          next: () => {
            this.router.navigate(['/allmetals']);
          },
          error: (error) => {
            console.log(error);
          },
        });
    }

    //metals
    if (this.apiName?.toLowerCase() == 'orders') {
    }
  }
}
