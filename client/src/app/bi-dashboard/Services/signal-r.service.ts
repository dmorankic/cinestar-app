import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Observable } from 'rxjs';
import { aplication_settings } from 'src/app/aplication_settings';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  public data:any;

  public connection:signalR.HubConnection;

  constructor(private http:HttpClient) {

  }

  public startConnection = () => {

    this.connection = new signalR.HubConnectionBuilder()
    .withUrl('https://localhost:5001/dashboard',{skipNegotiation:true,transport:signalR.HttpTransportType.WebSockets})
    .build();

    this.connection
    .start()
    .then(() => console.log('SignalR Connected!'))
    .catch(err => console.error(err.toString()) );

    //this.startHttpRequest();
  }

  askServer(){
    this.connection.invoke("askServer","hey").catch(x=>console.log(x))
  }

  askServerListener(){
    this.connection.on("fetchData", (data) => {
      this.data=data;
      console.log("the real data",this.data)
    });
  }

  // getDataObservable():Observable<any[]>{
  //   return new Observable<any[]>(observer=>{
  //     this.addTransferChartDataListener();
  //   })
  // }

  public chartDataListener = () => {
    this.connection.on('transferchartdata', (data) => {
      this.data = data;
    });
  }

  private startHttpRequest = () => {
    this.http.get('https://localhost:5001/api/Dashboard')
      .subscribe(res => {
        console.log(res);
      })
  }


}
