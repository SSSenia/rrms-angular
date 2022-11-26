import { NgModule } from "@angular/core";
import { CurrentPageComponent } from './current-page/current-page.component';
import { StatisticPageComponent } from './statistic-page/statistic-page.component';
import { HelpPageComponent } from './help-page/help-page.component';
import {MatSliderModule} from '@angular/material/slider';

@NgModule({
  declarations: [
    CurrentPageComponent,
    StatisticPageComponent,
    HelpPageComponent
  ],
  exports: [
    CurrentPageComponent,
    StatisticPageComponent,
    HelpPageComponent
  ],
  imports: [
    MatSliderModule
  ]
})
export class ContentModule{}