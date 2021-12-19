import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-mid',
  templateUrl: './mid.component.html',
  styleUrls: ['./mid.component.scss']
})
export class MidComponent implements OnInit {
  data:any;
  constructor() {
    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
          {
              label: 'First Dataset',
              data: [65, 59, 80, 81, 56, 55, 40],
              backgroundColor: [
                "#1E13D0",
                "#563476",
              ],
            hoverBackgroundColor: "#DC3545"

          },


      ]
  }

  }

	ngOnInit() {

 }
  update(event: Event) {
    //this.data = //create new data
  }
}
