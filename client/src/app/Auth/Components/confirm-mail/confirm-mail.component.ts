import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/Korisnici/users-panel/Service/user.service';
import { User } from 'src/app/Korisnici/worker-panel/worker/Model/User';

import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-confirm-mail',
  templateUrl: './confirm-mail.component.html',
  styleUrls: ['./confirm-mail.component.scss']
})
export class ConfirmMailComponent implements OnInit {
  person_id:any;
  respons:any;
  email?:string;
  constructor(private route: ActivatedRoute,private userService:UserService,private router:Router) {
    this.route.queryParams.subscribe(params => {
      this.person_id = params['id'];
    });
  }

  ngOnInit(): void {
    this.userService.getById(this.person_id).subscribe(x=>{
      this.email=(x as User).email;
    })
  }

  // confirm_mail(code:string){
  //   this.authService
  //   .confirm_mail(this.person_id,code)
  //   .subscribe(
  //     res=>{
  //     this.respons=res;
  //     alert(this.respons.message)
  //     if(this.respons.message=="You have confirmed user sucessfully")
  //       this.router.navigate(['/'])
  //   },
  //   err=>{
  //     console.log(err)
  //   })


  // }

}
