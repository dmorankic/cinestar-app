import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-buy-snacks-modal',
  templateUrl: './buy-snacks-modal.component.html',
  styleUrls: ['./buy-snacks-modal.component.scss']
})
export class BuySnacksModalComponent implements OnInit {
  @Input()tickets:any[]=[];
  stavke:any[]=[];
  constructor() {
    for (let i = 0; i < 10; i++) {
      this.stavke.push(i);
    }
  }

  ngOnInit(): void {
  }

  hideModal(){
    var modal = document.getElementById("myModal");
    (modal as HTMLElement).style.display = "none";
  }
}
