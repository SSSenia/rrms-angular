import { NgModule } from "@angular/core";
import { CurrentPageComponent } from './current-page/current-page.component';
import { StatisticPageComponent } from './statistic-page/statistic-page.component';
import { HelpPageComponent } from './help-page/help-page.component';
import { MatSliderModule } from '@angular/material/slider';
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

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
    MatSliderModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TranslateModule
  ]
})
export class ContentModule { }
