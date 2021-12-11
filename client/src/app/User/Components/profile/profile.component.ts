import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../Model/User';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user:any;
  passcode:string='password';

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    const id = (localStorage.getItem('id') as unknown) as number;
    this.userService.getById(id).subscribe(x=>{
      this.user=x;
      console.log(this.user)
    });
  }

  passwordToggle(){
    this.passcode=this.passcode=="password"?'text':'password';
  }

  update(id:number,form:NgForm){
    (this.user as User).username=form.value.username;
    (this.user as User).ime_prezime=form.value.imePrezime;
    (this.user as User).email=form.value.email;
    (this.user as User).password=form.value.password;
    (this.user as User).broj_telefona=form.value.broj_telefona;
    (this.user as User).confirmed=form.value.confirmed?1:0;
    this.userService.update(id,this.user).subscribe();
  }
}
