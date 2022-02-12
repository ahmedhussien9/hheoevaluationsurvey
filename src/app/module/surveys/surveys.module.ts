import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveysRoutingModule } from './surveys-routing.module';
import { SurveysComponent } from './surveys.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { DetailsComponent } from './pages/details/details.component';
import { getDutchPaginatorIntl } from 'src/app/shared/helper/dutch-paginator-intl';
import { MatPaginatorIntl } from '@angular/material/paginator';

@NgModule({
  declarations: [SurveysComponent, DetailsComponent],
  imports: [CommonModule, SurveysRoutingModule, HttpClientModule, SharedModule],
  providers: [{ provide: MatPaginatorIntl, useValue: getDutchPaginatorIntl() }],
})
export class SurveysModule {}
