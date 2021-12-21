import { Component, OnInit } from '@angular/core';
import {aplication_settings} from "../aplication_settings";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-projekcije',
  templateUrl: './projekcije.component.html',
  styleUrls: ['./projekcije.component.scss']
})
export class ProjekcijeComponent implements OnInit {
   projekcijePodaci: any;
   vrstaProjekcijeNaziv:any;
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
}
