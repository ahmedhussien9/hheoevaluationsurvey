import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SurveyDetailGuard } from './details.guard';

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule],
  providers: [SurveyDetailGuard],
})
export class DetailsModule {}
