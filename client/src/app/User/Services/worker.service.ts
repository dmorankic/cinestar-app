import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { aplication_settings } from '../../aplication_settings';
import { Grad } from '../Model/General';
import { User } from '../Model/User';
import { Worker } from '../Model/Worker';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  type:string="Radnik/";

  constructor(private http:HttpClient) { }

  getAll(){
    return this.http
    .get(aplication_settings.arminURL+this.type);
  }

  getById(id:number){
    return this.http
    .get(aplication_settings.arminURL+this.type+id)
  }

  insert(worker:Worker){
    return this.http
    .post(aplication_settings.arminURL+this.type,{
      ime_prezime: worker.ime_prezime,
      username: worker.username,
      email:  worker.email,
      b_date:  worker.b_date,
      password:  worker.password,
      broj_telefona:  worker.broj_telefona,
      datum_uposljenja:  worker.datum_uposljenja,
      vrstaRadnikaId:  worker.vrstaRadnikaId,
      gradId:worker.gradId,
      spol:worker.spol,
      jmbg:worker.jmbg,
      strucnaSprema:worker.strucnaSprema,
      plata:0
    })

  }
  update(id:number,worker:Worker){

    return this.http
    .put(aplication_settings.arminURL+this.type+id,{
      ime_prezime: worker.ime_prezime,
      username: worker.username,
      email:  worker.email,
      b_date:  worker.b_date,
      password:  worker.password,
      broj_telefona:  worker.broj_telefona,
      datum_uposljenja:  worker.datum_uposljenja,
      vrstaRadnikaId:  worker.vrstaRadnikaId,
      vrstaRadnika: {
        id:  worker.vrstaRadnikaId,
        naziv: worker?.vrstaRadnika?.naziv
      },
      gradId:  worker.gradId,
      grad: {
        id:  worker.gradId,
        naziv: worker?.grad?.naziv
      },
      spol:worker.spol,
      plata:worker.plata,
      strucnaSprema:worker.strucnaSprema,
      jmbg:worker.jmbg
    })
  }

  delete(id:number){
    return this.http
    .delete(aplication_settings.arminURL+this.type+id)

  }

  getUloge(){
    return this.http
    .get(aplication_settings.arminURL+"Uloge");
  }

  getGradovi(){
    return this.http
    .get<Grad[]>(aplication_settings.arminURL+"Grad");
  }
}
