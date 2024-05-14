import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FloorPlanPage } from './floor-plan.page';

const routes: Routes = [
  {
    path: '',
    component: FloorPlanPage
  },
  {
    path: 'details/:deviceId',
    loadChildren: () =>
      import('src/app/widgets/details-modal/details-modal.module').then((m) => m.DetailsModalModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FloorPlanPageRoutingModule {}
