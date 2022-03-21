import { Component, OnInit } from '@angular/core';
import {aplication_settings} from "../aplication_settings";
import {DetaljiFilmaVM} from "../detalji-filma";
import {HttpClient , HttpHeaders, HttpParams,} from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {FilmEditVM} from "../FilmEditVM";
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import{DodajFilmVM} from "../Modeli/FilmAddVm";
import{glumacFilmAddVm} from "../Modeli/GlumacFilmAddVm";
import { NotificationMiddlewareService } from '../core/notification-middleware.service';

@Component({
  selector: 'app-filmovi',
  templateUrl: './filmovi.component.html',
  styleUrls: ['./filmovi.component.scss']
})

export class FilmoviComponent implements OnInit {


  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  detaljiP:boolean=false;
  glumacFilmAdd:glumacFilmAddVm={glumacId:0,filmId:0};
  trajanje: string = '208min';
  datumObjave: string = '2021-02-02';
  trailer: string = 'jajajjja';

  nazivFilma:string;

  router: Router;

  imageSrc: string;
  dodajDetalje: DetaljiFilmaVM = {_trajanje: '', _trailer: '', _datumObjave: ''};
  edit: FilmEditVM = {_naziv: '', _zanr: '',_detaljiFilmaId:0,_slikaUrl:''};
  add:DodajFilmVM={_naziv:'',_zanr:'',_detaljiFilmaId:0,_slikaUrl:''};

  glumacPodaci: any;
  filmPodaci: any;
  odabraniFilm: any = null;
  prikaziDetalje: boolean = false;
  dodaje: boolean = false;
  prikaziDodavanje: boolean=true;
  ime: string='';
  filmID:number;
  glumacID:number=0;
  prikaziFilmGlumci:boolean=false;
  dodajeGlumca: boolean=false;

  filmZaBrisanje:any;
  modalFilmNaziv:string;
  newDetaljiId:number;
  newFilmId:number;
  addDetalji:DetaljiFilmaVM={_trajanje:'',_trailer:'',_datumObjave:''};





  constructor(private httpKlijent: HttpClient,public notificationMiddleware: NotificationMiddlewareService) {

  }

  get f(){
    return this.myForm.controls;
  }

  ngOnInit(): void {
    this.prikaziFilmove();
  }

  prikaziFilmove(): void {
    this.httpKlijent.get(aplication_settings.damir_local + "Film/GetAll").subscribe(x => {
      this.filmPodaci = x;
    });
  }

  getFilmPodaci() {
    if (this.filmPodaci == null)
      return [];
    return this.filmPodaci.filter((x:any)=>x.naziv.length==0 || (x.naziv).toLowerCase().startsWith(
        this.ime.toLowerCase())

    );
  }

  detalji(s: any) {

    this.prikaziDodavanje=true;
    this.odabraniFilm = s;
  }

  snimi() {
    this.edit._zanr = this.odabraniFilm.zanr;
    this.edit._naziv = this.odabraniFilm.naziv;
    this.edit._slikaUrl=this.odabraniFilm.slikaUrl;

    if(this.edit._naziv.length<1)
    {
      alert("Polje za naziv filma je prazno");
      return;
    }
    else if(this.edit._zanr.length<1)
    {
      alert("Polje za žanr je prazno");
      return;
    }




    this.httpKlijent.post(aplication_settings.damir_local + "Film/Update/?id=" + this.odabraniFilm.id, this.edit)
      .subscribe((povratnaVrijednost: any) => {
      alert("uredu..." + povratnaVrijednost.id);
  },error =>{ alert( error.error);}
  );

    this.refreshFilmovi();
    this.prikaziDodavanje=false;
  }

  dodajDetaljeNaFilm(){
    this.httpKlijent.post(aplication_settings.damir_local+'Film/AddDetalji?filmId='+this.newFilmId+'&detaljiId='+this.newDetaljiId,null)
      .subscribe((pov:any)=>{

      });

    setTimeout(()=>{this.httpKlijent.get(aplication_settings.damir_local + "Film/GetAll").subscribe(x => {
      this.filmPodaci = x;
    });},1000);



  }

