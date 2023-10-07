import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { ornament, ringSize } from 'src/models/ornaments';

@Injectable({
  providedIn: 'root'
})
export class OrnamentsService  {

  constructor(private http:HttpClient) { }
  ornamentApi=environment.mainApi+'/Ornaments/GetOrnaments'
  sizeApi=environment.mainApi+'/Ornaments/GetSize'

  getOrnamentData():Observable<ornament[]>{
    return this.http.get<ornament[]>(this.ornamentApi);
  }

  getRingSizes():Observable<ringSize[]>{
    return this.http.get<ringSize[]>(this.sizeApi);
  }
}
