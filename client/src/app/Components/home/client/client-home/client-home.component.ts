import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { aplication_settings } from 'src/app/aplication_settings';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.scss']
})
export class ClientHomeComponent implements OnInit {
  filmovi:any;
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.http.get(aplication_settings.cinestar__plesk__server_standard_endpoints + "Film/GetAll").subscribe(x => {
      this.filmovi = x;
      console.log(this.filmovi);
    });
  }

}
