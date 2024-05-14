import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsLandingComponent } from './details-landing/details-landing.component';
import { DetailsModalComponent } from './details-modal.component';
import { GeolocationComponent } from './geolocation/geolocation.component';
import { LastStatusComponent } from './last-status/last-status.component';
import { LogsComponent } from './logs/logs.component';
import { StaticChartsComponent } from './static-charts/static-charts.component';
import { TscExplicitComponent } from './tsc-explicit/tsc-explicit.component';
import { TSCSummarizedComponent } from './tsc-summarized/tsc-summarized.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'landing',
  },
  {
    path: 'landing',
    component: DetailsLandingComponent,
    children: [
      {
        path: '',
        component: DetailsModalComponent,
      },
    ],
  },
  {
    path: 'last-status',
    component: LastStatusComponent,
  },
  {
    path: 'logs',
    component: LogsComponent,
  },
  {
    path: 'tsc-summarized',
    component: TSCSummarizedComponent,
  },
  {
    path: 'tsc-explicit',
    component: TscExplicitComponent,
  },
  {
    path: 'static-charts',
    component: StaticChartsComponent,
  },
  {
    path: 'geolocation',
    component: GeolocationComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsModalRoutingModule {}
