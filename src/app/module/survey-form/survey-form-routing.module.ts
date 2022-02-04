import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SurveyFormComponent } from './survey-form.component';

const routes: Routes = [{ path: '', component: SurveyFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurveyFormRoutingModule {}
