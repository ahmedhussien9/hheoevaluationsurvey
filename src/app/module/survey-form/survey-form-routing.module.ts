import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuccessComponent } from './pages/success/success.component';
import { SurveyFormComponent } from './survey-form.component';

const routes: Routes = [
  {
    path: '',
    component: SurveyFormComponent,
  },
  {
    path: 'success',
    component: SuccessComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurveyFormRoutingModule {}
