import { Component, OnInit, Input } from '@angular/core';
import { ComboBoxOption } from 'src/app/model/types';

@Component({
  selector: 'app-line-chart-multiple-sources',
  templateUrl: './line-chart-multiple-sources.component.html',
  styleUrls: ['./line-chart-multiple-sources.component.scss'],
})
export class LineChartMultipleSourcesComponent implements OnInit {
  @Input() summarizedData: any[] = [];
  @Input() title: string;
  @Input() brushes: any;

  chartOptions: ComboBoxOption<string>[];
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
    for (var i = 0; i <= this.summarizedData.length; i++) {
      for (var key in this.summarizedData[i]) {
        if (key !== 'time') {
          this.summarizedData.forEach((a) => (a[key] = +a[key]));
        }
      }
    }

    this.chartType = 'Line';
  }

  changeChart(e: any) {
    this.chartType = e.value;
    console.log(this.chartType);
  }
}
