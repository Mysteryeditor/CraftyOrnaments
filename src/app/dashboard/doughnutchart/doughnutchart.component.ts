import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { MetalsService } from 'src/services/metals.service';

@Component({
  selector: 'app-doughnutchart',
  templateUrl: './doughnutchart.component.html',
  styleUrls: ['./doughnutchart.component.css'],
})
export class DoughnutchartComponent implements OnInit {
  constructor(private metalService: MetalsService) {}
  chart: any;
  labels: string[] = [];
  count:number[]=[];
  ngOnInit(): void {
    this.metalService.getOrderStats().subscribe({
      next: (response) => {
        response.forEach((x) => this.labels.push(x.metalName));
        response.forEach((x)=>this.count.push(x.orderCount));
      },
      error:(error)=>{
        alert(error);
      },
      complete:()=>{
        this.createChart();
      }
    });
  }

  createChart(){
    this.chart = new Chart('MyChart', {
      type: 'doughnut', //type of chart
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'Order Count',
            data: this.count,
            backgroundColor: ['pink', 'blue', 'black'],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }
}
