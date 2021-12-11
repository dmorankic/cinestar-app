import { Component, OnInit } from '@angular/core';
import {aplication_settings} from "../aplication_settings";
import {DetaljiFilmaVM} from "../detalji-filma";
import {HttpClient} from "@angular/common/http";
import {FilmEditVM} from "../FilmEditVM";



@Component({
  selector: 'app-filmovi',
  templateUrl: './filmovi.component.html',
  styleUrls: ['./filmovi.component.scss']
})
export class FilmoviComponent implements OnInit {

  trajanje:string='208min';
  datumObjave:string='2021-02-02';
  trailer:string='jajajjja';

  dodajDetalje:DetaljiFilmaVM={_trajanje:'',_trailer:'',_datumObjave:''};
  edit:FilmEditVM={_naziv:'',_zanr:'' };

  filmPodaci: any;
  odabraniFilm: any=null;


  constructor(private httpKlijent: HttpClient) {

  }

  ngOnInit(): void {

  }
  prikaziFilmove() :void
  {
    this.httpKlijent.get(aplication_settings.damir_local+ "Film/GetAll").subscribe(x=>{
      this.filmPodaci = x;
    });
  }
  getFilmPodaci() {
    if (this.filmPodaci == null)
      return [];
    return this.filmPodaci;
  }
  detalji(s:any) {
    this.odabraniFilm= s;
  }
  snimi() {
    //this.odabraniStudent

    this.edit._zanr=this.odabraniFilm.zanr;
    this.edit._naziv=this.odabraniFilm.naziv;

    alert(this.odabraniFilm.naziv);
    alert(this.edit._naziv);



    this.httpKlijent.post(aplication_settings.damir_local+ "Film/Update/?id=" + this.odabraniFilm.id, this.edit)
      .subscribe((povratnaVrijednost:any) =>{
      alert("uredu..." + povratnaVrijednost.id);
    });
  }
  DodajDetaljeFilma()
  {


    this.dodajDetalje._trajanje=this.trajanje;
    this.dodajDetalje._datumObjave=this.datumObjave;
    this.dodajDetalje._trailer=this.trailer;

    this.httpKlijent.post(aplication_settings.damir_local+ "DetaljiFilma/Add" , this.dodajDetalje).subscribe((povratnaVrijednost:any) =>{
      alert("uredu..." + povratnaVrijednost.id);
    });
  }
}

