import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './core/admin/admin.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./module/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'survey',
    loadChildren: () =>
      import('./module/survey-form/survey-form.module').then(
        (m) => m.SurveyFormModule
      ),
  },
  {
    path: 'dashboard',
    component: AdminComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./module/surveys/surveys.module').then(
            (m) => m.SurveysModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
