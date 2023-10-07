import { Component, HostListener, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OtpVerifier } from 'src/models/authenticationResult';
import { userCredentials } from 'src/models/userCredentials';
import { AuthenticationService } from 'src/services/authentication.service';
import { matchValidator } from 'src/shared/confirmPassword';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  goNext: boolean=false;
  hide:boolean=true;
  constructor(
    private authservice: AuthenticationService,
    private router: Router
  ) {}
  showNext: boolean = false;

  otpRequest: OtpVerifier = {
    otp: '',
    email: '',
  };

  updatePasswordRequest: userCredentials = {
    email: '',
    password: '',
  };

  updatePasswordForm!: FormGroup;
  password!: FormControl;
  confirmPassword!: FormControl;
  ngOnInit(): void {
    this.password = new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{6,}$/
      ),
    ]);
    this.confirmPassword = new FormControl('', [
      Validators.required,
      matchValidator('password'),
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{6,}$/
      ),
    ]);
    this.updatePasswordForm = new FormGroup({
      password: this.password,
      confirmPassword: this.confirmPassword,
    });
  }
  onSubmit(form: any) {
    if (form.valid) {
      this.otpRequest.email = form.value.email;
      this.authservice.otpGenerator(form.value.email).subscribe({
        next: (response) => {
          console.log(response);
          if (response.statusCode == 200) {
            this.showNext = true;
          } else if (response.statusCode == 404) {
            alert('Invalid Email');
          }
        },
        error: (error) => {
          alert('Error');
        },
      });
    }
  }

  onOtpSubmit(otpForm: any) {
    if (otpForm.valid) {
      this.otpRequest.otp = otpForm.value.otp;
      this.authservice.otpVerify(this.otpRequest).subscribe({
        next: (response) => {
          if (response.statusCode == 200) {
            console.log(response);
            this.goNext=true;
            this.otpRequest.email = response.data;
            alert('success');
            console.log(this.otpRequest.email);
          } else if (response.statusCode == 400) {
            alert('failed');
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  UpdatePassword() {
    this.updatePasswordRequest.email = this.otpRequest.email;
    this.updatePasswordRequest.password =
      this.updatePasswordForm.value.password;
    this.authservice.changePassword(this.updatePasswordRequest).subscribe({
      next: (response) => {
        if(response.statusCode==200){
          alert('success');
          this.ngOnInit();
          console.log(response);
        }
        else if(response.statusCode==404){
          alert('failed');
          this.ngOnInit();
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
