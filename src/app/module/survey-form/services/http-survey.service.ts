import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FilePreviw } from '../interfaces/IFilePreview.interface';
import { isPlatformBrowser } from '@angular/common';

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

  constructor(
    private httpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

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
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(
        this.FORM_LOCALSTORAGE_PRFIX,
        JSON.stringify({ id, uuid })
      );
    }
  }

  getFormIdFromLocalStorage(): IFormId {
    let FormId: IFormId;
    if (isPlatformBrowser(this.platformId)) {
      FormId =
        (JSON.parse(
          localStorage.getItem(this.FORM_LOCALSTORAGE_PRFIX)
        ) as IFormId) || null;
    }
    return FormId;
  }

  getFormId(): number {
    let id: number;
    if (isPlatformBrowser(this.platformId)) {
      id =
        (
          JSON.parse(
            localStorage.getItem(this.FORM_LOCALSTORAGE_PRFIX)
          ) as IFormId
        ).id || null;
    }
    return id;
  }

  getFormUUID(): string {
    let uuid: string;
    if (isPlatformBrowser(this.platformId)) {
      uuid =
        (
          JSON.parse(
            localStorage.getItem(this.FORM_LOCALSTORAGE_PRFIX)
          ) as IFormId
        ).uuid || null;
    }
    return uuid;
  }

  clearLocalStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
  }
}
