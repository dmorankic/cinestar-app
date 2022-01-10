import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-mid',
  templateUrl: './mid.component.html',
  styleUrls: ['./mid.component.scss']
})
export class MidComponent implements OnInit {
  data:any;
  timeFilter:any;
  dayLabels:string[]=['MON','TUE','WED','THU','FRI','SAT','SUN'];
  weekLabels:string[]=['1. Week','2. Week','3. Week','4. Week'];
  monthLabels:string[]=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July'];
  yearLabels:string[]=[];
  activeLabels:string[]=[];
  constructor(private activatedRoute:ActivatedRoute){
    this.activatedRoute.queryParams.subscribe(params => {
      this.timeFilter = params['time'];
  });
    console.log(this.timeFilter)
    this.activeLabels=this.monthLabels;
    this.data = {
      labels: this.activeLabels,
      datasets: [
          {
              label: 'Zarada kina',
              data: [65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56, 55, 40],
              backgroundColor: [
                "#FFCB0B",
                "#FFCB0B",
              ],
            hoverBackgroundColor: "#DC3545",
            borderColor: '#FFCB0B'

          },


      ]
  }

  }

	ngOnInit() {

 }
  update() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.timeFilter = params['time'];
  });
  console.log(this.timeFilter)
    if(this.timeFilter=="day"){
      this.activeLabels=this.dayLabels;
    }else if(this.timeFilter=="month"){
      this.activeLabels=this.monthLabels;

    }
    this.data.labels=this.activeLabels;
  }
}
