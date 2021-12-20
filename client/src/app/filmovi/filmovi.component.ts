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

  glumacFilmAdd:glumacFilmAddVm={glumacId:0,filmId:0};
  trajanje: string = '208min';
  datumObjave: string = '2021-02-02';
  trailer: string = 'jajajjja';

  nazivFilma:string;

  router: Router;

  imageSrc: string;
  dodajDetalje: DetaljiFilmaVM = {_trajanje: '', _trailer: '', _datumObjave: ''};
  edit: FilmEditVM = {_naziv: '', _zanr: '',_detaljiFilmaId:0};
  add:DodajFilmVM={_naziv:'',_zanr:'',_detaljiFilmaId:0};

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





  constructor(private httpKlijent: HttpClient) {

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
    //this.odabraniStudent

    this.edit._zanr = this.odabraniFilm.zanr;
    this.edit._naziv = this.odabraniFilm.naziv;
    this.edit._detaljiFilmaId=this.odabraniFilm.detaljiFilmaID;

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
    else if( this.edit._detaljiFilmaId < 1)
    {
      alert("Pogrešan ID detalja filma");
      return;
    }



    this.httpKlijent.post(aplication_settings.damir_local + "Film/Update/?id=" + this.odabraniFilm.id, this.edit)
      .subscribe((povratnaVrijednost: any) => {
      alert("uredu..." + povratnaVrijednost.id);
  },error =>{ alert( error.error);}
  );

    this.prikaziFilmove();

    this.prikaziDodavanje=false;
  }

  DodajDetaljeFilma() {


    this.dodajDetalje._trajanje = this.trajanje;
    this.dodajDetalje._datumObjave = this.datumObjave;
    this.dodajDetalje._trailer = this.trailer;

    this.httpKlijent.post(aplication_settings.damir_local + "DetaljiFilma/Add", this.dodajDetalje).subscribe((povratnaVrijednost: any) => {
      alert("uredu..." + povratnaVrijednost.id);
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


    if(this.add._naziv.length<1)
    {
      alert("Polje za naziv filma je prazno");
      return;
    }
    else if(this.add._zanr.length<1)
    {
      alert("Polje za žanr je prazno");
      return;
    }
    else if( this.add._detaljiFilmaId < 1)
    {
      alert("Pogrešan ID detalja filma");
      return;
    }

    this.httpKlijent.post(aplication_settings.damir_local + "Film/Add", this.add).subscribe((povratnaVrijednost: any) => {
      alert("uredu..." + povratnaVrijednost.id);
    },error =>{ alert( error.error);});

    this.prikaziFilmove();

    this.dodaje=false;
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
  }
}

