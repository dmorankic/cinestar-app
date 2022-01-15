import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UIChart } from 'primeng/chart/chart';
@Component({
  selector: 'app-mid',
  templateUrl: './mid.component.html',
  styleUrls: ['./mid.component.scss']
})
export class MidComponent implements OnInit {
  data1:any;
  data2:any;
  data3:any;
  data1Options:any;
  @ViewChild("chart1") chart1: UIChart;
  @ViewChild("chart2") chart2: UIChart;
  @ViewChild("chart3") chart3: UIChart;

  @Input() data:any;

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
    this.activeLabels=this.monthLabels;
    this.data1 = {
      labels: this.activeLabels,
      datasets: [
          {
              label: 'Frekventnost novih korisnika',
              data: [],
              backgroundColor: [
                "#FFCB0B",
                "#FFCB0B",
              ],
            hoverBackgroundColor: "#DC3545",
            borderColor: '#FFCB0B',
            labelColor:'#495057'


          },


      ]
  }

  this.data1Options = {
    plugins: {
        legend: {
            labels: {
                color: '#F8F9FA'
            }
        },
        scales: {
          xAxes: {
              title:{
                color:'#F8F9FA'
              }
          },
          y: {
              type: 'linear',
              display: true,
              position: 'left',
              ticks: {
                  min: 0,
                  max: 100,
                  color: '#F8F9FA'
              },
              grid: {
                  color: '#F8F9FA'
              }
          }
        }
    }
  };

  this.data2 = {
    labels: this.activeLabels,
    datasets: [
      {
        label: 'Zarada kina on site',
        data: [],
        backgroundColor: [
          "#FFCB0B",
          "#FFCB0B",
        ],
        hoverBackgroundColor: "#DC3545",
        borderColor: '#FFCB0B'


      },


    ]
  }

    this.data3 = {
      labels: this.activeLabels,
      datasets: [
        {
            label: 'Zarada kina online',
            data: [],
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
    let interval = setInterval(()=>{
      if(this.data){
        this.data1.datasets.data = this.data.chart1;
        this.data2.datasets.data = this.data.chart2;
        this.data3.datasets.data = this.data.chart3;
      }
    },5000)
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
    this.data1.labels=this.activeLabels;
    this.data2.labels=this.activeLabels;
    this.data3.labels=this.activeLabels;
  }
}
