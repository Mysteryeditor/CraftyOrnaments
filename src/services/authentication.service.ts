import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { RegisterFormData } from 'src/models/RegisterFormData';
import { Router } from '@angular/router';
import { userCredentials } from 'src/models/userCredentials';
import { AuthenticationSuccess, OtpVerifier } from 'src/models/authenticationResult';
import { Subject } from 'rxjs/internal/Subject';
import { UserServiceService } from './user-service.service';
import { UserData } from 'src/models/UserData';
import { responseType } from 'src/models/responseType';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userData: UserData = {
    UserId: 0,
    firstName: '',
    LastName: '',
    Gender: '',
    Dob: new Date(),
    phoneNumber: 0,
    Password: '',
    RoleId: 0,
    CreatedDate: new Date(),
    ModifiedDate: new Date(),
    LastLoggedIn: new Date(),
    IsDeleted: false,
    orderCount: 0,
    email: '',
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserServiceService,
    private messageServ:MessageService
  ) {}

  registerApi: string = environment.mainApi + '/Authentication/UserRegister';
  authenticationapi: string = environment.authenticationApi;
  checkEmailApi:string=environment.mainApi+'/Authentication/OtpGenerator?email=';
  verifyOtpApi:string=environment.mainApi+'/Authentication/OtpVerifier';
  changePasswordApi:string=environment.mainApi+'/Authentication/PasswordChange';

  authenticationResult: AuthenticationSuccess = {
    userId: 0,
    role: '',
  };
  postUserRegister(request: RegisterFormData) {
    return this.http
      .post<RegisterFormData>(this.registerApi, request)
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => {
          if (err.status == 409 || err.status == 500) {
            alert('Existing User');
          } else {
            alert('something went wrong');
          }
        },
        complete: () => {
          alert('Success'); //change this
          this.router.navigateByUrl('/Login');
        },
      });
  }
  public authSubject = new Subject<boolean>();
  public roleSubject = new Subject<boolean>();
  public userName = new Subject<string>();
  validateAuth(state: boolean, isAdmin: boolean) {
    this.authSubject.next(state);
    this.roleSubject.next(isAdmin);
  }
  // setting a value based on subject
  status?: boolean;
  isAdmin?: boolean;
  getAuthStatus() {
    this.authSubject.subscribe((res) => {
      this.status = res;
    });
    return this.status;
  }

  getRole() {
    this.authSubject.subscribe((res) => {
      this.isAdmin = res;
    });
    return this.isAdmin;
  }

  verifyUserCredential(request: userCredentials) {
    return this.http
      .post<AuthenticationSuccess>(this.authenticationapi, request)
      .subscribe({
        next: (response) => {
          localStorage.setItem('activeUserId', response.userId.toString());
          localStorage.setItem('role', response.role);
          this.userService.getSingleUser(response.userId).subscribe({
            next: (data) => {
              this.userName.next(data.firstName);
              localStorage.setItem('orderCount', data.orderCount.toString());
              localStorage.setItem('firstName', data.firstName);
            },
          });

          if (response.role.toLowerCase() == 'admin') {
            this.validateAuth(true, true);
          } else {
            this.validateAuth(true, false);
          }
          this.router.navigateByUrl('/DashBoard');
          this.messageServ.add({
            severity: 'success',
            summary: 'Welcome Back',
            detail: 'Happy Ordering',
          });
        },
        error: (err) => {
          if (err.status == 404) {
            alert('Invalid Credentials');
          } else {
            alert('Error Occured');
            console.log(err);
          }
        },
        complete: () => {
          alert('Success'); //change this
        },
      });
  }

  // forgotPassword
otpGenerator(email:string){
  return this.http.get<responseType>(this.checkEmailApi+email);
}

otpVerify(data:OtpVerifier){
  console.log(data);
  return this.http.post<responseType>(this.verifyOtpApi,data);
}

changePassword(usercreds:userCredentials){
  return this.http.post<responseType>(this.changePasswordApi,usercreds);
}
}
