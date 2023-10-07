import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from 'src/services/authentication.service';
import { UserServiceService } from 'src/services/user-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userLoggedIn: boolean = false;
  isAdmin: boolean = false;
firstName:string|null='';

  constructor(private route: Router, private authservice: AuthenticationService,private userService:UserServiceService,private messageServ:MessageService) {

  }
  ngOnInit(): void {
    this.authservice.authSubject.subscribe({
      next: (boolvalue) => {
        this.userLoggedIn = boolvalue;
      }
    });

    this.authservice.roleSubject.subscribe({
      next:(isAdminCheck)=>{
        this.isAdmin=isAdminCheck;
      }
    });

    this.authservice.userName.subscribe({
      next:(name)=>{
        this.firstName=name;
      }
    });

    
    const activeUserId = localStorage.getItem('activeUserId');
    const role = localStorage.getItem('role');
    if (activeUserId) {
      this.userLoggedIn = true;
      this.firstName=localStorage.getItem('firstName');

 
    }

    if (role && role.toLowerCase() == 'admin') {
      this.isAdmin = true;
    }
  }

  logout() {
    this.userLoggedIn = false;
    this.isAdmin=false;
    this.firstName="";
    localStorage.removeItem("activeUserId");
    localStorage.removeItem("role");
    this.messageServ.add({
      severity: 'success',
      summary: 'Payment Successfull',
      detail: 'Happy Ordering',
    });
    this.route.navigate(['']);
  }
}
