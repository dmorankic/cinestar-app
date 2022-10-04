import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { aplication_settings } from 'src/app/aplication_settings';
import { DeskripcijaFilmaVM } from '../Modeli/DetaljiFilmaVM';


@Component({
  selector: 'app-client-movie-details',
  templateUrl: './client-movie-details.component.html',
  styleUrls: ['./client-movie-details.component.scss']
})
export class ClientMovieDetailsComponent implements OnInit {
  movie:any;
  movieDetails:any;
  url?:SafeUrl;
  isYt=false;
  dontDisplayTrailer=false;
  id:any;
  sati:any=[];
  dani:any=[];

  constructor(private activatedRoute:ActivatedRoute,private http:HttpClient,private sec:DomSanitizer) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
   }

  ngOnInit(): void {
    let termin = 14.00;
    for(let i = 0;i<6;i++){
      this.sati.push(termin)
      termin+=2.00;
    }
    for(let i = 0;i<7;i++){
      this.dani.push(i)
    }



  }

}
