import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { first, switchMap, catchError, map } from 'rxjs/operators';
import { ISurvey } from '../../interfaces/ISurvey.interface';
import { HttpSurveyDetailService } from './services/http-survey-detail.service';

@Injectable({
  providedIn: 'root',
})
export class SurveyDetailGuard implements CanActivate {
  constructor(
    private readonly httpSurveyDetailService: HttpSurveyDetailService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.httpSurveyDetailService.getSurveyById(route.params['id']).pipe(
      first(),
      map(
        (survey: ISurvey) =>
          (this.httpSurveyDetailService.surveyDetail = survey)
      ),
      switchMap(() => this.activateRoute()),
      catchError(() => {
        console.log('ERROR');
        return of(false);
      })
    );
  }

  activateRoute() {
    return of(true);
  }
}