  DodajDetaljeFilma() {




    this.httpKlijent.post(aplication_settings.damir_local + "DetaljiFilma/Add", this.addDetalji).subscribe((povratnaVrijednost: any) => {

      this.newDetaljiId=povratnaVrijednost.id;

      this.dodajDetaljeNaFilm();
    });






  }


  seDodaje() {
    this.dodaje = true;
  }

  onFileChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.imageSrc = reader.result as string;

        this.myForm.patchValue({
          fileSource: reader.result
        });

      };

    }
  }




  DodajFilm() {
    this.httpKlijent.post(aplication_settings.damir_local + "Film/Add", this.add).subscribe((povratnaVrijednost: any) => {
      alert("uredu..." + povratnaVrijednost.id);
    },error =>{ alert( error.error);});


    this.dodaje=false;
    setTimeout(()=>{this.httpKlijent.get(aplication_settings.damir_local + "Film/GetAll").subscribe(x => {
      this.filmPodaci = x;
    });},1000);
  }


  obrisiFilm(s:any) {
    this.httpKlijent.post(aplication_settings.damir_local+"Film/Delete?id="+s.id,null).subscribe((pov:any)=>{
      const index = this.filmPodaci.indexOf(s);
      if (index > -1) {
        this.filmPodaci.splice(index, 1);
      }
      alert("Izbrisan film ID:"+pov.id);
    });
  }

  prikaziGlumce(s:any) {
      this.filmID=s.id;
      this.nazivFilma=s.naziv;
    this.httpKlijent.get(aplication_settings.damir_local + "GlumacFilm/GetGlumciZaFilm?filmId="+s.id).subscribe(x => {
      this.glumacPodaci = x;
    });
      this.prikaziFilmGlumci=true;
  }
  getGlumacPodaci(){
    if (this.glumacPodaci == null)
      return [];
    return this.glumacPodaci;
  }

  ukloniSaFilma(s:any,filmId:any) {



    this.httpKlijent.post(aplication_settings.damir_local + "GlumacFilm/DeleteGlumciZaFilm?filmId="+filmId+"&glumacId="+s.id,null).subscribe((x:any) => {
      const index = this.glumacPodaci.indexOf(s);
      if (index > -1) {
        this.glumacPodaci.splice(index, 1);
      }
      alert("Glumac ID "+x.glumacId+" uspjesno uklonjen sa filma");
    });
  }

  dodajNaFilm(filmID: number) {
    this.dodajeGlumca=true;
  }

  DodajGlumcaNaFilm() {

    if(this.glumacID!=0 && this.filmID!=0)
    {
      this.glumacFilmAdd.filmId=this.filmID;
      this.glumacFilmAdd.glumacId=this.glumacID;
    }
    else
    {
      alert("Provjerite unos ID-a za glumca");
    }


    this.httpKlijent.post(aplication_settings.damir_local + "GlumacFilm/Add",this.glumacFilmAdd).subscribe((x:any) => {
      alert("Glumac ID "+x.glumacId+" uspjesno dodan na film ID"+x.filmId);
    },error =>{ alert( error.error);});
    this.dodajeGlumca=false;
    setTimeout(()=>{this.httpKlijent.get(aplication_settings.damir_local + "GlumacFilm/GetGlumciZaFilm?filmId="+this.filmID).subscribe(x => {
      this.glumacPodaci = x;
    });},1000);


  }


   refreshFilmovi() {

    setTimeout(()=>this.httpKlijent.get(aplication_settings.damir_local + "Film/GetAll").subscribe(x => {
      this.filmPodaci = x;
    }),1000);
  }


  toggleSubscription() {
    this.notificationMiddleware.toggleSubscription();
  }

  cleanUrl(url:any) {
    if (url.indexOf(self.location.origin) >= 0) {
      return url.replace(self.location.origin, '');
    }
    return url;
  }

  removeNotif(notif:any) {/*
    var index = this.notificationMiddleware.notifications.indexOf(notif);
    if (index >= 0) {
      this.notificationMiddleware.notifications.splice(index, 1);
    }*/
  }


}
