import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveysRoutingModule } from './surveys-routing.module';
import { SurveysComponent } from './surveys.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [SurveysComponent],
  imports: [CommonModule, SurveysRoutingModule, HttpClientModule, SharedModule],
})
export class SurveysModule {}
