import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './core/admin/admin.component';
import { CanActivateViaAuthGuard } from './core/auth/auth-guard/auth.guard';
import { PublicLayoutComponent } from './core/public-layout/public-layout.component';
import { SurveyDetailGuard } from './module/surveys/pages/details/details.guard';

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
    canActivate: [CanActivateViaAuthGuard],
    children: [
      {
        path: 'surveys',
        loadChildren: () =>
          import('./module/surveys/surveys.module').then(
            (m) => m.SurveysModule
          ),
      },
      {
        path: '**',
        redirectTo: 'surveys',
      },
    ],
  },

  {
    path: 'auth',
    component: PublicLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./core/auth/auth.module').then((m) => m.AuthModule),
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
