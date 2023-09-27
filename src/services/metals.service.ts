import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { MetalChoice } from 'src/models/Metals';
import { environment } from 'src/environments/environments';
@Injectable({
  providedIn: 'root'
})
export class MetalsService {

  constructor(private http:HttpClient) { }

  getMetalsList():Observable<MetalChoice[]>{
    return this.http.get<MetalChoice[]>(environment.metalsApi);
  }
}
