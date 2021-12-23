import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {aplication_settings} from "../../aplication_settings";
import{ponudaAddVm} from "../../Modeli/PonudaAddVm";

@Component({
  selector: 'app-ponude',
  templateUrl: './ponude.component.html',
  styleUrls: ['./ponude.component.scss']
})
export class PonudeComponent implements OnInit {
   ponudePodaci: any;
   prikaziDodavanje: boolean=false;
   add:ponudaAddVm={vrsta_ponude:'',pocetakPonude:'',trajanjePonude:0,radnikId:0};

  constructor(private httpKlijent: HttpClient) {

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
}
