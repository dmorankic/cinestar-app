import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { OidcSecurityService } from 'angular-auth-oidc-client';
// import { User, UserManager, UserManagerSettings } from "oidc-client";

import { BehaviorSubject, of } from 'rxjs';
import { Register } from '../Models/Register';
import { Token } from '../Models/Token';

@Injectable({
  providedIn: 'root'
})
export class AuthService  {
  private token?:Token;
  private error?:string;
  constructor(private http:HttpClient,private router:Router) {

  }
  get getToken(){
    return !!this.token?.token;
  }

   get getError(){
    return this.error;
  }
  login(username:string,password:string){
    this.http.post<Token>('https://localhost:44383/auth/Auth/login',{username,password}).subscribe(res=>{
      this.token=res;
      if(this.token.error=='x'){
        localStorage.setItem('token',this.token.token);
        localStorage.setItem('id',this.token.id.toString());
        this.error='';
        this.router.navigate(['home'])
      }else{
        this.error=this.token.error;
        console.log(this.error)
      }
    })
  }
  logout(){
    localStorage.removeItem('token');
    this.token= undefined;
    this.router.navigate(['Login']);
  }
  register(registerRequest:Register){
    return this.http.post<Token>('https://localhost:44383/auth/Auth/registration',registerRequest)
  }
}
