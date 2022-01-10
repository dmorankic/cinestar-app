import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { aplication_settings } from 'src/app/aplication_settings';

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
  constructor(private _Activatedroute:ActivatedRoute,private http:HttpClient,private sec:DomSanitizer) { }

  ngOnInit(): void {
    this.http.get(aplication_settings.cinestar__plesk__server_standard_endpoints+ "Film/GetAll?_id="+this._Activatedroute.snapshot.paramMap.get("id")).subscribe(x=>{
      this.movie = x;
      this.http.get(aplication_settings.cinestar__plesk__server_standard_endpoints+ "DetaljiFilma/GetAll?_id="+this.movie[0].detaljiFilmaID).subscribe(x=>{
        this.movieDetails = x;
        this.movieDetails = this.movieDetails[0];
        if(this.movieDetails.trailer.includes("www.youtube.com")){
          this.isYt=true;
          this.dontDisplayTrailer=false;
          var turnToEmbededVideo = this.movieDetails.trailer.replace("watch?v=","embed/");
          this.url=this.sec.bypassSecurityTrustResourceUrl(turnToEmbededVideo as string);
        }else if(this.movieDetails.trailer.includes("www.imdb.com")){
          this.url=this.sec.bypassSecurityTrustResourceUrl(this.movieDetails.trailer as string);
          this.dontDisplayTrailer=false;
        }else{
          this.dontDisplayTrailer=true;
        }
        console.log(this.url)
      });
      console.log("movie ",this.movie)
    });

  }

}
