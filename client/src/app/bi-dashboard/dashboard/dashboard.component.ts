import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { aplication_settings } from 'src/app/aplication_settings';
import { SignalRService } from '../Services/signal-r.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit,OnDestroy {
  topUsers:number[]=[];
  topCinema:number[]=[];
  topMovies:number[]=[];
  constructor(private signalrService:SignalRService,private httpClient:HttpClient) {
    for (let i = 0; i < 10; i++) {
      this.topUsers.push(i)
      this.topCinema.push(i)
      this.topMovies.push(i)
     }
     this.sendRequest();
  }
  ngOnDestroy(): void {
    this.signalrService.connection.off('askServerResponse');
  }
  sendRequest() {
    this.httpClient.get('https://localhost:5001/api/Dashboard').subscribe(x=>{

      console.log("x ",x);
    })
  }

  ngOnInit(): void {
    this.signalrService.startConnection();

   setInterval(()=>{
    //  this.signalrService.askServerListener();
    //  this.signalrService.askServer()
     this.topUsers=[];
      const resp = this.signalrService.data;
      for (let i = 0; i < (resp as any).length; i++) {
        this.topUsers.push((resp as any)[i].data[0])
      }
    },2000)
    this.signalrService.chartDataListener();

  }



}
