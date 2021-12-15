import { Component, OnInit } from '@angular/core';
import {DetaljiFilmaVM} from "../detalji-filma";
import {HttpClient} from "@angular/common/http";
import {aplication_settings} from "../aplication_settings";
import { Router } from '@angular/router';


@Component({
  selector: 'app-detalji-filma',
  templateUrl: './detalji-filma.component.html',
  styleUrls: ['./detalji-filma.component.scss']
})
export class DetaljiFilmaComponent implements OnInit {

  router:Router;

  detaljiPodaci:any;
  prikaziTable:boolean=false;
  prikaziUredjivanje:boolean=false;
  editDetalji:DetaljiFilmaVM={_trajanje:'',_trailer:'',_datumObjave:''};
  addDetalji:DetaljiFilmaVM={_trajanje:'',_trailer:'',_datumObjave:''};


  odabraniPodaci: any=null;
  prikaziDodavanje: boolean=false;
  constructor(private httpKlijent: HttpClient) { }

  ngOnInit(): void {

    this.ucitajDetalje();
  }

  ucitajDetalje() {
    this.prikaziTable=true;
    this.httpKlijent.get(aplication_settings.damir_local+ "DetaljiFilma/GetAll").subscribe(x=>{
      this.detaljiPodaci = x;
    });

  }
  getDetaljiPodaci() {
    if (this.detaljiPodaci == null)
      return [];
    return this.detaljiPodaci;
  }

  detalji(s:any) {

    this.odabraniPodaci=  s;
    this.odabraniPodaci.datumObjave=this.odabraniPodaci.datumObjave.substr(0,10);
    this.prikaziUredjivanje=true;
  }

  getDatum() {
    return this.odabraniPodaci.datumObjave.substr(0,10);
  }

  urediDetalje() {

    const userKeyRegExp = /^\d{4}[-]\d{2}[-]\d{2}$/;
    const valid = userKeyRegExp.test(this.odabraniPodaci.datumObjave);
    if(!valid )
    {
      alert("Neispravan format datuma objave");
      return;
    }
    else if( this.odabraniPodaci.trailer.length<1 )
    {
      alert("Niste unijeli podatke za trailer");
      return;
    }
    else if( this.odabraniPodaci.trajanje.length<1 )
    {
      alert("Niste unijeli podatke za trajanje");
      return;
    }

    this.editDetalji._trajanje=this.odabraniPodaci.trajanje;
    this.editDetalji._datumObjave=this.odabraniPodaci.datumObjave;
    this.editDetalji._trailer=this.odabraniPodaci.trailer;

    this.httpKlijent.post(aplication_settings.damir_local+ "DetaljiFilma/Update?id="+this.odabraniPodaci.id , this.editDetalji).subscribe((povratnaVrijednost:any) =>{
      alert("uredu..." + povratnaVrijednost.id);
    });
    this.prikaziUredjivanje=false;
  }

  DodajDetaljeFilma()
  {
    const userKeyRegExp = /^\d{4}[-]\d{2}[-]\d{2}$/;
    const valid = userKeyRegExp.test(this.addDetalji._datumObjave);
    if(!valid )
    {
      alert("Neispravan format datuma objave");
      return;
    }
    else if( this.addDetalji._trailer.length<1 )
    {
      alert("Niste unijeli podatke za trailer");
      alert(this.addDetalji._trailer);
      return;
    }
    else if( this.addDetalji._trajanje.length<1 )
    {
      alert("Niste unijeli podatke za trajanje");
      return;
    }

    this.httpKlijent.post(aplication_settings.damir_local+ "DetaljiFilma/Add" , this.addDetalji).subscribe((povratnaVrijednost:any) =>{
      alert("uredu..." + povratnaVrijednost.id);
    });

    this.ucitajDetalje();
    this.prikaziDodavanje=false;
  }

  PrikaziDodavanje() {
    this.prikaziDodavanje=true;
  }

  sakrijDodavanje() {
    this.prikaziDodavanje=false;

  }

  sakrijUredjivanje() {
    this.prikaziUredjivanje=false;
  }

  obrisiDetalje(s:any) {

    this.httpKlijent.post(aplication_settings.damir_local+"DetaljiFilma/Delete?id="+s.id,s).subscribe((pov:any)=>{
      const index = this.detaljiPodaci.indexOf(s);
      if (index > -1) {
        this.detaljiPodaci.splice(index, 1);
      }
      alert("Uspjesno izbrisan "+ pov.id);
    });


    //this.ucitajDetalje();


  }


}
