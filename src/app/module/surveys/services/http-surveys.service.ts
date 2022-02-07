import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { ISurveryListResponse } from '../interfaces/ISurvey.interface';
import { TFormStatus } from '../types/TFormStatus.type';

@Injectable()
export class HttpSurveysService {
  private readonly baseUrl = environment.baseUrl;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  /**
   * This request is for getting the list of submitted surveys
   * @param page This is page number for pagination the starter is 0
   * @param pageSize This is the page size number for pagination the starter is 10
   * @param formStatus This is the form status which has 4 and the starter is completed (queryparam)
   * @returns
   */
  public getListOfSurveysApi(
    page: number = 0,
    formStatus:
      | TFormStatus.completed
      | TFormStatus.canceled
      | TFormStatus.drafted
      | TFormStatus.inProgress = TFormStatus.completed
  ): Observable<ISurveryListResponse> {
    let headers = new HttpHeaders();
    headers = headers.append(
      'Authorization',
      `Bearer ${this.authService.getToken()}`
    );
    let params = new HttpParams();
    params = params.set('formStatus', formStatus);
    return this.httpClient
      .get<ISurveryListResponse>(`${this.baseUrl}${page}/${10}`, {
        params: params,
        headers: headers,
      })
      .pipe(tap((data) => console.log(data)));
  }
}
