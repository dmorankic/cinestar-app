import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {aplication_settings} from "../../aplication_settings";

@Component({
  selector: 'app-ponude',
  templateUrl: './ponude.component.html',
  styleUrls: ['./ponude.component.scss']
})
export class PonudeComponent implements OnInit {
   ponudePodaci: any;

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


}
