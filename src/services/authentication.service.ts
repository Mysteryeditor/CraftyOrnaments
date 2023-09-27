import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { UserData } from 'src/models/UserData';
import { Router } from '@angular/router';
import { userCredentials } from 'src/models/userCredentials';
import { AuthenticationSuccess } from 'src/models/authenticationResult';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  constructor(private http: HttpClient, private router: Router) {}

  registerApi: string = environment.mainApi + '/Authentication/UserRegister';

  authenticationapi:string=environment.authenticationApi;

  authenticationResult: AuthenticationSuccess={
    userId: 0,
    roles: ''
  };
  postUserRegister(request: UserData) {
    return this.http.post<UserData>(this.registerApi, request).subscribe({
      next: (data) => {
        if(data)
        console.log(data);
      },
      error: (err) => {
        console.log('error', err);
        alert('error');
        this.router.navigateByUrl('');
      },
      complete: () => {
        alert('Success'); //change this
        this.router.navigateByUrl('/Login');
      },
    });
  }

  
  verifyUserCredential(request:userCredentials){
    return this.http.post<AuthenticationSuccess>(this.authenticationapi,request).subscribe({
      next:(response)=>{
    localStorage.setItem('activeUserId',response.userId.toString());
    localStorage.setItem('role',response.roles);
    this.router.navigateByUrl('/DashBoard');
      },
      error:(err)=>{
        if(err.status==404){
          alert("Invalid Credentials");
        }
        else{
          alert("Error Occured");
        }
      },
      complete:()=>{
        
        alert('Success'); //change this
      }
    })
  }
}
