import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FloorPageRoutingModule } from './floor-page-routing.module';
import { IonicModule } from '@ionic/angular';
import { FloorPageComponent } from './floor-page.component';
import { LayoutModule } from '../widgets/layout/layout.module';


@NgModule({
  declarations: [FloorPageComponent],
  imports: [
    CommonModule,
    FloorPageRoutingModule,
    IonicModule,
    LayoutModule,
  ]
})
export class FloorPageModule { }
