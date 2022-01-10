import { Component, Input, OnInit } from '@angular/core';
import { SignalRService } from '../Services/signal-r.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() data:any;
  @Input('dataName') name:any;

  constructor(private signalrService:SignalRService) {

  }

  ngOnInit(): void {
    this.signalrService.startConnection();

   setInterval(()=>{
    //  this.signalrService.askServerListener();
    //  this.signalrService.askServer()
     this.data=[];
      const resp = this.signalrService.data;
      for (let i = 0; i < (resp as any).length; i++) {
        this.data.push((resp as any)[i].data[0])
      }
      console.log(this.signalrService.data)
    },2000)

    this.signalrService.chartDataListener();

  }

}
