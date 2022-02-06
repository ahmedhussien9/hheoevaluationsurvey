import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FilePreviw } from '../interfaces/IFilePreview.interface';

export interface IFormId {
  id: number;
  uuid: string;
}

@Injectable({
  providedIn: 'root',
})
export class HttpSubmitSurveyService {
  private readonly FORM_LOCALSTORAGE_PRFIX = 'FORM_ID';
  private readonly baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  public sendSurveyDataApi(survey: any) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.httpClient.post(`${this.baseUrl}submit`, survey, {
      headers: headers,
      observe: 'response',
    });
  }

  public uploadingFile(formData: FormData) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.httpClient.post<FilePreviw[]>(
      `${this.baseUrl}file/upload`,
      formData,
      {
        headers: headers,
      }
    );
  }

  public removeFile(fileId: number) {
    return this.httpClient.delete(`${this.baseUrl}file/${fileId}`);
  }

  public getFormInitializeApi() {
    return this.httpClient.get(`${this.baseUrl}initialize`).pipe(
      map((data: any) => {
        return {
          id: data['id'],
          uuid: data['uuid'],
        };
      }),
      tap((data: IFormId) => {
        console.log(data);
        this.setToLocalStorage(data);
      })
    );
  }

  public setToLocalStorage(data: IFormId) {
    const { id, uuid } = data;
    localStorage.setItem(
      this.FORM_LOCALSTORAGE_PRFIX,
      JSON.stringify({ id, uuid })
    );
  }

  getFormIdFromLocalStorage(): IFormId {
    return (
      (JSON.parse(
        localStorage.getItem(this.FORM_LOCALSTORAGE_PRFIX)
      ) as IFormId) || null
    );
  }

  getFormId(): number {
    return (
      (
        JSON.parse(
          localStorage.getItem(this.FORM_LOCALSTORAGE_PRFIX)
        ) as IFormId
      ).id || null
    );
  }

  getFormUUID(): string {
    return (
      (
        JSON.parse(
          localStorage.getItem(this.FORM_LOCALSTORAGE_PRFIX)
        ) as IFormId
      ).uuid || null
    );
  }

  clearLocalStorage(): void {
    localStorage.clear();
  }
}