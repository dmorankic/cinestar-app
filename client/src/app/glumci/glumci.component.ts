import { Component, OnInit } from '@angular/core';
import {aplication_settings} from "../aplication_settings";
import {HttpClient} from "@angular/common/http";
import {glumacAddVm} from "../Modeli/GlumacAddVm";


@Component({
  selector: 'app-glumci',
  templateUrl: './glumci.component.html',
  styleUrls: ['./glumci.component.scss']
})
export class GlumciComponent implements OnInit {
  private glumacPodaci: any;
   prikaziDodavanje: boolean=false;
  add:glumacAddVm={_ime:'',_prezime:'',_datumRodj:''};

  constructor(private httpKlijent: HttpClient) {

  }
  prikaziGlumce(): void {
    this.httpKlijent.get(aplication_settings.damir_local + "Glumac/GetAll").subscribe(x => {
      this.glumacPodaci = x;
    });
  }

  ngOnInit(): void {
    this.prikaziGlumce();
  }

  getGlumacPodaci() {
    if (this.glumacPodaci == null)
      return [];
    return this.glumacPodaci;
  }

  dodavanje() {
    this.prikaziDodavanje=true;
  }

  DodajGlumca() {
    const userKeyRegExp = /^\d{4}[-]\d{2}[-]\d{2}$/;
    const valid = userKeyRegExp.test(this.add._datumRodj);
    if(!valid )
    {
      alert("Neispravan format datuma objave");
      return;
    }
    else if(this.add._ime.length<1)
    {
      alert("Polje za ime glumca je prazno");
      return;
    }
    else if(this.add._prezime.length<1)
    {
      alert("Polje za prezime glumca je prazno");
      return;
    }


    this.httpKlijent.post(aplication_settings.damir_local + "Glumac/Add", this.add).subscribe((povratnaVrijednost: any) => {
      alert("uredu..." + povratnaVrijednost.id);
    },error =>{ alert( error.error);});

    this.prikaziGlumce();

    this.prikaziDodavanje=false;
  }
}
