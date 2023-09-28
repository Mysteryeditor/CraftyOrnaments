import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { UserData } from 'src/models/UserData';
import { UserServiceService } from 'src/services/user-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Sort } from '@angular/material/sort';
import { UserdatasourceService } from 'src/services/userdatasource.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'gender', 'DOB', 'phoneNumber', 'role', 'orderCount', 'email', 'operations'];
  datasource1: any;
  constructor(private adminService: UserServiceService) { }
  allUsers: UserData[] = [];
  datasource = new UserdatasourceService(this.adminService);

  

  ngOnInit(): void {

  //   this.adminService.getUserDetails({ active: 'id', direction: 'desc' }).subscribe({
  //     next:(data) => {
  //     this.allUsers = data;
  //     this.datasource1 = new MatTableDataSource<UserData>(this.allUsers);
  //   }
  // })
    this.datasource.loadUsers({ active: 'id', direction: 'asc' });
    console.log(this.allUsers)
 
  }

  sortUsers(sort: Sort): void {
    this.datasource.loadUsers(sort);

  }

  editUser(userdata: any) {
    console.log(userdata);
  }

  deleteUser(item: any) {

  }

  viewDetails(item: any) {

  }

}
