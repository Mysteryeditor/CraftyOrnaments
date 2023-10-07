import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { UserData } from 'src/models/UserData';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService implements OnInit {
  userApi = environment.mainApi + '/AccountProfiles/GetAccountProfiles';
  getSingleUserApi=environment.mainApi+'/AccountProfiles/GetSingleProfile/';

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  // getUserDetails(sort: Sort): Observable<UserData[]> {
  //   const params = new HttpParams().set('_sort', sort.active).set('_order', sort.direction);
  //   return this.http.get<UserData[]>(this.userApi, { params });
  // }

  getUserDetails():Observable<UserData[]>{
    return this.http.get<UserData[]>(this.userApi);
  }

  getSingleUser(id:string|null|number):Observable<UserData>{
    return this.http.get<UserData>(this.getSingleUserApi+id);
  }
}
