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

  baneri: string[]=[];
  currentBanner:any;
  bannerIndex:number=0;
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.http.get(aplication_settings.cinestar__plesk__server_standard_endpoints + "Film/GetAll").subscribe(x => {
      this.filmovi = x;
      var movies = [];
      for (let i = 0; i < this.filmovi.length; i++) {
        movies.push(this.filmovi[i]);
      }
      this.filmovi = movies;
    });
    this.baneri.push(
      "https://image.tmdb.org/t/p/original/oSNqhngemquRBzxKSC3ysAmnC5e.jpg",
      "https://image.tmdb.org/t/p/original/hv7o3VgfsairBoQFAawgaQ4cR1m.jpg",
      "https://image.tmdb.org/t/p/original/ng6SSB3JhbcpKTwbPDsRwUYK8Cq.jpg"
    )
    this.currentBanner=this.baneri[this.bannerIndex];
    setInterval(()=>{
        this.currentBanner=this.baneri[(this.bannerIndex++)%this.baneri.length]
    },4000)
  }

  Next(){
    this.currentBanner=this.baneri[this.bannerIndex++];
  }
  previous(){
    this.currentBanner=this.baneri[this.bannerIndex--];
  }

}
