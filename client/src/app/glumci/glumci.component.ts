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
   odabraniGlumac: any= null;
   prikaziUredjivanje:boolean=true;
   ime: string='';

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
    return this.glumacPodaci.filter((x:any)=>x.ime.length==0 || (x.ime + " " +x.prezime).toLowerCase().startsWith(
     this.ime.toLowerCase())
     || (x.prezime + " " +x.ime).toLowerCase().startsWith(this.ime.toLowerCase())
    );


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

  obrisiGlumca(s:any) {

    this.httpKlijent.post(aplication_settings.damir_local+"Glumac/Delete?id="+s.id,null).subscribe((pov:any)=>{
      const index = this.glumacPodaci.indexOf(s);
      if (index > -1) {
        this.glumacPodaci.splice(index, 1);
      }
      alert("Izbrisan glumac ID:"+pov.id);
    });
  }

  urediGlumca(s:any) {

    this.prikaziUredjivanje=true;
    this.odabraniGlumac = s;
    this.odabraniGlumac.datumRodjenja=this.odabraniGlumac.datumRodjenja.substr(0,10);

  }

  snimi() {

    this.add._ime = this.odabraniGlumac.ime;
    this.add._prezime = this.odabraniGlumac.prezime;
    this.add._datumRodj=this.odabraniGlumac.datumRodjenja;



    const userKeyRegExp = /^\d{4}[-]\d{2}[-]\d{2}$/;
    const valid = userKeyRegExp.test(this.add._datumRodj);
    if(!valid )
    {
      alert("Neispravan format datuma rodjenja");
      return;
    }
    else if(this.add._ime.length<1)
    {
      alert("Polje za naziv filma je prazno");
      return;
    }
    else if( this.add._prezime.length<1)
    {
      alert("Polje za žanr je prazno");
      return;
    }




    this.httpKlijent.post(aplication_settings.damir_local + "Glumac/Update/?id=" + this.odabraniGlumac.id, this.add)
      .subscribe((povratnaVrijednost: any) => {
          alert("uredu..." + povratnaVrijednost.id);
        },error =>{ alert( error.error);}
      );

    this.prikaziGlumce();

    this.prikaziUredjivanje=false;
  }
}
