import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FloorPageComponent } from './floor-page.component';

const routes: Routes = [
  {
    path: '',
    component: FloorPageComponent,
  },
  {
    path: 'plan/:floorId',
    loadChildren: () =>
      import('../pages/floor-plan/floor-plan.module').then(
        (m) => m.FloorPlanPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FloorPageRoutingModule {}
