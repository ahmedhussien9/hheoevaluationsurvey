import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './pages/details/details.component';
import { SurveyDetailGuard } from './pages/details/details.guard';
import { SurveysComponent } from './surveys.component';

const routes: Routes = [
  { path: '', component: SurveysComponent },
  {
    path: ':id',
    component: DetailsComponent,
    canActivate: [SurveyDetailGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurveysRoutingModule {}
