import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { filter, Observable, of,pipe } from 'rxjs';
import { User } from '../../Model/User';
import { UserService } from '../../Services/user.service';
import { FilterPipe } from '../../Pipes/filter-pipe.pipe';

@Component({
  selector: 'app-users-panel',
  templateUrl: './users-panel.component.html',
  styleUrls: ['./users-panel.component.scss']
})
export class UsersPanelComponent implements OnInit {
  users$:any;
  uredi:boolean=false;
  payments:boolean=false;
  default:boolean=false;
  none=true;
  user:any;
  count:number=0;
  contactForm:FormGroup;
  options:any;
  Name:string=''
  passcode:string='password';
  constructor(private userService:UserService,private fb:FormBuilder) {
    this.contactForm=fb.group({
      select:[null],
      searchText: new FormControl(''),
    });
   }

  ngOnInit(): void {
    this.loadUsers()
    this.loadGradovi()
  }

  Search(form: FormGroup){

    if(form.value.searchText!='null'){

    }
    this.loadUsers()
    }

  loadUsers(){
    this.userService.getAll().subscribe(x=>{
      this.users$=x;
      this.count=this.users$.length;
    });
  }

  loadGradovi(){
   this.userService.getGradovi().subscribe(x=>{
     this.options=x;
   })
  }

  toggle(action:string){
    if(action=='back'){
      this.payments=false;
      this.uredi=false;
      this.default=true;
    }

    if(action=='uredi'){
      this.payments=false;
      this.uredi=true;
      this.default=false;
    }

    if(action=='payments'){
      this.payments=true;
      this.uredi=false;
      this.default=false;
    }

    if(action=='none'){
      this.payments=false;
      this.uredi=false;
      this.default=false;
      this.none=true;
    }
  }
  odaberi(id:number){
    this.userService.getById(id).subscribe(x=>{
      this.user=x;
      console.log(this.user)
      this.none=false;
      this.default=true;
    });
    this.toggle('back')
  }

  update(id:number,form:NgForm){
    (this.user as User).username=form.value.username;
    (this.user as User).ime_prezime=form.value.imePrezime;
    (this.user as User).email=form.value.email;
    (this.user as User).password=form.value.password;
    (this.user as User).broj_telefona=form.value.broj_telefona;
    (this.user as User).confirmed=form.value.confirmed?1:0;
    this.userService.update(id,this.user).subscribe();
    this.loadUsers()
  }

  remove(id:number){
    this.userService.delete(id).subscribe();
    this.loadUsers()
  }

  passwordToggle(){
    this.passcode=this.passcode=="password"?'text':'password';
  }
}
