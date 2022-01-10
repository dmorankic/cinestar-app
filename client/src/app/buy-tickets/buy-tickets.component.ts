import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buy-tickets',
  templateUrl: './buy-tickets.component.html',
  styleUrls: ['./buy-tickets.component.scss']
})
export class BuyTicketsComponent implements OnInit {
  seats:any[]=[];
  rows:any[]=[];
  tickets:any[]=[];
  constructor() {
    for(let i=0; i <9;i++){
      this.tickets.push(i)
    }
    for(let i=1; i < 46;i++){
      this.seats.push(i)
    }
    let size = Math.ceil(this.seats.length/5);
    let row = [];
    for(let i=0;i<this.seats.length;i++){
      row.push(this.seats[i]);
      if(row.length==8){
        this.rows.push(row);
        row=[];
      }
    }
    console.log("ssdasd");


  }

  ngOnInit(): void {
  }

  showModal(){
    var modal = document.getElementById("myModal");
    (modal as HTMLElement).style.display = "block";
  }


}
