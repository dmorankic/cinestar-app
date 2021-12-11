import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { UpdateModeEnum } from 'chart.js';
import { aplication_settings } from '../../aplication_settings';
import { Grad } from '../Model/General';
import { User } from '../Model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  type:string="Korisnik/";
  constructor(private http:HttpClient) { }

  getAll(){
    return this.http
    .get(aplication_settings.arminURL+this.type);

  }

  getById(id:number){
    return this.http.get(aplication_settings.arminURL+this.type+id)
  }

  insert(user:User){
    return this.http.post(aplication_settings.arminURL+this.type,{
      ime_prezime: user.ime_prezime,
      username: user.username,
      email:  user.email,
      b_date:  user.b_date,
      password:  user.password,
      broj_telefona:  user.broj_telefona,
      datum_kreiranja_racuna:  user.datum_kreiranja_racuna,
      confirmed:  user.confirmed,
      confMailXkorisniciId:  user.confMailXkorisniciId,
      confMailXkorisnici: {
        id:  user.id,
        issuedConfCode: user?.confMailXkorisnici?.issuedConfCode
      }
    })

  }
  update(id:number,user:User){

    return this.http.put(aplication_settings.arminURL+this.type+id,{
      ime_prezime: user.ime_prezime,
      username: user.username,
      email:  user.email,
      b_date:  user.b_date,
      password:  user.password,
      broj_telefona:  user.broj_telefona,
      datum_kreiranja_racuna:  user.datum_kreiranja_racuna,
      confirmed:  user.confirmed,
      confMailXkorisniciId:  user.confMailXkorisniciId,
      confMailXkorisnici: {
        id:  user.id,
        issuedConfCode: user?.confMailXkorisnici?.issuedConfCode
      }
    })
  }

  delete(id:number){
    return this.http.delete(aplication_settings.arminURL+this.type+id)

  }

  getGradovi(){
    return this.http.get<Grad[]>(aplication_settings.arminURL+"Grad");
  }


}
