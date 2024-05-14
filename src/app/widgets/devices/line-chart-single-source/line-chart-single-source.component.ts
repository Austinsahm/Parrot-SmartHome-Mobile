import { Component, Input, OnInit } from '@angular/core';
import { ComboBoxOption } from 'src/app/model/types';

@Component({
  selector: 'app-line-chart-single-source',
  templateUrl: './line-chart-single-source.component.html',
  styleUrls: ['./line-chart-single-source.component.scss'],
})
export class LineChartSingleSourceComponent implements OnInit {
  @Input() data: any;
  @Input() brushes: any;
  chartOptions: ComboBoxOption<string>[];
  arr = [];
  chartType: string;

  constructor() { 
    this.chartOptions = [
      { key: 'Area', value: 'Area', label: 'Area' },
      { key: 'Line', value: 'Line', label: 'Line' },
      { key: 'Column', value: 'Column', label: 'Column' },
      { key: 'Point', value: 'Point', label: 'Point' },
      { key: 'Spline', value: 'Spline', label: 'Spline' },
      { key: 'SplineArea', value: 'SplineArea', label: 'SplineArea' },
      { key: 'StepArea', value: 'StepArea', label: 'StepArea' },
      { key: 'StepLine', value: 'StepLine', label: 'StepLine' },
      { key: 'Waterfall', label: 'Waterfall', value: 'Waterfall' },
    ];
   }

  ngOnInit() {
    this.arr = Object.keys(this.data).map((key) => {
      return this.data[key];
    });
  }

  changeChart(e: any) {
    this.chartType = e.value;
  }

}
