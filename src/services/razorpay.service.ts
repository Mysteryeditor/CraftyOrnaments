import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { orderForm, orderInformation } from 'src/models/orderForm';
import { ConfirmPaymentPayload } from 'src/models/razorpay';

@Injectable({
  providedIn: 'root'
})
export class RazorpayService {

  response:any;
  razorApi=environment.mainApi+'/RazorPay/InitializePayment/initialize';
  confirmApi=environment.mainApi+'/RazorPay/confirmPayment/confirm';
  finalPaymentApi=environment.mainApi+'/RazorPay/FinalPayment';
  constructor(private http:HttpClient) { }

     initializePayment(orderData:orderForm){
      return this.http.post<any>(this.razorApi,orderData);
     }

     confirmPayment(data:any){
      return this.http.post<any>(this.confirmApi,data);
     }

     initializeFinalPayment(finalOrderData:orderInformation){
      return this.http.post<any>(this.razorApi,finalOrderData);
     }

     confirmFinalPayment(finalPayLoad:any){
      return this.http.post<any>(this.finalPaymentApi,finalPayLoad);
     }


}
