import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  userLoggedIn: boolean = false;
  isAdmin: boolean = false;
  constructor(private authservice: AuthenticationService) {}

  ngOnInit() {
    this.authservice.authSubject.subscribe({
      next: (boolvalue) => {
        this.userLoggedIn = boolvalue;
      },
    });

    const activeUserId = localStorage.getItem('activeUserId');
    const role = localStorage.getItem('role');
    if (activeUserId) {
      this.userLoggedIn = true;
    }
  }
}
