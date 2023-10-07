import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  userLoggedIn: boolean=false;
showNavbar:boolean=false;
  constructor(private router:Router) {

    
  }
  ngOnInit(): void {
    const activeUserId = localStorage.getItem('activeUserId');
    if (activeUserId) {
      this.userLoggedIn = true; 
    }

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = !(event.urlAfterRedirects === '/');
      }
    });
  }
  title = 'CraftyOrnaments';
}
