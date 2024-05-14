import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { AboutAppComponent } from './about-app/about-app.component';

@NgModule({
  declarations: [SettingsComponent, AboutAppComponent],
  imports: [CommonModule, IonicModule, SettingsRoutingModule],
})
export class SettingsModule {}
