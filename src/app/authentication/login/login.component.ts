import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email!: FormControl;
  Password!: FormControl;
  loginForm!:FormGroup;
  hide:boolean=true

  
constructor(private auth:AuthenticationService){}
ngOnInit(): void {
  
  this.email = new FormControl('', [Validators.required]);

  this.Password = new FormControl('', [Validators.required]);

  this.loginForm = new FormGroup({
 
    email: this.email,
    Password: this.Password,
  });
}

VerifyCredentials(){
  this.auth.verifyUserCredential(this.loginForm.value);
}
}
