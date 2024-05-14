import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { DetailsModalRoutingModule } from './details-modal-routing.module';
import { DetailsModalComponent } from './details-modal.component';
import { LastStatusComponent } from './last-status/last-status.component';
import { EmptyDataComponent } from '../devices/empty-data/empty-data.component';
import { DevicesModule } from '../devices/devices.module';
import { LogsComponent } from './logs/logs.component';
import { TSCSummarizedComponent } from './tsc-summarized/tsc-summarized.component';
import { DetailsLandingComponent } from './details-landing/details-landing.component';
import { GeolocationComponent } from './geolocation/geolocation.component';
import { TscExplicitComponent } from './tsc-explicit/tsc-explicit.component';
import { StaticChartsComponent } from './static-charts/static-charts.component';

@NgModule({
  declarations: [
    DetailsModalComponent,
    LastStatusComponent,
    LogsComponent,
    TSCSummarizedComponent,
    DetailsLandingComponent,
    GeolocationComponent,
    TscExplicitComponent,
    StaticChartsComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    DetailsModalRoutingModule,
    DevicesModule,
  ],
})
export class DetailsModalModule {}
  