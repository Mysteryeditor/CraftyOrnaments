import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { param } from 'jquery';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { MetalChoice } from 'src/models/Metals';
import { OrderStatsModel } from 'src/models/orderForm';
import { responseType } from 'src/models/responseType';

@Injectable({
  providedIn: 'root',
})
export class MetalsService {
  constructor(private http: HttpClient) {}
  metalsApi = environment.mainApi + '/metalchoices/GetMetalChoices';
  singleMetalApi = environment.mainApi + '/metalchoices/GetSingleMetal/';
  // postApi=environment.mainApi+'/metalchoices/PostMetalChoice?x-api-key='+environment.apiKey;
  postApi=environment.mainApi+'/metalchoices/PostMetalChoice';

  orderStats=environment.mainApi+'/OrderDetails/GetOrderStats';
  getAllMetals(): Observable<MetalChoice[]> {
    return this.http.get<MetalChoice[]>(this.metalsApi);
  }

  getSingleMetal(id: string | null): Observable<MetalChoice> {
    return this.http.get<MetalChoice>(this.singleMetalApi + id);
  }

  postMetalData(data:MetalChoice){
    return this.http.post<responseType>(this.postApi,data);
  }

  putMetalData(id: number, data: MetalChoice) {
    const putUrl =environment.mainApi + '/metalChoices/putmetalchoice?id=' + id;
    return this.http.put(putUrl, data);
  }

  getOrderStats():Observable<OrderStatsModel[]>{
    return this.http.get<OrderStatsModel[]>(this.orderStats);

  }
}
