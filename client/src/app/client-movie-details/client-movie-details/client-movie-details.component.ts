import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
  constructor(private _Activatedroute:ActivatedRoute,private http:HttpClient) { }

  ngOnInit(): void {
    this.http.get(aplication_settings.cinestar__plesk__server_standard_endpoints+ "Film/GetAll?_id="+this._Activatedroute.snapshot.paramMap.get("id")).subscribe(x=>{
      this.movie = x;
      this.http.get(aplication_settings.cinestar__plesk__server_standard_endpoints+ "DetaljiFilma/GetAll?_id="+this.movie[0].detaljiFilmaID).subscribe(x=>{
        this.movieDetails = x;
        this.movieDetails = this.movieDetails[0];
      });
    });


  }

}
