import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userLoggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor(private route: Router, private authservice: AuthenticationService) {

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
    })
    const activeUserId = localStorage.getItem('activeUserId');
    const role = localStorage.getItem('role');
    if (activeUserId) {
      this.userLoggedIn = true;
    }

    if (role && role.toLowerCase() == 'admin') {
      this.isAdmin = true;
    }
  }

  logout() {
    this.userLoggedIn = false;
    this.isAdmin=false;
    localStorage.removeItem("activeUserId");
    localStorage.removeItem("role");
    this.route.navigate(['']);
  }
}
