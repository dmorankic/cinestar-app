import { Component, OnInit } from '@angular/core';
import {aplication_settings} from "../aplication_settings";
import {HttpClient} from "@angular/common/http";
import {ProjekcijaAddVm} from "../Modeli/ProjekcijaAddVm";

@Component({
  selector: 'app-projekcije',
  templateUrl: './projekcije.component.html',
  styleUrls: ['./projekcije.component.scss']
})
export class ProjekcijeComponent implements OnInit {
   projekcijePodaci: any;
   vrstaProjekcijeNaziv:any;
  prikaziDodavanje: boolean=false;
  add:ProjekcijaAddVm={dan:'',vrijemePrikazivanja:'',vrstaProjekcijeId:0,filmId:0};
  constructor(private httpKlijent: HttpClient) {

  }

  prikaziProjekcije(): void {
    this.httpKlijent.get(aplication_settings.damir_local + "Projekcija/GetAll").subscribe(x => {
      this.projekcijePodaci = x;
    });
  }

  ngOnInit(): void {
    this.prikaziProjekcije();
    this.getVrstaProjekcije();
  }

  getProjekcijePodaci() {
    if (this.projekcijePodaci == null)
      return [];
    return this.projekcijePodaci;
  }

  getVrstaProjekcije() {


        this.httpKlijent.get(aplication_settings.damir_local+"VrstaProjekcije/GetAll").subscribe(pov=>{
          this.vrstaProjekcijeNaziv=pov;
        });
        return this.vrstaProjekcijeNaziv;
  }

  dodajProjekciju(){

   if(this.add.dan.length<1)
    {
      alert("Polje za dan je prazno");
      return;
    }



    this.httpKlijent.post(aplication_settings.damir_local + "Projekcija/Add", this.add).subscribe((povratnaVrijednost: any) => {
      alert("uredu..." + povratnaVrijednost.id);
    },error =>{ alert( error.error);});

    this.prikaziDodavanje=false;

    setTimeout(()=>{this.httpKlijent.get(aplication_settings.damir_local + "Projekcija/GetAll").subscribe(x => {
      this.projekcijePodaci = x;
    });},1000) ;
  }
}
