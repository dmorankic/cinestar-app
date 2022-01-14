import { Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Auth/Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  passcode:string="password"

  user_id:any;
  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  register(form:NgForm){
    this.authService.register({
        username:form.value.username,
        password:form.value.password,
        email:form.value.email,
        ime_prezime:form.value.ime_prezime,
        b_date:form.value.b_date,
        grad:form.value.grad,
      }).subscribe(res=>{
        this.user_id=res;
        console.log(this.user_id)
        this.router.navigate(['/Confirm'],{  queryParams: { id:this.user_id}})
        //this.authService.login(form.value.username,form.value.password)
    })
  }
  passwordToggle(){
    this.passcode=this.passcode=="password"?'text':'password';

  }
}
