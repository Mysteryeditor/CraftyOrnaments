import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { RegisterFormData } from 'src/models/RegisterFormData';
import { Router } from '@angular/router';
import { userCredentials } from 'src/models/userCredentials';
import { AuthenticationSuccess } from 'src/models/authenticationResult';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  constructor(private http: HttpClient, private router: Router) { }

  registerApi: string = environment.mainApi + '/Authentication/UserRegister';

  authenticationapi: string = environment.authenticationApi;

  authenticationResult: AuthenticationSuccess = {
    userId: 0,
    role: ''
  };
  postUserRegister(request: RegisterFormData) {
    return this.http.post<RegisterFormData>(this.registerApi, request).subscribe({
      next: (data) => {
          console.log(data);
      },
      error: (err) => {
        if(err.status==409 || err.status==500){
          alert('Existing User');
        }
        else{
          alert("something went wrong")
        }
      },
      complete: () => {
        alert('Success'); //change this
        this.router.navigateByUrl('/Login');
      },
    });
  }


  public authSubject = new Subject<boolean>;
  public roleSubject=new Subject<boolean>;
  validateAuth(state: boolean,isAdmin:boolean) {
    this.authSubject.next(state);
    this.roleSubject.next(isAdmin);
  }

  // setting a value based on subject
  status?: boolean;
  isAdmin?:boolean;
  getAuthStatus() {
    this.authSubject.subscribe(
      res => {
        this.status = res;
      }
    );
    return this.status;
  }


  getRole(){
    this.authSubject.subscribe(
      res => {
        this.isAdmin = res;
      }
    );
    return this.isAdmin;
  }

  verifyUserCredential(request: userCredentials) {
    return this.http.post<AuthenticationSuccess>(this.authenticationapi, request).subscribe({
      next: (response) => {
        localStorage.setItem('activeUserId', response.userId.toString());
        localStorage.setItem('role', response.role);
        console.log(response);
        if(response.role.toLowerCase()=='admin'){
          this.validateAuth(true,true);
        }
        else{
          this.validateAuth(true,false);
        }
       

     
        this.router.navigateByUrl('/DashBoard');
      },
      error: (err) => {
        if (err.status == 404) {
          alert("Invalid Credentials");
        }
        else {
          alert("Error Occured");
        }
      },
      complete: () => {
        alert('Success'); //change this
      }
    })
  }
}
