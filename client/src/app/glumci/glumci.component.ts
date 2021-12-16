import { Component, OnInit } from '@angular/core';
import {aplication_settings} from "../aplication_settings";
import {HttpClient} from "@angular/common/http";



@Component({
  selector: 'app-glumci',
  templateUrl: './glumci.component.html',
  styleUrls: ['./glumci.component.scss']
})
export class GlumciComponent implements OnInit {
  private glumacPodaci: any;

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
}
