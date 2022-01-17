import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { aplication_settings } from 'src/app/aplication_settings';
import { SnacksVM } from 'src/app/Modeli/SnacksVM';

@Injectable({
  providedIn: 'root'
})
export class BuyService {

  racuniGeneral:any[]=[];
  racuniSnacks:any[]=[];
  racuniMovie:any[]=[];
  recenetRacuniMovie:any[]=[];

  stavke:any[]=[];
  film:any;
  sjedista:any[]=[];

  constructor(private httpClient:HttpClient) { }

  public getSnacksRacuni(){
    return this.racuniSnacks;
  }
  public getMovieRacuni(){
    return this.racuniMovie;
  }

  dodajSnackRacun(racun:any){
    this.racuniSnacks.push(racun);
  }

  dodajMovieRacun(racun:any){
    this.racuniMovie.push(racun);
  }

  getMovieRacun(index:number=0,racun:any=null){
    if(racun){
      let i = this.racuniMovie.indexOf(racun);
      return this.racuniMovie[i];
    }else{
      this.racuniMovie.forEach(element => {
        if(element.id==index)
          return element;
      });
    }
    return null;
  }

  ukloniSnackRacun(racun:any){

    let receats = []
    for (let i = 0; i < this.racuniSnacks.length; i++) {
      if(this.racuniSnacks[i].id!=racun.id){
        receats.push(this.racuniSnacks[i])
      }
    }

    this.racuniSnacks=receats;
    this.reloadSnacks();
  }

  ukloniMovieRacun(racun:any){
    for (let i = 0; i < this.racuniMovie.length; i++) {
      if(this.racuniMovie[i].id==racun.id){
        this.racuniMovie[i]=null;
        break;
      }
    }
    this.reloadTickets()

  }

  getStavke(){
    return this.httpClient.get<SnacksVM>(aplication_settings.damir_local+'SnacksVM');
  }

  getSjedista(){

  }

  ukloniRecentRacun(){

  }

  reloadTickets(){
    let arr : any = [];
    this.racuniMovie.forEach(element => {
      if(element)
       arr.push(element);
    });
    this.racuniMovie = arr;
  }

  reloadSnacks(){
    let arr : any = [];
    this.racuniSnacks.forEach(element => {
      if(element)
       arr.push(element);
    });
    this.racuniSnacks = arr;
  }
  public get getGeneralRacuni(){
    return this.racuniGeneral;
  }

}
