import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SurveyDetailGuard } from './pages/details/details.guard';
import { SurveysComponent } from './surveys.component';

const routes: Routes = [
  { path: '', component: SurveysComponent },
  {
    path: ':id',
    loadChildren: () =>
      import('./pages/details/details.module').then((m) => m.DetailsModule),
    canActivate: [SurveyDetailGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurveysRoutingModule {}
