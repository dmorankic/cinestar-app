import { Component, Input, OnInit } from '@angular/core';
import { Proizvod } from 'src/app/Modeli/SnacksVM';
import { BuyService } from '../Services/buy.service';

@Component({
  selector: 'app-buy-snacks-modal',
  templateUrl: './buy-snacks-modal.component.html',
  styleUrls: ['./buy-snacks-modal.component.scss']
})
export class BuySnacksModalComponent implements OnInit {

  tickets:any[]=[];
  stavke:Proizvod[]=[];

  constructor(private buyService:BuyService) {

  }

  ngOnInit(): void {
    this.loadStavke();
    this.loadTickets();
  }

  hideModal(naredba:string=''){
    if(naredba=='ukloniRacune'){
      this.buyService.racuniSnacks=[];
      this.loadTickets();
      this.loadStavke();
    }
    var modal = document.getElementById("myModal");
    (modal as HTMLElement).style.display = "none";
  }

  ukloniRacun(racun:any){
    console.log(racun)
    this.buyService.ukloniSnackRacun(racun);
    this.loadReceipt()
  }

  loadStavke(){
    this.stavke=[];
    this.buyService.getStavke().subscribe(x=>{
      this.stavke=x.proizvodi;
    });
  }

  loadTickets(){
    this.tickets=[];
    this.tickets = this.buyService.getSnacksRacuni();
  }

  loadReceipt(){
    this.tickets=[]
    this.tickets=this.buyService.getSnacksRacuni();

  }


}
