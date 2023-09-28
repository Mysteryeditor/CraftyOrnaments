import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Injectable } from '@angular/core';
import { UserData } from 'src/models/UserData';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserServiceService } from './user-service.service';
import { Sort } from '@angular/material/sort';

@Injectable({
  providedIn: 'root'
})
export class UserdatasourceService extends DataSource<UserData> {
  constructor(private userservice: UserServiceService) { super(); }
  users = new BehaviorSubject<UserData[]>([]);
  isLoading=new BehaviorSubject<boolean>(false);
  connect(): Observable<UserData[]> {
    return this.users.asObservable();
  }

  disconnect(): void {
    this.users.complete();
  }

  loadUsers(sort:Sort): void {
    this.isLoading.next(true);
    this.userservice.getUserDetails(sort).subscribe(
      {
        next:(data)=>{
          console.log(data);
          this.isLoading.next(false);
          this.users.next(data);
        
        }
      }
    )
  }

}
