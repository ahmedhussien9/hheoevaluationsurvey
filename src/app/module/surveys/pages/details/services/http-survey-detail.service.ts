import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/internal/operators/tap';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { ISurvey } from '../../../interfaces/ISurvey.interface';

@Injectable({
  providedIn: 'root',
})
export class HttpSurveyDetailService {
  private readonly baseUrl = environment.baseUrl;
  public surveyDetail: ISurvey;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  public getSurveyById(id: string): Observable<ISurvey> {
    let headers = new HttpHeaders();
    headers = headers.append(
      'Authorization',
      `Bearer ${this.authService.getToken()}`
    );
    return this.httpClient
      .get<ISurvey>(`${this.baseUrl}${id}`, {
        headers: headers,
      })
      .pipe(tap((data) => console.log(data)));
  }

  public downloadFile(id: number): Observable<Blob> {
    let headers = new HttpHeaders();
    headers = headers.append(
      'Authorization',
      `Bearer ${this.authService.getToken()}`
    );
    return this.httpClient
      .get(`${this.baseUrl}${id}/download`, {
        headers: headers,
        responseType: 'blob',
      })
      .pipe(tap((data) => console.log(data)));
  }
}
