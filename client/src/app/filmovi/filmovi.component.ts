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

  trajanje: string = '208min';
  datumObjave: string = '2021-02-02';
  trailer: string = 'jajajjja';



  router: Router;

  imageSrc: string;
  dodajDetalje: DetaljiFilmaVM = {_trajanje: '', _trailer: '', _datumObjave: ''};
  edit: FilmEditVM = {_naziv: '', _zanr: '',_detaljiFilmaId:0};
  add:DodajFilmVM={_naziv:'',_zanr:'',_detaljiFilmaId:0};

  filmPodaci: any;
  odabraniFilm: any = null;
  prikaziDetalje: boolean = false;
  dodaje: boolean = false;
  prikaziDodavanje: boolean=true;



  constructor(private httpKlijent: HttpClient) {

  }

  get f(){
    return this.myForm.controls;
  }

  ngOnInit(): void {
    this.prikaziFilmove();
  }

  prikaziFilmove(): void {
    this.httpKlijent.get(aplication_settings.cinestar__plesk__server_standard_endpoints + "Film/GetAll").subscribe(x => {
      this.filmPodaci = x;
    });
  }

  getFilmPodaci() {
    if (this.filmPodaci == null)
      return [];
    return this.filmPodaci;
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



    this.httpKlijent.post(aplication_settings.cinestar__plesk__server_standard_endpoints + "Film/Update/?id=" + this.odabraniFilm.id, this.edit)
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

    this.httpKlijent.post(aplication_settings.cinestar__plesk__server_standard_endpoints + "DetaljiFilma/Add", this.dodajDetalje).subscribe((povratnaVrijednost: any) => {
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

    this.httpKlijent.post(aplication_settings.cinestar__plesk__server_standard_endpoints + "Film/Add", this.add).subscribe((povratnaVrijednost: any) => {
      alert("uredu..." + povratnaVrijednost.id);
    },error =>{ alert( error.error);});

    this.prikaziFilmove();

    this.dodaje=false;
  }


  obrisiFilm(s:any) {
    this.httpKlijent.post(aplication_settings.cinestar__plesk__server_standard_endpoints+"Film/Delete?id="+s.id,null).subscribe((pov:any)=>{
      const index = this.filmPodaci.indexOf(s);
      if (index > -1) {
        this.filmPodaci.splice(index, 1);
      }
      alert("Izbrisan film ID:"+pov.id);
    });
  }
}

