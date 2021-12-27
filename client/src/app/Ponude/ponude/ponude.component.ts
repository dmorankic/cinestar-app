import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {aplication_settings} from "../../aplication_settings";
import{ponudaAddVm} from "../../Modeli/PonudaAddVm";
import { Router } from '@angular/router';

import{pipe} from "rxjs";



@Component({
  selector: 'app-ponude',
  templateUrl: './ponude.component.html',
  styleUrls: ['./ponude.component.scss']
})
export class PonudeComponent implements OnInit {
   ponudePodaci: any;
   prikaziDodavanje: boolean=false;
   add:ponudaAddVm={vrsta_ponude:'',pocetakPonude:'',trajanjePonude:0,radnikId:0};
  prikaziStavke: boolean=false;
  stavkePodaci:any;




  constructor(private httpKlijent: HttpClient,private router: Router) {

  }
  private prikaziPonude() {
    this.httpKlijent.get(aplication_settings.arminURL + "Ponuda").subscribe(x => {
      this.ponudePodaci = x;
    });
  }
  ngOnInit(): void {
    this.prikaziPonude();
  }


  getPonudePodaci() {
    if (this.ponudePodaci == null)
      return [];
    return this.ponudePodaci;
  }


  dodavanje() {
    this.prikaziDodavanje=true;
  }

  DodajPonudu() {

    if(this.add.vrsta_ponude.length<1)
    {
      alert("Polje za vrstu ponude je prazno");
      return;
    }


    this.httpKlijent.post(aplication_settings.arminURL + "Ponuda", this.add).subscribe((povratnaVrijednost: any) => {
      alert("uredu..." + povratnaVrijednost.id);
    },error =>{ alert( error.error.title);});

    this.prikaziDodavanje=false;

    setTimeout(()=>{this.httpKlijent.get(aplication_settings.arminURL + "Ponuda").subscribe(x => {
      this.ponudePodaci = x;
    });},1000) ;
  }

  obrisiPonudu(s:any) {
    this.httpKlijent.delete(aplication_settings.arminURL+"Ponuda/"+s.id).subscribe((pov:any)=>{
      const index = this.ponudePodaci.indexOf(s);
      if (index > -1) {
        this.ponudePodaci.splice(index, 1);
      }
      alert("Izbrisana ponuda ID:"+pov.id);
    });
  }

  UcitajStavke(s:any) {


    this.router.navigate(['/Stavke',s.id]);
    /*this.prikaziStavke=true;
    this.httpKlijent.get(aplication_settings.damir_local+"VrstaProjekcije/GetStavke?_id="+s.id)
      .subscribe((pov:any)=>{
      this.stavkePodaci=pov;
    });*/
  }

  getStavkePodaci() {
    if (this.stavkePodaci == null)
      return [];
    return this.stavkePodaci;
  }
}
