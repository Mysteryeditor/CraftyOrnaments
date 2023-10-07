import { Component, OnInit } from '@angular/core';
import { UserData } from 'src/models/UserData';
import { UserServiceService } from 'src/services/user-service.service';
import { Router } from '@angular/router';
import { ColDef } from 'ag-grid-community/dist/lib/entities/colDef';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  constructor(private adminService: UserServiceService, private router: Router) { }
  allUsers: UserData[] = [];
  defaultColumnDef: ColDef = {
    sortable: true, filter: true,
    flex: 1,
    minWidth: 100    
  }
  colDefs: ColDef[] = [{
    field: 'firstName', headerName: 'FirstName'
  }, {
    field: 'gender', headerName: 'Gender'
  },
  { field: 'orderCount', headerName: 'Orders' },
  { field: 'email', headerName: 'Email' },
  { field: 'phoneNumber', headerName: 'Contact' }
  ];
  ngOnInit(): void {
    this.adminService.getUserDetails().subscribe({
      next: (data) => {
        console.log(data)
        this.allUsers = data;
      },
      error: (error) => {
        alert("error sorry!");
      }
    })

    //   this.adminService.getUserDetails({ active: 'id', direction: 'desc' }).subscribe({
    //     next:(data) => {
    //     this.allUsers = data;
    //     this.datasource1 = new MatTableDataSource<UserData>(this.allUsers);
    //   }
    // })
    //   this.datasource.loadUsers({ active: 'id', direction: 'asc' });


    // }

    // sortUsers(sort: Sort): void {
    //   this.datasource.loadUsers(sort);

    // }


  }
  // deleteUser(item: any) {

  // }

  // viewDetails(item: any) {

  // }

}
