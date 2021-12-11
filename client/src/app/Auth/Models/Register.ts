export class Register{
  username:string;
  password:string;
  ime_prezime:string;
  email:string;
  b_date:string;
  grad:string;

  constructor(username:string,password:string,ime_prezime:string,email:string,b_date:string,grad:string) {
    this.username=username;
    this.password=password;
    this.ime_prezime=ime_prezime;
    this.email=email;
    this.b_date=b_date;
    this.grad=grad;
  }
}
