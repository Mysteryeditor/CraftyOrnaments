import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import { Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { every } from 'rxjs';
import { RegisterFormData } from 'src/models/RegisterFormData';
import { AuthenticationService } from 'src/services/authentication.service';
import { UserServiceService } from 'src/services/user-service.service';
import { matchValidator } from 'src/shared/confirmPassword';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  emailexists: boolean = false;
  constructor(
    private authservice: AuthenticationService,
    private user: UserServiceService
  ) {}
  signupForm!: FormGroup;
  firstName!: FormControl;
  lastName!: FormControl;
  gender!: FormControl;
  DOB!: FormControl;
  email!: FormControl;
  Password!: FormControl;
  confirmPassword!: FormControl;
  phoneNumber!: FormControl;
  hide:boolean=false
  ngOnInit(): void {
    this.firstName = new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z]{3,}$/),
    ]);

    this.lastName = new FormControl('', [Validators.required]);

    this.gender = new FormControl('', [Validators.required]);

    this.DOB = new FormControl('', [Validators.required]);

    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern('^[A-Za-z0-9._%+-]+@gmail.com$'),
    ]);

    this.Password = new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{6,}$/
      ),
    ]);

    this.confirmPassword = new FormControl('', [
      Validators.required,
      matchValidator('Password'),
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{6,}$/
      ),
    ]);

    this.phoneNumber = new FormControl('', [Validators.required,Validators.pattern(/^[0-9].{9}$/)]);
    this.signupForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      Password: this.Password,
      DOB: this.DOB,
      gender: this.gender,
      phoneNumber: this.phoneNumber,
      confirmPassword: this.confirmPassword,
    });
  }

  OnSubmit() {
    this.authservice.postUserRegister(this.signupForm.value);
  }
}
