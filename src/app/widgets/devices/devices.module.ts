import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceListComponent } from './device-list/device-list.component';
import { DevicesListCardComponent } from './devices-list-card/devices-list-card.component';
import { IonicModule } from '@ionic/angular';
import { EmptyDataComponent } from './empty-data/empty-data.component';
import { LineChartMultipleSourcesComponent } from './line-chart-multiple-sources/line-chart-multiple-sources.component';
import {
  IgxCategoryChartModule,
  IgxDoughnutChartModule,
  IgxItemLegendModule,
  IgxLegendModule,
  IgxPieChartModule,
  IgxRadialPieSeriesModule,
} from 'igniteui-angular-charts';
import { ComboSelectFieldComponent } from './combo-select-field/combo-select-field.component';
import { LineChartSingleSourceComponent } from './line-chart-single-source/line-chart-single-source.component';
import { RadialGaugeChartComponent } from './radial-gauge-chart/radial-gauge-chart.component';
import { IgxRadialGaugeModule } from 'igniteui-angular-gauges';
import { DeviceLocationComponent } from './device-location/device-location.component';

@NgModule({
  declarations: [

    DeviceListComponent,
    DevicesListCardComponent,
    EmptyDataComponent,
    LineChartMultipleSourcesComponent,
    ComboSelectFieldComponent,
    LineChartSingleSourceComponent,
    RadialGaugeChartComponent,
    DeviceLocationComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    IgxCategoryChartModule,
    IgxLegendModule,
    IgxDoughnutChartModule,
    IgxItemLegendModule,
    IgxPieChartModule,
    IgxRadialGaugeModule,
  ],
  exports: [
    DeviceListComponent,
    DevicesListCardComponent,
    EmptyDataComponent,
    LineChartMultipleSourcesComponent,
    ComboSelectFieldComponent,
    LineChartSingleSourceComponent,
    RadialGaugeChartComponent,
    DeviceLocationComponent,
  ],
})
export class DevicesModule {}
