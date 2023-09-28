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
  emailexists: boolean=false;
  constructor(private authservice: AuthenticationService,private user:UserServiceService) {}
  signupForm!: FormGroup;
  firstName!: FormControl;
  lastName!: FormControl;
  gender!: FormControl;
  DOB!: FormControl;
  email!: FormControl;
  Password!: FormControl;
  confirmPassword!: FormControl
  phoneNumber!: FormControl;
  profilePic!: FormControl;
  image!: File;
  // userData: UserData = {
  //   firstName: '',
  //   lastName: '',
  //   gender: '',
  //   DOB: new Date(),
  //   email: '',
  //   password: '',
  //   phoneNumber: 0,
  //   confirmPassword: ''
  //   // profilePic: new Uint8Array([]),
  // };
  // existingEmails:string[]=[];
  ngOnInit(): void {
    //    this.user.getUserDetails().subscribe({
    //   next:(data)=>{
    //     data.forEach(a=>this.existingEmails.push(a.Email));
    //   }
    // });
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
      )
    ]);

    this.confirmPassword = new FormControl('', [
      Validators.required,
      matchValidator('Password'),
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{6,}$/
      )
    ]);

    this.phoneNumber = new FormControl('', [Validators.required]);

    // this.profilePic = new FormControl('', [Validators.required]);

    this.signupForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      Password: this.Password,
      DOB: this.DOB,
      gender: this.gender,
      phoneNumber: this.phoneNumber,
      confirmPassword: this.confirmPassword
      // profilePic: this.profilePic,
    });
  }

  // onImageChange(event: any) {
  //   this.image = event.target.files[0];
  //   let reader = new FileReader();

  //   reader.onload = () => {
  //     const base64String = reader.result as ArrayBuffer;
  //     const bytesValue=new Uint8Array(base64String);

  //     // this.userData.profilePic=bytesValue;
  //   };
  //   reader.readAsArrayBuffer(this.image);

  // }


  OnSubmit() {
    this.authservice.postUserRegister(this.signupForm.value);
    // this.userData.password=this.Password.value;
    // this.userData.profilePic);
    // this.authservice.postUserRegister(this.userData);
   
  }
}
