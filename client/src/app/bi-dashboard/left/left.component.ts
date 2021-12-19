import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-left',
  templateUrl: './left.component.html',
  styleUrls: ['./left.component.scss']
})
export class LeftComponent implements OnInit {
  data:any;
  chartOptions: any;
  subscription?: Subscription;

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
//   updateChartOptions() {
//     this.chartOptions = this.config && this.config.dark ? this.getDarkTheme() : this.getLightTheme();
// }
  getLightTheme() {
    return {
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        }
    }
}

getDarkTheme() {
    return {
        plugins: {
            legend: {
                labels: {
                    color: '#ebedef'
                }
            }
        }
    }
}


  ngOnInit(): void {
  }

}
