import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { error } from 'jquery';
import { Subject, retry } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environments';
import {
  orderForm,
  orderInformation,
  orderResponse,
  orderStatus,
} from 'src/models/orderForm';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  orderApi = environment.mainApi + '/OrderDetails/GetOrderDetails';
  singleOrderApi = environment.mainApi + '/OrderDetails/GetOrderDetail/';
  userOrdersApi = environment.mainApi + '/OrderDetails/GetUserOrder?userId=';
  getStatusApi = environment.mainApi + '/OrderDetails/GetStatus';

  getOrderStatus(): Observable<orderStatus[]> {
    return this.http.get<orderStatus[]>(this.getStatusApi);
  }

  getOrders(): Observable<orderInformation[]> {
    return this.http.get<orderInformation[]>(this.orderApi);
  }

  getSingleOrder(id: string | null): Observable<orderResponse> {
    console.log(id);
    return this.http.get<orderResponse>(this.singleOrderApi + id);
  }

  getUserOrders(): Observable<orderInformation[]> {
    const currentUser = localStorage.getItem('activeUserId');
    return this.http.get<orderInformation[]>(this.userOrdersApi + currentUser);
  }

  updateOrder(id:number,updatedData:orderInformation){
    const putUrl =environment.mainApi + '/OrderDetails/UpdateOrderStatus?id=' + id;
    console.log(putUrl);
    return this.http.put(putUrl,updatedData);
  }
}
